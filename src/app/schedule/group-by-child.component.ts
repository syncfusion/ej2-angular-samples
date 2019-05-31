import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { resourceTeamData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, View, GroupModel, MonthService, DayService, WeekService,
    WorkWeekService, AgendaService, ResizeService, WorkHoursModel, DragAndDropService
}
    from '@syncfusion/ej2-angular-schedule';
@Component({
    selector: 'control-content',
    templateUrl: 'group-by-child.html',
    styleUrls: ['group-by-child.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MonthService, DayService, WeekService, WorkWeekService, AgendaService, ResizeService, DragAndDropService]
})
export class GroupByChildComponent {
    public data: Object[] = <Object[]>extend([], resourceTeamData, null, true);
    public selectedDate: Date = new Date(2018, 5, 5);
    public currentView: View = 'WorkWeek';
    public workHours: WorkHoursModel = { start: '09:00', end: '19:00' };
    public projectResourceDataSource: Object[] = [
        { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
        { text: 'PROJECT 2', id: 2, color: '#56ca85' }
    ];
    public categoryResourceDataSource: Object[] = [
        { text: 'Development', id: 1, color: '#1aaa55' },
        { text: 'Testing', id: 2, color: '#7fa900' }
    ];
    public group: GroupModel = { byGroupID: false, resources: ['Projects', 'Categories'] };
    public allowMultiple: Boolean = true;
    public eventSettings: EventSettingsModel = {
        dataSource: this.data,
        fields: {
            subject: { title: 'Summary', name: 'Subject' },
            description: { title: 'Comments', name: 'Description' }
        }
    };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['group-by-child.style.css'];
    }
}