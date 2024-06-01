import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getColor } from '~/app/search/search-bar.color-helper';

@Component({
  selector: 'mm-serving-picker',
  templateUrl: './serving-picker.component.html',
  styleUrls: ['./serving-picker.component.css']
})
export class ServingPickerComponent {

  @Input()
  servings: number;

  @Output()
  servingsChange: EventEmitter<number> = new EventEmitter<number>();

  set servingsAmount(servings: number) {
    if (servings > 0) {
      this.servings = servings;
      this.servingsChange.emit(this.servings);
    }
  }

  protected readonly getColor = getColor;
}
