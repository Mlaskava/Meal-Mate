import { ActivatedRouteSnapshot } from '@angular/router';
import { NSLocationStrategy, NSRouteReuseStrategy } from '@nativescript/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AppRouteReuseStrategy extends NSRouteReuseStrategy {

  constructor(location: NSLocationStrategy) {
    super(location);
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return super.shouldReuseRoute(future, curr) && !this.areOnSameUrlWithForceReload(curr, future);
  }

  private areOnSameUrlWithForceReload(curr: ActivatedRouteSnapshot, future: ActivatedRouteSnapshot) {
    return [future.url, curr.url].every(url => url[0]?.path === 'search-results') && future.queryParamMap.has('forceReload');
  }
}