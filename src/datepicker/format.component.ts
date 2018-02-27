import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-ng-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'format.html',
    styleUrls: ['datepicker-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class FormatDatePickerComponent {
    public date: Object = new Date();
    public format: string = 'dd-MMM-yy';
    @ViewChild('listObj')
    public listObj: DropDownListComponent; 
    public floatLabelType:  FloatLabelType = 'Auto';
    public value: string = 'dd-MMM-yy';
    public formatData: string[] = ['dd-MMM-yy', 'yyyy-MM-dd', 'dd-MMMM'];
    changeFormat() {
	/*Apply selected format to the component*/
        let dateFormat: string = this.listObj.text;
        this.format = dateFormat;
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['datepicker-style.css'];
    }
}