import { Component, OnInit, ViewChild } from '@angular/core';
import { FreezeService, ResizeService, GridComponent, SortService, GridModule, PageService, FilterService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { orderDetails } from './data';

@Component({
    selector: 'ej2-grid-frozen',
    templateUrl: 'frozen-rows-columns.html',
    providers: [FreezeService, ResizeService, SortService, PageService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [GridModule, NumericTextBoxModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class FrozenRowsColumnsComponent implements OnInit {
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('rows')
    public rows: NumericTextBoxComponent;
    @ViewChild('columns')
    public columns: NumericTextBoxComponent;
    public data: Object[] = [];
    public filterSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    columnValue: number = Browser.isDevice ? 1 : 2;
    //After clicking 'Set' button, the `frozenRows` and `frozenColumns` values will be updated in Grid.
    btnClick() {
        this.grid.frozenRows = this.rows.value;
        this.grid.frozenColumns = this.columns.value;
    }

    ngOnInit(): void {
        this.data = orderDetails;
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
    }
}