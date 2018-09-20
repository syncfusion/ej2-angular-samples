import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Pivot_Data } from './data-source';
import { IDataOptions, GroupingBarService, PivotView, FieldListService } from '@syncfusion/ej2-angular-pivotview';
import { CheckBox } from '@syncfusion/ej2-angular-buttons';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Grouping bar Sample
 */

@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'grouping-bar.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['grouping-bar.css'],
    providers: [GroupingBarService, FieldListService]
})
export class GroupingBarComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    /* tslint:disable */
    onChange(args: any) {
        if ((args.event.target as HTMLElement).id === 'filter') {
            this.pivotGridObj.groupingBarSettings.showFilterIcon = args.checked;
        } else if (args.event.target.id === 'sort') {
            this.pivotGridObj.groupingBarSettings.showSortIcon = args.checked;
        } else {
            this.pivotGridObj.groupingBarSettings.showRemoveIcon = args.checked;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        };
        let filter: CheckBox = new CheckBox({
            label: 'Show Filter Icon',
            checked: true,
            change: this.onChange.bind(this)
        });
        filter.appendTo('#filter');
        let sort: CheckBox = new CheckBox({
            label: 'Show Sort Icon',
            checked: true,
            change: this.onChange.bind(this)
        });
        sort.appendTo('#sort');
        let remove: CheckBox = new CheckBox({
            label: 'Show Remove Icon',
            checked: true,
            change: this.onChange.bind(this)
        });
        remove.appendTo('#remove');

    }
}