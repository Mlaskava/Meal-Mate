import { Component } from '@angular/core';
import { TagsService } from '~/app/tags/tags.service';
import { RecipeService } from '~/app/recipe/service/recipe.service';

@Component({
  selector: 'mm-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(tagsService: TagsService, recipeService: RecipeService) {
    recipeService.refreshRecipes();
    tagsService.tagList$.subscribe() //Preload, in order to minimize loading time later
  }
}
