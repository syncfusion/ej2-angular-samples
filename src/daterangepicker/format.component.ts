import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns';
import {  FloatLabelType } from '@syncfusion/ej2-ng-inputs';
import { DateRangePickerComponent } from '@syncfusion/ej2-ng-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'format.html',
    styleUrls: ['format-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class FormatComponent {
    @ViewChild('dateformat')
    public DateRangeObj: DateRangePickerComponent;
    public date: Object = new Date();
    public format: string = 'dd\'\/\'MMM\'\/\'yy hh:mm a';
    public startDate: Date = new Date(new Date().setDate(1));
    public endDate: Date = new Date(new Date().setDate(20));
    @ViewChild('listObj')
    public listObj: DropDownListComponent;
    public floatLabelType: FloatLabelType = 'Auto';
    public index: number = 0;
    public formatData:  { [key:  string]:  Object  }[]  =  [
        {  Id:  '1',  value:  'dd\'\/\'MMM\'\/\'yy hh:mm a',  text:  'dd/MMM/yy hh:mm a'  },
        {  Id:  '2',  value:  'yyyy\'\/\'MM\'\/\'dd HH:mm',  text:  'yyyy/MM/dd HH:mm'  },
        {  Id:  '3',  value:  'dd\'\/\'MMMM HH:mm',  text:  'dd/MMMM hh:mm a'  },
    ];
    public  fields:  Object  =  {  value:  'value',  text:  'text'  };
    changeFormat() {
        /*Apply selected format to the component*/
        let dateFormat: any = this.listObj.value;
        this.format = dateFormat;
        this.DateRangeObj.separator = (this.listObj.text === 'yyyy/MM/dd HH:mm') ? 'to' : '-';
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['format-style.css'];
    }
}