import { Component, OnInit } from '@angular/core';
import { RecipeService } from '~/app/recipe/service/recipe.service';
import { NavigationService } from '~/app/shared/navigation/navigation.service';
import { map, Observable } from 'rxjs';
import { RecipeListingItem } from '~/app/recipe/model/recipe-listing-item';
import { equalsIgnoreCase, isSubstring } from '~/app/shared/comparision/compare-util';

@Component({
  selector: 'mm-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  readonly Array = Array;

  _searchedValue: string | string[];

  recipes$: Observable<RecipeListingItem[]> = this.recipeService.recipeList$;

  constructor(private readonly recipeService: RecipeService, private readonly navigationService: NavigationService) {
  }

  ngOnInit() {
    this.searchedValue = this.navigationService.getQueryParam('searchValue');
  }

  set searchedValue(searchValue: string[] | string) {
    this._searchedValue = searchValue;
    this.reapplyFilters();
  }

  get searchedValue() {
    return this._searchedValue;
  }

  reapplyFilters() {
    if (!!this._searchedValue) {
      this.recipes$ = this.recipes$.pipe(map(recipes => {
        if (Array.isArray(this._searchedValue)) {
          if (this._searchedValue.length > 0) {
            return recipes.filter(recipe => (this._searchedValue as string[]).every(searchedTag =>
              !!recipe.tags.find(tag => equalsIgnoreCase(tag, searchedTag)
                || !!recipe.ingredientNames.find(ingredient => equalsIgnoreCase(ingredient, searchedTag)))));
          } else {
            this.navigationService.goToSearchPage([]);
          }
        } else {
          return recipes.filter(recipe => {
            return isSubstring(this._searchedValue as string, recipe.name);
          });
        }
      }));
    }
  }

  getSearchFieldValue() {
    return Array.isArray(this._searchedValue) ? '' : this._searchedValue;
  }

  showDetails(id: number) {
    this.navigationService.showDetailsPage(id);
  }
}
