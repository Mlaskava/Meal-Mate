import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomePageComponent } from '~/app/home-page/home-page.component';
import { RecipeDetailsComponent } from '~/app/recipe/recipe-details/recipe-details.component';
import { SearchComponent } from '~/app/shared/search/search/search.component';
import { SearchResultsComponent } from '~/app/shared/search/search-results/search-results.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'details', component: RecipeDetailsComponent},
  {path: 'search', component: SearchComponent},
  {path: 'searchResults', component: SearchResultsComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
