import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { doctorData } from './data';
import { addClass, extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, GroupModel, ResourceDetails, PopupOpenEventArgs, ScheduleComponent, EventFieldsMapping, RenderCellEventArgs, MonthService, WorkWeekService, ActionEventArgs, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'group-custom-work-days.html',
    styleUrls: ['group-custom-work-days.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MonthService, WorkWeekService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class GroupCustomWorkDaysComponent {
  public data: Record<string, any>[] = extend([], doctorData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 3, 6);
  public currentView: View = 'WorkWeek';
  public allowResizing = false;
  public allowDragDrop = false;
  public resourceDataSource: Record<string, any>[] = [
    { text: 'Will Smith', id: 1, color: '#ea7a57', workDays: [1, 2, 4, 5], startHour: '08:00', endHour: '15:00' },
    { text: 'Alice', id: 2, color: 'rgb(53, 124, 210)', workDays: [1, 3, 5], startHour: '08:00', endHour: '17:00' },
    { text: 'Robson', id: 3, color: '#7fa900', startHour: '08:00', endHour: '16:00' }
  ];
  public group: GroupModel = { resources: ['Doctors'] };
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      subject: { title: 'Service Type', name: 'Subject' },
      location: { title: 'Patient Name', name: 'Location' },
      description: { title: 'Summary', name: 'Description' },
      startTime: { title: 'From', name: 'StartTime' },
      endTime: { title: 'To', name: 'EndTime' }
    }
  };
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['group-custom-work-days.style.css'];
  }

  public getDoctorName(value: ResourceDetails): string {
    return ((value as ResourceDetails).resourceData) ?
      (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
      : value.resourceName;
  }

  public getDoctorImage(value: ResourceDetails): string {
    const resourceName: string = this.getDoctorName(value);
    return resourceName.replace(' ', '-').toLowerCase();
  }

  public getDoctorLevel(value: ResourceDetails): string {
    const resourceName: string = this.getDoctorName(value);
    return (resourceName === 'Will Smith') ? 'Cardiologist' : (resourceName === 'Alice') ? 'Neurologist' : 'Orthopedic Surgeon';
  }

  public onActionBegin(args: ActionEventArgs): void {
    if ((args.requestType === 'eventCreate' && (args.data as Record<string, any>[]).length > 0) || args.requestType === 'eventChange') {
      const eventData: Record<string, any> = (args.data instanceof Array) ? args.data[0] : args.data;
      const startDate: Date = eventData[this.scheduleObj.eventFields.startTime] as Date;
      const endDate: Date = eventData[this.scheduleObj.eventFields.endTime] as Date;
      const resourceIndex: number = [1, 2, 3].indexOf(eventData.DoctorId as number);
      args.cancel = !this.isValidateTime(startDate, endDate, resourceIndex);
      if (!args.cancel) {
        args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate, resourceIndex);
      }
    }
  }

  public isValidateTime(startDate: Date, endDate: Date, resIndex: number): boolean {
    const resource: ResourceDetails = this.scheduleObj.getResourcesByIndex(resIndex);
    const startHour: number = parseInt(resource.resourceData.startHour.toString().slice(0, 2), 10);
    const endHour: number = parseInt(resource.resourceData.endHour.toString().slice(0, 2), 10);
    return (startHour <= startDate.getHours() && endHour >= endDate.getHours());
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.target && args.target.classList.contains('e-work-cells')) {
      args.cancel = !args.target.classList.contains('e-work-hours');
    }
  }

  public onRenderCell(args: RenderCellEventArgs): void {
    if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
      addClass([args.element], ['willsmith', 'alice', 'robson'][parseInt(args.element.getAttribute('data-group-index'), 10)]);
    }
  }

}
