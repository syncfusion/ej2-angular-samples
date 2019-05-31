import { Component } from '@angular/core';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService }
    from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class RemoteDataComponent {
    public selectedDate: Date = new Date(2017, 5, 5);
    public currentView: View = 'Week';
    public readonly: boolean = true;
    private dataManger: DataManager = new DataManager({
        url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    public eventSettings: EventSettingsModel = { dataSource: this.dataManger };
}