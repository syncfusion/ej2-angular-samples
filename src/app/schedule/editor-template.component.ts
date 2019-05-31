import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import {
    PopupOpenEventArgs, EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService, EventSettingsModel, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { doctorsEventData } from './data';

/**
 * Schedule editor template sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'editor-template.html',
    styles: [`    
    .custom-event-editor .e-textlabel {
        padding-right: 15px;
        text-align: right;
    }

    .custom-event-editor td {
        padding: 7px;
        padding-right: 16px;
    }`],
    providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None
})
export class EditTempComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], doctorsEventData, null, true) };
    public selectedDate: Date = new Date(2018, 1, 15);
    public showQuickInfo: boolean = false;

    public onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor') {
            let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
            if (!statusElement.classList.contains('e-dropdownlist')) {
                let dropDownListObject: DropDownList = new DropDownList({
                    placeholder: 'Choose status', value: statusElement.value,
                    dataSource: ['New', 'Requested', 'Confirmed']
                });
                dropDownListObject.appendTo(statusElement);
                statusElement.setAttribute('name', 'EventType');
            }
            let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
            if (!startElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
            }
            let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
            if (!endElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
            }
        }
    }
    public onEventRendered(args: EventRenderedArgs): void {
        switch (args.data.EventType) {
            case 'Requested':
                (args.element as HTMLElement).style.backgroundColor = '#F57F17';
                break;
            case 'Confirmed':
                (args.element as HTMLElement).style.backgroundColor = '#7fa900';
                break;
            case 'New':
                (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
                break;
        }
    }
    public onActionBegin(args: { [key: string]: Object }): void {
        if (args.requestType === 'eventCreate') {
            let data: { [key: string]: Object } = args.data as { [key: string]: Object };
            if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date)) {
                args.cancel = true;
            }
        }
    }
}