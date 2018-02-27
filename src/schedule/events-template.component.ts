import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { WeekService, EventSettingsModel } from '@syncfusion/ej2-ng-schedule';
import { webinarData } from './datasource';


@Component({
    templateUrl: 'events-template.html',
    styleUrls: ['event-template.style.css'],
    providers: [WeekService],
    encapsulation: ViewEncapsulation.None
})
export class EventsTemplateComponent implements OnInit {
    public data: Object[];
    public eventSettings: EventSettingsModel;
    public eventTemplate: string;
    public selectedDate: Date;
    public cssClass: string = 'schedule-event-template';

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['event-template.style.css'];
    }

    ngOnInit(): void {
        this.data = <Object[]>extend([], webinarData, null, true);
        this.selectedDate = new Date(2018, 1, 15);
        this.eventTemplate = '<div class="template-wrap" style="background:${SecondaryColor}">' +
            '<div class="subject" style="background: ${ PrimaryColor }">${Subject}</div>' +
            '<div class="time" style="background:${PrimaryColor}">Time: ${getTimeString(data.StartTime)} - ${getTimeString(data.EndTime)}</div>' +
            '<div class="image"><img src="src/schedule/images/${ImageName}.svg" alt="${ImageName}" /></div>' +
            '<div class="description">${Description}</div>' +
            '<div class="footer" style="background:${PrimaryColor}"></div></div>';
        this.eventSettings = { dataSource: this.data, template: this.eventTemplate };
    }
}