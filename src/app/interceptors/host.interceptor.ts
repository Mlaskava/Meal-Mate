import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_DATA from '~/assets/api-data.json';


@Injectable()
export class HostInterceptor implements HttpInterceptor {

  //TODO emulator/deviceDev/deviceProd requests

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({url: `http://${API_DATA.HOST}/${req.url}`}));
  }
}
