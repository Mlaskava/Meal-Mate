import { Tag } from "../../shared/dto/tag.dto";

export class RecipeDto {
  readonly name: string;
  readonly tags: Tag[]
  readonly thumbnail_url: string;
  readonly description: string;
}

export class RecipesDto {
  readonly results: RecipeDto[];
}
