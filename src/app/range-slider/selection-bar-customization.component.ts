import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderComponent, SliderChangeEventArgs, SliderModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Bar Customization sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'selection-bar-customization.html',
    styleUrls: ['selection-bar.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SliderModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class SelectionBarComponent {
    public value: number = 30;
    public min: number = 0;
    public max: number = 100;
    public gradient_value: number = 50;
    public range: string = 'MinRange';
    public sliderTrack: HTMLElement;
    public sliderHandle: HTMLElement;
    public dynamic_value: number = 20;
    // Handler used for slider created event
    created() {
        this.sliderTrack = document.getElementById('dynamic_color_slider').querySelector('.e-range');
        this.sliderHandle = document.getElementById('dynamic_color_slider').querySelector('.e-handle');
        (this.sliderHandle as HTMLElement).style.backgroundColor = 'green';
        (this.sliderTrack as HTMLElement).style.backgroundColor = 'green';
    }
    // Handler used for slider change event
    change(args: SliderChangeEventArgs) {
        const value = args.value as number;
        if (value > 0 && value <= 25) {
            // Change handle and range bar color to green when
            (this.sliderHandle as HTMLElement).style.backgroundColor = 'green';
            (this.sliderTrack as HTMLElement).style.backgroundColor = 'green';
        } else if (value > 25 && value <= 50) {
            // Change handle and range bar color to royal blue
            (this.sliderHandle as HTMLElement).style.backgroundColor = 'royalblue';
            (this.sliderTrack as HTMLElement).style.backgroundColor = 'royalblue';
        } else if (value > 50 && value <= 75) {
            // Change handle and range bar color to dark orange
            (this.sliderHandle as HTMLElement).style.backgroundColor = 'darkorange';
            (this.sliderTrack as HTMLElement).style.backgroundColor = 'darkorange';
        } else if (value > 75 && value <= 100) {
            // Change handle and range bar color to red
            (this.sliderHandle as HTMLElement).style.backgroundColor = 'red';
            (this.sliderTrack as HTMLElement).style.backgroundColor = 'red';
        }
    }
}
