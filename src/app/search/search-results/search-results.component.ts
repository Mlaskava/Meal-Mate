import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe/service/recipe.service';
import { NavigationService } from '../../navigation/navigation.service';
import { map, Observable } from 'rxjs';
import { RecipeListingItem } from '../../recipe/model/recipe-listing-item';
import { equalsIgnoreCase, isSubstring } from '../../comparision/compare-util';

@Component({
  selector: 'mm-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchFieldValue: string;
  _searchedTags: string[];

  recipes$: Observable<RecipeListingItem[]> = this.recipeService.recipeList$;

  constructor(private readonly recipeService: RecipeService, private readonly navigationService: NavigationService) {
  }

  ngOnInit() {
    this.searchFieldValue = this.navigationService.getQueryParam('searchFieldValue');
    this._searchedTags = this.navigationService.getQueryParamAsArray('searchTags');
    if (this._searchedTags.length > 0) {
      this.recipes$ = this.recipes$.pipe(map(recipes => recipes.filter(recipe =>
        this._searchedTags.every(searchedTag =>
          !!recipe.tags.find(tag => equalsIgnoreCase(tag, searchedTag)
            || !!recipe.ingredientNames.find(ingredient => equalsIgnoreCase(ingredient, searchedTag)))))));
    } else {
      this.recipes$ = this.recipes$.pipe(map(recipes => recipes.filter(recipe =>
        isSubstring(this.searchFieldValue as string, recipe.name))));
    }
  }

  set searchedTags(searchedTags: string[]) {
    if (searchedTags.length > 0) {
      this.navigationService.searchByTags(searchedTags, false, true);
    } else {
      this.navigationService.goToSearchPage('', searchedTags, true);
    }
  }

  get searchedTags(): string[] {
    return this._searchedTags;
  }

  showDetails(id: number) {
    this.navigationService.showDetailsPage(id);
  }
}