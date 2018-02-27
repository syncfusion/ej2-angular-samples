import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, View, RenderCellEventArgs, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { MonthService, DayService, WeekService, WorkWeekService, EventSettingsModel } from '@syncfusion/ej2-ng-schedule';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { scheduleData } from './datasource';

/**
 * Schedule date header template sample
 */

let instance: Internationalization = new Internationalization();
(window as TemplateFunction).getDateHeaderText = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'Ed' });
};
let getWeather: Function = (value: Date) => {
    switch (value.getDay()) {
        case 0:
            return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/><div class="weather-text">25°C</div>';
        case 1:
            return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
        case 2:
            return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
        case 3:
            return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
        case 4:
            return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
        case 5:
            return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
        case 6:
            return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
        default:
            return null;
    }
};
(window as TemplateFunction).getWeather = getWeather;

interface TemplateFunction extends Window {
    getDateHeaderText?: Function;
    getWeather?: Function;
}

@Component({
    templateUrl: 'dateheader-template.html',
    styleUrls: ['dateheader.style.css'],
    providers: [MonthService, DayService, WeekService, WorkWeekService],
    encapsulation: ViewEncapsulation.None
})
export class DateheaderTemplateComponent implements OnInit {
    public scheduleObj: ScheduleComponent;
    public eventSettings: EventSettingsModel;
    public dateHeaderTemplate: string;
    public currentView: View;
    public selectedDate: Date;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['dateheader.style.css'];
    }

    ngOnInit(): void {
        this.eventSettings = { dataSource: <Object[]>extend([], scheduleData, null, true) };
        this.selectedDate = new Date(2018, 1, 15);
        this.currentView = 'Week';
        this.dateHeaderTemplate = '<div class="date-text">${getDateHeaderText(data.date)}</div>${getWeather(data.date)}';
    }

    OnRenderCell(args: RenderCellEventArgs): void {
        if (args.elementType === 'monthCells') {
            let ele: Element = document.createElement('div');
            ele.innerHTML = getWeather(args.date);
            (args.element).appendChild(ele.firstChild);
        }
    }

    oneventRendered(args: EventRenderedArgs): void {
        let categoryColor: string = args.data.CategoryColor as string;
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