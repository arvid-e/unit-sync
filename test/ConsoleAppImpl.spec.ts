import { beforeEach, describe, vi } from 'vitest';
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
});
