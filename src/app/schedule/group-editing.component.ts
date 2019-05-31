import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { resourceConferenceData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, GroupModel, ResourceDetails, TreeViewArgs, View, DayService,
    MonthService, WorkWeekService, TimelineViewsService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'group-editing.html',
    styleUrls: ['group-editing.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, MonthService, WorkWeekService, TimelineViewsService, ResizeService, DragAndDropService]
})

export class GroupEditingComponent {
    public data: Object[] = <Object[]>extend([], resourceConferenceData, null, true);
    public selectedDate: Date = new Date(2018, 5, 5);
    public currentView: View = 'WorkWeek';
    public resourceDataSource: Object[] = [
        { Text: 'Margaret', Id: 1, Color: '#1aaa55' },
        { Text: 'Robert', Id: 2, Color: '#357cd2' },
        { Text: 'Laura', Id: 3, Color: '#7fa900' }
    ];
    public group: GroupModel = { allowGroupEdit: true, resources: ['Conferences'] };
    public allowMultiple: Boolean = true;
    public eventSettings: EventSettingsModel = {
        dataSource: resourceConferenceData,
        fields: {
            subject: { title: 'Conference Name', name: 'Subject' },
            description: { title: 'Summary', name: 'Description' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' }
        }
    };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['group-editing.style.css'];
    }

    getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
        return ((value as ResourceDetails).resourceData) ?
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
            : (value as TreeViewArgs).resourceName;
    }
    getEmployeeDesignation(value: ResourceDetails | TreeViewArgs): string {
        let resourceName: string = this.getEmployeeName(value);
        return (resourceName === 'Margaret') ? 'Sales Representative' : (resourceName === 'Robert') ?
            'Vice President, Sales' : 'Inside Sales Coordinator';
    }
    getEmployeeImage(value: ResourceDetails | TreeViewArgs): string {
        let resourceName: string = this.getEmployeeName(value);
        return resourceName.replace(' ', '-').toLowerCase();
    }
}