import { TagDto } from "~/app/shared/tags/dto/tag.dto";
import { InstructionDto } from "~/app/recipe/dto/instruction.dto";
import { SectionDto } from "~/app/recipe/dto/ingredients.dto";

export interface RecipeDto {
    readonly id: number;
    readonly name: string;
    readonly tags: TagDto[];
    readonly thumbnail_url: string;
    readonly description: string;
    readonly instructions: InstructionDto[];
    readonly sections: SectionDto[];
}

export interface RecipesDto {
    readonly results: RecipeDto[];
}
