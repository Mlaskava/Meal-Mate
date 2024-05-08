import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TagDto, TagsDto } from '~/app/shared/tags/dto/tag.dto';

import tagsList from '~/assets/mocked-tags.response.json';
import { Tag } from '~/app/recipe/model/tag';


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private readonly httpClient: HttpClient) {
  }

  readonly USED_TAG_TYPES = ['cuisine', 'meal', 'cooking_style', 'dietary', 'difficulty', 'appliance', 'healthy', 'ingredient'];

  private _tagList$: Observable<Tag[]>;

  get tagList$(): Observable<Tag[]> {
    this._tagList$ = this.getMockedResponse();
    return this._tagList$;
  }

  private getMockedResponse(): Observable<Tag[]> {
    return of(tagsList).pipe(map(tagDtoList =>
      this.tagDtoToTags(tagDtoList.results)));
  }

  private getRealResponse(): Observable<Tag[]> {
    return this.httpClient.get<TagsDto>('tags/list').pipe(map(tagDtoList =>
      this.tagDtoToTags(tagDtoList.results)));
  }

  tagDtoToTags(tagDtoList: TagDto[]) {
    return tagDtoList.map(tag => ({name: tag.display_name, type: tag.root_tag_type}))
      .filter(tag => this.USED_TAG_TYPES.includes(tag.type));
  }
}
