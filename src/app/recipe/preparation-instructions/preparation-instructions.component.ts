import { Component, Input } from '@angular/core';
import { getColor } from '~/app/search/search-bar.color-helper';

@Component({
  selector: 'mm-preparation-instructions',
  templateUrl: './preparation-instructions.component.html',
  styleUrls: ['./preparation-instructions.component.css']
})
export class PreparationInstructionsComponent {
  @Input()
  instructions: string[];
  protected readonly getColor = getColor;
}
