import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomePageComponent } from '~/app/home-page/home-page.component';
import { RecipeDetailsComponent } from '~/app/recipe/recipe-details/recipe-details.component';
import { SearchPageComponent } from '~/app/search/search-page/search-page.component';
import { SearchResultsComponent } from '~/app/search/search-results/search-results.component';
import { ImageComponent } from '~/app/recipe/image/image.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'details', component: RecipeDetailsComponent},
  {path: 'image', component: ImageComponent},
  {path: 'search-page', component: SearchPageComponent},
  {path: 'search-results/:id', component: SearchResultsComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
