export interface ConversionConfig {
    multiplier: number;
    offset: number;
}

export interface ConversionConfigRepository {
    getConversionConfig(toUnit: string): ConversionConfig | undefined;
}