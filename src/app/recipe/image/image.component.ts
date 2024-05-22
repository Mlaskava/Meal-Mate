import { Component } from '@angular/core';
import { NavigationService } from '~/app/shared/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mm-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {

  readonly imageUrl: string;
  readonly title: string;


  constructor(activatedRoute: ActivatedRoute, readonly navigationService: NavigationService) {
    this.imageUrl = activatedRoute.snapshot.paramMap.get('imageUrl');
    this.title = activatedRoute.snapshot.paramMap.get('title');
  }
}
