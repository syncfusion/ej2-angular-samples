import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { CellEditSettings } from '@syncfusion/ej2-pivotview/src/pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Sample with Edit Options.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'editing.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['editing.css']
})
export class EditingComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;
    public editSettings: CellEditSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    onRadioChange(args: any): void {
        if (args.value === 'inline') {
            this.pivotGridObj.editSettings.allowEditOnDblClick = true;
            this.pivotGridObj.editSettings.allowCommandColumns = false;
            this.pivotGridObj.editSettings.mode = 'Normal';
        } else if (args.value === 'batch') {
            this.pivotGridObj.editSettings.allowEditOnDblClick = true;
            this.pivotGridObj.editSettings.allowCommandColumns = false;
            this.pivotGridObj.editSettings.mode = 'Batch';
        } else if (args.value === 'dialog') {
            this.pivotGridObj.editSettings.allowEditOnDblClick = true;
            this.pivotGridObj.editSettings.allowCommandColumns = false;
            this.pivotGridObj.editSettings.mode = 'Dialog';
        } else {
            this.pivotGridObj.editSettings.allowCommandColumns = true;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.editSettings = {
            allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowCommandColumns: false,
            allowEditOnDblClick: true, showConfirmDialog: true, showDeleteConfirmDialog: false
        } as CellEditSettings;

        this.dataSource = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Quarter' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        };
    }
}