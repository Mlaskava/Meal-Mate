import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tagList$: Observable<string[]> = this.httpClient.get<string[]>('tags');

  constructor(private readonly httpClient: HttpClient) {
  }
}
