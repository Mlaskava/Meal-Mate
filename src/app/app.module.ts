import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from '~/app/home-page/home-page.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '~/app/shared/shared.module';
import { RecipeModule } from '~/app/recipe/recipe.module';
import { Router } from '@angular/router';
import { HostInterceptor } from '~/app/interceptors/host.interceptor';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, HttpClientModule, SharedModule, RecipeModule],
  declarations: [AppComponent, HomePageComponent],
  providers: [HttpClient, Router,
    {provide: HTTP_INTERCEPTORS, useClass: HostInterceptor, multi: true}

  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
