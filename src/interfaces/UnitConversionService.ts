export interface UnitConversionService {
    convert(value: number, fromUnit: string, toUnit: string): number;
}