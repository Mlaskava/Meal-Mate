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
import { TagsService } from '~/app/tags/tags.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, HttpClientModule, SearchModule, RecipeModule],
  declarations: [AppComponent, HomePageComponent],
  providers: [HttpClient, Router, TagsService,
    {provide: HTTP_INTERCEPTORS, useClass: HostInterceptor, multi: true},
    {provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy}
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
