export interface ConsoleIO {
  readInput(): void;
  printOutput(): void;
  printError(): void;
  exit(): void;
}
