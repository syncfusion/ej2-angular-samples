import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
@Component({
    selector: 'control-content',
    templateUrl: 'disabled.html',
    styleUrls: ['disabled-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DateTimePickerModule]
})
export class DisabledDateTimePickerComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['disabled-style.css'];
    }
    onLoad(args: any) {
	/*Date need to be disabled*/
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
}