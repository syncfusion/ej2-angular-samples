import { Component, OnInit, ViewChild } from '@angular/core';
import { SortService, ResizeService, GroupService, ColumnMenuService, PageService, FilterService, ToolbarService, EditService, GridModule, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'column-menu.html',
    providers: [SortService, ResizeService, GroupService, ColumnMenuService, PageService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent, DropDownListModule]
})
export class ColumnMenuComponent implements OnInit {
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('columnmenu')
    public dropDown: DropDownListComponent;
    public data: Object[];
    public groupOptions: GroupSettingsModel;
    public filterSettings: FilterSettingsModel;
    public selectionSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    ngOnInit(): void {
        this.data = orderDetails;
        this.groupOptions = { showGroupedColumn: true };
        this.filterSettings = { type: 'CheckBox' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.selectionSettings = { allowColumnSelection: true};
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
    }
    public columnMenu:any = [
        { id: 'Default', text: 'Default' },
        { id: 'Custom', text: 'Custom' }
    ];
    public fields: Object = { text: 'text', value: 'id' };
    public columnMenuClick(args: any) {
        if (args.item.id === 'select_column') {
            this.grid.selectionModule.selectColumn(args.column.index);
            // custom function
        } else if (args.item.id === 'clear_column') {
            // custom function
            this.grid.selectionModule.clearColumnSelection();
        }
    }
    public change(e: any) {
        let gridMenuOption = e.value;
        if (gridMenuOption === 'Custom') {
            let columnMenuItems:any = [
                'SortAscending',
                'SortDescending',
                'Group',
                'Ungroup',
                'Filter',
                { text: 'Select Column', id: 'select_column' },
                { text: 'Clear column selection', id: 'clear_column' },
            ];
            this.grid.columnMenuItems = columnMenuItems;
        } else {
            this.grid.columnMenuClick = undefined;
            this.grid.columnMenuItems = undefined;
        }
    }
}