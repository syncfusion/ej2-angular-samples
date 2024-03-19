import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { SelectedEventArgs, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ScheduleComponent, EventSettingsModel, View, DayService, DragAndDropService, WeekService, WorkWeekService, MonthService, AgendaService, ICalendarExportService, ICalendarImportService, ResizeService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'calendar-export-import.html',
    /* custom code start*/
    styleUrls: ['calendar-export-import.style.css'],
    /* custom code end*/
    encapsulation: ViewEncapsulation.None,
    providers: [
        DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService,
        ICalendarExportService, ICalendarImportService, DragAndDropService
    ],
    standalone: true,
    imports: [ScheduleModule, ButtonModule, UploaderModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class CalendarExportImportComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2021, 0, 10);
  public data: Record<string, any>[] = extend([], scheduleData, null, true) as Record<string, any>[];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';
  public showFileList = false;
  public multiple = false;
  public buttons: Record<string, any> = { browse: 'Choose file' };

  public onSelected(args: SelectedEventArgs): void {
    this.scheduleObj.importICalendar((args.event.target as HTMLInputElement).files[0]);
  }

  public onExportClick(): void {
    this.scheduleObj.exportToICalendar();
  }

}
