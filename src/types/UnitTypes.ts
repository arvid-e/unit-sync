export type Dimension = 'length' | 'volume' | 'mass' | 'temperature';

export interface UnitInfo {
  unit: string;
  dimension: Dimension;
}

export type ConversionPayload = {
  value: number;
  fromUnit: string;
  toUnit: string;
};
