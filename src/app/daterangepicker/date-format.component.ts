import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-angular-inputs';
import { DateRangePickerComponent, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MultiSelectComponent, MultiSelectModule, CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'date-format.html',
    styleUrls: ['format-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DateRangePickerModule, DropDownListModule, MultiSelectModule]
})
export class FormatComponent {
    @ViewChild('listObj') public listObj: DropDownListComponent;
    @ViewChild('multiSelect') public multiSelect: MultiSelectComponent;
    @ViewChild('dateformat')
    public DateRangeObj: DateRangePickerComponent;
    public format: string = 'dd/MMM/yy hh:mm a';
    public inputFormats: string[] = ['dd/MM/yyyy', 'yyyyMMdd'];
    public startDate: Date = new Date(new Date().setDate(1));
    public endDate: Date = new Date(new Date().setDate(20));
    public floatLabelType: FloatLabelType = 'Auto';
    public index: number = 0;
    public formatData = [
    { id: 'format1', text: 'dd/MMM/yy hh:mm a' },
    { id: 'format2', text: 'yyyy-MM-dd' },
    { id: 'format3', text: 'dd-MMMM-yyyy' },
    { id: 'format4', text: 'yyyy/MM/dd HH:mm' },
  ];

  public inputFormatData: { text: string; value: string }[] = [
    { text: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
    { text: 'ddMMMyy', value: 'ddMMMyy' },
    { text: 'yyyyMMdd', value: 'yyyyMMdd' },
    { text: 'dd.MM.yy', value: 'dd.MM.yy' },
    { text: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
    { text: 'yyyy/MMM/dd', value: 'yyyy/MMM/dd' },
    { text: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
  ];

    changeFormat(event: any) {
      if (event && event.itemData) {
        this.format = event.itemData.text;
        this.DateRangeObj.separator = (event.itemData.text === 'yyyy/MM/dd HH:mm') ? 'to' : '-';
      }
    }

    changeInputFormats() {
      if (this.multiSelect && this.multiSelect.value) {
        this.inputFormats = this.multiSelect.value as string[];
      }
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['format-style.css'];
        MultiSelectComponent.Inject(CheckBoxSelection);
    }
}