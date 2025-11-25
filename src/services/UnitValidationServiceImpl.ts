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
        if (!unit) {
            return false;
        }

        const trimmedUnit = unit.trim();

        if (trimmedUnit.length < 1) {
            return false;
        }


        if (this.unitInfoRepo.getUnitInfo(unit)) {
            return true;
        } else {
            return false;
        }
    }

    isConversionPossible(value: number, unit: string): boolean {
        const unitInfo = this.unitInfoRepo.getUnitInfo(unit);

        const dimension = unitInfo?.dimension;
        const validUnit = unitInfo?.unit;

        if (dimension !== "temperature" && value < 1) {
            return false;
        }

        if (validUnit === "celsius" && value < -273 ) {
            return false;
        } else if (validUnit === "fahrenheit" && value < -459) {
            return false;
        }

        return true;
    }

    unitsHaveSameDimension(fromUnit: string, toUnit: string): boolean {
        const fromUnitInfo = this.unitInfoRepo.getUnitInfo(fromUnit);
        const toUnitInfo = this.unitInfoRepo.getUnitInfo(toUnit);

        const fromDimension = fromUnitInfo?.dimension;
        const toDimension = toUnitInfo?.dimension;

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