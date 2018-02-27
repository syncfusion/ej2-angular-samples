import { Component, ViewChild } from '@angular/core';
import { NumericTextBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-ng-inputs';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-ng-dropdowns';
import { EventSettingsModel, View, ScheduleComponent, AgendaService } from '@syncfusion/ej2-ng-schedule';
import { generateObject } from './datasource';

@Component({
    templateUrl: 'agenda.html',
    providers: [AgendaService]
})
export class AgendaComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    @ViewChild('textbox')
    public rows: NumericTextBoxComponent;
    public data: Object[] = generateObject();
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Agenda';
    public virtualscroll: boolean = false;

    @ViewChild('virtualScrollObj')
    public virtualScrollObj: DropDownListComponent;
    public value: string = 'false';
    public datas: string[] = ['true', 'false'];

    @ViewChild('hideEmptyDaysObj')
    public hideEmptyDaysObj: DropDownListComponent;
    public values: string = 'true';

    change(e: DropDownChangeArgs) {
        let allowVS: boolean = (e.value === 'true') ? true : false;
        this.scheduleObj.views = [{ option: 'Agenda', allowVirtualScrolling: allowVS }];
        this.scheduleObj.dataBind();
    }

    onChange(e: DropDownChangeArgs) {
        this.scheduleObj.hideEmptyAgendaDays = (e.value === 'true') ? true : false;
        this.scheduleObj.dataBind();
    }

    onCountChange(args: ChangeEventArgs): void {
        this.scheduleObj.agendaDaysCount = args.value !== null ? args.value : 7;
        this.scheduleObj.dataBind();
    }
}