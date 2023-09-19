import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, IDataSet, PivotView, QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * Pivot Table HeatMap Sample.
 */
declare var require: any;
let data: IDataSet[] = require('./productData.json');

@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['heat-map.css'],
    templateUrl: 'heat-map.html',
    encapsulation: ViewEncapsulation.None,
})

export class HeatMapComponent implements OnInit {
    @ViewChild('pivotview')
    public pivotObj: PivotView;

    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public colourScheme: string[] = ['range1', 'range2', 'range3', 'range4', 'range5', 'range6', 'range7', 'range8', 'range9',
        'range10', 'range11', 'range12', 'range13', 'range14'];
    public minValue: number = 0;
    public maxValue: number = 0;

    aggregateCellInfo(args: any): any {
        if (args.rowCellType !== "grandTotal" && args.columnCellType !== "grandTotal") {
            this.minValue = (this.minValue < args.value && this.minValue !== 0) ? this.minValue : args.value;
            this.maxValue = this.maxValue > args.value ? this.maxValue : args.value;
        }
    }

    queryCell(args: QueryCellInfoEventArgs): void {
        if (args != null && args.cell && args.data) {
            var currentCell = (args as any).cell.getAttribute('data-colindex');
            var data = (args as any).data[currentCell];
            if (data.axis === 'value' && !data.isGrandSum) {
                (args as any).cell.classList.add(this.cellColour(data.value));
                (args as any).cell.innerText = '$' + (data.value / 1000).toFixed(1) + 'K';
            }
        }
    }

    cellColour(value: any): string {
        let percentage: number = (this.maxValue - this.minValue) / this.colourScheme.length;
        let colourIndex: number = Math.round((value - this.minValue) / percentage);
        return this.colourScheme[colourIndex];
    }

    enginePopulated(): any {
        this.minValue = this.minValue - 1000;
        this.maxValue = this.maxValue + 1000;
        this.pivotObj.grid.queryCellInfo = this.queryCell.bind(this);
    }

    ngOnInit(): void {
        this.gridSettings = {
            rowHeight:36, columnWidth: 120
        } as GridSettings;

        this.dataSourceSettings = {
            enableSorting: false,
            columns: [{ name: 'ProductType' }, { name: 'Product' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            values: [{ name: 'SoldAmount', caption: 'Sold Amount' }],
            rows: [{ name: 'Year' }],
            formatSettings: [{ name: 'SoldAmount', format: 'C0' }],
            groupSettings: [{
                name: 'Year',
                type: 'Number',
                rangeInterval: 2
            }],
            expandAll: true,
            filters: [],
            showColumnSubTotals: false,
            dataSource: data
        };
    }
}