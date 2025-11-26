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
    this.validate(value, fromUnit, toUnit);

    return this.unitConversionService.calculate(value, fromUnit, toUnit);
  }

  validate(value: number, fromUnit: string, toUnit: string): void {
    if (!this.unitValidationService.unitsAreConfigured(fromUnit, toUnit)) {
      throw new Error('Conversion configuration not found.');
    }

    if (!this.unitValidationService.isValidValue(value)) {
      throw new Error('Value to convert is invalid.');
    }

    if (!this.unitValidationService.isConversionPossible(value, fromUnit)) {
      throw new Error('Unit has an impossible value.');
    }

    if (!this.unitValidationService.unitsHaveSameDimension(fromUnit, toUnit)) {
      throw new Error('Unit must be of the same dimension.');
    }
  }
}
