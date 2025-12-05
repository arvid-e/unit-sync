import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { UnitConversionService } from '../src/interfaces/UnitConversionService';
import type { UnitValidationService } from '../src/interfaces/UnitValidationService';
import { UnitConverterImpl } from '../src/services/UnitConverterImpl';
import { ConversionPayload } from '../src/types/UnitTypes';

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

  const conversionPayload: ConversionPayload = {
    value,
    fromUnit,
    toUnit,
  };

  beforeEach(() => {
    mockConversionService = {
      calculate: vi.fn(),
    } as unknown as MockedConversionService;

    mockValidationService = {
      unitsAreConfigured: vi.fn(),
      isValidValue: vi.fn(),
      isValidUnit: vi.fn(),
      isConversionPossible: vi.fn(),
      unitsHaveSameDimension: vi.fn(),
    } as unknown as MockedValidationService;

    unitConverter = new UnitConverterImpl(mockConversionService, mockValidationService);

    mockValidationService.unitsAreConfigured.mockReturnValue(true);
    mockValidationService.isValidValue.mockReturnValue(true);
    mockValidationService.isValidUnit.mockReturnValue(true);
    mockValidationService.isConversionPossible.mockReturnValue(true);
    mockValidationService.unitsHaveSameDimension.mockReturnValue(true);
    mockConversionService.calculate.mockReturnValue(expectedResult);
  });

  it('should call all validation methods and perform the calculation if input is valid', () => {
    const result = unitConverter.convert(conversionPayload);

    expect(result).toBe(expectedResult);

    expect(mockValidationService.isValidValue).toHaveBeenCalledTimes(1);
    expect(mockValidationService.unitsAreConfigured).toHaveBeenCalledTimes(1);
    expect(mockValidationService.unitsHaveSameDimension).toHaveBeenCalledTimes(1);
    expect(mockValidationService.isConversionPossible).toHaveBeenCalledTimes(1);
    expect(mockConversionService.calculate).toHaveBeenCalledTimes(1);
    expect(mockConversionService.calculate).toHaveBeenCalledWith(conversionPayload);
  });

  it('should stop execution and throw error if unitsAreConfigured fails (First guard)', () => {
    mockValidationService.unitsAreConfigured.mockReturnValue(false);

    expect(() => unitConverter.convert(conversionPayload)).toThrow('Conversion configuration not found.');

    expect(mockValidationService.unitsAreConfigured).toHaveBeenCalledTimes(1);
    expect(mockValidationService.isValidValue).not.toHaveBeenCalled();
    expect(mockValidationService.isConversionPossible).not.toHaveBeenCalled();
    expect(mockValidationService.unitsHaveSameDimension).not.toHaveBeenCalled();
    expect(mockConversionService.calculate).not.toHaveBeenCalled();
  });

  it('should stop execution and throw error if isValidValue fails (Second guard)', () => {
    mockValidationService.isValidValue.mockReturnValue(false);

    expect(() => unitConverter.convert(conversionPayload)).toThrow('Value to convert is invalid.');

    expect(mockValidationService.unitsAreConfigured).toHaveBeenCalledTimes(1);
    expect(mockValidationService.isValidValue).toHaveBeenCalledTimes(1);
    expect(mockValidationService.isConversionPossible).not.toHaveBeenCalled();
    expect(mockValidationService.unitsHaveSameDimension).not.toHaveBeenCalled();
    expect(mockConversionService.calculate).not.toHaveBeenCalled();
  });

  it('should stop execution and throw error if isConversionPossible fails (Third guard)', () => {
    mockValidationService.isConversionPossible.mockReturnValue(false);

    expect(() => unitConverter.convert(conversionPayload)).toThrow('Unit has an impossible value.');

    expect(mockValidationService.unitsAreConfigured).toHaveBeenCalledTimes(1);
    expect(mockValidationService.isValidValue).toHaveBeenCalledTimes(1);
    expect(mockValidationService.isConversionPossible).toHaveBeenCalledTimes(1);
    expect(mockValidationService.unitsHaveSameDimension).not.toHaveBeenCalled();
    expect(mockConversionService.calculate).not.toHaveBeenCalled();
  });

  it('should stop execution and throw error if unitsHaveSameDimension fails (Fourth guard)', () => {
    mockValidationService.unitsHaveSameDimension.mockReturnValue(false);

    expect(() => unitConverter.convert(conversionPayload)).toThrow('Unit must be of the same dimension.');

    expect(mockValidationService.unitsAreConfigured).toHaveBeenCalledTimes(1);
    expect(mockValidationService.isValidValue).toHaveBeenCalledTimes(1);
    expect(mockValidationService.isConversionPossible).toHaveBeenCalledTimes(1);
    expect(mockValidationService.unitsHaveSameDimension).toHaveBeenCalledTimes(1);
    expect(mockConversionService.calculate).not.toHaveBeenCalled();
  });
});
