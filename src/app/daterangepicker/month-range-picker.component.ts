import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DateRangePickerComponent, CalendarView } from '@syncfusion/ej2-angular-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'month-range-picker.html',
    styleUrls: ['month-range-picker.css'],
    encapsulation: ViewEncapsulation.None
})
export class MonthRangePickerComponent {
    public start: CalendarView = 'Year';
    public depth: CalendarView = 'Year';
    public format: string = 'MMM yyyy';
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['month-range-picker.css'];
    }
}