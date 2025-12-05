import type { ConversionPayload } from "../types/UnitTypes.js";

export interface UnitConversionService {
  calculate(conversionPayload: ConversionPayload): number;
}
