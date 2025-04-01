import { Component, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, IDataSet, PivotViewModule, FieldListService, GroupingBarService, PivotView } from '@syncfusion/ej2-angular-pivotview';
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
    styleUrls: ['tabular-layout.css'],
    templateUrl: 'tabular-layout.html',
    standalone: true,
    providers: [FieldListService, GroupingBarService],
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, SwitchModule]
})

export class TabularLayoutComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    @ViewChild('pivotview')
    public pivotObj: PivotView;

    onChange() {
        this.pivotObj.gridSettings.layout = this.pivotObj.gridSettings.layout === 'Compact' ? 'Tabular' : 'Compact';
    }
    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: Browser.isDevice ? 100 : 140,
            layout: 'Tabular'
        } as GridSettings;

        this.dataSourceSettings = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            drilledMembers: [{ name: 'Country', items: ['France'] }],
            filterSettings: [{
                name: 'Products', type: 'Include', items: ['Bottles and Cages', 'Cleaners', 'Fenders', 'Gloves', 'Helmets',
                    'Hydration Packs', 'Jerseys', 'Mountain Bikes']
            }],
            dataSource: data,
            expandAll: false,
            values: [{ name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        };
    }
}