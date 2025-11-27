import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UnitConverter } from '../src/interfaces/UnitConverter';
import { ConsoleAppImpl } from '../src/services/ConsoleAppImpl';

type MockUnitConverter = UnitConverter & { convert: ReturnType<typeof vi.fn> };

describe('ConsoleAppImpl', () => {
  let mockUnitConverter: MockUnitConverter;
  let consoleAppImpl: ConsoleAppImpl;

  beforeEach(() => {
    mockUnitConverter = {
      convert: vi.fn(),
    } as unknown as MockUnitConverter;

    consoleAppImpl = new ConsoleAppImpl(mockUnitConverter);
  });

  describe('parseCommand', () => {
    const parseCommand = (input: string) => {
      return (consoleAppImpl as any).parseCommand(input);
    };

    it('should return the input payload from a correct input string', () => {
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
  });
});
