import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'date-range.html',
    styleUrls: ['daterange-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DateRangeComponent {
    public minDate: Date = new Date('1/15/2017');
    public maxDate: Date = new Date('12/20/2017');
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['daterange-style.css'];
    }
}