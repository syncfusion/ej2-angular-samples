import { Component, ViewEncapsulation } from '@angular/core';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';

/**
 * Default sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['slider.css'],
    encapsulation: ViewEncapsulation.None

})
export class DefaultSliderComponent {
    public value: number = 30;
    public rangevalue: Number[] = [30,70];
    public mintype: string = 'MinRange';
    public rangetype: string = 'Range';
}