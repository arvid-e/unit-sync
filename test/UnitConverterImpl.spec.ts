import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { UnitConversionService } from '../src/interfaces/UnitConversionService';
import type { UnitValidationService } from '../src/interfaces/UnitValidationService';
import { UnitConverterImpl } from '../src/services/UnitConverterImpl';

type MockedConversionService = UnitConversionService & { calculate: ReturnType<typeof vi.fn> };
type MockedValidationService = UnitValidationService & {
  unitsAreConfigured: ReturnType<typeof vi.fn>;
  isValidValue: ReturnType<typeof vi.fn>;
  isValidUnit: ReturnType<typeof vi.fn>;
  isConversionPossible: ReturnType<typeof vi.fn>;
  unitsHaveSameDimension: ReturnType<typeof vi.fn>;
};

describe('UnitConverter', () => {
  let mockConversionService: MockedConversionService;
  let mockValidationService: MockedValidationService;
  let unitConverter: UnitConverterImpl;

  const fromUnit = 'yard';
  const toUnit = 'kilometer';
  const value = 200;
  const expectedResult = 0.18288;

  beforeEach(() => {
    mockConversionService = {
      calculate: vi.fn(),
    } as unknown as MockedConversionService;

    mockValidationService = {
      getConversionConfig: vi.fn(),
    } as unknown as MockedValidationService;

    unitConverter = new UnitConverterImpl(mockConversionService, mockValidationService);

    mockValidationService.unitsAreConfigured.mockReturnValue(true);
    mockValidationService.isValidValue.mockReturnValue(true);
    mockValidationService.isValidUnit.mockReturnValue(true);
    mockValidationService.isConversionPossible.mockReturnValue(true);
    mockValidationService.unitsHaveSameDimension.mockReturnValue(true);
    mockConversionService.calculate.mockReturnValue(expectedResult);
  });


});
