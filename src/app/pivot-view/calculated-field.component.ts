import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { IDataOptions, PivotView, FieldListService, CalculatedFieldService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Sample with Calculated Fields.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'calculated-field.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['calculated-field.css'],
    providers: [FieldListService, CalculatedFieldService]
})
export class CalculatedFieldComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    onClick(e: Event): void {
        this.pivotGridObj.calculatedFieldModule.createCalculatedFieldDialog();
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            data: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' },
            { name: 'Sold', caption: 'Units Sold' }, { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            calculatedFieldSettings: [
                {
                    name: 'Total',
                    formula: '"Sum(In_Stock)"+"Sum(Sold)"'
                }]
        };
    }
}