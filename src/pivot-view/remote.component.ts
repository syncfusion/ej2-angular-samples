import { Component, OnInit } from '@angular/core';
import { IDataOptions, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DataManager, WebApiAdaptor, Query, ReturnOption } from '@syncfusion/ej2-data';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView sample for Remote data source.
 */

@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['remote.css'],
    templateUrl: 'remote.html'
})

export class RemoteComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120
        } as GridSettings;

        let remoteData: IDataSet[];
        new DataManager({
            url: 'https://bi.syncfusion.com/northwindservice/api/orders',
            adaptor: new WebApiAdaptor,
            crossDomain: true
        }).executeQuery(new Query().take(8)).then((e: ReturnOption) => {
            remoteData = e.result as IDataSet[];
            this.dataSource = {
                data: remoteData as IDataSet[],
                expandAll: true,
                filters: [],
                columns: [{ name: 'ProductName', caption: 'Product Name' }],
                rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
                formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
                values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
            };
        });
    }
}