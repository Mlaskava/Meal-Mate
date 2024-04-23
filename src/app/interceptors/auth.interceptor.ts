import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import API_DATA from "../assets/api-data.json";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    readonly authHeaders = {
        'X-RapidAPI-Key': API_DATA.KEY,
        'X-RapidAPI-Host': API_DATA.HOST
    };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req.clone({setHeaders: this.authHeaders}));
    }
}