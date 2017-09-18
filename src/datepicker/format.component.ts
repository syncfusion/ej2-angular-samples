import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'format.html',
    styleUrls: ['datepicker-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class FormatDatePickerComponent {
    public date: Object = new Date();
    public format: string = 'dd-MMM-yy';
    changeFormat() {
        let dateFormat: string = (document.getElementById('dateFormats') as HTMLSelectElement).value;
        this.format = dateFormat;
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['datepicker-style.css'];
    }
}