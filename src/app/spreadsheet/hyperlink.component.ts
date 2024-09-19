import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SpreadsheetComponent, CellStyleModel, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { hyperlinkCart, hyperlinkStock } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Hyperlink
 */
@Component({
    selector: 'control-content',
    templateUrl: 'hyperlink.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class HyperlinkComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    public spreadsheet: SpreadsheetComponent;
    public hyperlinkCart: Object[] = hyperlinkCart();
    public hyperlinkStock: Object[] = hyperlinkStock();
    currencyFormat: string = '$#,##0.00';
    public styles: CellStyleModel = { fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377', color: '#ffffff' };
    created() {
        this.spreadsheet.merge('Cart!A1:F2');
        this.spreadsheet.numberFormat('$#,##0.00', 'Cart!E4:F12');
        this.spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'Cart!A1:F12');
        this.spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A1:F12');
        this.spreadsheet.cellFormat(this.styles, 'Cart!A3:F3');
        this.spreadsheet.cellFormat(this.styles, 'Stock!A1:E1');
        this.spreadsheet.wrap('Stock!B1:D1');
        this.spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'Stock!A1:E10');
        this.spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'Stock!A1:E11');
    }
}