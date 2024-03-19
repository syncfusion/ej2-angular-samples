import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, SwimlaneSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'swimlane-template.html',
    styleUrls: ['swimlane-template.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [],
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, NgClass]
})
export class SwimlaneTemplateComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;

    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id',
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['swimlane-template.style.css'];
    }

}
