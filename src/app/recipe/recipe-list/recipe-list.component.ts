import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '~/app/recipe/model/recipe';
import { RecipeService } from '~/app/recipe/service/recipe.service';
import { NavigationService } from '~/app/shared/navigation/navigation.service';

@Component({
  selector: 'mm-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  constructor(recipeService: RecipeService, private readonly navigationService: NavigationService) {
    this.recipes$ = recipeService.recipeList$;
  }

  @Input()
  protected recipes$: Observable<Recipe[]>;

  showDetails(id: number) {
    this.navigationService.showDetailsPage(id);
  }
}
