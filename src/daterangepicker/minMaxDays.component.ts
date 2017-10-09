import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-ng-calendars';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'minMaxDays.html',
    styleUrls: ['daterangepicker-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MinMaxDaysComponent {
    public minDays: number = 5;
    public maxDays: number = 10;
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['daterangepicker-style.css'];
    }
}