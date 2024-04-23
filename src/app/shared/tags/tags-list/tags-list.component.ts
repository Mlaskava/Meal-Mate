import { Component, Input } from '@angular/core';
import { Tag } from "~/app/recipe/model/recipe";

@Component({
    selector: 'ns-tags-list',
    templateUrl: './tags-list.component.html',
    styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent {

    private readonly USED_TAGS = ['cuisine', 'meal', 'cooking_style', 'dietary', 'difficulty', 'appliance', 'healthy'];

    private _tags: Tag[];

    @Input()
    set tags(tags: Tag[]) {
        this._tags = tags.filter(tag => this.USED_TAGS.includes(tag.type));
    }

    get tags(): Tag[] {
        return this._tags;
    }
}