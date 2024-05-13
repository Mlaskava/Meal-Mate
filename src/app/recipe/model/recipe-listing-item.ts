export interface RecipeListingItem {
  readonly id: number;
  readonly name: string;
  readonly tags: string[];
  readonly imageUrl: string;
  readonly ingredientNames: string[];
}
