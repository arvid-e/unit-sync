import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConversionError } from '../src/error/ConversionError';
import { ParsingError } from '../src/error/ParsingError';
import { ConsoleIO } from '../src/interfaces/ConsoleIO';
import { UnitConverter } from '../src/interfaces/UnitConverter';
import { ConsoleAppImpl } from '../src/services/ConsoleAppImpl';
import { ConversionPayload } from '../src/types/UnitTypes';

type MockUnitConverter = UnitConverter & { convert: ReturnType<typeof vi.fn> };
type MockConsoleIO = ConsoleIO & {
  printOutput: ReturnType<typeof vi.fn>;
  printError: ReturnType<typeof vi.fn>;
  readInput: ReturnType<typeof vi.fn>;
  exit: ReturnType<typeof vi.fn>;
};

describe('ConsoleAppImpl', () => {
  let mockUnitConverter: MockUnitConverter;
  let mockConsoleIO: MockConsoleIO;
  let consoleAppImpl: ConsoleAppImpl;

  const parseCommand = (input: string) => {
    return (consoleAppImpl as any).parseCommand(input);
  };

  const processConversion = (conversionPayload: ConversionPayload) => {
    return (consoleAppImpl as any).processConversion(conversionPayload);
  };

  beforeEach(() => {
    mockUnitConverter = {
      convert: vi.fn(),
    } as unknown as MockUnitConverter;

    mockConsoleIO = {
      printOutput: vi.fn(),
      printError: vi.fn(),
      readInput: vi.fn(),
      exit: vi.fn(),
    } as unknown as MockConsoleIO;

    consoleAppImpl = new ConsoleAppImpl(mockUnitConverter, mockConsoleIO);
  });

  describe('parseCommand()', () => {
    it('should return the input payload on a correct input string', () => {
      const inputString = '500 yard to meter';

      const expectedResult = {
        value: 500,
        fromUnit: 'yard',
        toUnit: 'meter',
      };

      const result = parseCommand(inputString);

      expect(result).toEqual(expectedResult);
    });

    it('should throw a ParseError if input string is incorrect', () => {
      const inputString = '500 to yard';

      expect(() => parseCommand(inputString)).toThrow(ParsingError);
    });
  });

  describe('processConversion()', () => {
    const conversionPayload = {
      value: 500,
      fromUnit: 'yard',
      toUnit: 'kilometer',
    };

    const expectedOutput = 'Result: 0.4572 kilometer';

    it('should call the printOutput method on successful conversion', () => {
      mockUnitConverter.convert.mockReturnValue(0.4572);
      processConversion(conversionPayload);

      expect(mockUnitConverter.convert).toHaveBeenCalledTimes(1);
      expect(mockUnitConverter.convert).toHaveBeenCalledWith(conversionPayload);
      expect(mockConsoleIO.printOutput).toHaveBeenCalledTimes(1);
      expect(mockConsoleIO.printOutput).toHaveBeenCalledWith(expectedOutput);
      expect(mockConsoleIO.printError).not.toHaveBeenCalled();
    });

    it('should propagate error and stop execution on unsuccessful conversion', () => {
      const dimensionError = 'Unit must be of the same dimension.';
      const inputPayload = {
        value: 10,
        fromUnit: 'kilometer',
        toUnit: 'pound',
      };

      mockUnitConverter.convert.mockImplementationOnce(() => {
        throw new ConversionError(dimensionError);
      });

      // Propagate error to run() method
      const throwingCall = () => processConversion(inputPayload);

      expect(throwingCall).toThrow(new ConversionError(dimensionError));
      expect(mockConsoleIO.printError).not.toHaveBeenCalled();
      expect(mockConsoleIO.printOutput).not.toHaveBeenCalled();
      expect(mockUnitConverter.convert).toHaveBeenCalledTimes(1);
    });

    it('should throw a generic Error on unknown error during conversion', () => {
      const unknownMessage = 'Unknown error.';

      mockUnitConverter.convert.mockImplementationOnce(() => {
        throw new Error(unknownMessage);
      });

      const throwingCall = () => processConversion(conversionPayload);

      expect(throwingCall).toThrow(new Error(unknownMessage));

      expect(mockUnitConverter.convert).toHaveBeenCalledTimes(1);
      expect(mockConsoleIO.printError).not.toHaveBeenCalled();
      expect(mockConsoleIO.printOutput).not.toHaveBeenCalled();
    });
  });

  describe('run()', () => {
    it('should call all relevant method on successfull conversion', async () => {
      const conversionCommand = 'Conversion command: ';
      const input = '2 kilometer to yard';
      const convertedValue = 2187.23;

      const expectedPayload: ConversionPayload = {
        value: 2,
        fromUnit: 'kilometer',
        toUnit: 'yard',
      };
      const expectedResult = `Result: ${convertedValue.toFixed(4)} ${expectedPayload.toUnit}`;
      mockConsoleIO.readInput.mockResolvedValue(input);
      mockUnitConverter.convert.mockReturnValue(convertedValue);

      await consoleAppImpl.run();

      expect(mockConsoleIO.readInput).toHaveBeenCalledWith(conversionCommand);
      expect(mockUnitConverter.convert).toHaveBeenCalledWith(expectedPayload);
      expect(mockConsoleIO.printOutput).toHaveBeenCalledWith(expectedResult);
    });

    it('should catch parsingError and print it', async () => {
      const conversionCommand = 'Conversion command: ';
      const invalidInput = 'invalid input';
      const errorMessage = 'Invalid input command.';

      mockConsoleIO.readInput.mockResolvedValue(invalidInput);
      mockUnitConverter.convert.mockImplementationOnce(() => {
        throw new ConversionError(errorMessage);
      });

      await consoleAppImpl.run();

      expect(mockConsoleIO.readInput).toHaveBeenCalledWith(conversionCommand);
      expect(mockUnitConverter.convert).not.toHaveBeenCalled();
      expect(mockConsoleIO.printOutput).not.toHaveBeenCalled();
      expect(mockConsoleIO.printError).toHaveBeenCalledWith(errorMessage);
    });

    it('should catch unkown error and print it', async () => {
      const conversionCommand = 'Conversion command: ';
      const validInput = '5 meter to yard';
      const genericError = 'Invalid input command.';
      const expectedOutput = `System Error: ${genericError}`;

      mockConsoleIO.readInput.mockResolvedValue(validInput);
      mockUnitConverter.convert.mockImplementationOnce(() => {
        throw new Error(genericError);
      });

      await consoleAppImpl.run();

      expect(mockConsoleIO.readInput).toHaveBeenCalledWith(conversionCommand);
      expect(mockUnitConverter.convert).toHaveBeenCalled();
      expect(mockConsoleIO.printOutput).not.toHaveBeenCalled();
      expect(mockConsoleIO.printError).toHaveBeenCalledWith(expectedOutput);
    });

    it('should print unknown non-error type system errors', async () => {
      const nonErrorThrowable = 'fatal-error';
      const expectedOutput = 'An unknown error occurred during command execution.';

      mockConsoleIO.readInput.mockRejectedValue(nonErrorThrowable);

      await consoleAppImpl.run();

      expect(mockConsoleIO.printError).toHaveBeenCalledWith(expectedOutput);
      expect(mockConsoleIO.printOutput).not.toHaveBeenCalled();
      expect(mockUnitConverter.convert).not.toHaveBeenCalled();
    });
  });
});
