import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, SortDirection, SortOrderBy, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { kanbanData } from './data';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'sorting.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, NgClass, ButtonModule]
})
export class SortingComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    @ViewChild('sortBy') sortByObj: DropDownListComponent;
    @ViewChild('field') fieldObj: DropDownListComponent;
    @ViewChild('direction') directionObj: DropDownListComponent;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        headerField: 'Id',
        contentField: 'Summary'
    };
    public sortByData: Object[] = [
        { Id: 'DataSourceOrder', Sort: 'Data Source Order' },
        { Id: 'Index', Sort: 'Index' },
        { Id: 'Custom', Sort: 'Custom' }
    ];
    public fields: Object = { text: 'Sort', value: 'Id' };
    public fieldData: string[] = ['None'];
    public directionData: string[] = ['Ascending', 'Descending'];
    change(args: ChangeEventArgs): void {
        if (args.value === 'DataSourceOrder' || args.value === 'Index') {
            const data: string = args.value === 'Index' ? 'RankId' : 'None';
            this.setFieldValue(data);
        }
        if (args.value === 'Custom') {
            this.fieldObj.dataSource = ['Priority', 'RankId', 'Summary'];
            this.fieldObj.value = 'Priority';
            this.fieldObj.enabled = true;
        }
        if (args.value === 'Ascending') {
          const data: string = this.sortByObj.value === 'Index' ? 'RankId' : 'None';
          this.setFieldValue(data);
          this.directionObj.value = 'Ascending';
        }
        if (args.value === 'Descending') {
          let data: string = this.sortByObj.value === 'Index' ? 'RankId' : 'None';
          this.setFieldValue(data);
          this.directionObj.value = 'Descending';
        }
    }
    setFieldValue(data: string): void {
        this.fieldObj.dataSource = [data];
        this.fieldObj.value = data;
        this.fieldObj.enabled = false;
    }
    sortClick(): void {
        this.setKanbanProperties();
    }
    clearClick(): void {
        this.sortByObj.value = 'Index';
        this.directionObj.value = 'Ascending';
        this.setFieldValue('None');
        this.setKanbanProperties();
    }
    setKanbanProperties() {
        this.kanbanObj.sortSettings.sortBy = this.sortByObj.value as SortOrderBy;
        this.kanbanObj.sortSettings.field = this.fieldObj.value as string;
        this.kanbanObj.sortSettings.direction = this.directionObj.value as SortDirection;
    }
}
