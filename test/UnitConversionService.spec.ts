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
    })


    it('should convert 15 miles to kilometers', () => {
        (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
            if (unit === 'kilometer') return { multiplier: 1000, offset: 0 };
            if (unit === 'mile') return { multiplier: 1609.34, offset: 0 };
            return undefined;
        })

        const inputValue = 15;
        const expectedResult = (inputValue * 1609.34) * (1 / 1000); 
        const convertedLength = unitConversionServiceImpl.convert(inputValue, 'mile', 'kilometer')

        expect(convertedLength).toBeCloseTo(expectedResult);
        expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
    })

    it('should convert 70 fahrenheit to celsius', () => {
        (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
            if (unit === 'celsius') return { multiplier: 1, offset: 0 };
            if (unit === 'fahrenheit') return { multiplier: 0.55555555, offset: -17.7777777 };
            return undefined;
        })

        const inputValue = 70;
        const expectedResult = (inputValue * 0.55555555) + -17.7777777;
        const convertedTemperature = unitConversionServiceImpl.convert(inputValue, 'fahrenheit', 'celsius');

        expect(convertedTemperature).toBeCloseTo(expectedResult);
        expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
    })

    it('should convert 50 pounds to kilogram', () => {
        (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
            if (unit === 'kilogram') return { multiplier: 1, offset: 0 };
            if (unit === 'pound') return { multiplier: 0.453592, offset: 0 };
            return undefined;
        })

        const inputValue = 50;
        const expectedResult = inputValue * 0.453592;
        const convertedMass = unitConversionServiceImpl.convert(inputValue, 'pound', 'kilogram');

        expect(convertedMass).toBeCloseTo(expectedResult);
        expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
    })

    it('should convert 25 gallons to liter', () => {
        (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
            if (unit === 'liter') return { multiplier: 1, offset: 0 };
            if (unit === 'gallon') return { multiplier: 3.78541, offset: 0 };
            return undefined;
        })

        const inputValue = 25;
        const expectedResult = inputValue * 3.78541;
        const convertedVolume = unitConversionServiceImpl.convert(inputValue, 'gallon', 'liter');

        expect(convertedVolume).toBeCloseTo(expectedResult);
        expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
    })

    it('should return original value when fromUnit and to toUnit are the same', () => {
        (mockConversionConfigRepo.getConversionConfig as any).mockImplementation((unit: string) => {
            if (unit === 'meter') return { multiplier: 1, offset: 0 };
            return undefined;
        })

        const inputValue = 25;
        const expectedValue = inputValue;
        const convertedValue = unitConversionServiceImpl.convert(inputValue, 'meter', 'meter');

        expect(convertedValue).toBeCloseTo(expectedValue);
        expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
    })
})