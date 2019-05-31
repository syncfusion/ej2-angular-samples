import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';
import {
  ScheduleComponent, EventSettingsModel, View, DayService, DragAndDropService,
  WeekService, WorkWeekService, MonthService, AgendaService, ICalendarExportService, ICalendarImportService, ResizeService
} from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';

@Component({
  selector: 'control-content',
  templateUrl: 'calendar-export-import.html',
  /* custom code start*/
  styleUrls: ['calendar-export-import.style.css'],
  /* custom code end*/
  encapsulation: ViewEncapsulation.None,
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService,
    ICalendarExportService, ICalendarImportService, DragAndDropService
  ]
})

export class CalendarExportImportComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2019, 0, 10);
  public data: Object[] = <Object[]>extend([], scheduleData, null, true);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';
  public showFileList: Boolean = false;
  public multiple: Boolean = false;
  public buttons: Object = { browse: 'Choose file' };

  public onSelected(args: SelectedEventArgs): void {
    this.scheduleObj.importICalendar((<HTMLInputElement>args.event.target).files[0]);
  }

  public onExportClick(): void {
    this.scheduleObj.exportToICalendar();
  }
}
