import { ICanvas } from "../interfaces/canvas.js";
import { IS6b0107DisplayControl } from "../interfaces/s6b0107_display_control.js";
import { IS6b0107ChipControl } from "../interfaces/s6b0107_chip_control.js";
import { setTimeout } from "timers/promises";

export class Canvas implements ICanvas {
  #vram: Uint8Array;

  readonly #s6b0107ChipControl: IS6b0107ChipControl;
  readonly #s6b0107DisplayControl: IS6b0107DisplayControl;

  constructor(
    s6b0107DisplayControl: IS6b0107DisplayControl,
    s6b0107ChipControl: IS6b0107ChipControl
  ) {
    this.#vram = new Uint8Array(2 * 8 * 64).fill(0);
    this.#s6b0107DisplayControl = s6b0107DisplayControl;
    this.#s6b0107ChipControl = s6b0107ChipControl;
  }

  write(x: number, y: number, value: 1 | 0): void {
    if (x < 0 || 127 < x) {
      throw RangeError(`X is out of bounds ${x}`);
    }

    if (y < 0 || 63 < y) {
      throw RangeError(`Y is out of bounds ${y}`);
    }

    const index =
      x < 64
        ? Math.floor(y / 8) * 64 + x
        : 64 * 8 + Math.floor(y / 8) * 64 + (x - 64);
    const shift = y % 8;

    if (value) {
      this.#vram[index] = this.#vram[index] | (1 << shift);
    } else {
      this.#vram[index] = this.#vram[index] & ~(1 << shift);
    }
  }

  async flush(): Promise<void> {
    let lastChip: number | null = null;
    let lastPage: number | null = null;
    let lastAddress: number | null = null;

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
          if (
            lastChip !== chip ||
            lastPage !== page ||
            lastAddress !== address - 1
          ) {
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
