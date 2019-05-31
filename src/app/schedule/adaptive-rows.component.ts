import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import {
  ScheduleComponent, DragAndDropService, TimelineViewsService, GroupModel, EventSettingsModel, ResizeService, View
} from '@syncfusion/ej2-angular-schedule';
import { roomData } from './data';

@Component({
  selector: 'control-content',
  templateUrl: 'adaptive-rows.html',
  styleUrls: ['adaptive-rows.style.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, ResizeService, DragAndDropService]
})

export class AdaptiveRowsComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2018, 7, 1);
  public rowAutoHeight: Boolean = true;
  public currentView: View = 'TimelineWeek';
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['MeetingRoom']
  };
  public allowMultiple: Boolean = true;
  public resourceDataSource: Object[] = [
    { text: 'Room A', id: 1, color: '#98AFC7' },
    { text: 'Room B', id: 2, color: '#99c68e' },
    { text: 'Room C', id: 3, color: '#C2B280' },
    { text: 'Room D', id: 4, color: '#3090C7' },
    { text: 'Room E', id: 5, color: '#95b9' },
    { text: 'Room F', id: 6, color: '#95b9c7' },
    { text: 'Room G', id: 7, color: '#deb887' },
    { text: 'Room H', id: 8, color: '#3090C7' },
    { text: 'Room I', id: 9, color: '#98AFC7' },
    { text: 'Room J', id: 10, color: '#778899' }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: <Object[]>extend([], roomData, null, true),
    fields: {
      id: 'Id',
      subject: { name: 'Subject', title: 'Summary' },
      location: { name: 'Location', title: 'Location' },
      description: { name: 'Description', title: 'Comments' },
      startTime: { name: 'StartTime', title: 'From' },
      endTime: { name: 'EndTime', title: 'To' }
    }
  };

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['adaptive-rows.style.css'];
  }

  onChange(args: ChangeEventArgs): void {
    this.scheduleObj.rowAutoHeight = args.checked;
  }
}
