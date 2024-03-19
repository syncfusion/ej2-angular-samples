import { Component } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, TimelineViewsService, TimelineMonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { scheduleData, timelineData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'timeline.html',
    providers: [TimelineViewsService, TimelineMonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, DatePickerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class TimelineComponent {
  public selectedDate: Date = new Date(2021, 0, 10);
  public currentView: View = 'TimelineWeek';
  public workDays: number[] = [0, 1, 2, 3, 4, 5];
  public eventSettings: EventSettingsModel = {
    dataSource: extend([], scheduleData.concat(timelineData), null, true) as Record<string, any>[]
  };

}
