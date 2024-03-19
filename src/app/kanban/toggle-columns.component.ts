import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'toggle-columns.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ToggleColumnsComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public isExpanded: Boolean = false;
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };

}
