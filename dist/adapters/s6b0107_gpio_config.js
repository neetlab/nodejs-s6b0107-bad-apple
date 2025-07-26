"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S6b0107GpioConfig = void 0;
const pigpio_1 = require("pigpio");
class S6b0107GpioConfig {
    pins;
    constructor(mapping) {
        this.pins = Object.entries(mapping).reduce((acc, [key, pin]) => {
            acc[key] = new pigpio_1.Gpio(pin, { mode: pigpio_1.Gpio.OUTPUT });
            return acc;
        }, {});
    }
}
exports.S6b0107GpioConfig = S6b0107GpioConfig;
