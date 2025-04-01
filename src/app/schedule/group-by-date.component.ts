import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { resourceData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, GroupModel, DayService, MonthService, WeekService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'group-by-date.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, MonthService, WeekService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [CheckBoxModule, ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class GroupByDateComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public data: Record<string, any>[] = extend([], resourceData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2023, 0, 6);
  public resourceDataSource: Record<string, any>[] = [
    { text: 'Alice', id: 1, color: '#1aaa55', workDays: [1, 2, 3, 4] },
    { text: 'Smith', id: 2, color: '#7fa900', workDays: [2, 3, 5] }
  ];
  public group: GroupModel = { byDate: true, hideNonWorkingDays: true, resources: ['Owners'] };
  public allowMultiple = true;
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      subject: { title: 'Task', name: 'Subject' },
      location: { title: 'Project Name', name: 'Location' },
      description: { title: 'Comments', name: 'Description' }
    }
  };
   
  public onChange(args: ChangeEventArgs): void {
    this.scheduleObj.group.hideNonWorkingDays = args.checked;
  }
}