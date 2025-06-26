import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridLine, SortService, FilterService, ContextMenuClickEventArgs, ContextMenuService, GridModule, ContextMenuItem, GridComponent, FreezeService, QueryCellInfoEventArgs, ColumnModel, Column } from '@syncfusion/ej2-angular-grids';
import { CategorySeries, ChartChanges, ChartPopupArgs, GridChart, UpdateChartArgs } from '@syncfusion/ej2-grid-chart';
import { sales  } from './data';
import { AccumulationChartModel, ChartModel, IAccLoadedEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { loadAccumulationChartTheme, loadChartTheme } from './grid-chart-theme-color';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'chart.html',
    styleUrls: ['chart.style.css'],
    providers: [SortService, FilterService, ContextMenuService, FreezeService],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [GridModule]
})

export class ChartComponent implements OnInit {
    @ViewChild('grid') public grid: GridComponent;
    public data: any;
    public gridChart: GridChart;
    public contextMenuItems: ContextMenuItem[];
    public filterSettings: Object;
    public selectionSettings: Object;
    public lines: GridLine;

    ngOnInit(): void {
        this.data = sales;
        this.lines = "Both";
        this.filterSettings = { type: 'Menu'};
        this.selectionSettings = { type: 'Multiple' };
        this.contextMenuItems= [ 'Bar', 'StackingBar', 'StackingBar100', 'Pie', 'Column', 'StackingColumn', 'StackingColumn100', 'Line', 'StackingLine', 'StackingLine100', 'Area', 'StackingArea', 'StackingArea100', 'Scatter'];
    }

    created(): void { 
        this.gridChart = new GridChart({
            enablePropertyPanel: true,
            allowExport: true,
            enableRtl: this.grid.enableRtl,
            locale: this.grid.locale,
            updateChartSettings: this.updateChartSettings
        });
    }

    queryCellInfo(args: QueryCellInfoEventArgs) {
        if ((args.column as Column).field === 'ProfitLoss') {
            const profitLoss: number | undefined = (args.data as { ProfitLoss?: number }).ProfitLoss;
            if (profitLoss !== undefined) {
                (args.cell as Element).classList.add(profitLoss < 0 ? 'e-gridchart-sales-loss' : 'e-gridchart-sales-profit');
            }
        }
    }

    updateChartSettings(args: UpdateChartArgs): void {
        const chartMargin = args.changes.chart.margin;
        if (!isNullOrUndefined(chartMargin)) {
            const accumulationChartMargin = args.changes.accumulationChart.margin;
            if (!isNullOrUndefined(chartMargin.top)) {
                accumulationChartMargin.top = chartMargin.top = chartMargin.top < 20 ? 20 : chartMargin.top > 100 ? 100 : chartMargin.top;
            } else if (!isNullOrUndefined(chartMargin.bottom)) {
                accumulationChartMargin.bottom = chartMargin.bottom = chartMargin.bottom < 20 ? 20 : chartMargin.bottom > 100 ? 100 : chartMargin.bottom;
            } else if (!isNullOrUndefined(chartMargin.left)) {
                accumulationChartMargin.left = chartMargin.left = chartMargin.left < 20 ? 20 : chartMargin.left > 100 ? 100 : chartMargin.left;
            } else if (!isNullOrUndefined(chartMargin.right)) {
                accumulationChartMargin.right = chartMargin.right = chartMargin.right < 20 ? 20 : chartMargin.right > 100 ? 100 : chartMargin.right;
            }
        }
    }

    contextMenuClick(args: ContextMenuClickEventArgs) {
        if (args.chartType) {
            const chartArgs: ChartPopupArgs = {
                gridInstance: args.gridInstance,
                chartType: args.chartType,
                records: args.records
            };
            const chartModel: ChartModel = {
                primaryXAxis: {
                    valueType: 'Category',
                    labelRotation: 315
                },
                primaryYAxis: {
                    title: 'Sales in amount',
                    titleStyle: { size: '11px' }
                },
                load: (args: ILoadedEventArgs) => {
                    loadChartTheme(args);
                }
            };
            const accumulationChartModel: AccumulationChartModel = {
                load: (args: IAccLoadedEventArgs) => {
                    loadAccumulationChartTheme(args);
                }
            };
            chartModel.margin = accumulationChartModel.margin = { top: 20, bottom: 20, right: 20, left: 20 };
            const model: ChartChanges = { chart: chartModel, accumulationChart: accumulationChartModel };
            const categorySeries: CategorySeries = {
                category: ['Product', 'Year'],
                series: ['Online', 'Retail', 'Revenue']
            };
            this.gridChart.render(chartArgs, model, categorySeries);
        }
    }
}