import type { UnitInfo } from "../types/UnitTypes.js";

export interface UnitInfoRepository {
    getUnitInfo(unit: string): UnitInfo | undefined;
}
