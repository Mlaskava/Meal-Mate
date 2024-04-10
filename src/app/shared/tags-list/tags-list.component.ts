import { Component, Input } from '@angular/core';
import { Tag } from "../dto/tag.dto";

@Component({
  selector: 'ns-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent {

  private readonly USED_TAGS = ['cuisine', 'meal', 'cooking_style', 'dietary', 'difficulty', 'appliance', 'healthy'];

  @Input()
  set tags(tags: Tag[]) {
    this._tags = tags.filter(tag => this.USED_TAGS.includes(tag.root_tag_type));
  }

  get tags() {
    return this._tags;
  }

  private _tags: Tag[]
}
