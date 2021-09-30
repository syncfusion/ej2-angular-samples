import { Component } from '@angular/core';
import { resourceData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, GroupModel, DayService, MonthService, WeekService, AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'group-by-date.html',
  providers: [DayService, MonthService, WeekService, AgendaService, ResizeService, DragAndDropService]
})
export class GroupByDateComponent {
  public data: Record<string, any>[] = extend([], resourceData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 3, 6);
  public resourceDataSource: Record<string, any>[] = [
    { text: 'Alice', id: 1, color: '#1aaa55' },
    { text: 'Smith', id: 2, color: '#7fa900' }
  ];
  public group: GroupModel = { byDate: true, resources: ['Owners'] };
  public allowMultiple = true;
  public eventSettings: EventSettingsModel = {
    dataSource: resourceData,
    fields: {
      subject: { title: 'Task', name: 'Subject' },
      location: { title: 'Project Name', name: 'Location' },
      description: { title: 'Comments', name: 'Description' }
    }
  };

}
