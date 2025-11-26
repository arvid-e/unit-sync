export interface UnitConverter {
  convert(value: number, fromUnit: string, toUnit: string): number;
}
