import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, FieldListService, ConditionalFormattingService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Sample with Conditional Formatting.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'conditional-formatting.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['conditional-formatting.css'],
    providers: [FieldListService, ConditionalFormattingService]
})
export class ConditionalFormattingComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    applyFormat(e: Event): void {
        this.pivotGridObj.conditionalFormattingModule.showConditionalFormattingDialog();
    }

    resetFormat(e: Event): void {
        if (this.pivotGridObj.dataSource.conditionalFormatSettings.length > 0) {
            this.pivotGridObj.setProperties({ dataSource: { conditionalFormatSettings: [] } }, true);
            this.pivotGridObj.renderPivotGrid();
        }
        this.pivotGridObj.conditionalFormattingModule.destroy();
        document.getElementById('conditional-formatting-reset-btn').blur();
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 100
        } as GridSettings;

        this.dataSource = {
            data: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' },
            { name: 'Sold', caption: 'Units Sold' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            conditionalFormatSettings: [
                {
                    measure: 'In Stock',
                    value1: 5000,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#80cbc4',
                        color: 'black',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    }
                },
                {
                    value1: 3400,
                    value2: 40000,
                    measure: 'Units Sold',
                    conditions: 'Between',
                    style: {
                        backgroundColor: '#f48fb1',
                        color: 'black',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    }
                }
            ]
        };
    }
}