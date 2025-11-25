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
        return isNaN(value) || value === 0 || value === Infinity ? false : true;
    }

    isValidUnit(unit: string): boolean {
        if (!unit || unit.trim().length === 0) {
            return false;
        }

        return !!this.unitInfoRepo.getUnitInfo(unit);
    }

    isConversionPossible(value: number, unit: string): boolean {
        const celsiusAbsoluteZero = -273.15;
        const fahrenheitAbsoluteZero = -459.67;

        const unitInfo = this.unitInfoRepo.getUnitInfo(unit);

        if (!unitInfo) {
            return false;
        }

        const { dimension, unit: canonicalUnit } = unitInfo;

        if (dimension !== "temperature" && value <= 0) {
            return false;
        }

        if (canonicalUnit === "celsius" && value < celsiusAbsoluteZero) {
            return false;
        } 
        
        if (canonicalUnit === "fahrenheit" && value < fahrenheitAbsoluteZero) {
            return false;
        }

        return true;
    }

    unitsHaveSameDimension(fromUnit: string, toUnit: string): boolean {
        const fromUnitInfo = this.unitInfoRepo.getUnitInfo(fromUnit);
        const toUnitInfo = this.unitInfoRepo.getUnitInfo(toUnit);

        const fromDimension = fromUnitInfo?.dimension;
        const toDimension = toUnitInfo?.dimension;

        if (!fromDimension || !toDimension) {
            return false;
        }

        if (fromDimension !== toDimension) {
            return false;
        }

        return true;
    }

    unitsAreConfigured(fromUnit: string, toUnit: string): boolean {
        const fromUnitInfo = this.unitInfoRepo.getUnitInfo(fromUnit);
        const toUnitInfo = this.unitInfoRepo.getUnitInfo(toUnit);

        const fromUnitConfig = this.conversionConfigRepo.getConversionConfig(fromUnit);
        const toUnitConfig = this.conversionConfigRepo.getConversionConfig(toUnit);

        if (!fromUnitInfo || !toUnitInfo || !fromUnitConfig || !toUnitConfig) {
            return false;
        }

        return true;
    }








}