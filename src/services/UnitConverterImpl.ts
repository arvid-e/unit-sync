import type { UnitConversionService } from '../interfaces/UnitConversionService.js';
import type { UnitConverter } from '../interfaces/UnitConverter.js';
import type { UnitValidationService } from '../interfaces/UnitValidationService.js';

export class UnitConverterImpl implements UnitConverter {
  unitConversionService: UnitConversionService;
  unitValidationService: UnitValidationService;

  constructor(unitConversionService: UnitConversionService, unitValidationService: UnitValidationService) {
    this.unitConversionService = unitConversionService;
    this.unitValidationService = unitValidationService;
  }

  convert(value: number, fromUnit: string, toUnit: string): number {
    const unitsAreConfigured = this.unitValidationService.unitsAreConfigured(fromUnit, toUnit);

    const valueIsValid = this.unitValidationService.isValidValue(value);

    const conversionIsPossible = this.unitValidationService.isConversionPossible(value, fromUnit);

    const unitsHaveSameDimension = this.unitValidationService.unitsHaveSameDimension(fromUnit, toUnit);

    return this.unitConversionService.calculate(value, fromUnit, toUnit);
  }
}
