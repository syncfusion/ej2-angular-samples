import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { eventsData } from './data';
import { createElement, extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { EventSettingsModel, ScheduleComponent, EventRenderedArgs, DayService, WeekService, WorkWeekService, MonthService, AgendaService, PopupOpenEventArgs, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'editor-custom-field.html',
    styles: [`.custom-field-row {
        margin-bottom: 20px;
    }`],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class EditorCustomFieldComponent {
  public selectedDate: Date = new Date(2021, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: extend([], eventsData, null, true) as Record<string, any>[] };
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      if (!args.element.querySelector('.custom-field-row')) {  // Create required custom elements in initial time
        const row: HTMLElement = createElement('div', { className: 'custom-field-row' });
        const formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        const container: HTMLElement = createElement('div', { className: 'custom-field-container' });
        const inputEle: HTMLElement = createElement('input', { className: 'e-field', attrs: { name: 'EventType' } });
        container.appendChild(inputEle);
        row.appendChild(container);
        const dropDownList: DropDownList = new DropDownList({
          dataSource: [
            { text: 'Public Event', value: 'public-event' },
            { text: 'Maintenance', value: 'maintenance' },
            { text: 'Commercial Event', value: 'commercial-event' },
            { text: 'Family Event', value: 'family-event' }
          ],
          fields: { text: 'text', value: 'value' },
          value: (args.data as Record<string, any>).EventType as string,
          floatLabelType: 'Always', placeholder: 'Event Type'
        });
        dropDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'EventType');
      }
    }
  }
}
