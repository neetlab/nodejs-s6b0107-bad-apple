
/**
 * Display Control Instruction
 * 
 * The display control instructions control the internal state of the S6B0107. Instruction is received from MPU to
 * S6B0107 for the display control. The following table shows various instructions.
 * 
 * @see https://www.alldatasheet.jp/html-pdf/37855/SAMSUNG/S6B0107/4513/18/S6B0107.html
 */
export interface IS6b0107DisplayControl {
  /**
   * Controls the display on or off. Internal status and display RAM data is not affected.
   * L: OFF, H: ON
   */
  displayOnOff(value: number): void;

  /**
   * Sets the Y address in the Y address register.
   * 
   * @param value Y address (0-63)
   */
  setAddress(value: number): void;

  /**
   * Sets the X address at the X address register.
   * 
   * @param value Page (0-7)
   */
  setPage(value: number): void;

  /**
   * 
   * @param value Display start line (0-63)
   */
  displayStartLine(value: number): void;

  /**
   * Read status.
   * BUSY   L: Ready
   *        H: In operation
   * ON/OFF L: Display ON
   *        H: Display OFF
   * RESET  L: Normal
   *        H: Reset
   */
  statusRead(): number;

  /**
   * Write data (DB0:7) into display data RAM. After writing instruction, Y address is increased by 1 automatically.
   * 
   * @param value Write data
   */
  writeDisplayData(value: number): void;

  /**
   * Reads data (DB0:7) from display data RAM to the data bus.
   */
  readDisplayData(): number;
}
