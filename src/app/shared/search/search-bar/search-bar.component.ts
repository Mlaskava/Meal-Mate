import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { RecipeService } from '~/app/recipe/service/recipe.service';
import { getColor } from '../search-bar.color-helper';
import { NavigationService } from '~/app/shared/navigation/navigation.service';
import { EventData, TextField } from '@nativescript/core';

@Component({
  selector: 'mm-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements AfterViewInit {

  constructor(recipeService: RecipeService, protected readonly navigationService: NavigationService) {
    recipeService.recipeList$.pipe(map(recipes => recipes.map(recipe => recipe.id)))
      .subscribe(recipes => this.recipeIds = recipes);
  }

  ngAfterViewInit() {
    setTimeout(() => this.searchField?.nativeElement.focus(), 10);
  }

  @Output()
  searchFieldValueChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  searchSubmitted: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchField')
  searchField: ElementRef;

  @Input()
  searchActive: boolean = false;

  @Input()
  isOnHomePage = true;

  @Input()
  set searchFieldValue(searchFieldValue: string) {
    this._searchFieldValue = searchFieldValue;
    this.searchFieldValueChange.emit(this._searchFieldValue);
  }

  get searchFieldValue(): string {
    return this._searchFieldValue;
  }

  recipeIds: number[] = [];

  _searchFieldValue: string;

  submitSearch(event: EventData) {
    this.searchSubmitted.emit((event.object as TextField).text);
  }

  goToRandomRecipe() {
    this.navigationService.showDetailsPage(this.recipeIds[Math.floor(Math.random() * this.recipeIds.length)]);
  }

  goToSearchPage() {
    this.navigationService.goToSearchPage(this.navigationService.getQueryParam('searchValue'));
  }

  protected readonly getSearchBarColor = getColor;
}
