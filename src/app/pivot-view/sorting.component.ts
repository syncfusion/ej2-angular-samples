import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBox, Button } from '@syncfusion/ej2-angular-buttons';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Member Sorting sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'sorting.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['sorting.css']
})

export class SortingComponent implements OnInit {
    public dataSource: IDataOptions;
    public fieldsddl: DropDownList;
    public orderddl: DropDownList;
    public gridSettings: GridSettings;
    public applyBtn: Button;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        let order: string[] = ['Ascending', 'Descending'];
        let fields: { [key: string]: Object }[] = [
            { Field: 'Country', Order: 'Country_asc' },
            { Field: 'Products', Order: 'Products_asc' },
            { Field: 'Year', Order: 'Year_asc' },
            { Field: 'Order Source', Order: 'Order Source_asc' }
        ];

        this.fieldsddl = new DropDownList({
            dataSource: fields,
            fields: { text: 'Field', value: 'Order' },
            index: 0,
            enabled: true,
            change: (args: ChangeEventArgs) => {
                if ((this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order === (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_asc') {
                    this.orderddl.index = 0;
                } else {
                    this.orderddl.index = 1;
                }
            }
        });
        this.fieldsddl.appendTo('#fields');

        this.orderddl = new DropDownList({
            dataSource: order,
            index: 0,
            enabled: true,
            change: (args: ChangeEventArgs) => {
                if (args.value === 'Ascending') {
                    (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order = (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_asc';
                } else {
                    (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order = (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_desc';
                }
                this.fieldsddl.refresh();
            }
        });
        this.orderddl.appendTo('#order');

        this.applyBtn = new Button({
            cssClass: 'e-flat', isPrimary: true,
        });
        this.applyBtn.appendTo('#apply');

        let checkBoxObj: CheckBox = new CheckBox({
            label: 'Enable Sorting', labelPosition: 'After', checked: true,
            change: (args: any) => {
                if (args.checked) {
                    this.fieldsddl.enabled = true;
                    this.orderddl.enabled = true;
                    this.applyBtn.disabled = false;
                } else {
                    this.fieldsddl.enabled = false;
                    this.orderddl.enabled = false;
                    this.applyBtn.disabled = true;
                }
            }
        });
        checkBoxObj.appendTo('#sorting');

        document.getElementById('apply').onclick = () => {
            if (checkBoxObj.checked) {
                this.pivotGridObj.dataSource.enableSorting = true;
                this.pivotGridObj.dataSource.sortSettings = [
                    { name: 'Country', order: (this.fieldsddl.dataSource as any)[0].Order === 'Country_asc' ? 'Ascending' : 'Descending' },
                    { name: 'Products', order: (this.fieldsddl.dataSource as any)[1].Order === 'Products_asc' ? 'Ascending' : 'Descending' },
                    { name: 'Year', order: (this.fieldsddl.dataSource as any)[2].Order === 'Year_asc' ? 'Ascending' : 'Descending' },
                    { name: 'Order_Source', order: (this.fieldsddl.dataSource as any)[3].Order === 'Order Source_asc' ? 'Ascending' : 'Descending' }
                ];
            } else {
                this.pivotGridObj.dataSource.enableSorting = false;
                this.pivotGridObj.dataSource.sortSettings = [];
            }
        };

        this.dataSource = {
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true
        };
    }
}