import type { ConversionConfigRepository } from "../interfaces/ConversionConfigRepository.js";
import type { UnitInfoRepository } from "../interfaces/UnitInfoRepository.js";
import type { UnitValidationService } from "../interfaces/UnitValidationService.js";

export class UnitValidationServiceImpl implements UnitValidationService{
    unitInfoRepo: UnitInfoRepository;
    conversionConfigRepo: ConversionConfigRepository;

    constructor(unitInfoRepo: UnitInfoRepository ,conversionConfigRepo: ConversionConfigRepository) {
        this.unitInfoRepo = unitInfoRepo;
        this.conversionConfigRepo = conversionConfigRepo;
    }

    isValidValue(value: number): boolean {
        if (isNaN(value) || value === 0 || value === Infinity) {
            return false;
        } else {
            return true;
        }
    }

    isValidUnit(unit: string): boolean {
        return false;
    }

    isConversionPossible(value: number, dimension: string): boolean {
        return false;
    }

    unitsHaveSameDimension(fromUnit: string, toUnit: string): boolean {
        return false;
    }

    unitsAreConfigured(fromUnit: string, toUnit: string): boolean {
        return false;
    }








}