"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
class Canvas {
    #nextVram;
    #prevVram;
    #s6b0107ChipControl;
    #s6b0107DisplayControl;
    constructor(s6b0107DisplayControl, s6b0107ChipControl) {
        this.#nextVram = new Uint8Array(2 * 8 * 64).fill(0);
        this.#prevVram = new Uint8Array(2 * 8 * 64).fill(0);
        this.#s6b0107DisplayControl = s6b0107DisplayControl;
        this.#s6b0107ChipControl = s6b0107ChipControl;
        setInterval(() => {
            this.#flush();
        }, 1000 / 10);
    }
    write(x, y, value) {
        if (x < 0 || 128 < x) {
            throw RangeError(`X is out of bounds ${x}`);
        }
        if (y < 0 || 64 < y) {
            throw RangeError(`Y is out of bounds ${y}`);
        }
        const index = x < 64
            ? Math.floor(y / 8) * 64 + x
            : 64 * 8 + Math.floor(y / 8) * 64 + (x - 64);
        const shift = y % 8;
        if (value) {
            this.#nextVram[index] = this.#nextVram[index] | (1 << shift);
        }
        else {
            this.#nextVram[index] = this.#nextVram[index] & ~(1 << shift);
        }
    }
    #flush() {
        let lastChip = null;
        let lastPage = null;
        for (const chip of [1, 2]) {
            for (let page = 0; page < 8; page++) {
                for (let address = 0; address < 64; address++) {
                    const index = (chip - 1) * 8 * 64 + page * 64 + address;
                    const nextValue = this.#nextVram[index];
                    const prevValue = this.#prevVram[index];
                    if (nextValue === prevValue) {
                        continue;
                    }
                    if (lastChip !== chip) {
                        this.#s6b0107ChipControl.selectChip(chip);
                        lastChip = chip;
                    }
                    if (lastChip !== chip || lastPage !== page) {
                        this.#s6b0107DisplayControl.setPage(page);
                        lastPage = page;
                    }
                    this.#s6b0107DisplayControl.setAddress(address);
                    this.#s6b0107DisplayControl.writeDisplayData(nextValue);
                }
            }
        }
        this.#prevVram = new Uint8Array(this.#nextVram);
        this.#nextVram = new Uint8Array(this.#nextVram);
    }
}
exports.Canvas = Canvas;
