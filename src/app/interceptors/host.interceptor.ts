import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_DATA from '~/assets/api-data.json';


@Injectable()
export class HostInterceptor implements HttpInterceptor {


  isEmulator(): boolean {
    return android.os.Build.MODEL.includes('sdk_gphone');
  }

  readonly API_URL = this.isEmulator() ? API_DATA.LOCALHOST : API_DATA.CLOUD;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({url: `${this.API_URL}/${req.url}`}));
  }
}
