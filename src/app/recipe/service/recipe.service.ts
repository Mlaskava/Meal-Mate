import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { RecipeDto, RecipesDto } from "../dto/recipe.dto";
import { Recipe } from "~/app/recipe/model/recipe";
import { MeasurementDto } from "~/app/recipe/dto/ingredients.dto";

import mockedResponse from '../../assets/mocked-recipes.response.json';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    constructor(private readonly httpClient: HttpClient) {
    }

    readonly USED_MEASUREMENT_SYSTEMS = ['metric', 'none'];

    private _recipeList$: Observable<Recipe[]>;

    private getMockedResponse(): Observable<Recipe[]> {
        return of(mockedResponse)
            .pipe(map(recipesDto => recipesDto.results.map(recipeDto => this.convertToRecipe(recipeDto))));
    }

    private getRealResponse(): Observable<Recipe[]> {
        return this.httpClient.get<RecipesDto>('recipes/list', {
            params: {
                from: '0',
                size: '20',
                tags: ''
            }
        }).pipe(map(recipesDto => recipesDto.results.map(recipeDto => this.convertToRecipe(recipeDto))));
    }

    get recipeList$(): Observable<Recipe[]> {
        this._recipeList$ = this.getMockedResponse();
        return this._recipeList$;
    }

    getRecipeDetails(id: number): Observable<Recipe> {
        return this.recipeList$.pipe(map(recipes => recipes.find(recipe => recipe.id === id)));
    }

    private convertToRecipe(recipeDto: RecipeDto) {
        return {
            id: recipeDto.id,
            name: recipeDto.name,
            tags: recipeDto.tags.map(tag => ({name: tag.display_name, type: tag.root_tag_type})),
            imageUrl: recipeDto.thumbnail_url,
            description: recipeDto.description,
            instructions: recipeDto.instructions.map(instruction => instruction.display_text),
            ingredients: recipeDto.sections
                .flatMap(section => section.components
                    .map(component => ({
                        name: component.ingredient.name,
                        nameSingular: component.ingredient.display_singular,
                        namePlural: component.ingredient.display_plural,
                        quantity: parseInt(this.getMeasurement(component.measurements).quantity),
                        unit: this.getMeasurement(component.measurements).unit.name,
                        unitShort: this.getMeasurement(component.measurements).unit.abbreviation,
                        unitPlural: this.getMeasurement(component.measurements).unit.display_plural,
                        unitSingular: this.getMeasurement(component.measurements).unit.display_singular
                    })))
        };
    }

    private getMeasurement(measurements: MeasurementDto[]): MeasurementDto {
        const measurementResult = measurements.filter(measurement => this.USED_MEASUREMENT_SYSTEMS.includes(measurement?.unit?.system));
        if (measurementResult.length > 0) {
            return measurementResult[0];
        } else {
            //TODO: Convert from imperial to metric
            return {
                quantity: '0',
                unit: {abbreviation: '', display_plural: '', display_singular: '', name: '', system: ''}
            };
        }

    }
}
