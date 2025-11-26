import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConversionConfigRepository } from '../src/interfaces/ConversionConfigRepository';
import { UnitConversionServiceImpl } from '../src/services/UnitConversionServiceImpl';

describe('UnitConversionService', () => {
  let mockConversionConfigRepo: ConversionConfigRepository;
  let unitConversionServiceImpl: UnitConversionServiceImpl;

  beforeEach(() => {
    mockConversionConfigRepo = {
      getConversionConfig: vi.fn(),
    };

    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'kilogram') return { multiplier: 1, offset: 0 };
      if (unit === 'pound') return { multiplier: 0.453592, offset: 0 };
      if (unit === 'kilometer') return { multiplier: 1000, offset: 0 };
      if (unit === 'meter') return { multiplier: 1, offset: 0 };
      if (unit === 'mile') return { multiplier: 1609.34, offset: 0 };
      if (unit === 'celsius') return { multiplier: 1, offset: 0 };
      if (unit === 'fahrenheit') return { multiplier: 0.55555555, offset: -17.7777777 };
      if (unit === 'liter') return { multiplier: 1, offset: 0 };
      if (unit === 'gallon') return { multiplier: 3.78541, offset: 0 };
      return undefined;
    });

    unitConversionServiceImpl = new UnitConversionServiceImpl(mockConversionConfigRepo);
  });

  it('should convert 15 miles to kilometers', () => {
    const inputValue = 15;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 1609.34;
    const toUnitMultiplier = 1000;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedLength = unitConversionServiceImpl.calculate(inputValue, 'mile', 'kilometer');

    expect(convertedLength).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 20 kilometers to miles', () => {
    const inputValue = 20;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 1000;
    const toUnitMultiplier = 1609.34;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedLength = unitConversionServiceImpl.calculate(inputValue, 'kilometer', 'mile');

    expect(convertedLength).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 70 fahrenheit to celsius', () => {
    const inputValue = 70;
    const fromUnitOffset = -17.7777777;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 0.55555555;
    const toUnitMultiplier = 1;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedTemperature = unitConversionServiceImpl.calculate(inputValue, 'fahrenheit', 'celsius');

    expect(convertedTemperature).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 28 celsius to fahrenheit', () => {
    const inputValue = 28;
    const fromUnitOffset = 0;
    const toUnitOffset = -17.7777777;
    const fromUnitMultiplier = 1;
    const toUnitMultiplier = 0.55555555;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedTemperature = unitConversionServiceImpl.calculate(inputValue, 'celsius', 'fahrenheit');

    expect(convertedTemperature).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 50 pounds to kilogram', () => {
    const inputValue = 50;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 0.453592;
    const toUnitMultiplier = 1;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedMass = unitConversionServiceImpl.calculate(inputValue, 'pound', 'kilogram');

    expect(convertedMass).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 25 kilogram to pounds', () => {
    const inputValue = 25;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 1;
    const toUnitMultiplier = 0.453592;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedMass = unitConversionServiceImpl.calculate(inputValue, 'kilogram', 'pound');

    expect(convertedMass).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 25 gallons to liter', () => {
    const inputValue = 25;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 3.78541;
    const toUnitMultiplier = 1;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedVolume = unitConversionServiceImpl.calculate(inputValue, 'gallon', 'liter');

    expect(convertedVolume).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 45 liter to gallons', () => {
    const inputValue = 45;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 1;
    const toUnitMultiplier = 3.78541;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedVolume = unitConversionServiceImpl.calculate(inputValue, 'liter', 'gallon');

    expect(convertedVolume).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should return original value when fromUnit and to toUnit are the same', () => {
    const inputValue = 25;
    const expectedValue = inputValue;
    const convertedValue = unitConversionServiceImpl.calculate(inputValue, 'meter', 'meter');

    expect(convertedValue).toBeCloseTo(expectedValue);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should throw error if config multiplier is missing', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'gallon') return { multiplier: undefined, offset: 0 };
      return undefined;
    });

    const inputValue = 45;
    const fromUnit = 'liter';
    const toUnit = 'gallon';

    expect(() => unitConversionServiceImpl.calculate(inputValue, fromUnit, toUnit)).toThrow(
      'Conversion config is missing.',
    );
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });
});
