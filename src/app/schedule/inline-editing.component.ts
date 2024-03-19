import { Component, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, TimelineViewsService, TimelineMonthService, GroupModel, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { resourceData, timelineResourceData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'inline-editing.html',
    styles: [`
    .e-schedule .e-timeline-view .e-resource-left-td,
    .e-schedule .e-timeline-month-view .e-resource-left-td {
      width: 150px;
    }`],
    providers: [TimelineViewsService, TimelineMonthService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class InlineEditingComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public eventSettings: EventSettingsModel = {
    dataSource: extend([], resourceData.concat(timelineResourceData), null, true) as Record<string, any>[]
  };
  public selectedDate: Date = new Date(2023, 0, 4);
  public workDays: number[] = [0, 1, 2, 3, 4, 5];
  public allowInline = true;
  public allowMultiple = true;
  public groupSettings: GroupModel = { resources: ['Categories'] };
  public categoriesData: Record<string, any>[] = [
    { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
    { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
    { text: 'Michael', id: 5, groupId: 3, color: '#df5286' },
    { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
    { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' }
  ];
}
