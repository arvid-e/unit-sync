import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UnitConversionServiceImpl } from '../src/services/UnitConversionServiceImpl';
import { ConversionConfigRepository } from '../src/interfaces/ConversionConfigRepository';

describe('UnitConversionService', () => {
  let mockConversionConfigRepo: ConversionConfigRepository;
  let unitConversionServiceImpl: UnitConversionServiceImpl;

  beforeEach(() => {
    mockConversionConfigRepo = {
      getConversionConfig: vi.fn(),
    };

    unitConversionServiceImpl = new UnitConversionServiceImpl(mockConversionConfigRepo);
  });

  it('should convert 15 miles to kilometers', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'kilometer') return { multiplier: 1000, offset: 0 };
      if (unit === 'mile') return { multiplier: 1609.34, offset: 0 };
      return undefined;
    });

    const inputValue = 15;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 1609.34;
    const toUnitMultiplier = 1000;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedLength = unitConversionServiceImpl.convert(inputValue, 'mile', 'kilometer');

    expect(convertedLength).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 20 kilometers to miles', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'kilometer') return { multiplier: 1000, offset: 0 };
      if (unit === 'mile') return { multiplier: 1609.34, offset: 0 };
      return undefined;
    });

    const inputValue = 20;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 1000;
    const toUnitMultiplier = 1609.34;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedLength = unitConversionServiceImpl.convert(inputValue, 'kilometer', 'mile');

    expect(convertedLength).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 70 fahrenheit to celsius', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'celsius') return { multiplier: 1, offset: 0 };
      if (unit === 'fahrenheit') return { multiplier: 0.55555555, offset: -17.7777777 };
      return undefined;
    });

    const inputValue = 70;
    const fromUnitOffset = -17.7777777;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 0.55555555;
    const toUnitMultiplier = 1;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedTemperature = unitConversionServiceImpl.convert(inputValue, 'fahrenheit', 'celsius');

    expect(convertedTemperature).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 28 celsius to fahrenheit', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'celsius') return { multiplier: 1, offset: 0 };
      if (unit === 'fahrenheit') return { multiplier: 0.55555555, offset: -17.7777777 };
      return undefined;
    });

    const inputValue = 28;
    const fromUnitOffset = 0;
    const toUnitOffset = -17.7777777;
    const fromUnitMultiplier = 1;
    const toUnitMultiplier = 0.55555555;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedTemperature = unitConversionServiceImpl.convert(inputValue, 'celsius', 'fahrenheit');

    expect(convertedTemperature).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 50 pounds to kilogram', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'kilogram') return { multiplier: 1, offset: 0 };
      if (unit === 'pound') return { multiplier: 0.453592, offset: 0 };
      return undefined;
    });

    const inputValue = 50;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 0.453592;
    const toUnitMultiplier = 1;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedMass = unitConversionServiceImpl.convert(inputValue, 'pound', 'kilogram');

    expect(convertedMass).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 25 kilogram to pounds', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'kilogram') return { multiplier: 1, offset: 0 };
      if (unit === 'pound') return { multiplier: 0.453592, offset: 0 };
      return undefined;
    });

    const inputValue = 25;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 1;
    const toUnitMultiplier = 0.453592;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedMass = unitConversionServiceImpl.convert(inputValue, 'kilogram', 'pound');

    expect(convertedMass).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 25 gallons to liter', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'liter') return { multiplier: 1, offset: 0 };
      if (unit === 'gallon') return { multiplier: 3.78541, offset: 0 };
      return undefined;
    });

    const inputValue = 25;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 3.78541;
    const toUnitMultiplier = 1;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedVolume = unitConversionServiceImpl.convert(inputValue, 'gallon', 'liter');

    expect(convertedVolume).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should convert 45 liter to gallons', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'liter') return { multiplier: 1, offset: 0 };
      if (unit === 'gallon') return { multiplier: 3.78541, offset: 0 };
      return undefined;
    });

    const inputValue = 45;
    const fromUnitOffset = 0;
    const toUnitOffset = 0;
    const fromUnitMultiplier = 1;
    const toUnitMultiplier = 3.78541;

    const inputValueInBaseUnit = inputValue * fromUnitMultiplier + fromUnitOffset;
    const expectedResult = (inputValueInBaseUnit - toUnitOffset) / toUnitMultiplier;

    const convertedVolume = unitConversionServiceImpl.convert(inputValue, 'liter', 'gallon');

    expect(convertedVolume).toBeCloseTo(expectedResult);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });

  it('should return original value when fromUnit and to toUnit are the same', () => {
    (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
      if (unit === 'meter') return { multiplier: 1, offset: 0 };
      return undefined;
    });

    const inputValue = 25;
    const expectedValue = inputValue;
    const convertedValue = unitConversionServiceImpl.convert(inputValue, 'meter', 'meter');

    expect(convertedValue).toBeCloseTo(expectedValue);
    expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
  });
});
