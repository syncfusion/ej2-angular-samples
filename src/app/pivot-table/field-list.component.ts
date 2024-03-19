import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    IDataOptions, PivotFieldListComponent, PivotViewComponent,
    EnginePopulatedEventArgs, CalculatedFieldService, FieldListService, IDataSet, PivotFieldListModule, PivotViewModule
} from '@syncfusion/ej2-angular-pivotview';
import { Browser, setStyleAttribute, prepend } from '@syncfusion/ej2-base';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Field List default sample
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'field-list.html',
    styleUrls: ['field-list.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [CalculatedFieldService, FieldListService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, PivotFieldListModule]
})
export class FieldListComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotObj: PivotViewComponent;

    @ViewChild('pivotfieldlist')
    public fieldlistObj: PivotFieldListComponent;

    afterPopulate(arge: EnginePopulatedEventArgs): void {
        if (this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.updateView(this.pivotObj);
        }
    }
    afterEnginePopulate(args: EnginePopulatedEventArgs): void {
        if (!Browser.isDevice && this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.update(this.pivotObj);
        }
    }
    onLoad(): void {
        if (Browser.isDevice) {
            this.fieldlistObj.renderMode = 'Popup';
            this.fieldlistObj.target = '.control-section';
            setStyleAttribute(document.getElementById('PivotFieldList'), {
				width: '0',
                height: '0',
                float: 'left',
                'display': 'none'
            });
        }
    }

    ondataBound(): void {
        if (Browser.isDevice) {
            this.pivotObj.element.style.width = '100%';
            this.pivotObj.allowCalculatedField = true;
            this.pivotObj.showFieldList = true;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSourceSettings = {
            dataSource: Pivot_Data,
            expandAll: false,
            allowLabelFilter: true,
            allowValueFilter: true,
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