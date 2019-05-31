import { Component } from '@angular/core';
import { resourceData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, GroupModel, DayService, MonthService, WeekService, AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'group-by-date.html',
    providers: [ DayService, MonthService, WeekService, AgendaService, ResizeService, DragAndDropService]
})
export class GroupByDateComponent {
    public data: Object[] = <Object[]>extend([], resourceData, null, true);
    public selectedDate: Date = new Date(2018, 3, 1);
    public resourceDataSource: Object[] = [
        { text: 'Alice', id: 1, color: '#1aaa55' },
        { text: 'Smith', id: 2, color: '#7fa900' }
    ];
    public group: GroupModel = { byDate: true, resources: ['Owners'] };
    public allowMultiple: Boolean = true;
    public eventSettings: EventSettingsModel = {
        dataSource: resourceData,
        fields: {
            subject: { title: 'Task', name: 'Subject' },
            location: { title: 'Project Name', name: 'Location' },
            description: { title: 'Comments', name: 'Description' }
        }
    };
}