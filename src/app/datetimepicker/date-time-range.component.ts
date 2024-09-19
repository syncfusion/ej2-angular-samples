import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
@Component({
    selector: 'control-content',
    styleUrls: ['range-style.css'],
    templateUrl: 'date-time-range.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DateTimePickerModule]
})
export class RangeDateTimePickerComponent {
    public today: Date = new Date();
    public currentYear: number = this.today.getFullYear();
    public currentMonth: number = this.today.getMonth();
    public currentDay: number = this.today.getDate();
    public date: Date = new Date(this.currentYear, this.currentMonth, 14, 10, 30);
    public minDate: Date = new Date(this.currentYear, this.currentMonth, 7, 10);
    public maxDate: Date = new Date(this.currentYear, this.currentMonth, 27, 22, 30);
    public minTime: Date = new Date(this.currentYear, this.currentMonth, 7, 10);
    public maxTime: Date = new Date(this.currentYear, this.currentMonth, 27, 20, 30);

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['range-style.css'];
    }
}