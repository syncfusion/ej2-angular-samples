import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { fifaEventsData } from './datasource';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, EventRenderedArgs, View } from '@syncfusion/ej2-ng-schedule';
import { ScheduleComponent, DayService, WeekService, MonthService, AgendaService } from '@syncfusion/ej2-ng-schedule';

let instance: Internationalization = new Internationalization();
(window as TemplateFunction).getTimeString = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'Hm' });
};
interface TemplateFunction extends Window {
    getTimeString?: Function;
}

@Component({
    templateUrl: 'view-config.html',
    providers: [DayService, WeekService, MonthService, AgendaService],
    styleUrls: ['view-config.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ViewConfigComponent implements OnInit {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date;
    public currentView: View;
    public eventSettings: EventSettingsModel;
    public agendaTemplate: string = '<div class="subject">${Subject}</div><div class="group">${Description}</div>' +
        '<div class="location">${getTimeString(data.StartTime)}, ${City}</div>';
    public showWeekend: boolean = false;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['view-config.style.css'];
    }

    ngOnInit(): void {
        this.eventSettings = { dataSource: <Object[]>extend([], fifaEventsData, null, true) };
        this.selectedDate = new Date(2018, 5, 20);
        this.currentView = 'Week';
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