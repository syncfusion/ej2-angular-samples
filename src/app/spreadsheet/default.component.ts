import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { getDefaultData } from './data';
import { SpreadsheetComponent, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Default Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
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
        // Apply format to the specified range in the active sheet.
        this.spreadsheetObj.numberFormat('$#,##0.00', 'F2:F31');
        // The default format code for the date format is 'm/d/yyyy'.
        this.spreadsheetObj.numberFormat('m/d/yyyy', 'E2:E30');
    }
}
