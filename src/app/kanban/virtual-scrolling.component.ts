import { KanbanComponent, CardRenderedEventArgs, ColumnsModel, CardSettingsModel, DialogSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { generateKanbanDataVirtualScrollData } from './data';
import { addClass } from '@syncfusion/ej2-base';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'virtual-scrolling.html',
    styleUrls: ['virtual-scrolling.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, NgClass]
})
export class VirtualScrollingComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public kanbanData: Object[];
    public columnsSettings: ColumnsModel[] = [
        { headerText: 'To Do', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Code Review', keyField: 'Review'},
        { headerText: 'Done', keyField: 'Close' }
    ];
    public cardSettings: CardSettingsModel = {
        headerField: 'Id',
        template: '#cardSettingsTemplate',
        selectionType: 'Multiple'
    };
    public dialogSettings: DialogSettingsModel = {
        fields: [
            {key: 'Id', text: 'ID', type: 'TextBox'},
            {key: 'Status', text: 'Status', type: 'DropDown'},
            {key: 'StoryPoints', text: 'Story Points', type: 'Numeric' },
            {key: 'Summary', text: 'Summary', type: 'TextArea'}
        ]
    };
    public cardRendered(args: CardRenderedEventArgs): void {
        const val: string = (args.data.Priority as string).toLowerCase();
        addClass([args.element], val);
    }
    constructor() {
        this.kanbanData = generateKanbanDataVirtualScrollData();
    }
    public getString(assignee: string)  {
        return assignee.match(/\b(\w)/g).join('').toUpperCase();
    };
}
