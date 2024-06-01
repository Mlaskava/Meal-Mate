import { Component, Input } from '@angular/core';
import { Nutrition } from '~/app/recipe/model/nutrition';
import { getColor } from '~/app/search/search-bar.color-helper';

@Component({
  selector: 'mm-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent {

  protected readonly Object = Object;

  @Input()
  nutrition: Nutrition;

  @Input()
  set servings(servings: number) {
    if (!this.baseServings) {
      this.baseServings = servings;
    }
    this.currentServings = servings
  }

  currentServings: number;
  baseServings: number;

  nutritionVisible: boolean = false;
  protected readonly getColor = getColor;
  protected readonly parseInt = parseInt;
}
