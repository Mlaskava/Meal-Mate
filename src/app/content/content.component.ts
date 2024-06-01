import { Component, Input } from '@angular/core';
import { getColor } from '~/app/search/search-bar.color-helper';
import { NativeScriptModule } from '@nativescript/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mm-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  standalone: true,
  imports: [CommonModule, NativeScriptModule]
})
export class ContentComponent {

  @Input()
  title: string;

  @Input()
  contentVisible: boolean = true;

  @Input()
  contentInline: boolean = false;

  protected readonly getColor = getColor;
}
