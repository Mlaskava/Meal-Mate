import { Component, Input } from '@angular/core';
import { Ingredient } from '~/app/recipe/model/ingredient';

@Component({
  selector: 'mm-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent {

  _ingredients: Ingredient[];

  @Input()
  set ingredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients.sort((a, b) => (a.quantity || 0) - (b.quantity || 0));
  }

  getDisplayLabel(ingredient: Ingredient) {
    return ingredient.name + (ingredient.quantity > 0 ? (': ' + ingredient.displayedQuantity + ' ' + (ingredient.quantity != 1 ? ingredient.unitPlural || '' : ingredient.unitSingular || '')) : '');
  }

}
