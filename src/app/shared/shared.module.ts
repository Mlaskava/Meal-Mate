import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TagsListComponent } from '~/app/shared/tags/tags-list/tags-list.component';
import { SearchBarComponent } from '~/app/shared/search/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { NativeScriptModule } from '@nativescript/angular';
import { TagsService } from '~/app/shared/tags/tags.service';
import { SearchPageComponent } from '~/app/shared/search/search-page/search-page.component';
import { SearchTypeBarComponent } from '~/app/shared/search/search-type-bar/search-type-bar.component';
import { SearchSuggestionsComponent } from '~/app/shared/search/search-suggestions/search-suggestions.component';
import { NavigationService } from '~/app/shared/navigation/navigation.service';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';

@NgModule({
  declarations: [
    TagsListComponent,
    SearchBarComponent,
    SearchPageComponent,
    SearchTypeBarComponent,
    SearchSuggestionsComponent,
    SearchResultsComponent,
    IngredientListComponent
  ],
  providers: [
    TagsService,
    NavigationService],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    NativeScriptModule
  ],
  exports: [
    SearchBarComponent,
    TagsListComponent,
    SearchPageComponent,
    SearchTypeBarComponent,
    SearchSuggestionsComponent,
    IngredientListComponent
  ]
})
export class SharedModule {
}
