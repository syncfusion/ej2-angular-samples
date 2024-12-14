import { Component, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, IDataSet, PivotViewModule, FieldListService, PivotView } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { Browser,enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';

enableRipple(false);

/**
 * Pivot Table Classic Layout Sample.
 */

declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');

@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['classic-layout.css'],
    templateUrl: 'classic-layout.html',
    standalone: true,
    providers: [FieldListService],
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, SwitchModule]
})

export class ClassicLayoutComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    @ViewChild('pivotview')
    public pivotObj: PivotView;

    onChange() {
        this.pivotObj.gridSettings.layout = this.pivotObj.gridSettings.layout === 'Compact' ? 'Tabular' : 'Compact';
    }
    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: Browser.isDevice ? 100 : 120,
            layout: 'Tabular'
        } as GridSettings;

        this.dataSourceSettings = {
            dataSource: data,
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Quarter' }],
            rows: [{ name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }, {name: 'Order_Source', caption: 'Order Source'}],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            drilledMembers: [{ name: 'Product_Categories', items: ['Accessories', 'Bikes'] }, { name: 'Products', delimiter: '##', items: ['Accessories##Helmets'] }],
            filterSettings: [{
                name: 'Products', type: 'Exclude', items: ['Cleaners', 'Fenders']
            }],
            expandAll: false,
            values: [{ name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        };
    }
}
