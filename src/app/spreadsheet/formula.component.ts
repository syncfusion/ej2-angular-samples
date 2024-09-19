import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SelectionService, EditService, SheetModel, DefineNameModel, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { formulaData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Cell Data Binding Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'formula.html',
    styleUrls: ['spreadsheet.css'],
    providers: [SelectionService, EditService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SpreadsheetModule, SBActionDescriptionComponent, SBDescriptionComponent]
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
        this.spreadsheetObj.numberFormat('m/d/yyyy', 'A2:A11');
        this.spreadsheetObj.setRowHeight(40, 0);
    }
}
