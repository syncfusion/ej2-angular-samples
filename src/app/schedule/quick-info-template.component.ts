import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend, Internationalization, closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService, AgendaService, MonthAgendaService, ResourcesModel, CellClickEventArgs, CurrentAction, EventSettingsModel, EJ2Instance, CallbackFunction, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { quickInfoTemplateData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgStyle, NgTemplateOutlet } from '@angular/common';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'quick-info-template.html',
    styleUrls: ['quick-info-template.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, NgStyle, NgTemplateOutlet, TextBoxModule, DropDownListModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class QuickInfoTemplateComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('eventTypeObj') public eventTypeObj: DropDownListComponent;
  @ViewChild('titleObj') public titleObj: TextBoxComponent;
  @ViewChild('notesObj') public notesObj: TextBoxComponent;

  public eventSettings: EventSettingsModel = { dataSource: extend([], quickInfoTemplateData, null, true) as Record<string, any>[] };
  public selectedDate: Date = new Date(2021, 0, 9);
  public intl: Internationalization = new Internationalization();
  public roomFields: Record<string, any> = { text: 'Name', value: 'Id' };
  public roomData: Record<string, any>[] = [
    { Name: 'Jammy', Id: 1, Capacity: 20, Color: '#ea7a57', Type: 'Conference' },
    { Name: 'Tweety', Id: 2, Capacity: 7, Color: '#7fa900', Type: 'Cabin' },
    { Name: 'Nestle', Id: 3, Capacity: 5, Color: '#5978ee', Type: 'Cabin' },
    { Name: 'Phoenix', Id: 4, Capacity: 15, Color: '#fec200', Type: 'Conference' },
    { Name: 'Mission', Id: 5, Capacity: 25, Color: '#df5286', Type: 'Conference' },
    { Name: 'Hangout', Id: 6, Capacity: 10, Color: '#00bdae', Type: 'Cabin' },
    { Name: 'Rick Roll', Id: 7, Capacity: 20, Color: '#865fcf', Type: 'Conference' },
    { Name: 'Rainbow', Id: 8, Capacity: 8, Color: '#1aaa55', Type: 'Cabin' },
    { Name: 'Swarm', Id: 9, Capacity: 30, Color: '#df5286', Type: 'Conference' },
    { Name: 'Photogenic', Id: 10, Capacity: 25, Color: '#710193', Type: 'Conference' }
  ];

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['quick-info-template.style.css'];
  }

  public getResourceData(data: Record<string, any>): Record<string, any> {
    const resources: ResourcesModel = this.scheduleObj.getResourceCollections()[0];
    const resourceData: Record<string, any> = (resources.dataSource as Record<string, any>[]).filter((resource: Record<string, any>) =>
      resource.Id === data.RoomId)[0] as Record<string, any>;
    return resourceData;
  }

  public getHeaderStyles(data: Record<string, any>): Record<string, any> {
    if (data.elementType === 'cell') {
      return { 'align-items': 'center', color: '#919191' };
    } else {
      const resourceData: Record<string, any> = this.getResourceData(data);
      return { background: resourceData.Color, color: '#FFFFFF' };
    }
  }

  public getHeaderTitle(data: Record<string, any>): string {
    return (data.elementType === 'cell') ? 'Add Appointment' : 'Appointment Details';
  }

  public getHeaderDetails(data: { [key: string]: Date }): string {
    return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
      this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
      this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
  }

  public getEventType(data: { [key: string]: string }): string {
    const resourceData: Record<string, any> = this.getResourceData(data);
    return resourceData.Name as string;
  }

  public buttonClickActions(e: Event): void {
    const quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
    const getSlotData: CallbackFunction = (): Record<string, any> => {
      const subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      const notes = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      const addObj: Record<string, any> = {};
      addObj.Id = this.scheduleObj.getEventMaxID();
      addObj.Subject = isNullOrUndefined(subject) ? 'Add title' : subject;
      addObj.StartTime = new Date(this.scheduleObj.activeCellsData.startTime);
      addObj.EndTime = new Date(this.scheduleObj.activeCellsData.endTime);
      addObj.IsAllDay = this.scheduleObj.activeCellsData.isAllDay;
      addObj.Description = isNullOrUndefined(notes) ? 'Add notes' : notes;
      addObj.RoomId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
      return addObj;
    };
    if ((e.target as HTMLElement).id === 'add') {
      const addObj: Record<string, any> = getSlotData();
      this.scheduleObj.addEvent(addObj);
    } else if ((e.target as HTMLElement).id === 'delete') {
      const eventDetails: Record<string, any> = this.scheduleObj.activeEventData.event as Record<string, any>;
      let currentAction: CurrentAction;
      if (eventDetails.RecurrenceRule) {
        currentAction = 'DeleteOccurrence';
      }
      this.scheduleObj.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
      const eventDetails: Record<string, any> = isCellPopup ? getSlotData() :
        this.scheduleObj.activeEventData.event as Record<string, any>;
      let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
      if (eventDetails.RecurrenceRule) {
        currentAction = 'EditOccurrence';
      }
      this.scheduleObj.openEditor(eventDetails, currentAction, true);
    }
    this.scheduleObj.closeQuickInfoPopup();
  }

}
