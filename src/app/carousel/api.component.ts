import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselButtonVisibility, CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs as SwitchChangeEventArgs, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, CarouselModule, SwitchModule, DropDownListModule, SBDescriptionComponent]
})
export class CarouselAPIComponent {
  @ViewChild('carousel') carouselObj: CarouselComponent;

  public buttonsVisibilityData: Record<string, any>[] = [
    { text: 'Hidden', value: 'Hidden' },
    { text: 'Visible', value: 'Visible' },
    { text: 'Visible OnHover', value: 'VisibleOnHover' }
  ];
  public buttonsVisibilityValue: CarouselButtonVisibility = 'Visible';
  public buttonsVisibilityField: Record<string, any> = { text: 'text', value: 'value' };
  public buttonsVisibilityStateChange(args: ChangeEventArgs): void {
    this.carouselObj.buttonsVisibility = args.value as CarouselButtonVisibility;
    this.carouselObj.dataBind();
  }

  public showIndicatorsStateChange(args: SwitchChangeEventArgs): void {
    this.carouselObj.showIndicators = args.checked;
    this.carouselObj.dataBind();
  }

  public showPlayButtonStateChange(args: SwitchChangeEventArgs): void {
    this.carouselObj.showPlayButton = args.checked;
    this.carouselObj.dataBind();
  }

  public slideIntervalData: Record<string, any>[] = [
    { text: '3 Seconds', value: 3000 },
    { text: '5 Seconds', value: 5000 },
    { text: '7 Seconds', value: 7000 }
  ];
  public slideIntervalValue: number = 3000;
  public slideIntervalField: Record<string, any> = { text: 'text', value: 'value' };
  public slideIntervalStateChange(args: ChangeEventArgs): void {
    this.carouselObj.interval = args.value as number;
    this.carouselObj.dataBind();
  }

  public enableAutoplayStateChange(args: SwitchChangeEventArgs): void {
    this.carouselObj.autoPlay = args.checked;
    this.carouselObj.dataBind();
  }

  public infiniteLoopingStateChange(args: SwitchChangeEventArgs): void {
    this.carouselObj.loop = args.checked;
    this.carouselObj.dataBind();
  }

}
