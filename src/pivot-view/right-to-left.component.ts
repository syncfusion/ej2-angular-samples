import { Component, OnInit } from '@angular/core';
import { Pivot_Data } from './data-source';
import { IDataOptions, GroupingBarService, FieldListService, CalculatedFieldService } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView RTL Sample.
 */

@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'right-to-left.html',
    styleUrls: ['right-to-left.css'],
    providers: [GroupingBarService, FieldListService, CalculatedFieldService]
})
export class RTLComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            data: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
        };
    }
}