import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, TimelineMonthService, GroupModel, EventSettingsModel, MonthService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'data-virtualization.html',
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineMonthService, MonthService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class DataVirtualizationComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date(2023, 3, 1);
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Resources']
  };
  public readonly = true;
  public resourceDataSource: Record<string, any>[] = this.generateResourceData(1, 1000, 'Resource');
  private dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/angular/production/api/VirtualEventData',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager
  };

  public generateResourceData(startId: number, endId: number, text: string): Record<string, any>[] {
    const data: Record<string, any>[] = [];
    const colors: string[] = [
      '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c', '#fdd835', '#748ffc',
      '#9775fa', '#df5286', '#7fa900', '#fec200', '#5978ee', '#00bdae', '#ea80fc'
    ];
    for (let a: number = startId; a <= endId; a++) {
      const n: number = Math.floor(Math.random() * colors.length);
      data.push({ Id: a, Text: text + ' ' + a, Color: colors[n] });
    }
    return data;
  }
}
