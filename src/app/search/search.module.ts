import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptModule } from '@nativescript/angular';
import { SearchBarComponent } from '~/app/search/search-bar/search-bar.component';
import { SearchPageComponent } from '~/app/search/search-page/search-page.component';
import { SearchTypeBarComponent } from '~/app/search/search-type-bar/search-type-bar.component';
import { SearchSuggestionsComponent } from '~/app/search/search-suggestions/search-suggestions.component';
import { SearchResultsComponent } from '~/app/search/search-results/search-results.component';
import { NavigationService } from '~/app/navigation/navigation.service';
import { TagsModule } from '~/app/tags/tags.module';
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchPageComponent,
    SearchTypeBarComponent,
    SearchSuggestionsComponent,
    SearchResultsComponent
  ],
  providers: [NavigationService],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    NativeScriptModule,
    TagsModule,
    SharedModule
  ],
  exports: [
    SearchBarComponent,
    SearchPageComponent,
    SearchTypeBarComponent,
    SearchSuggestionsComponent
  ]
})
export class SearchModule {
}