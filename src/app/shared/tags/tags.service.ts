import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tagList$: Observable<string[]> = this.httpClient.get<string[]>('tags').pipe(shareReplay(1));

  constructor(private readonly httpClient: HttpClient) {
  }
}
