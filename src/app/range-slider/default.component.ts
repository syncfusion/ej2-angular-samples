import { Component, ViewEncapsulation } from '@angular/core';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Default sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['slider.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SliderModule, SBDescriptionComponent]
})
export class DefaultSliderComponent {
    public value: number = 30;
    public rangevalue: Number[] = [30,70];
    public mintype: string = 'MinRange';
    public rangetype: string = 'Range';
}