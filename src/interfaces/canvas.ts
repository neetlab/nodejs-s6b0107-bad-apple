export interface ICanvas {
  write(x: number, y: number, value: 1 | 0): void;
  flush(): void;
}
