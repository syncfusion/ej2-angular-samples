import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, FieldListService, PivotView,PivotViewModule, GroupingBarService, VirtualScrollService } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { Browser, enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Server Side Aggregation Sample.
 */
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['server-side-aggregation.css'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'server-side-aggregation.html',
    providers: [FieldListService, GroupingBarService, VirtualScrollService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class ServerSideAggregationComponent implements OnInit {

    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    onDataBound(): void {
        if (Browser.isDevice && this.pivotObj && this.pivotObj.enableRtl) {
            (document as any).querySelector('.control-section').classList.add('e-rtl');
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120
        } as GridSettings;

        this.dataSourceSettings = {
            url: 'https://services.syncfusion.com/angular/production/api/pivot/post',
            mode: 'Server',
            expandAll: false,
            enableSorting: true,
            columns: [{ name: 'Year', caption: 'Production Year' }],
            values: [
                { name: 'Sold', caption: 'Units Sold' },
                { name: 'Price', caption: 'Sold Amount' }
            ],
            rows: [{ name: 'ProductID', caption: 'Product ID' }],
            formatSettings: [{ name: 'Price', format: 'C0' }, { name: 'Sold', format: 'N0' }],
            filters: []
        };
    }
}