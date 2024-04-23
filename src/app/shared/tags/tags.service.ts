import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TagsDto } from "~/app/shared/tags/dto/tag.dto";

import tagsList from '../../assets/mocked-tags.response.json';


@Injectable({
    providedIn: 'root'
})
export class TagsService {

    constructor(private readonly httpClient: HttpClient) {
    }

    private _tagList$: Observable<string[]>;

    get tagList$(): Observable<string[]> {
        this._tagList$ = this.getMockedResponse();
        return this._tagList$;
    }

    private getMockedResponse(): Observable<string[]> {
        return of(tagsList).pipe(map(tagDtoList => {
            return tagDtoList.results.map(tagDto => tagDto.display_name);
        }));
    }

    private getRealResponse(): Observable<string[]> {
        return this._tagList$ = this.httpClient.get<TagsDto>('tags/list').pipe(map(tagDtoList => {
            return tagDtoList.results.map(tagDto => tagDto.display_name);
        }));
    }
}
