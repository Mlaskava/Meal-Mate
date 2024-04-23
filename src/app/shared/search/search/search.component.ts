import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { forkJoin, map, Observable } from "rxjs";
import { Recipe } from "~/app/recipe/model/recipe";
import { RecipeService } from "~/app/recipe/service/recipe.service";
import { TagsService } from "~/app/shared/tags/tags.service";
import { getColor } from "~/app/shared/search/search-bar.color-helper";

@Component({
    selector: 'ns-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

    constructor(private readonly recipeService: RecipeService, private readonly tagsService: TagsService) {
    }

    ngAfterViewInit() {
        setTimeout(() => this.searchField.nativeElement.focus(), 10);
    }

    @Input()
    searchType: 'recipes' | 'tags' = 'recipes';

    @ViewChild('searchField')
    searchField: ElementRef;

    recipes: Observable<Recipe[]>;
    tags: Observable<string[]>;

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

        this.tags = forkJoin([this.recipeService.recipeList$, this.tagsService.tagList$])
            .pipe(map(([recipes, tags]) =>
                [...new Set([...recipes.flatMap(recipe =>
                    recipe.ingredients.map(ingredient => ingredient.name)), ...tags])]
                    .filter(ingredient => this.isAnySubstringOfOther(ingredient, this.searchFieldValue))));
    }

    private isAnySubstringOfOther(string1: string, string2: string): boolean {
        return string1?.toUpperCase().includes(string2?.toUpperCase()) || string2?.toUpperCase().includes(string1?.toUpperCase());
    }

    protected readonly getSearchBarColor = getColor;
}