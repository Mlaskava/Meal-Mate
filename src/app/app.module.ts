import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from '~/app/home-page/home-page.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RecipeModule } from '~/app/recipe/recipe.module';
import { Router, RouteReuseStrategy } from '@angular/router';
import { HostInterceptor } from '~/app/interceptors/host.interceptor';
import { AppRouteReuseStrategy } from '~/app/route-reuse.strategy';
import { SearchModule } from '~/app/search/search.module';
import { TagsModule } from '~/app/tags/tags.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, HttpClientModule, SearchModule, RecipeModule, TagsModule],
  declarations: [AppComponent, HomePageComponent],
  providers: [HttpClient, Router,
    {provide: HTTP_INTERCEPTORS, useClass: HostInterceptor, multi: true},
    {provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy}
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
