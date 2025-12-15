import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline/promises';
import type { ConsoleIO } from '../interfaces/ConsoleIO.js';

export class ConsoleIOImpl implements ConsoleIO {
  private rl: readline.Interface | null = null;

  constructor() {}

  public initialize(): void {
    if (!this.rl) {
      this.rl = readline.createInterface({ input, output });
    }
  }

  public async readInput(input: string): Promise<string> {
    if (!this.rl) {
      this.initialize();
    }

    const answer = await this.rl!.question(input);

    return answer;
  }

  public printOutput(output: string): void {
    console.log(output);
  }

  public printError(error: string): void {
    console.error(`ERROR: ${error}`);
  }

  public exit(): void {
    if (this.rl) {
      this.rl.close();
    }

    process.exit(0);
  }
}
