import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { eventsData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { EventSettingsModel, View, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-ng-schedule';

@Component({
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
    encapsulation: ViewEncapsulation.None
})
export class TooltipComponent implements OnInit {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public data: Object[] = <Object[]>extend([], eventsData, null, true);
    public selectedDate: Date;
    public eventSettings: EventSettingsModel;
    public currentView: View;
    public temp: string = '<div class="tooltip-wrap">' +
        '<div class="image ${EventType}"></div>' +
        '<div class="content-area"><div class="name">${Subject}</></div>' +
        '<div class="city">${City}</></div>' +
        '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
        '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';


    ngOnInit(): void {
        this.eventSettings = { dataSource: this.data, enableTooltip: true, tooltipTemplate: this.temp };
        this.selectedDate = new Date(2018, 1, 15);
        this.currentView = 'Week';
    }

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