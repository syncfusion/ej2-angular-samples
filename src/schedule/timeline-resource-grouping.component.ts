import { Component, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import {
    TimelineViewsService, AgendaService, GroupModel, EventSettingsModel, ResizeService
} from '@syncfusion/ej2-angular-schedule';
import { timelineResourceData, resourceData } from './datasource';

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
    providers: [TimelineViewsService, AgendaService, ResizeService]
})

export class TimelineResourceGroupingComponent {
    public selectedDate: Date = new Date(2018, 3, 4);
    public group: GroupModel = {
        byGroupID: false,
        resources: ['Projects', 'Categories']
    };
    public projectDataSource: Object[] = [
        { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
        { text: 'PROJECT 2', id: 2, color: '#56ca85' },
        { text: 'PROJECT 3', id: 3, color: '#df5286' }
    ];
    public categoryDataSource: Object[] = [
        { text: 'Development', id: 1, color: '#df5286' },
        { text: 'Testing', id: 2, color: '#7fa900' }
    ];
    public allowMultiple: Boolean = true;
    public eventSettings: EventSettingsModel = {
        dataSource: <Object[]>extend([], resourceData.concat(timelineResourceData), null, true)
    };
}