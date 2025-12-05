export interface ConsoleIO {
  readInput(input: string): Promise<string>;
  printOutput(output: string): void;
  printError(error: string): void;
  exit(): void;
}
