import { Component, Input } from '@angular/core';
import { getColor } from '~/app/search/search-bar.color-helper';

@Component({
  selector: 'mm-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
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
