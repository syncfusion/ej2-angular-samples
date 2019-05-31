import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, FieldListService, PivotView, DisplayOption, PivotChartService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Sample with Chart.
 */
declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['chart.css'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'chart.html',
    providers: [FieldListService, PivotChartService]
})

export class ChartComponent implements OnInit {
    public dataSource: IDataOptions;
    public chartddl: DropDownList;
    public chartSettings: ChartSettings;
    public displayOption: DisplayOption;


    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    onChange(args: ChangeEventArgs): void {
        this.pivotGridObj.chartSettings.chartSeries.type = args.value as any;
    }

    /* tslint:disable */
    ngOnInit(): void {
        this.chartSettings = {
            title: 'Sales Analysis',
            chartSeries: { type: 'Column' },
            // load: (args: ILoadedEventArgs) => {
            //     let selectedTheme: string = location.hash.split('/')[1];
            //     selectedTheme = selectedTheme ? selectedTheme : 'Material';
            //     args.chart.theme = (selectedTheme.charAt(0).toUpperCase() +
            //         selectedTheme.slice(1)) as ChartTheme;
            // }
        } as ChartSettings;

        this.displayOption = { view: 'Chart' } as DisplayOption;

        this.dataSource = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            data: data,
            expandAll: false,
            formatSettings: [{ name: "Amount", format: "C" }],
            values: [{ name: "Amount", caption: "Sales Amount" }],
            filters: []
        };

        this.chartddl = new DropDownList({
            placeholder: "Chart Types",
            floatLabelType: "Auto",
            change: this.onChange.bind(this) 
        });
        this.chartddl.appendTo('#charttypesddl');
    }
}