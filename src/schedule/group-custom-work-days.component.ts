import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { doctorData } from './datasource';
import { addClass, extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, View, GroupModel, ResourceDetails, TreeViewArgs, PopupOpenEventArgs, ScheduleComponent, ActionEventArgs,
    EventFieldsMapping, RenderCellEventArgs, MonthService, WorkWeekService, ResizeService, ResizeEventArgs
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'group-custom-work-days.html',
    styleUrls: ['group-custom-work-days.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MonthService, WorkWeekService, ResizeService]
})

export class GroupCustomWorkDaysComponent {
    public data: Object[] = <Object[]>extend([], doctorData, null, true);
    public selectedDate: Date = new Date(2018, 3, 1);
    public currentView: View = 'WorkWeek';
    public resourceDataSource: Object[] = [
        { text: 'Will Smith', id: 1, color: '#ea7a57', workDays: [1, 2, 4, 5], startHour: '08:00', endHour: '15:00' },
        { text: 'Alice', id: 2, color: 'rgb(53, 124, 210)', workDays: [1, 3, 5], startHour: '08:00', endHour: '17:00' },
        { text: 'Robson', id: 3, color: '#7fa900', startHour: '08:00', endHour: '16:00' }
    ];
    public group: GroupModel = { resources: ['Doctors'] };
    public eventSettings: EventSettingsModel = {
        dataSource: this.data,
        fields: {
            subject: { title: 'Service Type', name: 'Subject' },
            location: { title: 'Patient Name', name: 'Location' },
            description: { title: 'Summary', name: 'Description' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' }
        }
    };
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['group-custom-work-days.style.css'];
    }

    getDoctorName(value: ResourceDetails | TreeViewArgs): string {
        return ((value as ResourceDetails).resourceData) ?
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
            : (value as TreeViewArgs).resourceName;
    }
    getDoctorImage(value: ResourceDetails | TreeViewArgs): string {
        let resourceName: string = this.getDoctorName(value);
        return resourceName.replace(' ', '-').toLowerCase();
    }
    getDoctorLevel(value: ResourceDetails | TreeViewArgs): string {
        let resourceName: string = this.getDoctorName(value);
        return (resourceName === 'Will Smith') ? 'Cardiologist' : (resourceName === 'Alice') ? 'Neurologist' : 'Orthopedic Surgeon';
    }

    onActionBegin(args: ActionEventArgs): void {
        if (args.requestType === 'eventCreate' && (<Object[]>args.data).length > 0) {
            let eventData: { [key: string]: Object } = (<Object[]>args.data)[0] as { [key: string]: Object };
            let eventField: EventFieldsMapping = this.scheduleObj.eventFields;
            let startDate: Date = eventData[eventField.startTime] as Date;
            let endDate: Date = eventData[eventField.endTime] as Date;
            let resourceIndex: number = [1, 2, 3].indexOf(eventData.DoctorId as number);
            args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate, resourceIndex);
        }
    }

    onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.target && args.target.classList.contains('e-work-cells')) {
            args.cancel = !args.target.classList.contains('e-work-hours');
        }
    }

    onRenderCell(args: RenderCellEventArgs): void {
        if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
            addClass([args.element], ['willsmith', 'alice', 'robson'][parseInt(args.element.getAttribute('data-group-index'), 10)]);
        }
    }

    onResizeStart(args: ResizeEventArgs): void {
        args.cancel = true;
    }
}