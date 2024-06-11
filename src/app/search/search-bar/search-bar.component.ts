import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { RecipeService } from '../../recipe/service/recipe.service';
import { getColor } from '../search-bar.color-helper';
import { NavigationService } from '../../navigation/navigation.service';
import { Dialogs, EventData, TextField } from '@nativescript/core';
import { getServerUrl, setCustomUrl } from '~/app/interceptors/url.config';

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
  amountPickerVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

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
  ingredientsAmount: number;

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

  openUrlOptions() {
    Dialogs.prompt({
      title: 'Change URL to recipes server',
      message: '\nAttention! This is advanced option. If not necessary, it is best to leave this setting unchanged, as it can break application if set incorrectly\n',
      defaultText: getServerUrl(),
      okButtonText: 'Change',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.result) {
        setCustomUrl(result.text);
      }
    })
  }

  submitSearch(event: EventData) {
    this.searchSubmitted.emit((event.object as TextField).text);
  }

  goToRandomRecipe() {
    this.navigationService.showDetailsPage(this.recipeIds[Math.floor(Math.random() * this.recipeIds.length)]);
  }

  goToSearchPage() {
    this.navigationService.goToSearchPage(this.searchFieldValue, this.ingredientsAmount, this.navigationService.getQueryParamAsArray('searchTags'));
  }

  protected readonly getSearchBarColor = getColor;

  showAmountPicker() {
    this.amountPickerVisibleChange.emit(true);
  }
}
