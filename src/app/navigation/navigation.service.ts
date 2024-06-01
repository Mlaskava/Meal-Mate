import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Injectable()
export class NavigationService {

  constructor(private readonly router: RouterExtensions, private readonly activatedRoute: ActivatedRoute) {
  }

  private _searchId: number = 0;

  get searchId(): number {
    this._searchId = ++this._searchId % 1000;
    return this._searchId;
  }

  //TODO Error Handling

  showDetailsPage(id: number) {
    this.router.navigate(['details', {id: id}]).catch();
  }

  showImage(imageUrl: string, title: string) {
    this.router.navigate(['image', {imageUrl: imageUrl, title: title}]).catch();
  }

  goToSearchPage(searchName: string, searchTags: string[] = [], replaceUrl = false) {
    this.router.navigate(['search-page'], {
      queryParams: {searchFieldValue: searchName, searchTags: searchTags},
      replaceUrl: replaceUrl
    }).catch();
  }

  searchByRecipe(searchName: string) {
    this.router.navigate([`search-results/${this.searchId}`], {
      queryParams: {searchFieldValue: searchName},
      replaceUrl: true
    }).catch();
  }

  searchByTags(searchTags: string[], replaceUrl = true, samePageUrl = false) {
    this.router.navigate([`search-results/${this.searchId}`], {
      queryParams: samePageUrl ? {searchTags: searchTags, forceReload: true} : {searchTags: searchTags},
      replaceUrl: replaceUrl
    }).catch();
  }

  goToHomePage() {
    this.router.navigate([''], {
      clearHistory: true
    }).catch();
  }

  goBack() {
    this.router.back();
  }

  getQueryParam(paramName: string): string {
    return this.activatedRoute.snapshot.queryParams[paramName];
  }

  getQueryParamAsArray(paramName: string): string[] {
    const queryParam = this.activatedRoute.snapshot.queryParams[paramName];
    return Array.isArray(queryParam) ? queryParam : (!!queryParam ? [queryParam] : []);
  }
}
