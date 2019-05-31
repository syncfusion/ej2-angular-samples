import { Component, ViewEncapsulation } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
/**

 * Default TimePicker component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['format-style.css'],
    templateUrl: 'time-format.html',
    encapsulation: ViewEncapsulation.None
})
export class FormatTimePickerComponent {

    public value: Date = new Date();
    public interval: number = 60;
    public customFormat : string = 'HH:mm';
}