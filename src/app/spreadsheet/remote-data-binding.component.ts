import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent, SheetModel, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Remote Data Binding Spreadsheet Controller
 */
const SERVICE_URI: string = 'https://services.syncfusion.com/angular/production/api/Orders';

@Component({
    selector: 'control-content',
    templateUrl: 'remote-data-binding.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SpreadsheetModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class RemoteDataBindingController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('remoteDataBinding')
    public spreadsheetObj: SpreadsheetComponent;
    public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
    public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
    public data: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/Orders',
        adaptor: new CustomAdaptor(),
    });
    created() {
        // Apply style to a range
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
    }
}

//Custom code to handle data
class CustomAdaptor extends ODataAdaptor {
    public processResponse(): Object {
        let result: Object[] = [];
        let original: { result: Object[]; count: number } = super.processResponse.apply(this, arguments);
        original.result.forEach((item: { SNo: number }, idx: number) => {
            result[idx] = {};
            Object.keys(item).forEach((key: string) => {
                if (['OrderID', 'CustomerID', 'Freight', 'ShipName', 'ShipCity', 'ShipCountry'].indexOf(key) > -1) {
                    result[idx][key] = item[key];
                }
            });
        });
        return { result: result, count: original.count };
    }
}
