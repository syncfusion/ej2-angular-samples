import { Component, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import {
    TimelineViewsService, MonthService, View, GroupModel, EventSettingsModel, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { timelineResourceData, resourceData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'multi-drag.html',
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineViewsService, MonthService, ResizeService, DragAndDropService]
})

export class MultiDragComponent {
    public selectedDate: Date = new Date(2018, 3, 4);
    public currentView: View = 'Month';
    public allowMultiDrag: boolean = true;
    public showQuickInfo: boolean = false;
    public allowResizing: boolean = false;
    public group: GroupModel = {
        resources: ['Owners']
    };
    public categoryDataSource: Object[] = [
        { text: 'Nancy', id: 1, color: '#df5286' },
        { text: 'Steven', id: 2, color: '#7fa900' },
        { text: 'Robert', id: 3, color: '#ea7a57' },
        { text: 'Smith', id: 4, color: '#5978ee' },
        { text: 'Micheal', id: 5, color: '#df5286' }
    ];
    public eventSettings: EventSettingsModel = {
        dataSource: <Object[]>extend([], resourceData.concat(timelineResourceData), null, true)
    };
}
