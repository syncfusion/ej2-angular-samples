import { Component } from '@angular/core';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'remote-data.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class RemoteDataComponent {
  public currentView: View = 'Month';
  public readonly = true;
  private dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/angular/production/api/schedule',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
  public eventSettings: EventSettingsModel = { dataSource: this.dataManager };

}
