import { IS6b0107DisplayControl } from "../interfaces/s6b0107_display_control.js";
import { S6b0107GpioConfig } from "./s6b0107_gpio_config.js";

export class S6b0107IDisplayControlGpio implements IS6b0107DisplayControl
{
  readonly #config: S6b0107GpioConfig;

  constructor(config: S6b0107GpioConfig) {
    this.#config = config;
  }

  displayOnOff(value: number): void {
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

  setAddress(value: number): void {
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

  setPage(value: number): void {
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

  displayStartLine(value: number): void {
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

  statusRead(): number {
    throw new Error("Unimplemented");
  }

  writeDisplayData(value: number): void {
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

  readDisplayData(): number {
    throw new Error("Unimplemented");
  }

  #pulseE() {
    this.#config.pins.E.digitalWrite(1);
    this.#config.pins.E.trigger(10, 0);
  }
}
