import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'control-content',
  templateUrl: 'partial-visible.html',
  styleUrls: ['partial-visible.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselPartialComponent { 
  public partialVisible: boolean = true;
}
