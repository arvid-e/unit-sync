export interface UnitConversionService {
  calculate(value: number, fromUnit: string, toUnit: string): number;
}
