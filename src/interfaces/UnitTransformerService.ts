import type { UnitInfo } from "../types/UnitTypes.js";

export interface UnitTransformerService {
    transform(value: number, fromUnit: UnitInfo, toUnit: UnitInfo): number;
}