import { Component, ViewEncapsulation } from '@angular/core';
import { scheduleData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel, EventRenderedArgs, View, DayService, WeekService, WorkWeekService,
  MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'events.html',
  /* custom code start*/
  styles: [`
    #EventLog b {
        color: #388e3c;
    }
    hr {
        margin: 1px 10px 1px 0px;
        border-top: 1px solid #eee;
    }`],
  /* custom code end*/
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent {
  public data: Record<string, any>[] = [] = extend([], scheduleData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';

  public onClear(): void {
    document.getElementById('EventLog').innerHTML = '';
  }

  public onCreate(): void {
    this.appendElement('Schedule <b>Load</b> event is triggered<hr>');
  }

  public onActionBegin(): void {
    this.appendElement('Schedule <b>Action Begin</b> event is triggered<hr>');
  }

  public onActionComplete(): void {
    this.appendElement('Schedule <b>Action Complete</b> event is triggered<hr>');
  }

  public onActionFailure(): void {
    this.appendElement('Schedule <b>Action Failure</b> event is triggered<hr>');
  }

  public onCellDoubleClick(): void {
    this.appendElement('SChedule <b>Cell Double Click</b> event is triggered<hr>');
  }

  public onCellClick(): void {
    this.appendElement('Schedule <b>Cell Click</b> event is triggered<hr>');
  }

  public onNavigating(): void {
    this.appendElement('Schedule <b>Navigating</b> event is triggered<hr>');
  }

  public onDestroyed(): void {
    this.appendElement('Schedule <b>Destroyed</b> event is triggered<hr>');
  }

  public onEventClick(): void {
    this.appendElement('Schedule <b>Event Click</b> event is triggered<hr>');
  }

  public onPopupOpen(): void {
    this.appendElement('Schedule <b>Popup Open</b> event is triggered<hr>');
  }

  public appendElement(html: string): void {
    const span: HTMLElement = document.createElement('span');
    span.innerHTML = html;
    const log: HTMLElement = document.getElementById('EventLog');
    if (log !== null) {
      log.insertBefore(span, log.firstChild);
    }
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

}
