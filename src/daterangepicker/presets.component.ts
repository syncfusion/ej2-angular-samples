import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { PresetsArgs } from '@syncfusion/ej2-calendars';
@Component({
    selector: 'control-content',
    styleUrls: ['daterangepicker-style.css'],
    templateUrl: 'presets.html',
    encapsulation: ViewEncapsulation.None
})
export class PresetsComponent {
    public presets: PresetsArgs[] = [
        { label: 'This Week', start: new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)), end: new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 6 + 7)) },
        { label: 'This Month', start: new Date(new Date().setDate(1)), end: new Date() },
        { label: 'Last Month', start: new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)), end: new Date() },
        { label: 'Last Year', start: new Date(new Date().setDate(new Date().getDate() - 365)), end: new Date() },
    ]
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['daterangepicker-style.css'];
    }

}