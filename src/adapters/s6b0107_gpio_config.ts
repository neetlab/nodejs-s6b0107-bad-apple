
import { Gpio } from "pigpio";

export interface S6b0107GpioMapping {
  /** レジスタ選択（H:データ、L:コマンド） */
  readonly RS: number;
  /** 読書選択（H:リード、L:ライト） */
  readonly RW: number;
  /** 有効無効選択（H:有効、L:無効） */
  readonly E: number;
  /** データ信号線 1ビット目 */
  readonly DB0: number;
  /** データ信号線 2ビット目 */
  readonly DB1: number;
  /** データ信号線 3ビット目 */
  readonly DB2: number;
  /** データ信号線 4ビット目 */
  readonly DB3: number;
  /** データ信号線 5ビット目 */
  readonly DB4: number;
  /** データ信号線 6ビット目 */
  readonly DB5: number;
  /** データ信号線 7ビット目 */
  readonly DB6: number;
  /** データ信号線 8ビット目 */
  readonly DB7: number;
  /** チップ選択1（H:有効、L:無効） */
  readonly CS1: number;
  /** チップ選択2（H:有効、L:無効） */
  readonly CS2: number;
  /** リセット（H:通常、L:リセット） */
  readonly RST: number;
}

export type S6b0107Pin = keyof S6b0107GpioMapping;

export class S6b0107GpioConfig {
  readonly pins: Record<S6b0107Pin, Gpio>;

  constructor(mapping: S6b0107GpioMapping) {
    this.pins = Object.entries(mapping).reduce((acc, [key, pin]) => {
      acc[key as S6b0107Pin] = new Gpio(pin, { mode: Gpio.OUTPUT });
      return acc;
    }, {} as Record<S6b0107Pin, Gpio>);
  }
}
