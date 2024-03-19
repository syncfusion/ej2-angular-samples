import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MaskedDateTimeService, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
@Component({
    selector: 'control-content',
    styleUrls: ['default-style.css'],
    templateUrl: 'input-mask.html',
    providers: [MaskedDateTimeService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DateTimePickerModule]
})
export class MaskSupportDateTimePickerComponent {

    public format: string = "M/d/yyyy hh:mm a";
    public enableMaskSupport: boolean = true;

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default-style.css'];
    }

}