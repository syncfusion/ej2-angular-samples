import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { notesData } from './data';
import { SpreadsheetComponent, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Notes Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'notes.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class NotesController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('default')
    public spreadsheetObj: SpreadsheetComponent;
    public data: Object[] = notesData();
    public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
    public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
    created() {
        this.spreadsheetObj.numberFormat('$#,##0.00', 'F4:F13');
        this.spreadsheetObj.numberFormat('$###', 'E4:E12');
        this.spreadsheetObj.freezePanes(3, 0);
    }
}
