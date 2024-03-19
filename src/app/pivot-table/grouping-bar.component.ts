import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, GroupingBarService, PivotView, IDataSet, PivotViewModule, GroupingBarSettings } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { CheckBoxModule} from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Grouping bar Sample
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'grouping-bar.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['grouping-bar.css'],
    providers: [GroupingBarService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, CheckBoxModule]
})
export class GroupingBarComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public groupingBarSettings: GroupingBarSettings;

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    /* tslint:disable */
    onFilter(args: any) {
        this.pivotObj.groupingBarSettings.showFilterIcon = args.checked;
    }

    onSort(args: any) {
        this.pivotObj.groupingBarSettings.showSortIcon = args.checked;
    }

    onRemove(args: any) {
        this.pivotObj.groupingBarSettings.showRemoveIcon = args.checked;
    }

    onValueType(args: any) {
        this.pivotObj.groupingBarSettings.showValueTypeIcon = args.checked;
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;
        this.groupingBarSettings = {
            showFieldsPanel: true
        } as GroupingBarSettings;

        this.dataSourceSettings = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            dataSource: Pivot_Data,
            expandAll: false,
            values: [{ name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        };
    }
}