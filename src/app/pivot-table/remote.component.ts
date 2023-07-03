import { Component, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, PivotView } from '@syncfusion/ej2-angular-pivotview';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * Pivot Table sample for Remote data source.
 */

@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['remote.css'],
    templateUrl: 'remote.html'
})

export class RemoteComponent implements OnInit {
    public jsonReport: IDataOptions;
    public csvReport: IDataOptions;
    public gridSettings: GridSettings;
    public remoteData: DataManager;

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    public dropDownData: Object[] = [
        { Id: 'JSON', Data: 'JSON' },
        { Id: 'CSV', Data: 'CSV' }
      ];
    public fields: Object = { text: 'Data', value: 'Id' };
    public waterMark: string = 'Select a Data type';
    public value: string = 'JSON';

    onChange(args: ChangeEventArgs): void {
        if (args.value === 'JSON') {
            this.pivotObj.dataSourceSettings = this.jsonReport;
        } else if (args.value === 'CSV') {
            this.pivotObj.dataSourceSettings = this.csvReport;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120
        } as GridSettings;

        this.remoteData = new DataManager({
            url: 'https://bi.syncfusion.com/northwindservice/api/orders',
            adaptor: new WebApiAdaptor,
            crossDomain: true
        });
        this.jsonReport = {
            dataSource: this.remoteData,
            type: 'JSON',
            expandAll: true,
            filters: [],
            columns: [{ name: 'ProductName', caption: 'Product Name' }],
            rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
            formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
            values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
        };

        this.csvReport = {
            url: 'https://bi.syncfusion.com/productservice/api/sales',
            type: 'CSV',
            expandAll: false,
            enableSorting: true,
            formatSettings: [
                { name: 'Total Cost', format: 'C0' },
                { name: 'Total Revenue', format: 'C0' },
                { name: 'Total Profit', format: 'C0' }
            ],
            drilledMembers: [{ name: 'Item Type', items: ['Baby Food'] }],
            rows: [
                { name: 'Region' },
                { name: 'Country' }
            ],
            columns: [
                { name: 'Item Type' },
                { name: 'Sales Channel' }
            ],
            values: [
                { name: 'Total Cost' },
                { name: 'Total Revenue' },
                { name: 'Total Profit' }
            ],
            filters: []
        };
    }
}
