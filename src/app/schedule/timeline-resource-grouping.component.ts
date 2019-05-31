import { Component, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import {
    TimelineViewsService, AgendaService, GroupModel, EventSettingsModel, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { timelineResourceData, resourceData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'timeline-resource-grouping.html',
    styles: [`    
    .timeline-resource-grouping.e-schedule:not(.e-device) .e-agenda-view .e-content-wrap table td:first-child {
        width: 90px;
    }
    .timeline-resource-grouping.e-schedule .e-agenda-view .e-resource-column {
        width: 100px;
    }
    `],
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineViewsService, AgendaService, ResizeService, DragAndDropService]
})

export class TimelineResourceGroupingComponent {
    public selectedDate: Date = new Date(2018, 3, 4);
    public group: GroupModel = {
        resources: ['Projects', 'Categories']
    };
    public projectDataSource: Object[] = [
        { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
        { text: 'PROJECT 2', id: 2, color: '#56ca85' },
        { text: 'PROJECT 3', id: 3, color: '#df5286' }
    ];
    public categoryDataSource: Object[] = [
        { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
        { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
        { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
        { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
        { text: 'Micheal', id: 5, groupId: 3, color: '#df5286' },
        { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
    ];
    public allowMultiple: Boolean = true;
    public eventSettings: EventSettingsModel = {
        dataSource: <Object[]>extend([], resourceData.concat(timelineResourceData), null, true)
    };
}
