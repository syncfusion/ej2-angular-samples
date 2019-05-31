import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, GroupingBarService, PivotView, FieldListService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'grouping-bar.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['grouping-bar.css'],
    providers: [GroupingBarService, FieldListService]
})
export class GroupingBarComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    /* tslint:disable */
    onChange(args: any) {
        if (args.event.target.value === 'filter') {
            this.pivotGridObj.groupingBarSettings.showFilterIcon = args.checked;
        } else if (args.event.target.value === 'sort') {
            this.pivotGridObj.groupingBarSettings.showSortIcon = args.checked;
        } else if (args.event.target.value === 'remove') {
            this.pivotGridObj.groupingBarSettings.showRemoveIcon = args.checked;
        } else {
            this.pivotGridObj.groupingBarSettings.showValueTypeIcon = args.checked;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        };
    }
}