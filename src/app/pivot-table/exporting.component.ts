import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, FieldListService, IDataSet, PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { DropDownListComponent, DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Exporting Sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'exporting.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['exporting.css'],
    providers: [FieldListService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, ButtonModule]
})

export class ExportingComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public options: { [key: string]: Object }[] = [
        { value: 'pdf', text: 'PDF' },
        { value: 'excel', text: 'Excel' },
        { value: 'csv', text: 'CSV' }
    ];

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('export')
    public exportBtn: ButtonComponent;
    @ViewChild('exporttype')
    public exportType: DropDownListComponent;

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        document.getElementById('export').onclick = () => {
            if (this.exportType.value === 'Excel') {
                this.pivotObj.excelExport();
            } else if (this.exportType.value === 'CSV') {
                this.pivotObj.csvExport();
            } else {
                this.pivotObj.pdfExport();
            }
        };

        this.dataSourceSettings = {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true,
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            dataSource: Pivot_Data,
            expandAll: false
        };
    }
}