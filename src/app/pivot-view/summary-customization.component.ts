import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, FieldListService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { MultiSelect, SelectEventArgs, RemoveEventArgs, PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);

/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'summary-customization.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['summary-customization.css'],
    providers: [FieldListService]
})
export class SummaryCustomizationComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    /* tslint:disable */
    onChange(args: any) {
        this.pivotGridObj.setProperties({ dataSource: { showGrandTotals: true } }, true);
        this.pivotGridObj.setProperties({ dataSource: { showRowGrandTotals: true } }, true);
        this.pivotGridObj.setProperties({ dataSource: { showColumnGrandTotals: true } }, true);
        if (args.value === 'Column') {
            this.pivotGridObj.dataSource.showColumnGrandTotals = false;
        } else if (args.value === 'Row') {
            this.pivotGridObj.dataSource.showRowGrandTotals = false;
        } else if (args.value === 'Both') {
            this.pivotGridObj.dataSource.showGrandTotals = false;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            enableSorting: true,
            drilledMembers: [{ name: 'Country', items: ['France'] }],
            filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            showGrandTotals: false
        };

        let fields: { [key: string]: Object; }[] = [
            { Name: 'Country' },
            { Name: 'Year' }
        ];

        let valuesddl: MultiSelect = new MultiSelect({
            dataSource: fields,
            mode: 'CheckBox',
            showDropDownIcon: true,
            showClearButton: false,
            enableSelectionOrder: false,
            fields: { text: 'Name' },
            placeholder: 'Select fields to hide its sub-totals',
            select: (args: SelectEventArgs): void => {
                for (let i: number = 0; i < this.pivotGridObj.dataSource.columns.length; i++) {
                    if ((this.pivotGridObj.dataSource.columns[i].name || this.pivotGridObj.dataSource.columns[i].caption) === (args.itemData as any).Name) {
                        this.pivotGridObj.dataSource.columns[i].showSubTotals = false;
                    }
                }
                for (let i: number = 0; i < this.pivotGridObj.dataSource.rows.length; i++) {
                    if ((this.pivotGridObj.dataSource.rows[i].name || this.pivotGridObj.dataSource.rows[i].caption) === (args.itemData as any).Name) {
                        this.pivotGridObj.dataSource.rows[i].showSubTotals = false;
                    }
                }
            },
            removed: (args: RemoveEventArgs): void => {
                for (let i: number = 0; i < this.pivotGridObj.dataSource.columns.length; i++) {
                    if ((this.pivotGridObj.dataSource.columns[i].name || this.pivotGridObj.dataSource.columns[i].caption) === (args.itemData as any).Name) {
                        this.pivotGridObj.dataSource.columns[i].showSubTotals = true;
                    }
                }
                for (let i: number = 0; i < this.pivotGridObj.dataSource.rows.length; i++) {
                    if ((this.pivotGridObj.dataSource.rows[i].name || this.pivotGridObj.dataSource.rows[i].caption) === (args.itemData as any).Name) {
                        this.pivotGridObj.dataSource.rows[i].showSubTotals = true;
                    }
                }
            },
            open: (args: PopupEventArgs): void => {
                (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
            }
        });
        valuesddl.appendTo('#values');

    }
}