import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { grossPay } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Data Validation Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'data-validation.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class DataValidationComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    public spreadsheetObj: SpreadsheetComponent;
    currencyFormat: string = '$#,##0.00';
    public grossPay: Object[] = grossPay();
    created() {
        this.spreadsheetObj.merge('A1:I2');
        this.spreadsheetObj.setBorder({ border: '1px solid #A6A6A6' }, "A1:I13");
        this.spreadsheetObj.cellFormat({ textAlign: 'center', verticalAlign: 'middle'}, 'A3:I13');
        this.spreadsheetObj.cellFormat({ backgroundColor: '#B3FFB3', fontWeight : "bold"}, 'A3:I3');
        this.spreadsheetObj.numberFormat('$#,##0.00', 'H4:I13');
        this.spreadsheetObj.numberFormat('m/d/yyyy', 'C4:C13');
        this.spreadsheetObj.wrap('H3:I3');
        //Add Data validation to range.
        this.spreadsheetObj.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '9', ignoreBlank: false }, 'G4:G13');
        this.spreadsheetObj.addDataValidation({ type: 'TextLength', operator: 'GreaterThan', value1: '3', ignoreBlank: false }, 'B4:B13');
        this.spreadsheetObj.addDataValidation({ type: 'Time', operator: 'GreaterThan', value1: '8:00:00 AM', ignoreBlank: false  }, 'E4:E13');
        this.spreadsheetObj.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '6:00:00 PM', ignoreBlank: false  }, 'F4:F13');
        this.spreadsheetObj.addDataValidation({ type: 'List', value1: 'Mon, Tue, Wed, Thu, Fri', ignoreBlank: false  }, 'D4:D13');
        this.spreadsheetObj.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '=H5', ignoreBlank: false }, 'I4:I13');
        //Highlight Invalid Data.
        this.spreadsheetObj.addInvalidHighlight('G4:G13');
        this.spreadsheetObj.addInvalidHighlight('I4:I13');
    }
}
