import { Component, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { fifaEventsData } from './data';

@Component({
  // tslint:disable-next-line:component-selector
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
  public selectedDate: Date = new Date(2021, 5, 20);
  public eventSettings: EventSettingsModel = { dataSource: extend([], fifaEventsData, null, true) as Record<string, any>[] };
  public currentView: View = 'MonthAgenda';
}
