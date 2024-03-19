import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-navigation.html',
    styleUrls: ['keyboard-navigation.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, CarouselModule, SBDescriptionComponent]
})
export class CarouselKeyboardNavigationComponent implements AfterViewInit {

  public ngAfterViewInit(): void {
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
      const carouselElement: HTMLElement = document.querySelector('.e-carousel .e-carousel-slide-container');
      if (e.altKey && e.keyCode === 74 && carouselElement) {
        carouselElement.focus();
      }
    });
  }

}
