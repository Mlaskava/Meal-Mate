import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { NativeScriptModule } from '@nativescript/angular';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagsService } from './tags.service';

@NgModule({
  declarations: [
    TagsListComponent
  ],
  providers: [NavigationService, TagsService],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    NativeScriptModule,
  ],
  exports: [
    TagsListComponent
  ]
})
export class TagsModule {
}