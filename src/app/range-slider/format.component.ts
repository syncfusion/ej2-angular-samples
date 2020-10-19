import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderModule, SliderComponent } from '@syncfusion/ej2-angular-inputs';
import { SliderTooltipEventArgs, SliderTickEventArgs } from '@syncfusion/ej2-inputs';

/**
 * Format samples
 */

@Component({
    selector: 'control-content',
    templateUrl: 'format.html',
    styleUrls: ['format.css'],
    encapsulation: ViewEncapsulation.None
})
export class FormatSliderComponent {
    @ViewChild('currency')
    public currencyObj: SliderComponent;
    @ViewChild('kilometer')
    public kilometerObj: SliderComponent;
    @ViewChild('time')
    public timeObj: SliderComponent;

    public min: number = 0;
    public max: number = 100;
    public value: number[] = [20, 80];
    public tooltip: Object = {
        placement: 'Before',
        isVisible: true,
        // Formatting tooltip value in currency with 2-decimal specifier.
        format: 'c2'
    };
    public ticks: Object = {
        placement: 'After',
        largeStep: 20,
        smallStep: 5,
        showSmallTicks: true,
        // Formatting ticks value in currency with 3-decimal specifier.
        format: 'c1'
    };
    public rangetype: string = 'Range';

    //Initialize Slider

    public kilovalue: number[] = [1100, 1850];
    public minkilo: number = 900;
    public maxkilo: number = 2100;
    public kilotooltip: Object = {
        placement: 'Before',
        isVisible: true,
        /**
         * Formatting tooltip value in numeric with 2-decimal specifier if the any decimal values occurred.
         * Zeros will be filled if the values are not in 4-digits in the fractional part.
         */
        format: '00##.## km'
    };
    public kiloticks: Object = {
        placement: 'After',
        largeStep: 400,
        smallStep: 100,
        showSmallTicks: true,
        /**
         * Formatting ticks value in numeric with 2-decimal specifier if the any decimal values occurred.
         * Zeros will be filled if the values are not in 4-digits in the fractional part.
         */
        format: '00##.## km'
    };

    // Initialize Slider
    public mintime: number = new Date(2013, 6, 13, 11).getTime();
    public maxtime: number = new Date(2013, 6, 13, 23).getTime();
    // 3600000 milliseconds = 1 Hour, 3600000 / 6 milliseconds = 10 Minutes
    public steptime: number = 3600000 / 6;
    public timevalue: number[] = [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()];
    public timetooltip: Object = {
        placement: 'Before',
        isVisible: true,
    };
    public timeticks: Object = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    tooltipChangeHandler(args: SliderTooltipEventArgs): void {
        // Splitting the range values from the tooltip using space into an array.
        let totalMiliSeconds: string[] = args.text.split(' ');
        // First part is the first handle value
        let firstPart: string = totalMiliSeconds[0];
        // Second part is the second handle value
        let secondPart: string = totalMiliSeconds[2];
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
        firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
        secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
        // Assigning our custom text to the tooltip value.
        args.text = firstPart + ' - ' + secondPart;
    }

    renderingTicksHandler(args: SliderTickEventArgs): void {
        let totalMiliSeconds: number = Number(args.value);
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
        // Assigning our custom text to the tick value.
        args.text = new Date(totalMiliSeconds).toLocaleTimeString('en-us', custom);
    }

    ngOnInit() {
        document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
    }
    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        let slider: any = [this.currencyObj, this.kilometerObj, this.timeObj];
        slider.forEach((slider: any) => {
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }
}
