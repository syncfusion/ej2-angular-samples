import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { eventsData } from './data';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { EventSettingsModel, View, EventRenderedArgs, ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule, CallbackFunction } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

(window as TemplateFunction).getImage = (image: string) => {
  let imageUrl: string = './assets/schedule/images/';
  return imageUrl + (isNullOrUndefined(image) ? 'public-event' : image) + '.png';
};

interface TemplateFunction extends Window {
  getImage?: CallbackFunction;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class TooltipComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public data: Record<string, any>[] = extend([], eventsData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 1, 15);
  public currentView: View = 'Week';
  public temp: string = '<div class="tooltip-wrap">' +
    '<div><img class="image" src="${ getImage(EventType) }" alt="${ EventType }" /></div>' +
    '<div class="content-area"><div class="name">${Subject}</></div>' +
    '${if(City !== null && City !== undefined)}<div class="city">${City}</div>${/if}' +
    '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
    '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';
  public eventSettings: EventSettingsModel = { dataSource: this.data, enableTooltip: true, tooltipTemplate: this.temp };

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['tooltip.style.css'];
  }

  public onChange(args: ChangeEventArgs): void {
    this.scheduleObj.eventSettings.enableTooltip = args.checked;
    this.scheduleObj.dataBind();
  }

  public onTemplateChange(args: ChangeEventArgs): void {
    this.scheduleObj.eventSettings.tooltipTemplate = (args.checked) ? this.temp : null;
    this.scheduleObj.dataBind();
  }

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

}
