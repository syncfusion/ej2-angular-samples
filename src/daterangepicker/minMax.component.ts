import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-ng-calendars';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'minMax.html',
    styleUrls: ['daterangepicker-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MinMaxComponent {
    public minDate: Date = new Date('1/15/2017');
    public maxDate: Date = new Date('12/20/2017');
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['daterangepicker-style.css'];
    }
}