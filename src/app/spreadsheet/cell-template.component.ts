import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { TextBox } from '@syncfusion/ej2-inputs';
import { RadioButton } from '@syncfusion/ej2-buttons';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { SpreadsheetComponent, CellRenderEventArgs, BeforeSelectEventArgs } from '@syncfusion/ej2-angular-spreadsheet';
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
    created() {
        // Applies format to specified range
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
    }
    beforeCellRender(args: CellRenderEventArgs) {
        // Initializing input components before cell rendering
        if (this.spreadsheetObj.sheets[this.spreadsheetObj.activeSheetIndex].name === 'Registration Form') {
            const target: HTMLInputElement = args.element.firstElementChild as HTMLInputElement;
            switch (args.address) {
                case 'B1':
                    (args.element as HTMLTableCellElement).colSpan = 2;
                    break;
                case 'C2':
                    new TextBox({ placeholder: 'Name' }, target);
                    break;
                case 'C3':
                    new DatePicker({ placeholder: 'DOB',  }, target);
                    break;
                case 'C4':
                    new RadioButton({ label: 'Male' }, args.element.firstElementChild.firstElementChild as HTMLInputElement);
                    new RadioButton({ label: 'Female' }, args.element.firstElementChild.lastElementChild as HTMLInputElement);
                    break;
                case 'C5':
                    const experience: string[] =  ['0 - 1 year', '1 - 3 years', '3 - 5 years', '5 - 10 years'];
                    new DropDownList({ placeholder: 'Experience', dataSource: experience},  target );
                    break;
                case 'C6':
                    const languages: string[] = ['JAVA', 'C#', 'SQL'];
                    new MultiSelect({ showClearButton: false, placeholder: 'Areas of Interest', dataSource: languages }, target);
                    break;
                case 'C7':
                    new TextBox({ placeholder: 'Mobile Number' }, target);
                    break;
                case 'C8':
                    new TextBox({ placeholder: 'Email'}, target);
                    break;
                case 'C9':
                    new TextBox(null, target);
                    break;
            }
        }
    }
    beforeSelect(args: BeforeSelectEventArgs): void {
        // Prevents selection
        args.cancel = true;
    }

}
