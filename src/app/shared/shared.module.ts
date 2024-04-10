import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { TagsListComponent } from "~/app/shared/tags-list/tags-list.component";
import { SearchBarComponent } from "~/app/shared/search-bar/search-bar.component";
import { NgForOf } from "@angular/common";

@NgModule({
  declarations: [TagsListComponent, SearchBarComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    NgForOf
  ],
  exports: [
    SearchBarComponent,
    TagsListComponent
  ]
})
export class SharedModule {
}
