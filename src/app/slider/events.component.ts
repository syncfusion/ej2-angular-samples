import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderComponent, SliderChangeEventArgs } from '@syncfusion/ej2-angular-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * Default sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'events.html',
    styleUrls: ['events.css'],
    encapsulation: ViewEncapsulation.None
})

export class EventComponent {
    @ViewChild('eventSlider')
    public eventSlider: SliderComponent;
    public value: number = 30;
    public min: number = 0;
    public max: number = 100;
    public type: string = 'MinRange';
    public ticks: Object = { placement: 'Both', largeStep: 20, smallStep: 5, showSmallTicks: true };
    public tooltip: Object = { isVisible: true, placement: 'Before', showOn: 'Focus' };
    onCreated(event: any): void {
        this.appendElement('Slider control has been <b>created</b><hr>');
    }
    ngAfterViewInit() {
        document.getElementById('clear').onclick = () => {
            document.getElementById('EventLog').innerHTML = '';
        };
    }
    //Handler for change event trace
    onChange(args: SliderChangeEventArgs): void {
        this.appendElement('Slider value is <b>changing</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    }
    //Handler for changed event trace
    onChanged(args: SliderChangeEventArgs): void {
        this.appendElement('Slider value has been <b>changed</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    }
    //Display event log
    appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    ngOnInit() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    }
    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        let slider: any = [this.eventSlider];
        slider.forEach((slider: any) => {
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }
}
