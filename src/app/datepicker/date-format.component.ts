import { Component, ViewEncapsulation,Inject , ViewChild } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MultiSelectComponent, MultiSelectModule, CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'control-content',
  templateUrl: 'date-format.html',
  styleUrls: ['format-style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [DatePickerModule, DropDownListModule, MultiSelectModule],
})
export class FormatDatePickerComponent {
  @ViewChild('listObj') public listObj: DropDownListComponent;
  @ViewChild('multiSelect') public multiSelect: MultiSelectComponent;

  public date: Object = new Date();
  public format: string = 'dd-MMM-yy';
  public inputFormats: string[] = ['dd/MM/yyyy', 'yyyyMMdd'];

  public formatData = [
    { id: 'format1', text: 'dd-MMM-yy' },
    { id: 'format2', text: 'yyyy-MM-dd' },
    { id: 'format3', text: 'dd-MMMM-yyyy' },
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

  constructor() {
    // Inject checkbox selection module for MultiSelect
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
