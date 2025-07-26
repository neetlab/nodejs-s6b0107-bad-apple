import { setTimeout } from "timers/promises";

import { S6b0107IDisplayControlGpio } from "./adapters/s6b0107_display_control_gpio.js";
import { S6b0107ChipControlGpio } from "./adapters/s6b0107_chip_control_gpio.js";
import { S6b0107GpioConfig } from "./adapters/s6b0107_gpio_config.js";
import { Canvas } from "./adapters/canvas.js";

const config = new S6b0107GpioConfig({
  RS: 21,
  RW: 26,
  E: 20,
  DB0: 19,
  DB1: 16,
  DB2: 13,
  DB3: 6,
  DB4: 12,
  DB5: 5,
  DB6: 25,
  DB7: 24,
  CS1: 22,
  CS2: 23,
  RST: 27,
});

const chipControl = new S6b0107ChipControlGpio(config);
const displayControl = new S6b0107IDisplayControlGpio(config);
const canvas = new Canvas(displayControl, chipControl);

function clear() {
  for (let page = 0; page < 8; page++) {
    for (let address = 0; address < 64; address++) {
      displayControl.setPage(page);
      displayControl.setAddress(address);
      displayControl.writeDisplayData(0);
      console.log(`clearing page=${page}, address=${address}`);
    }
  }
}

async function main() {
  chipControl.reset();

  chipControl.selectChip(1);
  displayControl.displayStartLine(0);
  displayControl.displayOnOff(1);
  clear();

  chipControl.selectChip(2);
  displayControl.displayStartLine(0);
  displayControl.displayOnOff(1);
  clear();

  let state: 0 | 1 = 1;

  while (true) {
    for (let x = 0; x < 128; x++) {
      for (let y = 0; y < 64; y++) {
        canvas.write(x, y, state);
      }
      canvas.flush();
      await setTimeout(100);
    }
    state = state ? 0 : 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
