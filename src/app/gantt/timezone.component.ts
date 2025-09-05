import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  selector: 'ej2-gantttimeline',
  templateUrl: 'timezone.html',
  styleUrls: ['timezone.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, GanttAllModule, ComboBoxModule, DropDownListModule, ButtonModule, SBDescriptionComponent]
})
export class GanttTimezoneComponent implements OnInit {
  @ViewChild('gantt') public ganttObj: GanttComponent;
  @ViewChild('timezonelist') public timeZoneList: ComboBoxComponent;
  @ViewChild('timeline') public timelineList: DropDownListComponent;
  @ViewChild('previousTimespan') public leftTimespanButton: ButtonComponent;
  @ViewChild('nextTimespan') public rightTimespanButton: ButtonComponent;
  @ViewChild('toolbarContainer', { static: false }) toolbarContainer!: ElementRef;
  constructor(private renderer: Renderer2) { }
  public data: object[];
  public taskSettings: object;
  public columns: object[];
  public timelineSettings: object;
  public toolbar: any[];
  public dayWorkingTime: object[];
  public timeZoneData: { id: string, text: string }[];
  public timelineData: string[];
  public timezoneValue: string = 'UTC';

  public ngOnInit(): void {
    this.data = [
      { taskID: 1, taskName: 'Project Schedule', startDate: new Date('02/04/2025 08:00'), endDate: new Date('03/10/2025') },
      { taskID: 2, taskName: 'Planning', startDate: new Date('02/04/2025 08:00'), endDate: new Date('02/10/2025'), parentID: 1 },
      { taskID: 3, taskName: 'Plan timeline', startDate: new Date('02/04/2025 08:00'), endDate: new Date('02/10/2025'), duration: 6, progress: '60', parentID: 2 },
      { taskID: 4, taskName: 'Plan budget', startDate: new Date('02/04/2025 08:00'), endDate: new Date('02/10/2025'), duration: 6, progress: '90', parentID: 2 },
      { taskID: 5, taskName: 'Allocate resources', startDate: new Date('02/04/2025 08:00'), endDate: new Date('02/10/2025'), duration: 6, progress: '75', parentID: 2 },
      { taskID: 6, taskName: 'Planning complete', startDate: new Date('02/06/2025 08:00'), endDate: new Date('02/10/2025'), duration: 0, predecessor: '3FS,4FS,5FS', parentID: 2 },
      { taskID: 7, taskName: 'Design', startDate: new Date('02/13/2025 08:00'), endDate: new Date('02/17/2025 08:00'), parentID: 1 },
      { taskID: 8, taskName: 'Software Specification', startDate: new Date('02/13/2025 08:00'), endDate: new Date('02/15/2025'), duration: 3, progress: '60', predecessor: '6FS', parentID: 7 },
      { taskID: 9, taskName: 'Develop prototype', startDate: new Date('02/13/2025 08:00'), endDate: new Date('02/15/2025'), duration: 3, progress: '100', predecessor: '6FS', parentID: 7 },
      { taskID: 10, taskName: 'Get approval from customer', startDate: new Date('02/16/2025 08:00'), endDate: new Date('02/17/2025 08:00'), duration: 2, progress: '100', predecessor: '9FS', parentID: 7 },
      { taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2025 08:00'), endDate: new Date('02/17/2025 08:00'), duration: 0, predecessor: '10FS', parentID: 7 },
      { taskID: 12, taskName: 'Implementation', startDate: new Date('02/18/2025 08:00'), endDate: new Date('02/25/2025 08:00'), parentID: 1 },
      { taskID: 13, taskName: 'Develop core modules', startDate: new Date('02/18/2025 08:00'), endDate: new Date('02/22/2025'), duration: 5, progress: '80', predecessor: '11FS', parentID: 12 },
      { taskID: 14, taskName: 'Integrate modules', startDate: new Date('02/19/2025 08:00'), endDate: new Date('02/23/2025'), duration: 5, progress: '70', predecessor: '13FS', parentID: 12 },
      { taskID: 15, taskName: 'Implementation complete', startDate: new Date('02/25/2025 08:00'), endDate: new Date('02/25/2025 08:00'), duration: 0, predecessor: '14FS', parentID: 12 },
      { taskID: 16, taskName: 'Testing', startDate: new Date('02/26/2025 08:00'), endDate: new Date('03/02/2025 08:00'), parentID: 1 },
      { taskID: 17, taskName: 'Unit testing', startDate: new Date('02/26/2025 08:00'), endDate: new Date('02/28/2025'), duration: 3, progress: '50', predecessor: '15FS', parentID: 16 },
      { taskID: 18, taskName: 'Integration testing', startDate: new Date('02/27/2025 08:00'), endDate: new Date('03/01/2025'), duration: 4, progress: '40', predecessor: '17FS', parentID: 16 },
      { taskID: 19, taskName: 'Test report', startDate: new Date('03/02/2025 08:00'), endDate: new Date('03/02/2025 08:00'), duration: 0, predecessor: '18FS', parentID: 16 },
      { taskID: 20, taskName: 'Deployment', startDate: new Date('03/03/2025 08:00'), endDate: new Date('03/06/2025 08:00'), parentID: 1 },
      { taskID: 21, taskName: 'Configure environment', startDate: new Date('03/03/2025 08:00'), endDate: new Date('03/04/2025'), duration: 2, progress: '30', predecessor: '19FS', parentID: 20 },
      { taskID: 22, taskName: 'Deploy application', startDate: new Date('03/04/2025 08:00'), endDate: new Date('03/05/2025'), duration: 2, progress: '20', predecessor: '21FS', parentID: 20 },
      { taskID: 23, taskName: 'Deployment verification', startDate: new Date('03/06/2025 08:00'), endDate: new Date('03/06/2025 08:00'), duration: 0, predecessor: '22FS', parentID: 20 },
      { taskID: 24, taskName: 'Training', startDate: new Date('03/07/2025 08:00'), endDate: new Date('03/08/2025 08:00'), parentID: 1 },
      { taskID: 25, taskName: 'User training', startDate: new Date('03/07/2025 08:00'), endDate: new Date('03/07/2025'), duration: 1, progress: '10', predecessor: '23FS', parentID: 24 },
      { taskID: 26, taskName: 'Admin training', startDate: new Date('03/07/2025 08:00'), endDate: new Date('03/08/2025'), duration: 2, progress: '10', predecessor: '23FS', parentID: 24 },
      { taskID: 27, taskName: 'Training complete', startDate: new Date('03/08/2025 08:00'), endDate: new Date('03/08/2025 08:00'), duration: 0, predecessor: '25FS,26FS', parentID: 24 },
      { taskID: 28, taskName: 'Client Review', startDate: new Date('03/09/2025 08:00'), endDate: new Date('03/09/2025'), duration: 1, progress: '0', predecessor: '27FS', parentID: 1 },
      { taskID: 29, taskName: 'Project Handover', startDate: new Date('03/10/2025 08:00'), endDate: new Date('03/10/2025'), duration: 0, predecessor: '28FS', parentID: 1 },
      { taskID: 30, taskName: 'Post-Project Review', startDate: new Date('03/10/2025 08:00'), endDate: new Date('03/10/2025 08:00'), duration: 0, progress: '0', predecessor: '29FS', parentID: 1 }
    ];
    this.taskSettings = {
      id: 'taskID',
      name: 'taskName',
      startDate: 'startDate',
      duration: 'duration',
      progress: 'progress',
      dependency: 'predecessor',
      parentID: 'parentID'
    };
    this.columns = [
      { field: 'taskID', visible: false, width: 60 },
      { field: 'taskName', headerText: 'Name', width: 250 },
      { field: 'startDate' },
      { field: 'endDate' },
      { field: 'duration' },
      { field: 'predecessor' },
      { field: 'progress' }
    ];
    this.timelineSettings = {
      timelineUnitSize: 90,
      topTier: { unit: 'Day', format: 'EEE dd/yyyy' },
      bottomTier: { unit: 'Hour', format: 'hh:mm a' }
    };
    this.dayWorkingTime = [{ from: 0, to: 23 }];
    this.timelineData = ['Day', 'Week', 'Month'];
    this.timeZoneData = this.getTimeZonesWithOffsets();
    this.timezoneValue = this.getLocalTimeZoneWithOffset().text;
  }


  getLocalTimeZoneWithOffset(): { id: string, text: string } {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.getTimeZonesWithOffsets().find(zone => zone.id === timeZone) || { id: 'UTC', text: 'UTC (UTC+00:00)' };
  }

  getTimeZonesWithOffsets(): { id: string, text: string }[] {
    const now = new Date();
    const zones = Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : [
      'UTC', 'Asia/Calcutta', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
      'Australia/Sydney', 'Asia/Tokyo', 'America/Chicago', 'America/Denver', 'America/Sao_Paulo'
    ];
    return zones.map(tz => {
      const formatter = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' });
      const parts = formatter.formatToParts(now);
      const offsetPart = parts.find(part => part.type === 'timeZoneName');
      const offset = offsetPart ? offsetPart.value : 'UTC+00:00';
      return { id: tz, text: tz + ' (' + offset.replace('GMT', 'UTC') + ')' };
    });
  }

  public timeZoneChange(args: any): void {
    if (args.value && this.ganttObj) {
      const timezoneName = args.value.split(' (')[0];
      this.ganttObj.timezone = timezoneName;
      this.ganttObj.refresh();
    }
  }

  public changeTimelineMode(args: any): void {
    if (args.value && this.ganttObj) {
      if (args.value === 'Day') {
        this.ganttObj.timelineSettings.topTier.unit = 'Day';
        this.ganttObj.timelineSettings.bottomTier.unit = 'Hour';
        this.ganttObj.timelineSettings.bottomTier.format = 'hh:mm a';
      } else if (args.value === 'Week') {
        this.ganttObj.timelineSettings.topTier.unit = 'Week';
        this.ganttObj.timelineSettings.bottomTier.unit = 'Day';
        this.ganttObj.timelineSettings.bottomTier.format = 'dd MMM';
      } else {
        this.ganttObj.timelineSettings.topTier.unit = 'Month';
        this.ganttObj.timelineSettings.bottomTier.unit = 'Day';
        this.ganttObj.timelineSettings.bottomTier.format = 'dd';
      }
      this.ganttObj.refresh();
    }
  }

  public previousTimeSpan(): void {
    if (this.ganttObj) {
      this.ganttObj.previousTimeSpan();
    }
  }

  public nextTimeSpan(): void {
    if (this.ganttObj) {
      this.ganttObj.nextTimeSpan();
    }
  }
}