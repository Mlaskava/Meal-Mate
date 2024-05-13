import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecipeListingItem } from '~/app/recipe/model/recipe-listing-item';
import { RecipeService } from '~/app/recipe/service/recipe.service';
import { TagsService } from '~/app/shared/tags/tags.service';
import { NavigationService } from '~/app/shared/navigation/navigation.service';
import { isSubstring } from '~/app/shared/comparision/compare-util';

@Component({
  selector: 'mm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  searchType: 'recipes' | 'tags';

  recipes: Observable<RecipeListingItem[]>;
  allTagNames: Observable<string[]> = this.tagsService.tagList$;
  suggestedTags: Observable<string[]>;

  constructor(private readonly recipeService: RecipeService, private readonly tagsService: TagsService,
              private readonly navigationService: NavigationService) {
  }

  ngOnInit() {
    const searchValue = this.navigationService.getQueryParam('searchValue') || '';
    if (Array.isArray(searchValue)) {
      this._searchedTags = searchValue;
      this._searchFieldValue = '';
      this.searchType = 'tags';
    } else {
      this._searchFieldValue = searchValue;
      this.searchType = 'recipes';
    }

  }

  set searchedTags(searchedTags: string[]) {
    this._searchedTags = searchedTags;
    this.reapplyFilters(this.searchType);
  }

  get searchedTags(): string[] {
    return this._searchedTags;
  }

  _searchedTags: string[] = [];

  private _searchFieldValue: string = '';

  set searchFieldValue(nameSearchValue: string) {
    this._searchFieldValue = nameSearchValue;
    this.reapplyFilters(this.searchType);
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
    if (this.searchType === 'recipes') {
      this.navigationService.search(searchFieldValue);
    } else {
      this.navigationService.search(this._searchedTags);
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
