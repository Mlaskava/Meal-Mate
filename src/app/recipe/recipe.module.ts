import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RecipeListComponent } from '~/app/recipe/recipe-list/recipe-list.component';
import { AsyncPipe } from '@angular/common';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ImageCacheItModule } from '@triniwiz/nativescript-image-cache-it/angular';
import { RecipeDetailsComponent } from '~/app/recipe/recipe-details/recipe-details.component';
import { PreparationInstructionsComponent } from './preparation-instructions/preparation-instructions.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { IngredientListComponent } from '~/app/recipe/ingredient-list/ingredient-list.component';
import { SearchModule } from '~/app/search/search.module';
import { TagsModule } from '~/app/tags/tags.module';
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    PreparationInstructionsComponent,
    NutritionComponent,
    IngredientListComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [SearchModule, ImageCacheItModule, AsyncPipe, NativeScriptCommonModule, TagsModule, SharedModule],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeModule {
}
