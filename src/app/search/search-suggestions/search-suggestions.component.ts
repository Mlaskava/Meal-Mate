import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationService } from '../../navigation/navigation.service';
import { RecipeListingItem } from '../../recipe/model/recipe-listing-item';
import { Observable } from 'rxjs';
import { getColor } from '../search-bar.color-helper';

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
  recipes: Observable<RecipeListingItem[]>;

  @Output()
  tagSearchAdded: EventEmitter<string> = new EventEmitter<string>();

  showDetails(id: number) {
    this.navigationService.showDetailsPage(id);
  }

  addTag(tagName: string) {
    this.tagSearchAdded.emit(tagName);
  }

  isListVisible() {
    return this.searchType === 'tags' || this.searchFieldValue.length > 0;
  }

  protected readonly getColor = getColor;
}
