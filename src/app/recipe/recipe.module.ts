import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RecipeListComponent } from '~/app/recipe/recipe-list/recipe-list.component';
import { AsyncPipe } from '@angular/common';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ImageCacheItModule } from '@triniwiz/nativescript-image-cache-it/angular';
import { RecipeDetailsComponent } from '~/app/recipe/recipe-details/recipe-details.component';
import { ImageComponent } from './image/image.component';
import { RecipeDetailsHeaderComponent } from './recipe-details-header/recipe-details-header.component';
import { PreparationInstructionsComponent } from './preparation-instructions/preparation-instructions.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { ServingPickerComponent } from '~/app/recipe/serving-picker/serving-picker.component';
import { IngredientListComponent } from '~/app/recipe/ingredient-list/ingredient-list.component';
import { SearchModule } from '~/app/search/search.module';
import { TagsListComponent } from '~/app/tags/tags-list/tags-list.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    ImageComponent,
    RecipeDetailsHeaderComponent,
    PreparationInstructionsComponent,
    NutritionComponent,
    ServingPickerComponent,
    IngredientListComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [SearchModule, ImageCacheItModule, AsyncPipe, NativeScriptCommonModule, TagsListComponent],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeModule {
}
