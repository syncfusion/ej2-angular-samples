import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'control-content',
  templateUrl: 'keyboard-navigation.html',
  styleUrls: ['keyboard-navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselKeyboardNavigationComponent implements AfterViewInit {

  public ngAfterViewInit(): void {
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
      const carouselElement: HTMLElement = document.querySelector('.e-carousel');
      if (e.altKey && e.keyCode === 74 && carouselElement) {
        carouselElement.focus();
      }
    });
  }

}
