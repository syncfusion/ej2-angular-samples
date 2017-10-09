import { Component, ViewEncapsulation, Inject } from '@angular/core';
@Component({
    selector: 'control-content',
    styleUrls: ['daterangepicker-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultDateRangePickerComponent {

    public date: Object = new Date()

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['daterangepicker-style.css'];
    }

}