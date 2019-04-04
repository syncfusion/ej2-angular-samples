import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderComponent } from '@syncfusion/ej2-angular-inputs';

/**
 * Thumb Customization sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'thumb-customization.html',
    styleUrls: ['thumb-customization.css'],
    encapsulation: ViewEncapsulation.None
})

export class ThumbCustomizationComponent {
    public value: number = 30;
    public min: number = 0;
    public max: number = 100;
    public ticks: Object = {
        placement: 'After'
    };
}
