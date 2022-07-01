import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CarouselAnimationEffect, CarouselComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'control-content',
  templateUrl: 'templates.html',
  styleUrls: ['templates.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselTemplateComponent {

  @ViewChild('carousel') carouselObj: CarouselComponent;

  public carouselAnimation: CarouselAnimationEffect = 'Fade';

  public getThumpImage(index: number): string {
    const images = ['cardinal', 'hunei', 'costa-rica', 'kaohsiung', 'bee-eater'];
    return `./assets/carousel/images/${images[index]}.png`;
  }

}
