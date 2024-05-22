import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RecipeListComponent } from '~/app/recipe/recipe-list/recipe-list.component';
import { AsyncPipe } from '@angular/common';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ImageCacheItModule } from '@triniwiz/nativescript-image-cache-it/angular';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailsComponent } from '~/app/recipe/recipe-details/recipe-details.component';
import { ImageComponent } from './image/image.component';
import { RecipeDetailsHeaderComponent } from './recipe-details-header/recipe-details-header.component';

@NgModule({
  declarations: [RecipeListComponent, RecipeDetailsComponent, ImageComponent, RecipeDetailsHeaderComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [SharedModule, ImageCacheItModule, AsyncPipe, NativeScriptCommonModule],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeModule {
}
