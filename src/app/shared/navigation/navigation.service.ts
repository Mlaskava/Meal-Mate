import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Injectable()
export class NavigationService {

  constructor(private readonly router: RouterExtensions, private readonly activatedRoute: ActivatedRoute) {
  }

  //TODO Error Handling

  showDetailsPage(id: number) {
    this.router.navigate(['details', {id: id}]).catch();
  }

  goToSearchPage(searchValue: string | string[] = '') {
    this.router.navigate(['search'], {
      queryParams: {searchValue: searchValue}
    }).catch();
  }

  search(searchValue: string | string[]) {
    this.router.navigate(['searchResults'], {
      queryParams: {searchValue: searchValue}
    }).catch();
  }

  goToHomePage() {
    this.router.navigate([''], {
      clearHistory: true
    }).catch();
  }

  getQueryParam(paramName: string): string | string[] {
    return this.activatedRoute.snapshot.queryParams[paramName];

  }
}
