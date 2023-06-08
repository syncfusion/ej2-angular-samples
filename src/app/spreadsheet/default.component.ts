import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { getDefaultData } from './data';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
/**
 * Default Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('default')
    public spreadsheetObj: SpreadsheetComponent;
    public data: Object[] = getDefaultData();
    public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
    public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
    created() {
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold' }, 'E31:F31');
        this.spreadsheetObj.cellFormat({ textAlign: 'right' }, 'E31');
        this.spreadsheetObj.numberFormat('$#,##0.00', 'F2:F31');
    }
}