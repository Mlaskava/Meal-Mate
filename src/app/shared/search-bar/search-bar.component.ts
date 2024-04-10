import { Component } from '@angular/core';

@Component({
  selector: 'ns-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  onClick(event: any) {
    event.stopPropagation()
  }
}
