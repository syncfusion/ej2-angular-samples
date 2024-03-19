import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DatePickerComponent, CalendarView, DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'month-picker.html',
    styleUrls: ['month-picker.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DatePickerModule]
})
export class MonthPickerComponent {
    public start: CalendarView = 'Year';
    public depth: CalendarView = 'Year';
    public format: string = 'MMMM y'
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['month-picker.css'];
    }
}