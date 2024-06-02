import { Component, Input } from '@angular/core';
import { Ingredient } from '../model/ingredient';
import convert, { Unit } from 'convert';

@Component({
  selector: 'mm-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent {

  private _ingredients: Ingredient[];

  private fractionDisplay = new Map<string, string>([
    ['1', '⅒'],
    ['2', '⅕'],
    ['4', '⅖'],
    ['6', '⅗'],
    ['8', '⅘'],
    ['5', '½'],
    ['25', '¼'],
    ['75', '¾'],
    [(1.0 / 7.0).toString().split('.')[1], '⅐'],
    [(1.0 / 9.0).toString().split('.')[1], '⅑'],
    [(1.0 / 3.0).toString().split('.')[1], '⅓'],
    [(2.0 / 3.0).toString().split('.')[1], '⅔'],
    [(1.0 / 6.0).toString().split('.')[1], '⅙'],
    [(5.0 / 6.0).toString().split('.')[1], '⅚'],
    [(1.0 / 8.0).toString().split('.')[1], '⅛'],
    [(3.0 / 8.0).toString().split('.')[1], '⅜'],
    [(5.0 / 8.0).toString().split('.')[1], '⅝'],
    [(7.0 / 8.0).toString().split('.')[1], '⅞'],
    [(1.0 / 82.0).toString().split('.')[1], '¹⁄₈₂'],
    [(1.0 / 21.0).toString().split('.')[1], '¹⁄₂₁']
  ]);


  @Input()
  set ingredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients.sort((a, b) => (a.quantity || 0) - (b.quantity || 0))
      .map(ingredient => {
        ingredient.displayedQuantity = this.getDisplayedQuantity(ingredient);
        return ingredient;
      });
  }

  @Input()
  set servings(servings: number) {
    if (!this.baseServings) {
      this.baseServings = servings;
    }
    this.currentServings = servings;

  }

  currentServings: number;
  baseServings: number;

  get ingredients() {
    return this._ingredients;
  }

  getQuantityValue(quantity: string): string {
    const quantityDividedByFraction = this.roundNumber(Number(quantity) * this.currentServings / this.baseServings)
      .toString()
      .split('.')
      .map(quantityPart => quantityPart !== '0' ? quantityPart : '');
    if (quantityDividedByFraction.length > 1) {
      if (this.fractionDisplay.has(quantityDividedByFraction[1])) {
        quantityDividedByFraction[1] = this.fractionDisplay.get(quantityDividedByFraction[1]);
        return quantityDividedByFraction.join('');
      }
    }
    return quantityDividedByFraction.some(value => value === '') ? quantityDividedByFraction.join('') : quantityDividedByFraction.join('.');
  }

  getDisplayedQuantity(ingredient: Ingredient) {
    if (!ingredient.quantity) {
      return '';
    }
    try {
      const convertedValue = convert(ingredient.quantity, ingredient.unitShort as Unit).to('best', 'metric').toString();
      return this.getQuantityValue(convertedValue.match(/\d+\.?\d*/).toString()) + convertedValue.match(/[A-Za-z]+/).toString();
    } catch (error) {
      return this.getQuantityValue((ingredient.quantity).toString()) + ' ' + (ingredient.unitShort || '');
    }
  }

  private roundNumber(value: number): string {
    if (value > 10) {
      return value.toFixed(0);
    } else if (value.toFixed(2).toString().endsWith('5')) {
      return value.toFixed(2);
    }
    return value.toFixed(1);
  }

}
