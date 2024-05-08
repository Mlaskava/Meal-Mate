import { Ingredient } from '~/app/recipe/model/ingredient';
import { Tag } from '~/app/recipe/model/tag';

export interface Recipe {
  readonly id: number;
  readonly name: string;
  readonly tags: Tag[];
  readonly imageUrl: string;
  readonly description: string;
  readonly instructions: string[];
  readonly ingredients: Ingredient[];
}
