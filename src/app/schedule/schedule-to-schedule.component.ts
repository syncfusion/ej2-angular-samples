import { Component, ViewChild} from '@angular/core';
import { extend, closest } from '@syncfusion/ej2-base';
import { MonthService, GroupModel, EventSettingsModel, ResizeService, DragAndDropService, ScheduleModule, Schedule, DragEventArgs} from '@syncfusion/ej2-angular-schedule';
import { timelineResourceData, resourceData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'schedule-to-schedule.html',
    styleUrls: ['schedule-to-schedule.css'],
    providers: [ MonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class MultipleSchedulerComponent {

    @ViewChild('firstScheduleObj') public firstScheduleObj!: Schedule;
    @ViewChild('secondScheduleObj') public secondScheduleObj!: Schedule;
  
    public selectedDate: Date = new Date(2023, 0, 4);

    public group: GroupModel = {
      resources: ['Employees']
    };
  
    public draggedEventDuration = 0;
  
    public firstScheduleEventSettings: EventSettingsModel = {
      dataSource: extend([], resourceData) as Record<string, any>[],
    };
  
    public secondEventSettings: EventSettingsModel = {
      dataSource: extend([], timelineResourceData, null, true) as Record< string, any>[],
    };

    public firstEmployeesData: Record<string, any>[] = [
      { text: 'Steven', id: 1, color: '#7fa900' }
    ];

    public secondEmployeesData: Record<string, any>[] = [
      { text: 'John', id: 2, color: '#ffb74d' }
    ];
  
    public handleDragStop( args: DragEventArgs, sourceSchedule: Schedule, targetSchedule: Schedule, targetSelector: string): void {
      if (closest(args.event.target as Element, targetSelector)) {
        args.cancel = true;
        const cellData = targetSchedule.getCellDetails(args.event.target as Element);
        if (cellData) {
          sourceSchedule.deleteEvent((args as any).data.Id);
          const resourceDetails = targetSchedule.getResourcesByIndex(cellData.groupIndex);
          let droppedEventStartTime: Date;
          let droppedEventEndTime: Date;
          const eventDuration = new Date(args.data.EndTime).getTime() - new Date(args.data.StartTime).getTime();
          if (!args.data.IsAllDay) {
              droppedEventStartTime = new Date(cellData.startTime);
              droppedEventStartTime.setHours(args.data.StartTime.getHours(), args.data.StartTime.getMinutes());
              droppedEventEndTime = new Date(droppedEventStartTime.getTime() + eventDuration);
          } else {
              droppedEventStartTime = cellData.startTime;
              droppedEventEndTime = new Date(droppedEventStartTime.getTime() + eventDuration);
          }
          const eventData = {
            Id: targetSchedule.getEventMaxID(),
            Subject: args.data.Subject,
            StartTime: droppedEventStartTime,
            EndTime: droppedEventEndTime,
            IsAllDay: args.data.IsAllDay,
            Location: args.data.Location,
            Description: args.data.Description,
            StartTimezone: args.data.StartTimezone,
            EndTimezone: args.data.EndTimezone,
            TaskId: resourceDetails.resourceData.id
          };
          targetSchedule.addEvent(eventData);
          const classElement = sourceSchedule.element.querySelector('.e-selected-cell') as HTMLElement;
          if (classElement) {
            classElement.classList.remove('e-selected-cell');
          }
        }
      }
    }
  
    public DragEventFromFirstSchedule(args: DragEventArgs): void {
      this.handleDragStop( args, this.firstScheduleObj, this.secondScheduleObj, '#second-schedule');
    }
  
    public DragEventFromSecondSchedule(args: DragEventArgs): void {
      this.handleDragStop( args, this.secondScheduleObj, this.firstScheduleObj, '#first-schedule' );
    }

}
