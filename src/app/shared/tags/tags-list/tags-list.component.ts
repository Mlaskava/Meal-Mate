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
  tags: string[];

  @Output()
  tagsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  removeTag(tagToRemove: string) {
    this.tagsChange.emit(this.tags.filter(tag => tag !== tagToRemove));
  }

  protected readonly getColor = getColor;
}
