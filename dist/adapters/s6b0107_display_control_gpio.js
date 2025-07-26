"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S6b0107IDisplayControlGpio = void 0;
class S6b0107IDisplayControlGpio {
    #config;
    constructor(config) {
        this.#config = config;
    }
    displayOnOff(value) {
        if (value !== 0 && value !== 1) {
            throw new TypeError("Value must be 0 or 1");
        }
        this.#config.pins.RS.digitalWrite(0);
        this.#config.pins.RW.digitalWrite(0);
        this.#config.pins.DB7.digitalWrite(0);
        this.#config.pins.DB6.digitalWrite(0);
        this.#config.pins.DB5.digitalWrite(1);
        this.#config.pins.DB4.digitalWrite(1);
        this.#config.pins.DB3.digitalWrite(1);
        this.#config.pins.DB2.digitalWrite(1);
        this.#config.pins.DB1.digitalWrite(1);
        this.#config.pins.DB0.digitalWrite(value);
        this.#pulseE();
    }
    setAddress(value) {
        if (value < 0 || value > 63) {
            throw new RangeError("Y address must be between 0 and 63");
        }
        this.#config.pins.RS.digitalWrite(0);
        this.#config.pins.RW.digitalWrite(0);
        this.#config.pins.DB7.digitalWrite(0);
        this.#config.pins.DB6.digitalWrite(1);
        this.#config.pins.DB5.digitalWrite((value >> 5) & 1);
        this.#config.pins.DB4.digitalWrite((value >> 4) & 1);
        this.#config.pins.DB3.digitalWrite((value >> 3) & 1);
        this.#config.pins.DB2.digitalWrite((value >> 2) & 1);
        this.#config.pins.DB1.digitalWrite((value >> 1) & 1);
        this.#config.pins.DB0.digitalWrite((value >> 0) & 1);
        this.#pulseE();
    }
    setPage(value) {
        if (value < 0 || value > 7) {
            throw new RangeError("Page must be between 0 and 7");
        }
        this.#config.pins.RS.digitalWrite(0);
        this.#config.pins.RW.digitalWrite(0);
        this.#config.pins.DB7.digitalWrite(1);
        this.#config.pins.DB6.digitalWrite(0);
        this.#config.pins.DB5.digitalWrite(1);
        this.#config.pins.DB4.digitalWrite(1);
        this.#config.pins.DB3.digitalWrite(1);
        this.#config.pins.DB2.digitalWrite((value >> 2) & 1);
        this.#config.pins.DB1.digitalWrite((value >> 1) & 1);
        this.#config.pins.DB0.digitalWrite((value >> 0) & 1);
        this.#pulseE();
    }
    displayStartLine(value) {
        if (value < 0 || value > 63) {
            throw new RangeError("Display start line must be between 0 and 63");
        }
        this.#config.pins.RS.digitalWrite(0);
        this.#config.pins.RW.digitalWrite(0);
        this.#config.pins.DB7.digitalWrite(1);
        this.#config.pins.DB6.digitalWrite(1);
        this.#config.pins.DB5.digitalWrite((value >> 5) & 1);
        this.#config.pins.DB4.digitalWrite((value >> 4) & 1);
        this.#config.pins.DB3.digitalWrite((value >> 3) & 1);
        this.#config.pins.DB2.digitalWrite((value >> 2) & 1);
        this.#config.pins.DB1.digitalWrite((value >> 1) & 1);
        this.#config.pins.DB0.digitalWrite((value >> 0) & 1);
        this.#pulseE();
    }
    statusRead() {
        throw new Error("Unimplemented");
    }
    writeDisplayData(value) {
        if (value < 0 || value > 255) {
            throw new RangeError("Write data must be between 0 and 255");
        }
        this.#config.pins.RS.digitalWrite(1);
        this.#config.pins.RW.digitalWrite(0);
        this.#config.pins.DB7.digitalWrite((value >> 7) & 1);
        this.#config.pins.DB6.digitalWrite((value >> 6) & 1);
        this.#config.pins.DB5.digitalWrite((value >> 5) & 1);
        this.#config.pins.DB4.digitalWrite((value >> 4) & 1);
        this.#config.pins.DB3.digitalWrite((value >> 3) & 1);
        this.#config.pins.DB2.digitalWrite((value >> 2) & 1);
        this.#config.pins.DB1.digitalWrite((value >> 1) & 1);
        this.#config.pins.DB0.digitalWrite((value >> 0) & 1);
        this.#pulseE();
    }
    readDisplayData() {
        throw new Error("Unimplemented");
    }
    #pulseE() {
        this.#config.pins.E.digitalWrite(1);
        this.#config.pins.E.trigger(10, 0);
    }
}
exports.S6b0107IDisplayControlGpio = S6b0107IDisplayControlGpio;
