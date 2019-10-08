import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent, SheetModel } from '@syncfusion/ej2-angular-spreadsheet';
import { DataManager, Query } from '@syncfusion/ej2-data';
/**
 * Remote Data Binding Spreadsheet Controller
 */
const SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices//wcf/Northwind.svc/Orders';

@Component({
    selector: 'control-content',
    templateUrl: 'remote-data-binding.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None
})

export class RemoteDataBindingController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('remoteDataBinding')
    public spreadsheetObj: SpreadsheetComponent;
    public openUrl: string = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open';
    public saveUrl: string = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save';
    public query: Query = new Query().select(['OrderID', 'CustomerID', 'ShipName', 'ShipCity', 'ShipCountry', 'Freight']).take(200);
    public data: DataManager = new DataManager({
        url: 'https://js.syncfusion.com/demos/ejServices//wcf/Northwind.svc/Orders',
        crossDomain: true
    });
    dataBound() {
        if (!this.spreadsheetObj.isOpen && this.spreadsheetObj.sheets[this.spreadsheetObj.activeSheetTab - 1].name === 'Shipment Details') {
            this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
        }
    }
}
