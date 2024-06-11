import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { NativeScriptModule } from '@nativescript/angular';
import { AmountPickerComponent } from '~/app/shared/amount-picker/amount-picker.component';
import { ContentComponent } from '~/app/shared/content/content.component';

@NgModule({
  declarations: [AmountPickerComponent, ContentComponent],
  providers: [NavigationService],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    NativeScriptModule,
  ],
  exports: [AmountPickerComponent, ContentComponent]
})
export class SharedModule {
}