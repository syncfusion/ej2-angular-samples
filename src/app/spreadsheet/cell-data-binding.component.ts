import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Cell Data Binding Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'cell-data-binding.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
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
    currencyFormat: string = '$#,##0.00';
}