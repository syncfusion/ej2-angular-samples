import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
@Component({
    selector: 'control-content',
    styleUrls: ['default-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DatePickerModule]
})
export class DefaultDatePickerComponent {

    public date: Object = new Date()

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default-style.css'];
    }

}