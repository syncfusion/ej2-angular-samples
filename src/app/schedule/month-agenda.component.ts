import { Component, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { fifaEventsData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'month-agenda.html',
    styles: [`
    @media (min-width: 481px) {
        .schedule-wrapper {
            margin: 0 25%;
        }
    }`],
    providers: [MonthAgendaService],
    encapsulation: ViewEncapsulation.None
})
export class MonthAgendaComponent {
    public selectedDate: Date = new Date(2018, 5, 20);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], fifaEventsData, null, true) };
    public currentView: View = 'MonthAgenda';
}