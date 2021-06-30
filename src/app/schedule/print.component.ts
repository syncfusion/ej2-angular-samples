import { extend } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, EventSettingsModel, PrintService, ScheduleModel,
  DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { scheduleData } from './data';

/**
 * Sample for print
 */

@Component({
  selector: 'control-content',
  templateUrl: 'print.html',
  styleUrls: ['print.style.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, PrintService],
  encapsulation: ViewEncapsulation.None
})
export class PrintComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  @ViewChild('printWithOptionsObj')
  public printWithOptionsObj: CheckBoxComponent;
  @ViewChild('heightObj')
  public heightObj: DropDownListComponent;
  @ViewChild('widthObj')
  public widthObj: DropDownListComponent;
  @ViewChild('selectedDateObj')
  public selectedDateObj: DatePickerComponent;

  public selectedDate: Date = new Date(2019, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };

  public printHeightAndWidthData: string[] = ['auto', '100%', '500px'];

  public onChange(args: { [key: string]: Object }): void {
    let classList: string[] = ['.e-height-row', '.e-width-row', '.e-selected-date-row'];
    for (let i: number = 0; i < classList.length; i++) {
      let element: HTMLElement = document.querySelector(classList[i]);
      if (args.checked) {
        element.classList.remove('e-hide-row');
      } else {
        element.classList.add('e-hide-row');
      }
    }
  }

  public onPrintClick(): void {
    if (this.printWithOptionsObj.checked) {
      let printOptions: ScheduleModel = {
        height: this.heightObj.value as string,
        width: this.widthObj.value as string,
        selectedDate: this.selectedDateObj.value as Date
      };
      this.scheduleObj.print(printOptions);
    } else {
      this.scheduleObj.print();
    }
  }
}
