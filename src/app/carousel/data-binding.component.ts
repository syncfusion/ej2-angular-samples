import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselAnimationEffect, CarouselButtonVisibility, CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'data-binding.html',
    styleUrls: ['data-binding.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, CarouselModule, SBDescriptionComponent]
})
export class CarouselDataBindingComponent {

  public carouselAnimation: CarouselAnimationEffect = 'Fade';

  public productDetails: Record<string, string | number>[] = [
    {
      ID: 1,
      Title: 'San Francisco',
      Content: 'San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California. Located in Northern California, San Francisco is the 17th most populous city proper in the United States, and the fourth most populous in California.',
      ImgPath: './assets/carousel/images/san-francisco.jpg',
      URL: 'https://en.wikipedia.org/wiki/San_Francisco'
    }, {
      ID: 2,
      Title: 'London',
      Content: 'London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations.',
      ImgPath: './assets/carousel/images/london.jpg',
      URL: 'https://en.wikipedia.org/wiki/London'
    }, {
      ID: 3,
      Title: 'Tokyo',
      Content: 'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.',
      ImgPath: './assets/carousel/images/tokyo.jpg',
      URL: 'https://en.wikipedia.org/wiki/Tokyo'
    }, {
      ID: 4,
      Title: 'Moscow',
      Content: 'Moscow, on the Moskva River in western Russia, is the nation’s cosmopolitan capital. In its historic core is the Kremlin, a complex that’s home to the president and tsarist treasures in the Armoury. Outside its walls is Red Square, Russia`s symbolic center.',
      ImgPath: './assets/carousel/images/moscow.jpg',
      URL: 'https://en.wikipedia.org/wiki/Moscow'
    }
  ];
  public buttonsVisibility: CarouselButtonVisibility = "Hidden";
}
