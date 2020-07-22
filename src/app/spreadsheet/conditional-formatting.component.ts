import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { conditionalFormatData } from './data';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
/**
 * Conditional Formatting Spreadsheet Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'conditional-formatting.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None
})

export class ConditionalFormattingController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    spreadsheetObj: SpreadsheetComponent;
    data: Object[] = conditionalFormatData();
    public openUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open';
    public saveUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save';
    created() {
        this.spreadsheetObj.merge('A1:G1');
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:G2');
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: "middle", fontSize: '13pt' }, 'A1:G1');
        this.spreadsheetObj.conditionalFormat({ type: 'BlueDataBar', range: 'D3:D18' });
        this.spreadsheetObj.conditionalFormat({ type: 'OrangeDataBar', range: 'E3:E18' });
        this.spreadsheetObj.conditionalFormat({ type: "ThreeStars", range: 'G3:G18' });
    }
}
