import { Component, ViewChild } from '@angular/core';
import { ChangeEventArgs, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ChangeEventArgs as DropDownChangeArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { EventSettingsModel, View, ScheduleComponent, AgendaService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { generateObject } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'agenda.html',
    providers: [AgendaService],
    standalone: true,
    imports: [ScheduleModule, DropDownListModule, NumericTextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AgendaComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2021, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: generateObject() };
  public currentView: View = 'Agenda';
  public virtualScroll = false;
  public allowVirtualScroll = false;
  public hideAgenda = true;
  public virtualScrollOptions: Record<string, any>[] = [
    { text: 'True', value: true },
    { text: 'False', value: false }
  ];
  public hideEmptyAgendaDaysOptions: Record<string, any>[] = [
    { text: 'True', value: true },
    { text: 'False', value: false }
  ];
  public fields: Record<string, any> = { text: 'text', value: 'value' };
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
