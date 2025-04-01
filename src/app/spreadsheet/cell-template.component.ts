import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { RadioButtonModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Cell Template Spreadsheet Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'cell-template.html',
    styleUrls: ['cell-template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, TextBoxModule, RadioButtonModule, DropDownListModule, MultiSelectModule, ButtonModule, SBDescriptionComponent]
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
        this.spreadsheetObj.cellFormat({ verticalAlign: 'middle' }, 'B2:C9');
    }

}
