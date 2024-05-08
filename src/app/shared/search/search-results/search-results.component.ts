import { Component } from '@angular/core';
import { RecipeService } from '~/app/recipe/service/recipe.service';
import { NavigationService } from '~/app/shared/navigation/navigation.service';
import { map, Observable } from 'rxjs';
import { Recipe } from '~/app/recipe/model/recipe';

@Component({
  selector: 'mm-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  searchFieldValue: string;
  searchTagValues: string[];

  constructor(recipeService: RecipeService, private readonly navigationService: NavigationService) {
    const filteringParam = this.navigationService.getQueryParam('searchValue');
    this.recipes$ = recipeService.recipeList$.pipe(map(recipes =>
      !!filteringParam ? this.filterRecipes(recipes, filteringParam) : recipes));
  }

  private filterRecipes(recipes: Recipe[], filterValue: string | string[]): Recipe[] {
    if (Array.isArray(filterValue)) {
      this.searchTagValues = filterValue;
      return recipes.filter(recipe => filterValue.some(searchedIngredientOrTag =>
        !!recipe.tags.find(tag => tag.name === searchedIngredientOrTag) ||
        !!recipe.ingredients.find(ingredient => ingredient.name === searchedIngredientOrTag)));
    } else {
      this.searchFieldValue = filterValue;
      return recipes.filter(recipe => this.isAnySubstringOfOther(recipe.name, filterValue));
    }
  }

  private isAnySubstringOfOther(string1: string, string2: string): boolean {
    return string1?.toUpperCase().includes(string2?.toUpperCase()) || string2?.toUpperCase().includes(string1?.toUpperCase());
  }

  protected recipes$: Observable<Recipe[]>;

  showDetails(id: number) {
    this.navigationService.showDetailsPage(id);
  }
}
