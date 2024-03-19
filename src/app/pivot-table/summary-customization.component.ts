import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, PivotViewModule,FieldListService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs, MultiSelect, MultiSelectModule, SelectEventArgs, RemoveEventArgs,DropDownListModule, PopupEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { RadioButtonModule} from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);

/**
 * Pivot Table Grouping bar Sample
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'summary-customization.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['summary-customization.css'],
    providers: [FieldListService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, MultiSelectModule, DropDownListModule, RadioButtonModule]
})
export class SummaryCustomizationComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public data: { [key: string]: Object }[] = [
        { Name: 'Country' },
        { Name: 'Year' }
    ];
    public fields: Object= { text: 'Name' };
    public waterMark: string = 'Select fields to hide its sub-totals';
    public mode: string = 'CheckBox';
    public optionsData: { [key: string]: Object }[] = [
        { value: 'grandTotals', text: 'Grand Totals' },
        { value: 'subTotals', text: 'Sub-totals' }
    ];
    public fieldsOptionsdll: Object= { value: 'value', text: 'text' };
    public valueOptionsdll: string= 'grandTotals';
    
    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('options')
    public optionsdll: DropDownListComponent;

    /* tslint:disable */
    onChange(args: any) {
        if (args.value === 'None') {
            this.pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: false } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            this.pivotObj.dataSourceSettings.showGrandTotals = true;
        }
        else {
            this.pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            if (args.value === 'Column') {
                this.pivotObj.dataSourceSettings.showColumnGrandTotals = false;
            } else if (args.value === 'Row') {
                this.pivotObj.dataSourceSettings.showRowGrandTotals = false;
            } else if (args.value === 'Both') {
                this.pivotObj.dataSourceSettings.showGrandTotals = false;
            }
        }
        this.pivotObj.refreshData();
    }

    onChange1(args: any) {
        if (args.value === 'Top') {
            this.pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Bottom' } }, true);
            this.pivotObj.dataSourceSettings.grandTotalsPosition = 'Top';
        }
        else if(args.value === 'Bottom') {
            this.pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Top' } }, true);
            this.pivotObj.dataSourceSettings.grandTotalsPosition = 'Bottom';
        }
        this.pivotObj.refreshData();
    }

    onChange2(args: any) {
        if (args.value === 'None') {
            this.pivotObj.setProperties({ dataSourceSettings: { showSubTotals: false } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            this.pivotObj.dataSourceSettings.showSubTotals = true;
        }
        else {
            this.pivotObj.setProperties({ dataSourceSettings: { showSubTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            if (args.value === 'Column') {
                this.pivotObj.dataSourceSettings.showColumnSubTotals = false;
            } else if (args.value === 'Row') {
                this.pivotObj.dataSourceSettings.showRowSubTotals = false;
            } else if (args.value === 'Both') {
                this.pivotObj.dataSourceSettings.showSubTotals = false;
            }
        }
        this.pivotObj.refreshData();
    }

    onChange3(args: any) {
        if (args.value === 'Top') {
            this.pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Top' } }, true);
        }
        else if(args.value === 'Bottom') {
            this.pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Bottom' } }, true);
        }
        else if(args.value === 'Auto') {
            this.pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Auto' } }, true);
        }
        this.pivotObj.refreshData();
    }

    select (args: SelectEventArgs): void {
        for (let i: number = 0; i < this.pivotObj.dataSourceSettings.columns.length; i++) {
            if ((this.pivotObj.dataSourceSettings.columns[i].name || this.pivotObj.dataSourceSettings.columns[i].caption) === (args.itemData as any).Name) {
                this.pivotObj.dataSourceSettings.columns[i].showSubTotals = false;
            }
        }
        for (let i: number = 0; i < this.pivotObj.dataSourceSettings.rows.length; i++) {
            if ((this.pivotObj.dataSourceSettings.rows[i].name || this.pivotObj.dataSourceSettings.rows[i].caption) === (args.itemData as any).Name) {
                this.pivotObj.dataSourceSettings.rows[i].showSubTotals = false;
            }
        }
        this.pivotObj.refreshData();
    }
    removed (args: RemoveEventArgs): void {
        for (let i: number = 0; i < this.pivotObj.dataSourceSettings.columns.length; i++) {
            if ((this.pivotObj.dataSourceSettings.columns[i].name || this.pivotObj.dataSourceSettings.columns[i].caption) === (args.itemData as any).Name) {
                this.pivotObj.dataSourceSettings.columns[i].showSubTotals = true;
            }
        }
        for (let i: number = 0; i < this.pivotObj.dataSourceSettings.rows.length; i++) {
            if ((this.pivotObj.dataSourceSettings.rows[i].name || this.pivotObj.dataSourceSettings.rows[i].caption) === (args.itemData as any).Name) {
                this.pivotObj.dataSourceSettings.rows[i].showSubTotals = true;
            }
        }
        this.pivotObj.refreshData();
    }
    open (args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }
    changeOptionsdll (args: ChangeEventArgs) {
        (document.getElementById('grandsum') as HTMLElement).style.display = 'none';
        (document.getElementById('subsum') as HTMLElement).style.display = 'none';
        if (args.value == 'grandTotals') {
            (document.getElementById('grandsum') as HTMLElement).style.display = '';
        } else if (args.value == 'subTotals') {
            (document.getElementById('subsum') as HTMLElement).style.display = '';
        }
    }
    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSourceSettings = {
            enableSorting: true,
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
            filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            dataSource: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            showGrandTotals: true,
            grandTotalsPosition: 'Bottom',
        };
    }
}