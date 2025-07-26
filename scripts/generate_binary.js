import cv from '@u4/opencv4nodejs';
import fs from 'fs';
import path from 'path';

const THRESHOLD = 128; // 255/2 => グレー

const FRAME_DIR = './frames';
const OUTPUT = fs.createWriteStream('video.bin');

const files = fs.readdirSync(FRAME_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

for (const file of files) {
  const filepath = path.join(FRAME_DIR, file);

  const mat = cv.imread(filepath, cv.IMREAD_GRAYSCALE);
  const binary = mat.threshold(THRESHOLD, 1, cv.THRESH_BINARY);

  const data = binary.getData();
  const packed = [];

  for (let i = 0; i < data.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte |= (data[i + j] || 0) << (7 - j);
    }
    packed.push(byte);
  }

  OUTPUT.write(Buffer.from(packed));
}

OUTPUT.end();
console.log('書き出し完了');
