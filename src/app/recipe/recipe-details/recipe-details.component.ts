import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '~/app/recipe/service/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '~/app/recipe/model/recipe';
import { NavigationService } from '~/app/shared/navigation/navigation.service';

@Component({
  selector: 'mm-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {

  constructor(activatedRoute: ActivatedRoute, readonly navigationService: NavigationService, private readonly recipeService: RecipeService) {
    this.id = parseInt(activatedRoute.snapshot.paramMap.get('id'));
    this.recipe$ = this.recipeService.getRecipeDetails(this.id);
  }

  readonly id: number;
  readonly recipe$: Observable<Recipe>;
}
