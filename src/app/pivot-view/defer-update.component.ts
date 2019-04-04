import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    IDataOptions, PivotFieldListComponent, PivotViewComponent,
    EnginePopulatedEventArgs, CalculatedFieldService, FieldListService, IDataSet
} from '@syncfusion/ej2-angular-pivotview';
import { Browser, setStyleAttribute, prepend } from '@syncfusion/ej2-base';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * Pivot Field List default sample
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'defer-update.html',
    styleUrls: ['defer-update.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [CalculatedFieldService, FieldListService]
})
export class DeferUpdateComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotViewComponent;

    @ViewChild('pivotfieldlist')
    public fieldlistObj: PivotFieldListComponent;

    afterPopulate(arge: EnginePopulatedEventArgs): void {
        if (this.fieldlistObj && this.pivotGridObj) {
            this.fieldlistObj.updateView(this.pivotGridObj);
        }
        if (this.fieldlistObj && this.pivotGridObj && this.fieldlistObj.isRequiredUpdate) {
            this.fieldlistObj.updateView(this.pivotGridObj);
        }
        this.pivotGridObj.notify('ui-update', this.pivotGridObj);
        if (!Browser.isDevice) {
            this.fieldlistObj.notify('tree-view-update', this.fieldlistObj);
        }
    }
    afterEnginePopulate(args: EnginePopulatedEventArgs): void {
        if (!Browser.isDevice && this.fieldlistObj && this.pivotGridObj) {
            this.fieldlistObj.update(this.pivotGridObj);
        }
    }
    onLoad(): void {
        if (Browser.isDevice) {
            this.fieldlistObj.renderMode = 'Popup';
            this.fieldlistObj.target = '.control-section';
            setStyleAttribute(document.getElementById('PivotFieldList'), {
                width: 0,
                height: 0,
                float: 'left',
                'display': 'none'
            });
        }
    }

    ondataBound(): void {
        if (Browser.isDevice) {
            this.pivotGridObj.element.style.width = '100%';
            this.pivotGridObj.allowCalculatedField = true;
            this.pivotGridObj.showFieldList = true;
        }
        this.pivotGridObj.tooltip.destroy();
        this.pivotGridObj.refresh();
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            data: Pivot_Data,
            expandAll: false,
            allowLabelFilter: true,
            allowValueFilter: true,
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany', 'United States'] }],
            filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true
        };
    }
}