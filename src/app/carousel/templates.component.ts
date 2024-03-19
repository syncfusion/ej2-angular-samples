import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CarouselAnimationEffect, CarouselComponent, CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'templates.html',
    styleUrls: ['templates.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, CarouselModule, ButtonModule, SBDescriptionComponent]
})
export class CarouselTemplateComponent {

  @ViewChild('carousel') carouselObj: CarouselComponent;

  public carouselAnimation: CarouselAnimationEffect = 'Fade';

  public getThumpImage(index: number): string {
    const images = ['cardinal', 'hunei', 'costa-rica', 'kaohsiung', 'bee-eater'];
    return `./assets/carousel/images/${images[index]}.png`;
  }

}
