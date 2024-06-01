import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecipeListingItem } from '../../recipe/model/recipe-listing-item';
import { RecipeService } from '../../recipe/service/recipe.service';
import { TagsService } from '../../tags/tags.service';
import { NavigationService } from '../../navigation/navigation.service';
import { isSubstring } from '../../comparision/compare-util';

@Component({
  selector: 'mm-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  @Input()
  _searchType: 'recipes' | 'tags';

  //TODO maybe simplify obtaining searchType(base it on tags length)

  get searchType() {
    return this._searchType;
  }

  set searchType(searchType: 'recipes' | 'tags') {
    this._searchType = searchType;
    this.reapplyFilters(searchType);
  }

  recipes: Observable<RecipeListingItem[]>;
  allTagNames: Observable<string[]> = this.tagsService.tagList$;
  suggestedTags: Observable<string[]>;

  constructor(private readonly recipeService: RecipeService, private readonly tagsService: TagsService,
              private readonly navigationService: NavigationService) {
  }

  ngOnInit() {
    const searchTags = this.navigationService.getQueryParamAsArray('searchTags');
    if (searchTags.length > 0) {
      this._searchedTags = searchTags;
      this._searchFieldValue = '';
      this._searchType = 'tags';
    } else {
      this._searchFieldValue = this.navigationService.getQueryParam('searchFieldValue') || '';
      this._searchType = 'recipes';
    }

  }

  set searchedTags(searchedTags: string[]) {
    this._searchedTags = searchedTags;
    this.reapplyFilters(this._searchType);
  }

  get searchedTags(): string[] {
    return this._searchedTags;
  }

  _searchedTags: string[] = [];

  private _searchFieldValue: string = '';

  set searchFieldValue(searchFieldValue: string) {
    this._searchFieldValue = searchFieldValue;
    this.reapplyFilters(this._searchType);
  }

  get searchFieldValue(): string {
    return this._searchFieldValue;
  }

  reapplyFilters(searchType: 'recipes' | 'tags') {
    if (searchType === 'recipes') {
      this.recipes = this.recipeService
        .recipeList$
        .pipe(map(recipeList =>
          recipeList.filter(recipe => isSubstring(this.searchFieldValue, recipe.name))));
    } else {
      this.suggestedTags = this.allTagNames.pipe(map(tags => tags
        .filter(tag => isSubstring(this.searchFieldValue, tag))
        .filter(tag => !this.searchedTags.includes(tag))));
    }
  }

  submitSearch(searchFieldValue: string) {
    if (this._searchType === 'recipes') {
      this.navigationService.searchByRecipe(searchFieldValue);
    } else if (this._searchedTags.length > 0) {
      this.navigationService.searchByTags(this._searchedTags);
    }
  }

  addTag(tagName: string) {
    if (!this._searchedTags.includes(tagName)) {
      this._searchFieldValue = '';
      this._searchedTags.push(tagName);
      this.suggestedTags = this.suggestedTags.pipe(map(tags => tags.filter(tag => tag !== tagName)));
    }
  }
}
