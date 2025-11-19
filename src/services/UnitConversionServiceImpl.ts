import type { UnitConversionService } from "../interfaces/UnitConversionService.js";
import type { ConversionConfigRepository } from "../interfaces/ConversionConfigRepository.js";


export class UnitConversionServiceImpl implements UnitConversionService {
    private readonly conversionConfigs: ConversionConfigRepository;

    constructor(conversionConfigs: ConversionConfigRepository) {
        this.conversionConfigs = conversionConfigs;
    }

    convert(value: number, fromUnit: string, toUnit: string): number {
        const fromUnitConfig = this.conversionConfigs.getConversionConfig(fromUnit);
        const toUnitConfig = this.conversionConfigs.getConversionConfig(toUnit);

        if (!fromUnitConfig?.multiplier || !toUnitConfig?.multiplier) {
            throw new Error('Config multiplier missing.')
        }

        const inputValueInBaseUnit = (value * fromUnitConfig.multiplier) + fromUnitConfig.offset;
        const convertedValue = (inputValueInBaseUnit - toUnitConfig.offset) / toUnitConfig.multiplier;

        return convertedValue;
    }
}