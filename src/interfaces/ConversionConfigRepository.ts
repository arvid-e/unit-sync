export interface ConversionConfig {
    multiplier: number;
    offset: number;
}

export interface ConversionConfigRepository {
    getConversionConfig(unit: string): ConversionConfig | undefined;
}