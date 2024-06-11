import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, Subject } from 'rxjs';
import { RecipeListingItem } from '~/app/recipe/model/recipe-listing-item';
import { Recipe } from '~/app/recipe/model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  refreshRecipes() {
    return this.httpClient.get<RecipeListingItem[]>('recipes').subscribe(this.recipeSubject)
  }

  recipeSubject: Subject<RecipeListingItem[]> = new Subject<RecipeListingItem[]>();
  recipeList$: Observable<RecipeListingItem[]>;

  constructor(private readonly httpClient: HttpClient) {
    this.refreshRecipes();
    this.recipeList$ = this.recipeSubject.asObservable().pipe(shareReplay(1))
  }

  getRecipeDetails(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`recipes/${id}`).pipe(shareReplay(1));
  }
}
