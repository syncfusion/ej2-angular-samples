import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-angular-dropdowns';
import { KanbanComponent, CardSettingsModel, SwimlaneSettingsModel, SortDirection } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'swimlane.html',
    styleUrls: ['swimlane.style.css'],
    encapsulation: ViewEncapsulation.None
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

    changeSortOrder(args: DropDownChangeArgs): void {
        this.kanbanObj.swimlaneSettings.sortDirection = args.itemData.value as SortDirection;
    }

}
