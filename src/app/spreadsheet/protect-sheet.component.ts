import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { protectSheetData } from './data';
import { SpreadsheetComponent, CellRenderEventArgs } from '@syncfusion/ej2-angular-spreadsheet';
/**
 * Protect sheet Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'protect-sheet.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None
})

export class ProtectSheetComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    spreadsheetObj: SpreadsheetComponent;
    data: Object[] = protectSheetData();
    public openUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open';
    public saveUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save';
    created() {
        // Applied style and number formatting to a range
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'EMI Schedule!A1:F1');
        this.spreadsheetObj.numberFormat('$#,##0.00', 'EMI Schedule!C2:F13');
    }
    beforeCellRender(args: CellRenderEventArgs) {
        // Merged cells using custom code
        if (this.spreadsheetObj.sheets[this.spreadsheetObj.activeSheetIndex].name === 'EMI Calculator' && args.address === 'B1') {
            (args.element as HTMLTableCellElement).colSpan = 2;
        }
    }
}
