"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const WIDTH = 128;
const HEIGHT = 64;
const BYTES_PER_FRAME = WIDTH * HEIGHT / 8;
async function main() {
    const data = await promises_1.default.readFile("./video.bin");
    const f = Number(process.argv[2]);
    const frameData = data.subarray(f * BYTES_PER_FRAME, (f + 1) * BYTES_PER_FRAME);
    const bits = [];
    for (const byte of frameData) {
        for (let i = 7; i >= 0; i--) {
            bits.push((byte >> i) & 1);
        }
    }
    for (let y = 0; y < 64; y++) {
        let line = "";
        for (let x = 0; x < 128; x++) {
            const index = y * 128 + x;
            line += bits[index] ? "X" : ".";
        }
        console.log(line);
    }
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
