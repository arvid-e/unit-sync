import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UnitConverter } from '../src/interfaces/UnitConverter';
import { ConsoleIO } from '../src/interfaces/ConsoleIO';
import { ConsoleAppImpl } from '../src/services/ConsoleAppImpl';
import { ParsingError } from '../src/types/ErrorTypes';

type MockUnitConverter = UnitConverter & { convert: ReturnType<typeof vi.fn> };
type MockConsoleIO = ConsoleIO & { 
    printOutput: ReturnType<typeof vi.fn>,
    printError: ReturnType<typeof vi.fn>,
    readInput: ReturnType<typeof vi.fn>,
    exit: ReturnType<typeof vi.fn>,
};

describe('ConsoleAppImpl', () => {
  let mockUnitConverter: MockUnitConverter;
  let mockConsoleIO: MockConsoleIO;
  let consoleAppImpl: ConsoleAppImpl;

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

    consoleAppImpl = new ConsoleAppImpl(mockUnitConverter);
  });

  describe('parseCommand()', () => {
    const parseCommand = (input: string) => {
      return (consoleAppImpl as any).parseCommand(input);
    };

    it('should return the input payload on a correct input string', () => {
      const inputString = '500 yard to meter';

      const expectedResult = {
        value: 500,
        fromUnit: 'yard',
        toUnit: 'meter',
      };

      const result = parseCommand(inputString);

      expect(result).toEqual(expectedResult);
      expect(consoleAppImpl.parseCommand).toHaveBeenCalledTimes(1);
    });

    it('should throw a ParseError if input string is incorrect', () => {
      const inputString = '500 to yard';

      expect(() => parseCommand(inputString)).toThrow(ParsingError);
      expect(consoleAppImpl.parseCommand).toHaveBeenCalledTimes(1);
    });
  });
});
