import { Component, ViewEncapsulation, Inject } from '@angular/core';
@Component({
    selector: 'control-content',
    styleUrls: ['datepicker-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultDatePickerComponent {

    public date: Object = new Date()

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['datepicker-style.css'];
    }

}