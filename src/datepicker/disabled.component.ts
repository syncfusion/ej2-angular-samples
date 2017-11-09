import { Component, ViewEncapsulation, Inject } from '@angular/core';
@Component({
    selector: 'control-content',
    templateUrl: 'disabled.html',
    styleUrls: ['datepicker-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DisabledDatePickerComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['datepicker-style.css'];
    }    
    onLoad(args: any) {
	/*Date need to be disabled*/
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
}