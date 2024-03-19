import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { IDataOptions, PivotView, FieldListService, PivotViewModule, CalculatedFieldService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple, Browser } from '@syncfusion/ej2-base';
import { ButtonModule} from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Sample with Calculated Fields.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'calculated-field.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['calculated-field.css'],
    providers: [FieldListService, CalculatedFieldService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, ButtonModule]
})
export class CalculatedFieldComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    onClick(e: Event): void {
        if (Browser.isDevice) {
            (this.pivotObj.pivotFieldListModule.dialogRenderer as any).onShowFieldList();
        } else {
            this.pivotObj.calculatedFieldModule.createCalculatedFieldDialog();
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSourceSettings = {
            dataSource: Pivot_Data,
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