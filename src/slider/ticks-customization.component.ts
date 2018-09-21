import { Component, ViewEncapsulation, ViewChild} from '@angular/core';
import { SliderComponent } from '@syncfusion/ej2-angular-inputs';
import { SliderTickRenderedEventArgs, SliderTickEventArgs, Placement } from '@syncfusion/ej2-inputs'; 

/**
 * Ticks Customization sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'ticks-customization.html',
    styleUrls: ['ticks-customization.css'],
    encapsulation: ViewEncapsulation.None
})

export class TicksCustomizationComponent {
    public count: number = 1;
    public value: number = 20;
    public min: number = 0;
    public max: number = 100;
    public step: number = 5;
    public type: string = 'MinRange';
    public ticks: Object = { placement: 'Before', largeStep: 20 };
    public slider_ticks: Object = { placement: 'Both', largeStep: 20, smallStep: 5 };
    renderingTicks(args: SliderTickEventArgs) {
        if (args.tickElement.classList.contains('e-large')) {
            args.tickElement.classList.add('e-custom');
        }
    }
    renderedTicks(args: SliderTickRenderedEventArgs) {
        let li: any = args.ticksWrapper.getElementsByClassName('e-large');
        let remarks: any = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (let i: number = 0; i < li.length; ++i) {
            (li[i].querySelectorAll('.e-tick-both')[1] as HTMLElement).innerText = remarks[i];
        }
    }
}
