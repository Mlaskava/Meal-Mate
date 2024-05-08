import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationService } from '~/app/shared/navigation/navigation.service';
import { Recipe } from '~/app/recipe/model/recipe';
import { Observable } from 'rxjs';
import { getColor } from '~/app/shared/search/search-bar.color-helper';

@Component({
  selector: 'mm-search-suggestions',
  templateUrl: './search-suggestions.component.html',
  styleUrls: ['./search-suggestions.component.css']
})
export class SearchSuggestionsComponent {

  constructor(private readonly navigationService: NavigationService) {
  }

  @Input()
  searchFieldValue: string;

  @Input()
  searchType: 'recipes' | 'tags';

  @Input()
  tags: Observable<string[]>;

  @Input()
  recipes: Observable<Recipe[]>;

  @Output()
  tagSearchAdded: EventEmitter<string> = new EventEmitter<string>();

  showDetails(id: number) {
    this.navigationService.showDetailsPage(id);
  }

  addTag(tagName: string) {
    this.tagSearchAdded.emit(tagName);
  }

  isListVisible(listType: 'recipes' | 'tags') {
    return this.searchType === listType && !!this.searchFieldValue && this.searchFieldValue.length !== 0;
  }

  protected readonly getColor = getColor;
}
