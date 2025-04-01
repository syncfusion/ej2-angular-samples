import { Component } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { scheduleOverlapData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'overlap-events.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, DatePickerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class OverlapEventsComponent {
  public selectedDate: Date = new Date(2025, 1, 12);
  public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleOverlapData, null, true) as Record<string, any>[] };
}
