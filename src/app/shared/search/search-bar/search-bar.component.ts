import { Component } from '@angular/core';
import { map } from "rxjs";
import { RecipeService } from "~/app/recipe/service/recipe.service";
import { getColor } from "../search-bar.color-helper";
import { NavigationService } from "~/app/shared/navigation/navigation.service";

@Component({
    selector: 'ns-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

    constructor(recipeService: RecipeService, private readonly navigationService: NavigationService) {
        recipeService.recipeList$.pipe(map(recipes => recipes.map(recipe => recipe.id)))
            .subscribe(recipes => this.recipeIds = recipes);
    }

    recipeIds: number[] = [];

    goToRandomRecipe() {
        this.navigationService.showDetailsPage(this.recipeIds[Math.floor(Math.random() * this.recipeIds.length)]);
    }

    goToSearchPage() {
        this.navigationService.goToSearchPage();
    }

    protected readonly getSearchBarColor = getColor;
}
