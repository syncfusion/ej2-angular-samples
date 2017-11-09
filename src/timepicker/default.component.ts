import { Component, ViewEncapsulation, Inject, OnInit, ViewChild } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-ng-calendars/src';
/**

 * Default TimePicker component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['timepicker-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultTimePickerComponent {
    public watermark: string = 'Select a time';
}