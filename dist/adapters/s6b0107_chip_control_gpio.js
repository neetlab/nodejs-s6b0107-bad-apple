"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S6b0107ChipControlGpio = void 0;
class S6b0107ChipControlGpio {
    #config;
    constructor(config) {
        this.#config = config;
    }
    reset() {
        this.#config.pins.RST.digitalWrite(1);
        this.#config.pins.RST.trigger(10, 0);
    }
    selectChip(chip) {
        if (chip !== 1 && chip !== 2) {
            throw new RangeError("Chip must be 1 or 2");
        }
        this.#config.pins.CS1.digitalWrite(chip >> 0 & 1);
        this.#config.pins.CS2.digitalWrite(chip >> 1 & 1);
    }
}
exports.S6b0107ChipControlGpio = S6b0107ChipControlGpio;
