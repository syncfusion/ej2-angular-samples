import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent, ImageModel, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { base64ImageUrl } from './data';
/**
 * Image sample with import and export support.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'image.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class ImageController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    spreadsheetObj: SpreadsheetComponent;
    //To insert image in a cell
    public image: ImageModel[] = [{src: base64ImageUrl(),
     height: 149, width: 907, top:20, left: 20}];
    public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
    public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
    //Application level customization
    created() {
        this.spreadsheetObj.merge('B2:F2');
        this.spreadsheetObj.merge('B4:F4');
        this.spreadsheetObj.cellFormat({ fontSize: '28pt', fontFamily: 'Arial', color: '#3a3838', verticalAlign: 'middle', textAlign: 'center' }, 'B4');
        this.spreadsheetObj.cellFormat({ fontSize: '16pt', fontFamily: 'Calibri', color: '#757171', verticalAlign: 'middle' }, 'B6:F6');
        this.spreadsheetObj.cellFormat({ fontSize: '14pt', fontFamily: 'Calibri', color: '#757171', verticalAlign: 'middle', textAlign: 'center' }, 'B7:B13');
        this.spreadsheetObj.cellFormat({ fontSize: '14pt', color: '#000000', verticalAlign: 'middle' }, 'C7:F13');
        this.spreadsheetObj.setBorder({ border: '1px solid #e0e0e0' }, 'B7:F13', 'Horizontal');
        }
}
