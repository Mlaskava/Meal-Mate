import { Ingredient } from './ingredient';
import { Nutrition } from '~/app/recipe/model/nutrition';

export interface Recipe {
  readonly id: number;
  readonly name: string;
  readonly tags: string[];
  readonly imageUrl: string;
  readonly description: string;
  readonly instructions: string[];
  readonly ingredients: Ingredient[];
  servings: number;
  readonly nutritionInformation: Nutrition;
}
