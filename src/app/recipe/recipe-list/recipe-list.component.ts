import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeListingItem } from '~/app/recipe/model/recipe-listing-item';
import { RecipeService } from '~/app/recipe/service/recipe.service';
import { NavigationService } from '~/app/navigation/navigation.service';

@Component({
  selector: 'mm-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  @Output()
  contentReadyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(recipeService: RecipeService, private readonly navigationService: NavigationService) {
    this.recipes$ = recipeService.recipeList$;
    this.recipes$.subscribe(()  => this.contentReadyChange.emit(true))
  }

  @Input()
  protected recipes$: Observable<RecipeListingItem[]>;

  showDetails(id: number) {
    this.navigationService.showDetailsPage(id);
  }
}
