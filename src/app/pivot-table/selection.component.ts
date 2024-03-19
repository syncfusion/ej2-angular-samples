import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, SelectionMode, PivotCellSelectedEventArgs, PivotViewModule, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs, DropDownListComponent , DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SelectionType } from '@syncfusion/ej2-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Sample with Selection feature.
 */
declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['selection.css'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'selection.html',
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule]
})

export class SelectionComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public onInit: boolean = true;
    public gridSettings: GridSettings;
    public modeOptions: { [key: string]: Object }[] = [
        { value: 'Cell', text: 'Cell' },
        { value: 'Row', text: 'Row' },
        { value: 'Column', text: 'Column' },
        { value: 'Both', text: 'Both' }
    ];
    public typeOptions: { [key: string]: Object }[] = [
        { value: 'Single', text: 'Single' },
        { value: 'Multiple', text: 'Multiple' }
    ];

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('mode')
    public modeddl: DropDownListComponent;
    @ViewChild('type')
    public typeddl: DropDownListComponent;

    /* tslint:disable */
    onCellSelected(args: PivotCellSelectedEventArgs): void {
        document.getElementById('selection-EventLog').innerHTML = '';
        if (args.selectedCellsInfo.length > 0) {
            for (let cell of args.selectedCellsInfo) {
                let summMeasure = this.pivotObj.engineModule.fieldList[cell.measure] ? this.pivotObj.engineModule.fieldList[cell.measure].aggregateType + ' of ' +
                    this.pivotObj.engineModule.fieldList[cell.measure].caption : '';
                this.appendElement(
                    (cell.columnHeaders == '' ? '' : 'Column Headers: ' + '<b>' + cell.columnHeaders + '</b></br>') +
                    (cell.rowHeaders == '' ? '' : 'Row Headers: ' + '<b>' + cell.rowHeaders + '</b></br>') +
                    (summMeasure == '' ? '' : 'Measure: ' + '<b>' + summMeasure + '</b></br>') +
                    'Value: ' + '<b>' + cell.currentCell.formattedText + '</b><hr></br>');
            }
        }
    }

    appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('selection-EventLog');
        log.appendChild(span);
    }

    changeMode (args: ChangeEventArgs) {
        this.pivotObj.gridSettings.selectionSettings.mode = args.value as SelectionMode;
        this.pivotObj.renderModule.updateGridSettings();
    }

    changeType (args: ChangeEventArgs) {
        this.pivotObj.gridSettings.selectionSettings.type = args.value as SelectionType;
        this.pivotObj.renderModule.updateGridSettings();
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120,
            allowSelection: true,
            selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
        } as GridSettings;

        this.dataSourceSettings = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            dataSource: data,
            expandAll: false,
            values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        };
    }
}