import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsModel, CardSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';
import { NgClass, NgFor } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'header-template.html',
    styleUrls: ['header-template.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, NgFor, NgClass, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeaderTemplateComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public columns: ColumnsModel[] = [
        { headerText: 'To Do', keyField: 'Open', allowToggle: true },
        { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
        { headerText: 'In Review', keyField: 'Review', allowToggle: true },
        { headerText: 'Done', keyField: 'Close', allowToggle: true }
    ];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['header-template.style.css'];
    }

}
