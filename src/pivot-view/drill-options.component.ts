import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Pivot_Data } from './data-source';
import { IDataOptions, PivotView } from '@syncfusion/ej2-angular-pivotview';
import { RadioButton } from '@syncfusion/ej2-angular-buttons';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Grouping bar Sample
 */

@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'drill-options.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['drill-options.css']
})
export class DrillOptionsComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    onRadioChange(args: any): void {
        let id: string = (args.event.target as HTMLElement).id;
        if (id !== 'collapse') {
            /** To restrict multiple times grid rendering on property change. */
            this.pivotGridObj.setProperties({ dataSource: { expandAll: false, drilledMembers: [] } }, true);
        } else {
            this.pivotGridObj.dataSource.drilledMembers = [];
        }
        if (id === 'collapse') {
            this.pivotGridObj.dataSource.expandAll = false;
        } else if (id === 'expand') {
            this.pivotGridObj.dataSource.expandAll = true;
        } else if (id === 'fy15') {
            this.pivotGridObj.dataSource.drilledMembers = [{ name: 'Year', items: ['FY 2015'] }];
        } else if (id === 'fy15_q1') {
            this.pivotGridObj.dataSource.drilledMembers = [{ name: 'Year', items: ['FY 2015'] },
            { name: 'Quarter', items: ['Q1'] }];
        } else if (id === 'us') {
            this.pivotGridObj.dataSource.drilledMembers = [{ name: 'Country', items: ['United States'] }];
        } else {
            this.pivotGridObj.dataSource.drilledMembers = [{ name: 'Country', items: ['United States'] },
            { name: 'Product_Categories', items: ['Clothing'] }];
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

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
        let radioButton: RadioButton = new RadioButton({
            label: 'Collapse All',
            name: 'DrillOperation',
            checked: true,
            change: this.onRadioChange.bind(this)
        });
        radioButton.appendTo('#collapse');
        radioButton = new RadioButton({
            label: 'Expand All',
            name: 'DrillOperation',
            checked: false,
            change: this.onRadioChange.bind(this)
        });
        radioButton.appendTo('#expand');
        radioButton = new RadioButton({
            label: 'FY 2015',
            name: 'DrillOperation',
            checked: false,
            change: this.onRadioChange.bind(this)
        });
        radioButton.appendTo('#fy15');
        radioButton = new RadioButton({
            label: 'FY 2015 >> Q1',
            name: 'DrillOperation',
            checked: false,
            change: this.onRadioChange.bind(this)
        });
        radioButton.appendTo('#fy15_q1');
        radioButton = new RadioButton({
            label: 'United States',
            name: 'DrillOperation',
            checked: false,
            change: this.onRadioChange.bind(this)
        });
        radioButton.appendTo('#us');
        radioButton = new RadioButton({
            label: 'United States >> Clothing',
            name: 'DrillOperation',
            checked: false,
            change: this.onRadioChange.bind(this)
        });
        radioButton.appendTo('#us_clothing');
    }
}