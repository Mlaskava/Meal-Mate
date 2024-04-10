import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RecipeListComponent } from "~/app/recipe/recipe-list/recipe-list.component";
import { AsyncPipe } from "@angular/common";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { ImageCacheItModule } from "@triniwiz/nativescript-image-cache-it/angular";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [RecipeListComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [SharedModule, ImageCacheItModule, AsyncPipe, NativeScriptCommonModule],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeModule {
}
