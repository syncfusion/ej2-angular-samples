import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, CellSelectedObject, PivotCellSelectedEventArgs, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { HeatMap, Adaptor, ILoadedEventArgs, HeatMapTheme, Legend, Tooltip } from '@syncfusion/ej2-heatmap';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Sample with Selection feature with HeatMap integration.
 */
declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['external-binding.css'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'external-binding.html'
})

export class IntegrationComponent implements OnInit {
    public dataSource: IDataOptions;
    public selectedCells: CellSelectedObject[];
    public onInit: boolean = true;
    public heatmap: HeatMap;
    public measureList: { [key: string]: string } = {};
    public gridSettings: GridSettings;
    public xLabels: string[] = [];
    public yLabels: string[] = [];
    public jsonDataSource: object[] = [];

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    /* tslint:disable */
    frameSeries(): void {
        let columnGroupObject: { [key: string]: { x: string, y: number }[] } = {};
        this.xLabels = [];
        this.yLabels = [];
        this.jsonDataSource = [];
        for (let cell of this.selectedCells) {
            if (cell.measure !== '') {
                let columnSeries: string = (this.pivotGridObj.dataSource.values.length > 1 && this.measureList[cell.measure]) ?
                    (cell.columnHeaders.toString() + ' ~ ' + this.measureList[cell.measure]) : cell.columnHeaders.toString();
                columnSeries = columnSeries == '' && cell.measure != '' ? 'Grand Total' : columnSeries;
                let rHeaders: string = cell.rowHeaders == '' && cell.currentCell.axis != 'column' ? 'Grand Total' : cell.rowHeaders.toString();
                if (columnGroupObject[columnSeries]) {
                    columnGroupObject[columnSeries].push({ x: rHeaders.toString(), y: Number(cell.value) });
                } else {
                    columnGroupObject[columnSeries] = [{ x: rHeaders.toString(), y: Number(cell.value) }];
                    this.yLabels.push(columnSeries);
                }
                if (this.xLabels.indexOf(rHeaders.toString()) == -1) {
                    this.xLabels.push(rHeaders.toString());
                }
            }
        }
        for (let xcnt: number = 0; xcnt < this.xLabels.length; xcnt++) {
            let xName: string = this.xLabels[xcnt];
            let row: object = { 'xMember': xName };
            for (let ycnt: number = 0; ycnt < this.yLabels.length; ycnt++) {
                let YName: string = this.yLabels[ycnt];
                let col: { x: string, y: number }[] = columnGroupObject[YName].filter(function (item) { return item.x == xName; });
                (row as any)[YName] = col.length > 0 ? col[0].y : '';
            }
            this.jsonDataSource.push(row);
        }
    }

    heatmapUpdate() {
        if (this.onInit) {
            this.onInit = false;
            HeatMap.Inject(Adaptor, Legend, Tooltip);
            this.heatmap = new HeatMap({
                titleSettings: {
                    text: 'Sales Analysis'
                },
                legendSettings: {
                    position: 'Top'
                },
                xAxis: {
                    title: { text: this.pivotGridObj.dataSource.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: this.xLabels,
                    labelRotation: 315
                },
                yAxis: {
                    title: { text: this.pivotGridObj.dataSource.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: this.yLabels,
                },
                dataSource: {
                    data: this.jsonDataSource,
                    isJsonData: true,
                    adaptorType: 'Table',
                    xDataMapping: 'xMember',
                },
                load: (args: ILoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
                },
            }, '#heatmap');
        } else {
            (this.heatmap.dataSource as any).data = this.jsonDataSource;
            this.heatmap.xAxis = {
                title: { text: this.pivotGridObj.dataSource.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: this.xLabels,
                labelRotation: 315
            };
            this.heatmap.yAxis = {
                title: { text: this.pivotGridObj.dataSource.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: this.yLabels
            };
            this.heatmap.refresh();
        }
    }

    onDataBound(): void {
        if (this.onInit) {
            this.pivotGridObj.grid.selectionModule.selectCellsByRange({ cellIndex: 1, rowIndex: 1 }, { cellIndex: 3, rowIndex: 4 });
        }
    }

    onCellSelected(args: PivotCellSelectedEventArgs): void {
        this.selectedCells = args.selectedCellsInfo;
        if (this.selectedCells && this.selectedCells.length > 0) {
            this.frameSeries();
            this.heatmapUpdate();
        }
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
            rows: [{ name: 'Country' }, { name: 'Products' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            data: data,
            expandAll: true,
            values: [{ name: 'Sold', caption: 'Units Sold' }],
            filters: []
        };
    }
}