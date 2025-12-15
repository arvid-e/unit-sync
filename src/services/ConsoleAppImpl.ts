import { ConversionError } from '../error/ConversionError.js';
import { ParsingError } from '../error/ParsingError.js';
import type { ConsoleApp } from '../interfaces/ConsoleApp.js';
import type { ConsoleIO } from '../interfaces/ConsoleIO.js';
import type { UnitConverter } from '../interfaces/UnitConverter.js';
import type { ConversionPayload } from '../types/UnitTypes.js';

export class ConsoleAppImpl implements ConsoleApp {
  unitConverter: UnitConverter;
  consoleIO: ConsoleIO;

  constructor(unitConverter: UnitConverter, consoleIO: ConsoleIO) {
    this.unitConverter = unitConverter;
    this.consoleIO = consoleIO;
  }

  async run(): Promise<void> {
    while (true) {
      try {
        const askForCommand = 'Conversion command: ';

        const inputCommand = await this.consoleIO.readInput(askForCommand);

        if (inputCommand === 'exit') {
          break;
        }

        const validCommand = this.parseCommand(inputCommand);

        this.processConversion(validCommand);
      } catch (error) {
        if (error instanceof Error) {
          if (error instanceof ParsingError || error instanceof ConversionError) {
            this.consoleIO.printError(error.message);
          } else {
            this.consoleIO.printError(`System Error: ${error.message}`);
          }
        } else {
          this.consoleIO.printError('An unknown error occurred during command execution.');
          break;
        }
      }
    }
  }

  private parseCommand(command: string): ConversionPayload {
    const inputString = command.split(' ');

    const value = Number(inputString[0]);

    const fromUnit = inputString[1];

    const toUnit = inputString[3];

    if (!value || !fromUnit || !toUnit) {
      throw new ParsingError('Invalid input command.');
    }

    const inputPayload: ConversionPayload = {
      value,
      fromUnit,
      toUnit,
    };

    return inputPayload;
  }

  private processConversion(conversionPayload: ConversionPayload): void {
    const value = this.unitConverter.convert(conversionPayload);

    const output = `Result: ${value.toFixed(4)} ${conversionPayload.toUnit}`;

    this.consoleIO.printOutput(output);
  }
}
