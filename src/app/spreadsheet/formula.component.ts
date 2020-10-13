import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SelectionService, EditService, SheetModel, DefineNameModel } from '@syncfusion/ej2-angular-spreadsheet';
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
    definedNames: DefineNameModel[] = [{
        name: 'Profit', refersTo: '=F2:F11'
    },
    {
        name: 'High', refersTo: '=D2:D11'
    }];
    created() {
        // Style and number formatting
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', backgroundColor: '#279377', color: '#fff', textAlign: 'center', verticalAlign: 'middle', fontSize: '14px' }, 'A1:F1');
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', backgroundColor: '#EEEEEE' }, 'A12:F15');
        this.spreadsheetObj.numberFormat('0.00', 'F2:F11');
        this.spreadsheetObj.updateCell({ value: 'Average profit:' }, 'D12');
        this.spreadsheetObj.updateCell({ value: 'Maximum stock value:' }, 'D13');
        this.spreadsheetObj.updateCell({ value: 'Minimum stock value:' }, 'D14');
        this.spreadsheetObj.updateCell({ value: 'Nonprofitable days:' }, 'D15');
        this.spreadsheetObj.updateCell({ formula: '=AVERAGE(Profit)', format: '0.00' }, 'F12');
        this.spreadsheetObj.updateCell({ formula: '=MAX(High)', format: '0.00' }, 'F13');
        this.spreadsheetObj.updateCell({ formula: '=MIN(E2:E11)', format: '0.00' }, 'F14');
        this.spreadsheetObj.updateCell({ formula: '=COUNTIF(F2:F11,"<=0")', format: '0.00' }, 'F15');

    }
}