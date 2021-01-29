import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
/**
 * Cell Template Spreadsheet Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'cell-template.html',
    styleUrls: ['cell-template.css'],
    encapsulation: ViewEncapsulation.None
})

export class CellTemplateComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['cell-template.css'];
    }
    @ViewChild('spreadsheet')
    spreadsheetObj: SpreadsheetComponent;
    public experience: string[] =  ['0 - 1 year', '1 - 3 years', '3 - 5 years', '5 - 10 years'];
    public languages: string[] = ['JAVA', 'C#', 'SQL'];
    created() {
        // Applies format to specified range
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
        // Merges B1 and C1 cells
        this.spreadsheetObj.merge('B1:C1');
    }

}
