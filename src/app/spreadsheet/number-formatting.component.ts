import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { getFormatFromType, SpreadsheetComponent, CellStyleModel, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { numberFormatData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Cell Data Binding Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'number-formatting.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SpreadsheetModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class NumberFormattingController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('numberFormat')
    public spreadsheetObj: SpreadsheetComponent;
    public data: Object[] = numberFormatData();
    public accounting: string = getFormatFromType('Accounting');
    public style: CellStyleModel = { fontWeight: 'bold' };
    created() {
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold' }, 'A1:E2');
        this.spreadsheetObj.cellFormat({ textAlign: 'center', fontWeight: 'bold' }, 'A3:E3');
        this.spreadsheetObj.cellFormat({ textAlign: 'center' }, 'A4:A14');
        this.spreadsheetObj.cellFormat({ textAlign: 'center' }, 'C4:C14');
        this.spreadsheetObj.cellFormat({ backgroundColor: '#F9FBE7' }, 'A4:E15');
        this.spreadsheetObj.cellFormat({ backgroundColor: '#1E88E5', color: '#F5F5F5' }, 'A1:E2');
        this.spreadsheetObj.cellFormat({ backgroundColor: '#BBDEFB' }, 'A3:E3');
        this.spreadsheetObj.cellFormat({ backgroundColor: '#B3E5FC' }, 'A15:E17');
        // Apply format to the specified range in the active sheet.
        this.spreadsheetObj.numberFormat('$#,##0.00', 'D4:E14');
        this.spreadsheetObj.numberFormat('$#,##0.00', 'E15:E17');
        this.spreadsheetObj.numberFormat('[Red][<=350]$#,##0.00;[Blue][>350]$#,##0.00', 'E4:E14');
    }
}