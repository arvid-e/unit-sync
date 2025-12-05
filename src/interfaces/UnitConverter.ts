import type { ConversionPayload } from "../types/UnitTypes.js";

export interface UnitConverter {
  convert(conversionPayload: ConversionPayload): number;
}
