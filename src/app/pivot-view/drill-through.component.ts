import { Component, OnInit } from '@angular/core';
import { IDataOptions, FieldListService, DrillThroughService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'drill-through.html',
    styleUrls: ['drill-through.css'],
    providers: [FieldListService, DrillThroughService]
})
export class DrillThroughComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            data: Pivot_Data,
            rows: [{ name: 'Country' }, { name: 'Products' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            expandAll: false,
            enableSorting: true
        };
    }
}