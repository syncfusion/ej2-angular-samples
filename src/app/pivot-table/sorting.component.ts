import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, IDataSet, PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent, CheckBoxComponent, ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Member Sorting sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'sorting.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['sorting.css'],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, ButtonModule, CheckBoxModule]
})

export class SortingComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public fieldsFieldsddl: Object = { text: 'Field', value: 'Order' };
    public order: string[] = ['Ascending', 'Descending'];
    public fields: { [key: string]: Object }[] = [
        { Field: 'Country', Order: 'Country_asc' },
        { Field: 'Products', Order: 'Products_asc' },
        { Field: 'Year', Order: 'Year_asc' },
        { Field: 'Order Source', Order: 'Order Source_asc' }
    ];

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('fieldsddl')
    public fieldsddl: DropDownListComponent;
    @ViewChild('orderddl')
    public orderddl: DropDownListComponent;
    @ViewChild('apply')
    public applyBtn: ButtonComponent;
    @ViewChild('sorting')
    public checkBoxObj: CheckBoxComponent;

    changeFieldsddl (args: ChangeEventArgs) {
        if ((this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order === (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_asc') {
            this.orderddl.index = 0;
        } else {
            this.orderddl.index = 1;
        }
    }

    changeOrderddl (args: ChangeEventArgs) {
        if (args.value === 'Ascending') {
            (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order = (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_asc';
        } else {
            (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order = (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_desc';
        }
        this.fieldsddl.refresh();
    }

    changeCheckBoxObj (args: any) {
        let ischecked: boolean = args.checked;
        this.fieldsddl.enabled = ischecked;
        this.orderddl.enabled = ischecked;
        this.applyBtn.disabled = !ischecked;
        this.pivotObj.dataSourceSettings.enableSorting = ischecked;
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        document.getElementById('apply').onclick = () => {
            if (this.checkBoxObj.checked) {
                this.pivotObj.dataSourceSettings.enableSorting = true;
                this.pivotObj.dataSourceSettings.sortSettings = [
                    { name: 'Country', order: (this.fieldsddl.dataSource as any)[0].Order === 'Country_asc' ? 'Ascending' : 'Descending' },
                    { name: 'Products', order: (this.fieldsddl.dataSource as any)[1].Order === 'Products_asc' ? 'Ascending' : 'Descending' },
                    { name: 'Year', order: (this.fieldsddl.dataSource as any)[2].Order === 'Year_asc' ? 'Ascending' : 'Descending' },
                    { name: 'Order_Source', order: (this.fieldsddl.dataSource as any)[3].Order === 'Order Source_asc' ? 'Ascending' : 'Descending' }
                ];
            } else {
                this.pivotObj.dataSourceSettings.enableSorting = false;
                this.pivotObj.dataSourceSettings.sortSettings = [];
            }
        };

        this.dataSourceSettings = {
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            dataSource: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true
        };
    }
}