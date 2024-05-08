import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getColor } from '~/app/shared/search/search-bar.color-helper';
import { Tag } from '~/app/recipe/model/tag';

@Component({
  selector: 'mm-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent {

  @Input()
  editable = false;

  @Input()
  set tags(tags: Tag[]) {
    this.tagNames = tags.map(tag => tag.name);
  }

  @Input()
  tagNames: string[];

  @Output()
  tagNamesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  removeTag(tagToRemove: string) {
    this.tagNames = this.tagNames.filter(tag => tag !== tagToRemove);
    this.tagNamesChange.emit(this.tagNames);
  }

  protected readonly getColor = getColor;
}
