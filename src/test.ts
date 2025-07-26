import fs from "fs/promises";

const WIDTH = 128;
const HEIGHT = 64;
const BYTES_PER_FRAME = WIDTH * HEIGHT / 8;

async function main() {
  const data = await fs.readFile("./video.bin");

  // const frameCount = data.length / BYTES_PER_FRAME;

  const f = Number(process.argv[2]);

  // for (let f = 0; f < frameCount; f++) {
  const frameData = data.subarray(f * BYTES_PER_FRAME, (f + 1) * BYTES_PER_FRAME);
  let bits = ""
  let offsetFromLeft = 0;

  for (const byte of frameData) {
    for (let i = 7; i >= 0; i--) {
      if ((byte >> i) & 1) {
        bits += "X"
      } else {
        bits += " "
      }
      offsetFromLeft++;
    }

    if (offsetFromLeft === 128) {
      bits += "\n";
      offsetFromLeft=0;
    }
  }

  console.log(bits);
  // }
}

main();
