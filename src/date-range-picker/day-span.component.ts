import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'day-span.html',
    styleUrls: ['dayspan-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DaySpanComponent {
    public minDays: number = 5;
    public maxDays: number = 10;
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['dayspan-style.css'];
    }
}