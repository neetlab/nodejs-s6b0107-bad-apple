"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
class Canvas {
    #vram;
    #s6b0107ChipControl;
    #s6b0107DisplayControl;
    constructor(s6b0107DisplayControl, s6b0107ChipControl) {
        this.#vram = new Uint8Array(2 * 8 * 64).fill(0);
        this.#s6b0107DisplayControl = s6b0107DisplayControl;
        this.#s6b0107ChipControl = s6b0107ChipControl;
    }
    write(x, y, value) {
        if (x < 0 || 127 < x) {
            throw RangeError(`X is out of bounds ${x}`);
        }
        if (y < 0 || 63 < y) {
            throw RangeError(`Y is out of bounds ${y}`);
        }
        const index = x < 64
            ? Math.floor(y / 8) * 64 + x
            : 64 * 8 + Math.floor(y / 8) * 64 + (x - 64);
        const shift = y % 8;
        if (value) {
            this.#vram[index] = this.#vram[index] | (1 << shift);
        }
        else {
            this.#vram[index] = this.#vram[index] & ~(1 << shift);
        }
    }
    async flush() {
        let lastChip = null;
        let lastPage = null;
        let lastAddress = null;
        for (const chip of [1, 2]) {
            for (let page = 0; page < 8; page++) {
                for (let address = 0; address < 64; address++) {
                    const index = (chip - 1) * 8 * 64 + page * 64 + address;
                    const value = this.#vram[index];
                    if (lastChip !== chip) {
                        this.#s6b0107ChipControl.selectChip(chip);
                    }
                    if (lastChip !== chip || lastPage !== page) {
                        this.#s6b0107DisplayControl.setPage(page);
                    }
                    if (lastChip !== chip ||
                        lastPage !== page ||
                        lastAddress !== address - 1) {
                        this.#s6b0107DisplayControl.setAddress(address);
                    }
                    this.#s6b0107DisplayControl.writeDisplayData(value);
                    lastChip = chip;
                    lastPage = page;
                    lastAddress = address;
                }
            }
        }
    }
}
exports.Canvas = Canvas;
