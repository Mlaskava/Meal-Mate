import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getColor } from '~/app/shared/search/search-bar.color-helper';

@Component({
  selector: 'mm-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent {

  @Input()
  editable = false;

  @Input()
  set tags(tags: string[] | string) {
    this._tags = Array.isArray(tags) ? tags : [tags];
  }

  _tags: string[];

  @Output()
  tagsChange: EventEmitter<string[] | string> = new EventEmitter<string[] | string>();

  removeTag(tagToRemove: string) {
    this._tags = this._tags.filter(tag => tag !== tagToRemove);
    this.tagsChange.emit(this._tags);
  }

  protected readonly getColor = getColor;
}
