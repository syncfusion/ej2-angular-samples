import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SelectionService, EditService, SheetModel } from '@syncfusion/ej2-angular-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { formulaData } from './data';
/**
 * Cell Data Binding Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'formula.html',
    styleUrls: ['spreadsheet.css'],
    providers: [SelectionService, EditService],
    encapsulation: ViewEncapsulation.None
})

export class FormulasController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('formula')
    public spreadsheetObj: SpreadsheetComponent;
    public data: Object[] = formulaData();
    dataBound() {
        if (!this.spreadsheetObj.isOpen && this.spreadsheetObj.sheets[this.spreadsheetObj.activeSheetTab - 1].name === 'Stock Details') {
            this.spreadsheetObj.cellFormat
                ({ fontWeight: 'bold', backgroundColor: '#4ECDC4', textAlign: 'center', fontSize: '14px' }, 'A1:F1');
            this.spreadsheetObj.cellFormat({ backgroundColor: '#F2F2F2' }, 'A2:F11');
            this.spreadsheetObj.cellFormat({ fontWeight: 'bold', backgroundColor: '#C6EFCE' }, 'A12:F15');
            this.spreadsheetObj.numberFormat('0.00', 'F2:F11');
        }
    }
}