import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
/**
 * Cell Data Binding Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'cell-data-binding.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None
})

export class CellDataBindingController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('cellDataBind')
    public spreadsheetObj: SpreadsheetComponent;
    public styles = { fontWeight: 'bold', textAlign: 'center' };
    public styles2 = { fontWeight: 'bold', textAlign: 'right' };
    public styles3 = { fontWeight: 'bold' };
    dataBound() {
        if (!this.spreadsheetObj.isOpen && this.spreadsheetObj.sheets[this.spreadsheetObj.activeSheetTab - 1].name === "Monthly Budget") {
            this.spreadsheetObj.numberFormat('$#,##0.00', 'D2:D13');
        }
    }
}