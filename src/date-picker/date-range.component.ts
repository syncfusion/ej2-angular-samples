import { Component, ViewEncapsulation, Inject } from '@angular/core';
@Component({
    selector: 'control-content',
    styleUrls: ['range-style.css'],
    templateUrl: 'date-range.html',
    encapsulation: ViewEncapsulation.None
})
export class RangeDatePickerComponent {
    public today: Date = new Date();
    public currentYear: number = this.today.getFullYear();
    public currentMonth: number = this.today.getMonth();
    public currentDay: number = this.today.getDate();
    public date: Date = new Date(this.currentYear, this.currentMonth, 14);
    public minDate: Date = new Date(this.currentYear, this.currentMonth, 7);
    public maxDate: Date = new Date(this.currentYear, this.currentMonth, 27)

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['range-style.css'];
    }
}