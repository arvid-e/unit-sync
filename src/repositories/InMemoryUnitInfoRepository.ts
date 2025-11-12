import type { UnitInfo } from "../types/UnitTypes.js";
import type { UnitInfoRepository } from "../interfaces/UnitInfoRepository.js";

export class InMemoryUnitInfoRepository implements UnitInfoRepository {
  private unitMap: Map<string, UnitInfo> = new Map([
    
    // Length
    ["kilometer", { unit: "kilometer", dimension: "length" }],
    ["meter", { unit: "meter", dimension: "length" }],
    ["centimeter", { unit: "centimeter", dimension: "length" }],
    ["millimeter", { unit: "millimeter", dimension: "length" }],
    ["mile", { unit: "mile", dimension: "length" }],
    ["foot", { unit: "foot", dimension: "length" }],
    ["inch", { unit: "inch", dimension: "length" }],
    ["yard", { unit: "yard", dimension: "length" }],

    // Temperature
    ["celsius", { unit: "celsius", dimension: "temperature" }],
    ["fahrenheit", { unit: "fahrenheit", dimension: "temperature" }],
    ["kelvin", { unit: "kelvin", dimension: "temperature" }],

    // Mass
    ["kilogram", { unit: "kilogram", dimension: "mass" }],
    ["gram", { unit: "gram", dimension: "mass" }],
    ["milligram", { unit: "milligram", dimension: "mass" }],
    ["pound", { unit: "pound", dimension: "mass" }],
    ["ounce", { unit: "ounce", dimension: "mass" }],

    // Volume
    ["liter", { unit: "liter", dimension: "volume" }],
    ["milliliter", { unit: "milliliter", dimension: "volume" }],
    ["gallon", { unit: "gallon", dimension: "volume" }],
    ["quart", { unit: "quart", dimension: "volume" }],
    ["pint", { unit: "pint", dimension: "volume" }],
    ["fluid_ounce", { unit: "fluid_ounce", dimension: "volume" }],
  ]);

  public getUnitInfo(unit: string): UnitInfo | undefined {
    return this.unitMap.get(unit.toLowerCase());
  }
}
