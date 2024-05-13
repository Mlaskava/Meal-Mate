import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeListingItem } from '~/app/recipe/model/recipe-listing-item';
import { Recipe } from '~/app/recipe/model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private readonly httpClient: HttpClient) {
  }

  recipeList$: Observable<RecipeListingItem[]> = this.httpClient.get<RecipeListingItem[]>('recipes');

  getRecipeDetails(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`recipes/${id}`);
  }
}
