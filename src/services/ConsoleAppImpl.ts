import { ParsingError } from '../error/ParsingError.js';
import type { ConsoleApp } from '../interfaces/ConsoleApp.js';
import type { ConsoleIO } from '../interfaces/ConsoleIO.js';
import type { UnitConverter } from '../interfaces/UnitConverter.js';
import type { ConversionPayload } from '../types/UnitTypes.js';
import { ConversionError } from '../error/ConversionError.js';

export class ConsoleAppImpl implements ConsoleApp {
  unitConverter: UnitConverter;
  consoleIO: ConsoleIO;

  constructor(unitConverter: UnitConverter, consoleIO: ConsoleIO) {
    this.unitConverter = unitConverter;
    this.consoleIO = consoleIO;
  }

  async run(): Promise<void> {
    const askForCommand = 'Conversion command: ';
    this.consoleIO.initialize();

    const inputCommand = await this.consoleIO.readInput(askForCommand);

    const validCommand = this.parseCommand(inputCommand);

    const convertedUnit = this.processConversion(validCommand);

    this.consoleIO.printOutput(`${convertedUnit}`);
  }

  private parseCommand(command: string): ConversionPayload {
    const inputString = command.split(' ');

    const value = Number(inputString[0]);

    const fromUnit = inputString[1];

    const toUnit = inputString[3];

    if (!value || !fromUnit || !toUnit) {
      throw new ParsingError('');
    }

    const inputPayload: ConversionPayload = {
      value,
      fromUnit,
      toUnit,
    };


    return inputPayload;
  }

  private processConversion(conversionPayload: ConversionPayload): void {
    try {
      const value = this.unitConverter.convert(conversionPayload);

      const output = `Result: ${value.toFixed(4)} ${conversionPayload.toUnit}`;

      this.consoleIO.printOutput(output);
    } catch (error) {
        if ( error instanceof ConversionError) {
            this.consoleIO.printError(error.message)
        } else {
            console.log(error);
        }
    }
  }
}
