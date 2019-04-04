import { Component, ViewChild } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-inputs';
import { ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EventSettingsModel, View, ScheduleComponent, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { generateObject } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'agenda.html',
    providers: [AgendaService]
})
export class AgendaComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: generateObject() };
    public currentView: View = 'Agenda';
    public virtualscroll: boolean = false;
    public allowVirtualScroll: boolean = false;
    public hideAgenda: boolean = true;
    public virtualScrollOptions: { [key: string]: Object }[] = [
        { text: 'True', value: true },
        { text: 'False', value: false }
    ];
    public hideEmptyAgendaDaysOptions: { [key: string]: Object }[] = [
        { text: 'True', value: true },
        { text: 'False', value: false }
    ];
    public fields: object = { text: 'text', value: 'value' };
    public onVirtualChange(args: DropDownChangeArgs): void {
        this.scheduleObj.views = [{ option: 'Agenda', allowVirtualScrolling: args.value as boolean }];
    }
    public onEmptyAgendaDaysChange(args: DropDownChangeArgs): void {
        this.scheduleObj.hideEmptyAgendaDays = args.value as boolean;
    }
    public onCountChange(args: ChangeEventArgs): void {
        this.scheduleObj.agendaDaysCount = args.value !== null ? args.value : 7;
    }
}