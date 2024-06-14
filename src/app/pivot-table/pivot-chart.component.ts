import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, FieldListService, PivotView, DisplayOption, PivotViewModule, PivotChartService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { Observable } from 'rxjs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Sample with Chart.
 */
declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['pivot-chart.css'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'pivot-chart.html',
    providers: [FieldListService, PivotChartService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule]
})

export class ChartComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public chartSettings: ChartSettings;
    public displayOption: DisplayOption;
    public options: { [key: string]: Object }[] = [
        { value: 'Column', text: 'Column' },
        { value: 'Bar', text: 'Bar' },
        { value: 'Line', text: 'Line' },
        { value: 'Spline', text: 'Spline' },
        { value: 'Area', text: 'Area' },
        { value: 'SplineArea', text: 'SplineArea' },
        { value: 'StepLine', text: 'StepLine' },
        { value: 'StepArea', text: 'StepArea' },
        { value: 'StackingColumn', text: 'StackingColumn' },
        { value: 'StackingBar', text: 'StackingBar' },
        { value: 'StackingArea', text: 'StackingArea' },
        { value: 'StackingColumn100', text: 'StackingColumn100' },
        { value: 'StackingBar100', text: 'StackingBar100' },
        { value: 'StackingArea100', text: 'StackingArea100' },
        { value: 'Scatter', text: 'Scatter' },
        { value: 'Bubble', text: 'Bubble' },
        { value: 'Polar', text: 'Polar' },
        { value: 'Radar', text: 'Radar' },
        { value: 'Pareto', text: 'Pareto' },
        { value: 'Pie', text: 'Pie' },
        { value: 'Doughnut', text: 'Doughnut' },
        { value: 'Funnel', text: 'Funnel' },
        { value: 'Pyramid', text: 'Pyramid' }
    ];
    public observable = new Observable();

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    onChange(args: ChangeEventArgs): void {
        this.pivotObj.chartSettings.chartSeries.type = args.value as any;
    }

    /* tslint:disable */
    ngOnInit(): void {
        this.chartSettings = {
            title: 'Sales Analysis',
            chartSeries: { type: 'Column' },
            load: this.observable.subscribe(args => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                (args as ILoadedEventArgs).chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                  selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            }) as any
        } as ChartSettings;

        this.displayOption = { view: 'Chart' } as DisplayOption;

        this.dataSourceSettings = {
            enableSorting: true,
            rows: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            columns: [{ name: 'Country' }, { name: 'Products' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            dataSource: data,
            expandAll: false,
            drilledMembers: [{ name: 'Year', items: ['FY 2015'] }],
            formatSettings: [{ name: "Amount", format: "C" }],
            values: [{ name: "Amount", caption: "Sales Amount" }],
            filters: []
        };
    }
}