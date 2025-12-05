import type { UnitConversionService } from '../interfaces/UnitConversionService.js';
import type { UnitConverter } from '../interfaces/UnitConverter.js';
import type { UnitValidationService } from '../interfaces/UnitValidationService.js';
import type { ConversionPayload } from '../types/UnitTypes.js';

export class UnitConverterImpl implements UnitConverter {
  unitConversionService: UnitConversionService;
  unitValidationService: UnitValidationService;

  constructor(unitConversionService: UnitConversionService, unitValidationService: UnitValidationService) {
    this.unitConversionService = unitConversionService;
    this.unitValidationService = unitValidationService;
  }

  convert(conversionPayload: ConversionPayload): number {
    this.validate(conversionPayload);

    return this.unitConversionService.calculate(conversionPayload);
  }

  validate(conversionPayload: ConversionPayload): void {
    const { value, fromUnit, toUnit } = conversionPayload;
    
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
