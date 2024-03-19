import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderComponent, SliderModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Thumb Customization sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'thumb-customization.html',
    styleUrls: ['thumb-customization.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SliderModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class ThumbCustomizationComponent {
    public value: number = 30;
    public min: number = 0;
    public max: number = 100;
    public ticks: Object = {
        placement: 'After'
    };
}
