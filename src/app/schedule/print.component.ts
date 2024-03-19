import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, PrintService, ScheduleModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CheckBoxComponent, CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerComponent, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { scheduleData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for print
 */

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'print.html',
    styleUrls: ['print.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, PrintService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, CheckBoxModule, DropDownListModule, DatePickerModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class PrintComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('printWithOptionsObj') public printWithOptionsObj: CheckBoxComponent;
  @ViewChild('heightObj') public heightObj: DropDownListComponent;
  @ViewChild('widthObj') public widthObj: DropDownListComponent;
  @ViewChild('selectedDateObj') public selectedDateObj: DatePickerComponent;

  public selectedDate: Date = new Date(2021, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleData, null, true) as Record<string, any>[] };
  public printHeightAndWidthData: string[] = ['auto', '100%', '500px'];

  public onChange(args: Record<string, any>): void {
    const classLists: string[] = ['.e-height-row', '.e-width-row', '.e-selected-date-row'];
    for (const classList of classLists) {
      const element: HTMLElement = document.querySelector(classList);
      if (args.checked) {
        element.classList.remove('e-hide-row');
      } else {
        element.classList.add('e-hide-row');
      }
    }
  }

  public onPrintClick(): void {
    if (this.printWithOptionsObj.checked) {
      const printOptions: ScheduleModel = {
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
