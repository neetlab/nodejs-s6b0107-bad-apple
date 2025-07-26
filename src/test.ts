import fs from "fs/promises";
import { setTimeout } from "timers/promises";

const WIDTH = 128;
const HEIGHT = 64;
const BYTES_PER_FRAME = WIDTH * HEIGHT / 8;

async function main() {
  const data = await fs.readFile("./video.bin");
  const frameCount = data.length / BYTES_PER_FRAME;

  for (let f = 0; f < frameCount; f++) {
    const frameData = data.subarray(f * BYTES_PER_FRAME, (f + 1) * BYTES_PER_FRAME);

    const bits: number[] = [];
    for (const byte of frameData) {
      for (let i = 7; i >= 0; i--) {
        bits.push((byte >> i) & 1);
      }
    }

    for (let y = 0; y <= 64; y++) {
      let out = ""
      for (let x = 0; x <= 128; x++) {
        const index = y * 128 + x;
        if (bits[index]) {
          out += "X"
        } else {
          out += "."
        }
      }
      console.log(out);
    }

    await setTimeout(100);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
