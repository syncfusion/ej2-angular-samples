import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { sortAndFilterData } from './data';
import { SpreadsheetComponent, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sorting and Filtering Spreadsheet Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'sorting-and-filtering.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class SortinAndFilteringComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    spreadsheetObj: SpreadsheetComponent;
    data: Object[] = sortAndFilterData();
    public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
    public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
    created() {
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
        // Sorted B(Employee Name field) column in ascending order
        this.spreadsheetObj.sort({ sortDescriptors: { field: 'B' } }, 'A2:G51').then(() => {
            // Filtered D(Department  field) column with value 'Services'
            this.spreadsheetObj.applyFilter([{ field: 'D', operator: 'equal', value: 'Services' }], 'A1:G51');
        });
    }
}
