import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-angular-dropdowns';
import { KanbanComponent, CardSettingsModel, SwimlaneSettingsModel, SortDirection, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'swimlane.html',
    styleUrls: ['swimlane.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, CheckBoxModule]
})
export class SwimlaneComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    @ViewChild('dropdown') dropdownObj: DropDownListComponent;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };
    public sortData: string[] = ['Ascending', 'Descending'];

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['swimlane.style.css'];
    }

    onChange(args: ChangeEventArgs): void {
        this.kanbanObj.swimlaneSettings.allowDragAndDrop = args.checked;
    }

    changeRow(args: ChangeEventArgs): void {
        this.kanbanObj.swimlaneSettings.showEmptyRow = args.checked;
    }

    changeCount(args: ChangeEventArgs): void {
        this.kanbanObj.swimlaneSettings.showItemCount = args.checked;
    }

    changeFrozen(args: ChangeEventArgs): void {
        this.kanbanObj.swimlaneSettings.enableFrozenRows = args.checked;
    }

    changeSortOrder(args: DropDownChangeArgs): void {
        this.kanbanObj.swimlaneSettings.sortDirection = args.itemData.value as SortDirection;
    }

}
