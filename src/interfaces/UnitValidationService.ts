export interface UnitValidationService {
    isValidValue(value: number): boolean;
    isValidUnit(unit: string): boolean;
    isConversionPossible(value: number, dimension: string): boolean;
    unitsAreConfigured(fromUnit: string, toUnit: string): boolean;
    unitsHaveSameDimension(fromUnit: string, toUnit: string): boolean;
}


