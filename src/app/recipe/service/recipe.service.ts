import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { RecipeDto, RecipesDto } from "../dto/recipe.dto";

const API_KEY = 'e7da3e4da0msh8e98681d1e04db2p1ac299jsn5156350181c5';
const API_HOST = 'tasty.p.rapidapi.com';
const API_BASE_URL = `https://${API_HOST}`;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getRecipeList(): Observable<RecipeDto[]> {
    return this.httpClient.get<RecipesDto>(API_BASE_URL + '/recipes/list', {
      params: {
        from: '0',
        size: '20',
        tags: 'under_30_minutes'
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    }).pipe(map(recipesDto => recipesDto.results));
  }
}
