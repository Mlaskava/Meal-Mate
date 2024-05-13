import { Ingredient } from './ingredient';

export interface Recipe {
  readonly id: number;
  readonly name: string;
  readonly tags: string[];
  readonly imageUrl: string;
  readonly description: string;
  readonly instructions: string[];
  readonly ingredients: Ingredient[];
}
