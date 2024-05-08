import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Recipe } from '~/app/recipe/model/recipe';
import { RecipeService } from '~/app/recipe/service/recipe.service';
import { TagsService } from '~/app/shared/tags/tags.service';
import { NavigationService } from '~/app/shared/navigation/navigation.service';

@Component({
  selector: 'mm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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

  @Input()
  searchType: 'recipes' | 'tags' = 'recipes';

  recipes: Observable<Recipe[]>;
  allTagNames: Observable<string[]>;
  tagNames: Observable<string[]>;

  set searchedTags(searchedTags: string[]) {
    this._searchedTags = searchedTags;
    this.tagNames = this.allTagNames.pipe(map(tagNames => tagNames
      .filter(tagName => !searchedTags.includes(tagName))));
  }

  get searchedTags(): string[] {
    return this._searchedTags;
  }

  _searchedTags: string[] = [];

  private _searchFieldValue: string = '';

  set searchFieldValue(nameSearchValue: string) {
    this._searchFieldValue = nameSearchValue;
    this.reapplyFilters();
  }

  get searchFieldValue(): string {
    return this._searchFieldValue;
  }

  reapplyFilters() {
    this.recipes = this.recipeService
      .recipeList$
      .pipe(map(recipeList =>
        recipeList.filter(recipe => this.isAnySubstringOfOther(recipe.name, this.searchFieldValue))));

    this.allTagNames = forkJoin([this.recipeService.recipeList$, this.tagsService.tagList$])
      .pipe(map(([recipes, tags]) =>
          [...new Set([...tags.map(tag => tag.name), ...recipes.flatMap(recipe =>
            recipe.ingredients.map(ingredient => ingredient.name)
          )])].filter(tag => this.isAnySubstringOfOther(tag, this.searchFieldValue))
        )
      );

    this.tagNames = this.allTagNames;
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
      this._searchedTags.push(tagName);
      this.tagNames = this.tagNames.pipe(map(tags => tags.filter(tag => tag !== tagName)));
    }
  }

  private isAnySubstringOfOther(string1: string, string2: string): boolean {
    return string1?.toUpperCase().includes(string2?.toUpperCase()) || string2?.toUpperCase().includes(string1?.toUpperCase());
  }
}
