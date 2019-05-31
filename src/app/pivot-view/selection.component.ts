import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, SelectionMode, PivotCellSelectedEventArgs, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SelectionType } from '@syncfusion/ej2-grids';
enableRipple(false);

/**
 * PivotView Sample with Selection feature.
 */
declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['selection.css'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'selection.html'
})

export class SelectionComponent implements OnInit {
    public dataSource: IDataOptions;
    public onInit: boolean = true;
    public gridSettings: GridSettings;
    public modeddl: DropDownList;
    public typeddl: DropDownList;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    /* tslint:disable */
    onCellSelected(args: PivotCellSelectedEventArgs): void {
        document.getElementById('selection-EventLog').innerHTML = '';
        if (args.selectedCellsInfo.length > 0) {
            for (let cell of args.selectedCellsInfo) {
                let summMeasure = this.pivotGridObj.engineModule.fieldList[cell.measure] ? this.pivotGridObj.engineModule.fieldList[cell.measure].aggregateType + ' of ' +
                    this.pivotGridObj.engineModule.fieldList[cell.measure].caption : '';
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

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120,
            allowSelection: true,
            selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
        } as GridSettings;

        this.dataSource = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            data: data,
            expandAll: false,
            values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        };

        this.modeddl = new DropDownList({
            floatLabelType: 'Auto',
            width: 150,
            change: (args: ChangeEventArgs) => {
                this.pivotGridObj.gridSettings.selectionSettings.mode = args.value as SelectionMode;
                this.pivotGridObj.renderModule.updateGridSettings();
            }
        });
        this.modeddl.appendTo('#mode');

        this.typeddl = new DropDownList({
            floatLabelType: 'Auto',
            width: 150,
            change: (args: ChangeEventArgs) => {
                this.pivotGridObj.gridSettings.selectionSettings.type = args.value as SelectionType;
                this.pivotGridObj.renderModule.updateGridSettings();
            }
        });
        this.typeddl.appendTo('#type');
    }
}