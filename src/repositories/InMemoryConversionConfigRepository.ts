import type { ConversionConfigRepository, ConversionConfig } from '../interfaces/ConversionConfigRepository.js';

export class InMemoryConversionConfigRepository implements ConversionConfigRepository {
  private conversionMap: Map<string, ConversionConfig> = new Map([
    // Length (Base: Meter)
    ['kilometer', { multiplier: 1000, offset: 0 }],
    ['meter', { multiplier: 1, offset: 0 }],
    ['centimeter', { multiplier: 0.01, offset: 0 }],
    ['millimeter', { multiplier: 0.001, offset: 0 }],
    ['mile', { multiplier: 1609.34, offset: 0 }],
    ['yard', { multiplier: 0.9144, offset: 0 }],
    ['foot', { multiplier: 0.3048, offset: 0 }],
    ['inch', { multiplier: 0.0254, offset: 0 }],

    // Temperature (Base: Celsius) (
    ['celsius', { multiplier: 1, offset: 0 }],
    ['fahrenheit', { multiplier: 0.55555555, offset: -17.7777777 }],
    ['kelvin', { multiplier: 1, offset: -273.15 }],

    // Volume (Base: Liter)
    ['liter', { multiplier: 1, offset: 0 }],
    ['milliliter', { multiplier: 0.001, offset: 0 }],
    ['gallon', { multiplier: 3.78541, offset: 0 }],
    ['quart', { multiplier: 0.946353, offset: 0 }],
    ['pint', { multiplier: 0.473176, offset: 0 }],
    ['fluid_ounce', { multiplier: 0.0295735, offset: 0 }],
    ['cup', { multiplier: 0.236588, offset: 0 }],

    // Mass (Base: Kilogram)
    ['kilogram', { multiplier: 1, offset: 0 }],
    ['gram', { multiplier: 0.001, offset: 0 }],
    ['milligram', { multiplier: 0.000001, offset: 0 }],
    ['pound', { multiplier: 0.453592, offset: 0 }],
    ['ounce', { multiplier: 0.0283495, offset: 0 }],
  ]);

  getConversionConfig(toUnit: string): ConversionConfig | undefined {
    return this.conversionMap.get(toUnit.toLowerCase());
  }
}
