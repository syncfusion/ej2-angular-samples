import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SliderModule, SliderComponent } from '@syncfusion/ej2-angular-inputs';
import { Placement, SliderTooltipEventArgs, SliderTickEventArgs } from '@syncfusion/ej2-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip-customization.html',
    styleUrls: ['tooltip-customization.css'],
    encapsulation: ViewEncapsulation.None
})

export class TooltipCustomizationComponent {
    @ViewChild('slider')
    public defaultObj: any;
    @ViewChild('outslider')
    public outObj: any;
    public demo: Element;
    public source: Element;
    public ticks: Object = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    public tooltip: Object = {
        placement: 'Before', isVisible: true, cssClass: 'e-tooltip-cutomization'
    };
    public step: number = 3600000 / 6;
    public min: Object = new Date(2013, 6, 13, 11).getTime();
    public max: Object = new Date(2013, 6, 13, 23).getTime();
    public value: Array<any> = [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()];
    public slidervalue: Object = new Date(2013, 6, 13, 17).getTime();

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
    tooltipChangeHandler(args: SliderTooltipEventArgs): void {
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
        // Splitting the range values from the tooltip using space into an array.
        if (args.text.indexOf('-') !== -1) {
            let totalMiliSeconds: string[] = args.text.split(' ');
            // First part is the first handle value
            let firstPart: string = totalMiliSeconds[0];
            // Second part is the second handle value
            let secondPart: string = totalMiliSeconds[2];

            firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
            secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
            // Assigning our custom text to the tooltip value.
            args.text = firstPart + ' - ' + secondPart;
        } else {
            args.text = 'Until ' + new Date(Number(args.text)).toLocaleTimeString('en-us', custom);
        }
    }

    onCreated(args: any) {
        this.defaultObj.keyUp({ keyCode: 9, target: this.defaultObj.secondHandle });
        this.defaultObj.secondHandle.focus();
    }

    ngOnInit() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    }
    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        this.defaultObj.refreshTooltip(this.defaultObj.tooltipTarget);
        this.outObj.refreshTooltip(this.outObj.tooltipTarget);
    }
}
