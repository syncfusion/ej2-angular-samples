import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import {
  DropDownListComponent,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  MultiSelectComponent,
  MultiSelectModule,
  CheckBoxSelection,
} from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'control-content',
  templateUrl: 'date-time-format.html',
  styleUrls: ['format-style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [DateTimePickerModule, DropDownListModule, MultiSelectModule],
})
export class FormatDateTimePickerComponent {
  @ViewChild('listObj') public listObj: DropDownListComponent;
  @ViewChild('multiSelect') public multiSelect: MultiSelectComponent;

  public date: Object = new Date();
  public format: string = 'dd-MMM-yy hh:mm a';
  public inputFormats: string[] = ['dd/MM/yyyy HH:mm', 'yyyyMMdd HH:mm'];

  public formatData = [
    { id: 'format1', text: 'dd-MMM-yy hh:mm a' },
    { id: 'format2', text: 'yyyy-MM-dd HH:mm' },
    { id: 'format3', text: 'dd-MMMM HH:mm' },
  ];

  public inputFormatData: { text: string; value: string }[] = [
    { text: 'dd/MM/yyyy HH:mm', value: 'dd/MM/yyyy HH:mm' },
    { text: 'ddMMMyy HH:mm', value: 'ddMMMyy HH:mm' },
    { text: 'yyyyMMdd HH:mm', value: 'yyyyMMdd HH:mm' },
    { text: 'dd.MM.yy HH:mm', value: 'dd.MM.yy HH:mm' },
    { text: 'MM/dd/yyyy HH:mm', value: 'MM/dd/yyyy HH:mm' },
    { text: 'yyyy/MMM/dd HH:mm', value: 'yyyy/MMM/dd HH:mm' },
    { text: 'dd-MM-yyyy HH:mm', value: 'dd-MM-yyyy HH:mm' },
  ];

  constructor() {
    MultiSelectComponent.Inject(CheckBoxSelection);
  }

  changeFormat(event: any) {
    if (event && event.itemData) {
      this.format = event.itemData.text;
    }
  }

  changeInputFormats() {
    if (this.multiSelect && this.multiSelect.value) {
      this.inputFormats = this.multiSelect.value as string[];
    }
  }
}
