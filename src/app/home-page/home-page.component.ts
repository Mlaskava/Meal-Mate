import { Component, OnInit } from '@angular/core';
import { RecipeService } from "~/app/recipe/service/recipe.service";
import { Observable } from "rxjs";
import { RecipeDto } from "~/app/recipe/dto/recipe.dto";

@Component({
  selector: 'ns-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  recipes: Observable<RecipeDto[]>;

  ngOnInit() {
    this.recipes = this.recipeService.getRecipeList();
  }

  constructor(private readonly recipeService: RecipeService) {
  }
}
