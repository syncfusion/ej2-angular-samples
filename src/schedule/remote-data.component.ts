import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-ng-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
    templateUrl: 'remote-data.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class RemoteDataComponent implements OnInit {
    public selectedDate: Date;
    public eventSettings: EventSettingsModel;
    public currentView: View;
    public readonly: boolean;
    private dataManger: DataManager = new DataManager({
        url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });

    ngOnInit(): void {
        this.eventSettings = { dataSource: this.dataManger };
        this.selectedDate = new Date(2017, 5, 5);
        this.currentView = 'Week';
        this.readonly = true;
    }
}