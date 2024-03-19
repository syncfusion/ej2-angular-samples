import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent, getFormatFromType, ChartModel, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { GDPData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Chart sample with import and export support.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'chart.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class ChartController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    spreadsheetObj: SpreadsheetComponent;
    public chart: ChartModel[] = [{ type: "Column", range: "A3:E10" }];
    data: Object[] = GDPData();
    public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
    public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
    created() {
         // Formatting cells dynamically using cellFormat method
         this.spreadsheetObj.cellFormat({ backgroundColor: '#e56590', color: '#fff', fontWeight: 'bold', textAlign: 'center' }, 'A3:E3');
         // Applying currency format to the specified range.
         this.spreadsheetObj.numberFormat(getFormatFromType('Currency'), 'B4:E10');
         // Merging the cells from A1 to E1
         this.spreadsheetObj.merge('A1:E1');
    }
}
