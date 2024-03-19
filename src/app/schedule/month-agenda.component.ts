import { Component, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, MonthAgendaService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { fifaEventsData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

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
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class MonthAgendaComponent {
  public selectedDate: Date = new Date(2021, 5, 20);
  public eventSettings: EventSettingsModel = { dataSource: extend([], fifaEventsData, null, true) as Record<string, any>[] };
  public currentView: View = 'MonthAgenda';
}
