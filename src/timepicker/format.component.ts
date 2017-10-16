import { Component, ViewEncapsulation } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-ng-calendars/src';
/**

 * Default TimePicker Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['timepicker-style.css'],
    templateUrl: 'format.html',
    encapsulation: ViewEncapsulation.None
})
export class FormatTimePickerComponent {

    public value: Date = new Date();
    public interval: number = 60;
    public customFormat : string = 'HH:mm';
}