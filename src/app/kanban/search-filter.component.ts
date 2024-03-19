import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { DropDownListComponent, SelectEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { KanbanComponent, CardSettingsModel, SwimlaneSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'search-filter.html',
    styleUrls: ['search-filter.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, ButtonModule, TextBoxModule]
})
export class SearchFilterComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    @ViewChild('priority_filter') dropdownPriorityObj: DropDownListComponent;
    @ViewChild('status_filter') dropdownStatusObj: DropDownListComponent;
    @ViewChild('search_text') textBoxObj: TextBoxComponent;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };
    public priorityData: string[] = ['None', 'High', 'Normal', 'Low'];
    public statusData: { [key: string]: Object; }[] = [
        { id: 'None', value: 'None' },
        { id: 'To Do', value: 'Open' },
        { id: 'In Progress', value: 'InProgress' },
        { id: 'Testing', value: 'Testing' },
        { id: 'Done', value: 'Close' }
    ];
    public fields: Object = { text: 'id', value: 'value' };
    public value: String = 'None';
    public emptyValue: Boolean = true;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['search-filter.style.css'];
    }
    prioritySelect(args: SelectEventArgs): void {
        let filterQuery: Query = new Query();
        if (args.itemData.value !== 'None') {
          filterQuery = new Query().where('Priority', 'equal', args.itemData.value);
        }
        this.dropdownStatusObj.value = 'None';
        this.kanbanObj.query = filterQuery;
    }
    statusSelect(args: SelectEventArgs): void {
        let filterQuery: Query = new Query();
        if (args.itemData.value !== 'None') {
          filterQuery = new Query().where('Status', 'equal', args.itemData.value);
        }
        this.dropdownPriorityObj.value = 'None';
        this.kanbanObj.query = filterQuery;
    }
    searchClick(e: KeyboardEvent): void {
        if (e.code === 'Tab' || e.code === 'Escape' || e.code === 'ShiftLeft' || (e.code === 'Backspace' && this.emptyValue)) {
            return;
        }
        const searchValue: string = (<HTMLInputElement>e.target).value;
        searchValue.length === 0 ? this.emptyValue = true : this.emptyValue = false;
        let searchQuery: Query = new Query();
        if (searchValue !== '') {
            searchQuery = new Query().search(searchValue, ['Id', 'Summary'], 'contains', true);
        }
        this.kanbanObj.query = searchQuery;
    }

    resetClick(): void {
        this.textBoxObj.value = '';
        this.reset();
    }

    public onFocus = (): void => {
        if (this.textBoxObj.value === null || this.textBoxObj.value === '') {
            this.reset();
        }
    }

    reset(): void {
        this.dropdownPriorityObj.value = 'None';
        this.dropdownStatusObj.value = 'None';
        this.kanbanObj.query = new Query();
    }
}
