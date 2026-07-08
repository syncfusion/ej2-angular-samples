import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, ToolbarService, ColumnChooserService, SortService, GridModule, PageService, FilterService, EditService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { OrderedData } from '../data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'column-chooser.html',
    providers: [ToolbarService, ColumnChooserService, SortService, PageService, FilterService, EditService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent, CheckBoxModule]
})
export class ColumnChooserComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    public pageSettings: Object;
    public filterSettings: Object;
    public columnChooserSettings: Object;
    public editSettings: Object;
    public orderIDRules: Object;
    public customerIDRules: Object;
    public freightRules: Object;
    public dateRules: Object;
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('immediateColumnChooser')
    public checkboxInstance: CheckBoxComponent;
    ngOnInit(): void {
        this.data = OrderedData;
        this.filterSettings = { type: 'CheckBox' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderIDRules = { required: true, number: true };
        this.customerIDRules = { required: true, minLength: 5 };
        this.freightRules = { required: true, min: 0 };
        this.dateRules = { required: true };
        this.pageSettings = { pageCount: 5 };
        this.columnChooserSettings = { mode: 'Immediate' };
    }
    public changeHandler(e: any): void {
        if (e.checked) {
            this.grid.columnChooserSettings.mode = 'Immediate';
        } else {
            this.grid.columnChooserSettings.mode = 'Default';
        }
    }
}