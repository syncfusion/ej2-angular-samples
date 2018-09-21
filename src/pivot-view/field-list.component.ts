import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Pivot_Data } from './data-source';
import { IDataOptions, PivotFieldListComponent, PivotViewComponent,
    EnginePopulatedEventArgs } from '@syncfusion/ej2-angular-pivotview';
import { Browser, setStyleAttribute, prepend } from '@syncfusion/ej2-base';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * Pivot Field List default sample
 */

@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'field-list.html',
    styleUrls: ['field-list.css'],
    encapsulation: ViewEncapsulation.None
})
export class FieldListComponent implements OnInit {
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
    }
    afterEnginePopulate(args: EnginePopulatedEventArgs): void {
        if (this.fieldlistObj && this.pivotGridObj) {
            this.fieldlistObj.update(this.pivotGridObj);
        }
    }
    onLoad(): void {
        if (Browser.isDevice) {
            this.fieldlistObj.renderMode = 'Popup';
            this.fieldlistObj.target = '.control-section';
            document.getElementById('PivotFieldList').removeAttribute('style');
            setStyleAttribute(document.getElementById('PivotFieldList'), {
                'height': 0,
                'float': 'left'
            });
        }
    }

    ondataBound(): void {
        this.pivotGridObj.toolTip.destroy();
        this.pivotGridObj.refresh();
        if (Browser.isDevice) {
            prepend([document.getElementById('PivotFieldList')], document.getElementById('PivotView'));
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            data: Pivot_Data,
            expandAll: false,
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