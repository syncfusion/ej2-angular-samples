import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { eventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import {
    EventSettingsModel, View, EventRenderedArgs, ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None
})
export class TooltipComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public data: Object[] = <Object[]>extend([], eventsData, null, true);
    public selectedDate: Date = new Date(2018, 1, 15);
    public currentView: View = 'Week';
    public temp: string = '<div class="tooltip-wrap">' +
        '<div class="image ${EventType}"></div>' +
        '<div class="content-area"><div class="name">${Subject}</></div>' +
        '${if(City !== null && City !== undefined)}<div class="city">${City}</div>${/if}' +
        '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
        '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';
    public eventSettings: EventSettingsModel = { dataSource: this.data, enableTooltip: true, tooltipTemplate: this.temp };

    onChange(args: ChangeEventArgs): void {
        if (args.checked) {
            this.scheduleObj.eventSettings.enableTooltip = true;
        } else {
            this.scheduleObj.eventSettings.enableTooltip = false;
        }
        this.scheduleObj.dataBind();
    }

    onTemplateChange(args: ChangeEventArgs): void {
        if (args.checked) {
            this.scheduleObj.eventSettings.tooltipTemplate = this.temp;
        } else {
            this.scheduleObj.eventSettings.tooltipTemplate = null;
        }
        this.scheduleObj.dataBind();
    }
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['tooltip.style.css'];
    }

    oneventRendered(args: EventRenderedArgs): void {
        let categoryColor: string = args.data.CategoryColor as string;
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