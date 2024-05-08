import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { getColor } from '~/app/shared/search/search-bar.color-helper';
import { Label } from '@nativescript/core';

@Component({
  selector: 'mm-search-type-bar',
  templateUrl: './search-type-bar.component.html',
  styleUrls: ['./search-type-bar.component.css']
})
export class SearchTypeBarComponent {

  readonly LABEL_NAMES: string[] = ['recipes', 'tags'];

  _selected: string;

  get selected(): string {
    return this._selected;
  }

  @Input()
  set selected(selected: string) {
    this._selected = selected;
    this.selectedChange.emit(selected);
  }

  @Output()
  selectedChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('recipes') recipes: Label;
  @ViewChild('tags') tags: Label;

  protected readonly getColor = getColor;
}
