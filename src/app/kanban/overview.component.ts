import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend, addClass } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsModel, CardSettingsModel, SwimlaneSettingsModel, DialogSettingsModel, CardRenderedEventArgs, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { cardData } from './data';
import { NgClass, NgFor } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, NgClass, NgFor, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class OverviewComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public kanbanData: Object[] = extend([], cardData, null, true) as Object[];
    public columns: ColumnsModel[] = [
        { headerText: 'To Do', keyField: 'Open', allowToggle: true },
        { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
        { headerText: 'In Review', keyField: 'Review', allowToggle: true },
        { headerText: 'Done', keyField: 'Close', allowToggle: true }
    ];
    public cardSettings: CardSettingsModel = {
        headerField: 'Title',
        template: '#cardTemplate',
        selectionType: 'Multiple'
    };
    public dialogSettings: DialogSettingsModel = {
        fields: [
            { text: 'ID', key: 'Title', type: 'TextBox' },
            { key: 'Status', type: 'DropDown' },
            { key: 'Assignee', type: 'DropDown' },
            { key: 'RankId', type: 'TextBox' },
            { key: 'Summary', type: 'TextArea' }
        ]
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['overview.style.css'];
    }

    public getString(assignee: string) {
        return assignee.match(/\b(\w)/g).join('').toUpperCase();
    }
    cardRendered(args: CardRenderedEventArgs): void {
        const val: string = (<{[key: string]: Object}>(args.data)).Priority as string;
        addClass([args.element], val);
    }
}
