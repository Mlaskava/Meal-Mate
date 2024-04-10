import { Component, Input } from '@angular/core';
import { Observable } from "rxjs";
import { RecipeDto } from "../dto/recipe.dto";

@Component({
  selector: 'ns-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {


  @Input()
  set recipes$(recipes: Observable<RecipeDto[]>) {
    this.recipes = recipes
    this.recipes.subscribe(a => console.log(a[0].name))
  }

  get recipes$() {
    return this.recipes
  }


  recipes: Observable<RecipeDto[]>;

}
