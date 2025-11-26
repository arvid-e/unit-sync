import { beforeEach, describe, it, vi } from 'vitest';
import type { UnitConversionService } from '../src/interfaces/UnitConversionService';
import type { UnitValidationService } from '../src/interfaces/UnitValidationService';
import { UnitConverterImpl } from '../src/services/UnitConverterImpl';

type MockedConversionService = UnitConversionService & { calculate: ReturnType<typeof vi.fn> };
type MockedValidationService = UnitValidationService & {
  unitsAreConfigured: ReturnType<typeof vi.fn>;
  isValidValue: ReturnType<typeof vi.fn>;
  isConversionPossible: ReturnType<typeof vi.fn>;
  unitsHaveSameDimension: ReturnType<typeof vi.fn>;
};

describe('UnitConverterImpl', () => {
  let mockConversionService: MockedConversionService;
  let mockedValidationService: MockedValidationService;
  let unitConverter: UnitConverterImpl;

  beforeEach(() => {
    mockConversionService = {
      calculate: vi.fn(),
    } as unknown as MockedConversionService;

    mockedValidationService = {
      getConversionConfig: vi.fn(),
    } as unknown as MockedValidationService;

    unitConverter = new UnitConverterImpl(mockConversionService, mockedValidationService);
  });

});
