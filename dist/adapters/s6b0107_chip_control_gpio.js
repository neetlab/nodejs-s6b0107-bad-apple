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
        // DBs must be zero before switching the chip
        this.#config.pins.RS.digitalWrite(1);
        this.#config.pins.RW.digitalWrite(0);
        this.#config.pins.DB7.digitalWrite(0);
        this.#config.pins.DB6.digitalWrite(0);
        this.#config.pins.DB5.digitalWrite(0);
        this.#config.pins.DB4.digitalWrite(0);
        this.#config.pins.DB3.digitalWrite(0);
        this.#config.pins.DB2.digitalWrite(0);
        this.#config.pins.DB1.digitalWrite(0);
        this.#config.pins.DB0.digitalWrite(0);
        this.#config.pins.CS1.digitalWrite(chip >> 0 & 1);
        this.#config.pins.CS2.digitalWrite(chip >> 1 & 1);
    }
}
exports.S6b0107ChipControlGpio = S6b0107ChipControlGpio;
