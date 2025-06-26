import { Component, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, PagerSettings, PageSettings,PivotViewModule, PivotView, PagerPosition, PagerService } from '@syncfusion/ej2-angular-pivotview';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs as CheckChange, CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table sample for Paging option.
 */

@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['paging.css'],
    templateUrl: 'paging.html',
    providers: [PagerService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, CheckBoxModule]
})

export class PagingComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public pageSettings: PageSettings;
    public pagerSettings: PagerSettings;
    public gridSettings: GridSettings;
    public remoteData: DataManager;
    public pagerPositions: string[] = ['Top', 'Bottom'];
    public pageSizes: string[] = ['Row', 'Column', 'Both', 'None'];
    public pagerViewData: string[] = ['Row', 'Column', 'Both'];

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('positionDropDown')
    public positionDropDown: DropDownListComponent;
    @ViewChild('pagerViewDropDown')
    public pagerViewDropDown: DropDownListComponent;
    @ViewChild('pageSizeDropDown')
    public pageSizeDropDown: DropDownListComponent;
    @ViewChild('Compact_View')
    public compactCheckBoxObj: CheckBoxComponent;
    @ViewChild('Inverse')
    public inverseCheckBoxObj: CheckBoxComponent;

    onDropDownChange(args: ChangeEventArgs): void {
        if (args.element.id === 'Pager_Position') {
            this.pivotObj.pagerSettings.position = args.value as PagerPosition;
        } else if (args.element.id === 'Pager_View') {
            if (args.value === 'Row') {
                this.pivotObj.pagerSettings.showRowPager = true;
                this.pivotObj.pagerSettings.showColumnPager = false;
            } else if (args.value === 'Column') {
                this.pivotObj.pagerSettings.showRowPager = false;
                this.pivotObj.pagerSettings.showColumnPager = true;
            } else {
                this.pivotObj.pagerSettings.showRowPager = this.pivotObj.pagerSettings.showColumnPager = true;
            }
        } else {
            if (args.value === 'Row') {
                this.pivotObj.pagerSettings.showRowPageSize = true;
                this.pivotObj.pagerSettings.showColumnPageSize = false;
            } else if (args.value === 'Column') {
                this.pivotObj.pagerSettings.showRowPageSize = false;
                this.pivotObj.pagerSettings.showColumnPageSize = true;
            } else if (args.value === 'Both') {
                this.pivotObj.pagerSettings.showRowPageSize = this.pivotObj.pagerSettings.showColumnPageSize = true;
            } else {
                this.pivotObj.pagerSettings.showRowPageSize = this.pivotObj.pagerSettings.showColumnPageSize = false;
            }
        }
    }

    onCompactCheckBoxChange(args: CheckChange): void {
        this.pivotObj.pagerSettings.enableCompactView = args.checked;
    }

    onInverseCheckBoxChange(args: CheckChange): void {
        this.pivotObj.pagerSettings.isInversed = args.checked;
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120
        } as GridSettings;

        this.remoteData = new DataManager({
            url: 'https://ej2services.syncfusion.com/angular/release/api/order',
            adaptor: new WebApiAdaptor,
            crossDomain: true
        });

        this.dataSourceSettings = {
            type: 'JSON',
            dataSource: this.remoteData,
            expandAll: true,
            columns: [{ name: 'ProductName', caption: 'Product Name' }],
            rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
            formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
            values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }],
            filters: []
        };
        this.pageSettings = {
            rowPageSize: 10,
            columnPageSize: 5,
            currentColumnPage: 1,
            currentRowPage: 1
        } as PageSettings;
        this.pagerSettings = {
            position: 'Bottom',
            enableCompactView: false,
            showColumnPager: true,
            showRowPager: true
        } as PagerSettings;
    }
}
