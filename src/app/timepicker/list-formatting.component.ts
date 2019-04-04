import { Component, ViewEncapsulation, Inject, OnInit, ViewChild } from '@angular/core';
import { TimePickerComponent, ItemEventArgs } from '@syncfusion/ej2-angular-calendars';
/**

 * List formatting TimePicker component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['list-formatting.css'],
    templateUrl: 'list-formatting.html',
    encapsulation: ViewEncapsulation.None
})
export class ListFormattingTimePickerComponent {
    @ViewChild('duration')
    public startObject: TimePickerComponent;
    public timevalue: Date = new Date();
    //initial time variable declaration
    public startTime: Date;
    public onOpen(): void {
        // scrollTo value will be assigned only if the timepicker value is not null or undefined and is a valid value.
        if (this.startObject.value && !isNaN(+this.startObject.value)) {
            // assign the current value as the scrollTo value
            this.startObject.scrollTo = this.startObject.value;
        }
    }
    public itemRenderHandler(args: ItemEventArgs): void {
        /*Enables end time if start time is selected*/
        // inner element declaration for text
        let span: HTMLElement = document.createElement('span');
        if (args.value.getHours() === 0 && args.value.getMinutes() === 0 && args.value.getMinutes() === 0) {
            //assign the initial value to the variable
            this.startTime = args.value;
        }
        //get the minutes details
        let minutes: number = (+args.value - +this.startTime) / 60000;
        //get the hours details
        let hours: number = parseInt('' + (minutes / 60), 10);
        let mins: number = (minutes % 60) / 6;
        //displayed text formation for each LI element.
        let minText: string;
        let minsText: string = ' mins';
        let hrsText: string = ' hrs';
        if (this.startObject.locale != 'en') {
            if (this.startObject.locale === 'fr-CH') {
                minsText = ' minutes';
                hrsText = ' heures';
            }
            if (this.startObject.locale === 'de') {
                minsText = ' minuten';
                hrsText = ' stunden';
            }
            if (this.startObject.locale === 'ar') {
                minsText = ' دقيقة';
                hrsText = ' ساعة';
            }
            if (this.startObject.locale === 'zh') {
                minsText = ' 分鐘';
                hrsText = ' 小時';
            }
        }
        if (minutes === 0 || minutes === 30) {
            minText = minutes + minsText;
        } else {
            minText = (mins > 0) ? ('.' + mins) : '';
        }
        span.innerHTML = ' (' + ((hours > 0) ? (hours + minText + hrsText) : ('' + minText)) + ')';

        //disable the specific time from the selection
        if ((minutes / 60) % 3 === 0) {
            //disable the time values by addeding the e-disabled class.
            args.element.classList.add('e-disabled');
        }

        //append the custom SPAN element into LI element
        args.element.appendChild(span);
    }
}