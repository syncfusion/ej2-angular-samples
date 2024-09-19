import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { conditionalFormatData } from './data';
import { SpreadsheetComponent, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Conditional Formatting Spreadsheet Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'conditional-formatting.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class ConditionalFormattingController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    spreadsheetObj: SpreadsheetComponent;
    data: Object[] = conditionalFormatData();
    public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
    public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
    created() {
        this.spreadsheetObj.merge('A1:H1');
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: "middle", fontSize: '13pt' }, 'A1:H1');
        this.spreadsheetObj.conditionalFormat({ type: 'BlueDataBar', range: 'D3:D18' });
        this.spreadsheetObj.conditionalFormat({ type: 'GreenDataBar', range: 'E3:E18' });
        this.spreadsheetObj.conditionalFormat({ type: 'ThreeStars', range: 'H3:H18' });
        this.spreadsheetObj.conditionalFormat({ type: 'Top10Items', value:'1', format:{ style:{ color: '#ffffff', backgroundColor: '#009999', fontWeight: 'bold'}}, range: 'F3:F18' });
        this.spreadsheetObj.conditionalFormat({ type: 'Bottom10Items', value:'1', format:{ style:{ color: '#ffffff', backgroundColor: '#c68d53', fontWeight: 'bold'}}, range: 'F3:F18' });
        // Apply format to the specified range in the active sheet.
        this.spreadsheetObj.numberFormat('$#,##0.00', 'D3:D18');
        this.spreadsheetObj.numberFormat('$#,##0.00', 'E3:E18');
        this.spreadsheetObj.numberFormat('$#,##0.00', 'F3:F18');
        this.spreadsheetObj.numberFormat('m/d/yyyy', 'G3:G18');
    }
}
