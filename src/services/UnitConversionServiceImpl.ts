import type { ConversionConfigRepository } from '../interfaces/ConversionConfigRepository.js';
import type { UnitConversionService } from '../interfaces/UnitConversionService.js';
import type { ConversionPayload } from '../types/UnitTypes.js';

export class UnitConversionServiceImpl implements UnitConversionService {
  private readonly conversionConfigs: ConversionConfigRepository;

  constructor(conversionConfigs: ConversionConfigRepository) {
    this.conversionConfigs = conversionConfigs;
  }

  calculate(conversionPayload: ConversionPayload): number {
    const { value, fromUnit, toUnit } = conversionPayload;
    const fromUnitConfig = this.conversionConfigs.getConversionConfig(fromUnit);
    const toUnitConfig = this.conversionConfigs.getConversionConfig(toUnit);

    if (!fromUnitConfig?.multiplier || !toUnitConfig?.multiplier) {
      throw new Error('Conversion config is missing.');
    }

    const inputValueInBaseUnit = value * fromUnitConfig.multiplier + fromUnitConfig.offset;
    const convertedValue = (inputValueInBaseUnit - toUnitConfig.offset) / toUnitConfig.multiplier;

    return convertedValue;
  }
}
