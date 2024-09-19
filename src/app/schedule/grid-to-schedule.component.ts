import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend, closest } from '@syncfusion/ej2-base';
import { TimelineViewsService, AgendaService, GroupModel, EventSettingsModel, ResizeService, DragAndDropService,
  ScheduleModule, Schedule} from '@syncfusion/ej2-angular-schedule';
import { timelineResourceData, resourceData } from './data';
import { RowDDService, EditService, GridComponent, EditSettingsModel, RowDropSettingsModel, GridModule,} from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'grid-to-schedule.html',
    styleUrls: ['grid-to-schedule.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ TimelineViewsService, AgendaService, ResizeService, DragAndDropService, RowDDService, EditService],
    standalone: true,
    imports: [ScheduleModule,GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class EventsGridFromScheduleComponent {
  
  @ViewChild('scheduleObj') public scheduleObj!: Schedule;
  @ViewChild('gridObj') public gridObj!: GridComponent;

  public selectedDate: Date = new Date(2023, 0, 4);
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Employees'],
  };
  public eventSettings: EventSettingsModel = {
    dataSource: extend( [], resourceData.concat(timelineResourceData), null, true ) as Record<string, any>[],
  };
  public employeesData: Record<string, any>[] = [
    { text: 'Nancy', id: 1, color: '#df5286' },
    { text: 'Steven', id: 2, color: '#7fa900' },
    { text: 'Robert', id: 3, color: '#ea7a57' },
    { text: 'Smith', id: 4, color: '#5978ee' },
    { text: 'Michael', id: 5, color: '#00bdae' },
    { text: 'Root', id: 6, color: '#f57b42' },
    { text: 'John', id: 7, color: '#1aaa55' },
    { text: 'Stellah', id: 8, color: '#ffb74d' },
    { text: 'Chirish', id: 9, color: '#7460ee' },
    { text: 'Megan', id: 10, color: '#c0ca33' },
  ];
  public gridData: Record<string, any>[] = [
    { Task: 'Test report validation', Duration: '3 Hours' },
    { Task: 'Timeline estimation', Duration: '4 Hours' },
    { Task: 'Workflow Analysis', Duration: '2 Hours' },
    { Task: 'Quality Analysis', Duration: '5 Hours' },
    { Task: 'Cross-browser testing', Duration: '1 Hour' },
    { Task: 'Resolution-based testing', Duration: '3 Hours' },
    { Task: 'Project Preview', Duration: '6 Hours' },
    { Task: 'Developers Meeting', Duration: '2 Hours' },
    { Task: 'Test case correction', Duration: '7 Hours' },
    { Task: 'Debugging', Duration: '4 Hours' },
    { Task: 'Exception handling', Duration: '5 Hours' },
    { Task: 'Bug fixing', Duration: '1 Hour' },
    { Task: 'Bug Automation', Duration: '3 Hours' },
    { Task: 'Bug fixing', Duration: '6 Hours' },
  ];
  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
  };
  public rowDropSettings: RowDropSettingsModel = { targetID: 'Schedule' };

  public calculateEventDuration(startTime: Date, endTime: Date): string {
    const durationInMilliseconds: number = endTime.getTime() - startTime.getTime();
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return durationInHours + ' Hours';
  }

  public handleDragStop(args: any): void {
    if (closest(args.event.target, '#Grid')) {
      this.scheduleObj.deleteEvent(args.data.Id as string);
      const startTime = new Date(args.data.StartTime as string);
      const endTime = new Date(args.data.EndTime as string);
      const formattedDuration = this.calculateEventDuration(startTime, endTime);
      const gridRecord = {
        Task: args.data.Subject,
        Duration: formattedDuration,
      };
      this.gridObj.addRecord(gridRecord);
    }
  }

  public onRowDrag(event: any): void {
    event.cancel = true;
  }

  public onRowDrop(args: any): void {
    args.cancel = true;
    const scheduleElement = closest(args.target, '.e-content-wrap');
    if (scheduleElement && args.target.classList.contains('e-work-cells')) {
      const cellData = this.scheduleObj.getCellDetails(args.target);
      const resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
      const durationStr = args.data[0].Duration;
      const durationHours = parseInt(durationStr.split(' ')[0], 10);
      const startTime = new Date(cellData.startTime);
      const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);
      const eventData = {
        Id: Number(this.scheduleObj.getEventMaxID()) + 1,
        Subject: args.data[0].Task,
        StartTime: startTime,
        EndTime: endTime,
        TaskId: resourceDetails.resourceData.id,
      };
      this.scheduleObj.addEvent(eventData);
      this.gridObj.deleteRecord(args.data[0]);
    }
  }

  public onDataBound(): void {
    let resourceDataCounter = 0;
    const cells = this.scheduleObj.element.querySelectorAll('.e-resource-cells .e-resource-text');
    cells.forEach((cell: any) => {
      const workcells = document.querySelector('.e-work-cells');
      if (!workcells) return;
      const timestamp = Number(workcells.getAttribute('data-date'));
      const startDate = new Date(timestamp);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      const events = this.scheduleObj.getEvents(startDate, endDate, true);
      const dataSource = this.scheduleObj.resourceCollection[0].dataSource;
      if (Array.isArray(dataSource)) {
        if (resourceDataCounter < dataSource.length) {
          resourceDataCounter++;
        }
        const resourceEvents = events.filter((event: any) => event.TaskId === resourceDataCounter);
        const currentText = (cell as HTMLElement).innerText;
        const eventCount = resourceEvents.length;
        const resourceName = currentText.split('(')[0].trim();
        (cell as HTMLElement).innerText = resourceName + ' (' + eventCount + ')';
      }
    });
  }
}
