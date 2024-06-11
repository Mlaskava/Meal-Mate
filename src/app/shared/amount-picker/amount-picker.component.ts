import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getColor } from '../../search/search-bar.color-helper';

@Component({
  selector: 'mm-amount-picker',
  templateUrl: './amount-picker.component.html',
  styleUrls: ['./amount-picker.component.css']
})
export class AmountPickerComponent {

  @Input()
  amount: number;

  @Output()
  amountChange: EventEmitter<number> = new EventEmitter<number>();

  set servingsAmount(servings: number) {
    if (!servings) {
      servings = 1;
    }
    if (servings > 0) {
      this.amount = servings;
      this.amountChange.emit(this.amount);
    }
  }

  protected readonly getColor = getColor;
}
