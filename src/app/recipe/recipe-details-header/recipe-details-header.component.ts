import { Component, Input } from '@angular/core';
import { NavigationService } from '~/app/shared/navigation/navigation.service';

@Component({
  selector: 'mm-recipe-details-header',
  templateUrl: './recipe-details-header.component.html',
  styleUrls: ['./recipe-details-header.component.css']
})
export class RecipeDetailsHeaderComponent {

  constructor(readonly navigationService: NavigationService) {
  }


  @Input()
  imageUrl: string;

  @Input()
  recipeName: string;
}
