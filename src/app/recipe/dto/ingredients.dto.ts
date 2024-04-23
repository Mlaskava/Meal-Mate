export interface SectionDto {
    components: ComponentDto[];
}

export interface ComponentDto {
    ingredient: IngredientDto;
    measurements: MeasurementDto[];
}

export interface IngredientDto {
    name: string;
    display_plural: string;
    display_singular: string;
}

export interface MeasurementDto {
    quantity: string;
    unit: UnitDto;
}

export interface UnitDto {
    abbreviation: string;
    display_plural: string;
    display_singular: string;
    name: string;
    system: string;
}