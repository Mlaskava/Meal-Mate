import { Ingredient } from "~/app/recipe/model/ingredient";

export interface Recipe {
    readonly id: number;
    readonly name: string;
    readonly tags: Tag[];
    readonly imageUrl: string;
    readonly description: string;
    readonly instructions: string[];
    readonly ingredients: Ingredient[];
}

export interface Tag {
    name: string;
    type: string;
}