import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotEngine, IGridValues, IAxisSet, PivotView } from '@syncfusion/ej2-angular-pivotview';
import { Pivot_Data } from './data-source';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Chart, ColumnSeries, LineSeries, Legend, Tooltip, Category, SeriesModel, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Sample with Chart integration.
 */

@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['chart.css'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'chart.html'
})

export class ChartComponent implements OnInit {
    public dataSource: IDataOptions;
    public measuresddl: DropDownList;
    public onInit: boolean = true;
    public measure: string = 'In Stock';
    public engineModule: PivotEngine;
    public chart: Chart;
    public gridSettings: GridSettings;
    public isChange: boolean = false;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    /* tslint:disable */
    onChartLoad(): void {
        if (this.onInit) {
            this.onInit = false;
            this.engineModule = extend({}, this.pivotGridObj.engineModule, null, true) as PivotEngine;
        }
        if (this.engineModule) {
            let valuesContent: IGridValues = this.engineModule.valueContent;
            let data: IGridValues = [];
            for (let cCnt: number = 0; cCnt < valuesContent.length; cCnt++) {
                if (!valuesContent[cCnt][0].type) {
                    data[cCnt] = valuesContent[cCnt];
                }
            }
            let chartSeries: SeriesModel[];
            for (let cCnt: number = 0; cCnt < 1; cCnt++) {
                if (data[cCnt]) {
                    for (let rCnt: number = this.measure === 'In Stock' ? 1 : 2; rCnt < Object.keys(data[cCnt]).length; rCnt++) {
                        if (data[cCnt][rCnt] && !(this.engineModule.pivotValues[0][rCnt] as IAxisSet).type && !data[cCnt][rCnt].type && rCnt > 0) {
                            let colText: string = (this.engineModule.pivotValues[0][rCnt] as IAxisSet).formattedText;
                            if (!chartSeries) {
                                chartSeries = [{
                                    dataSource: data,
                                    xName: cCnt + '.valueSort.levelName',
                                    yName: rCnt + '.value',
                                    type: 'Column',
                                    name: colText
                                }];
                            } else {
                                chartSeries.push({
                                    dataSource: data,
                                    xName: cCnt + '.valueSort.levelName',
                                    yName: rCnt + '.value',
                                    type: 'Column',
                                    name: colText
                                });
                            }
                            rCnt++;
                        }
                    }
                }
            }
            if (this.chart && this.chart.element) {
                if (this.isChange) {
                    this.isChange = false;
                    this.chart.primaryYAxis = {
                        title: this.measure
                    };
                    this.chart.primaryXAxis = {
                        valueType: 'Category',
                        title: 'Country',
                        labelIntersectAction: 'Rotate45'
                    };
                    this.chart.series = chartSeries;
                    this.chart.refresh();
                }
            } else {
                Chart.Inject(ColumnSeries, LineSeries, Legend, Tooltip, Category);
                this.chart = new Chart({
                    title: 'Sales Analysis',
                    legendSettings: {
                        visible: true
                    },
                    tooltip: {
                        enable: true
                    },
                    primaryYAxis: {
                        title: this.measure,
                    },
                    primaryXAxis: {
                        valueType: 'Category',
                        title: 'Country',
                        labelIntersectAction: 'Rotate45'
                    },
                    series: chartSeries,
                    load: (args: ILoadedEventArgs) => {
                        let selectedTheme: string = location.hash.split('/')[1];
                        selectedTheme = selectedTheme ? selectedTheme : 'Material';
                        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
                    }
                }, '#chart');
            }
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120
        } as GridSettings;

        this.dataSource = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' }],
            filters: []
        };

        this.measuresddl = new DropDownList({
            change: (args: ChangeEventArgs) => {
                this.measure = args.value.toString();
                this.isChange = true;
                this.onChartLoad();
            }
        });
        this.measuresddl.appendTo('#measures');
    }
}