import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    IDataOptions, PivotView, FieldListService, CalculatedFieldService,
    ToolbarService, ConditionalFormattingService, ToolbarItems, DisplayOption, IDataSet
} from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
enableRipple(false);

/**
 * PivotView Toolbar Sample
 */
declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'toolbar.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['toolbar.css'],
    providers: [CalculatedFieldService, ToolbarService, ConditionalFormattingService, FieldListService]
})
export class ToolbarComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;
    public toolbarOptions: ToolbarItems[];
    public chartSettings: ChartSettings;
    public displayOption: DisplayOption;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    saveReport(args: any) {
        let reports = [];
        let isSaved: boolean = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            reports.map(function (item: any): any {
                if (args.reportName === item.reportName) {
                    item.report = args.report; isSaved = true;
                }
            });
            if (!isSaved) {
                reports.push(args);
            }
            localStorage.pivotviewReports = JSON.stringify(reports);
        }
    }
    fetchReport(args: any) {
        let reportCollection: string[] = [];
        let reeportList: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item: any): void { reeportList.push(item.reportName); });
        args.reportName = reeportList;
    }
    loadReport(args: any) {
        let reportCollection: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item: any): void {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
        if (args.report) {
            this.pivotGridObj.dataSource = JSON.parse(args.report).dataSource;
        }
    }
    removeReport(args: any) {
        let reportCollection: any[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        for (let i: number = 0; i < reportCollection.length; i++) {
            if (reportCollection[i].reportName === args.reportName) {
                reportCollection.splice(i, 1);
            }
        }
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportCollection);
        }
    }
    renameReport(args: any) {
        let reportCollection: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item: any): any { if (args.reportName === item.reportName) { item.reportName = args.rename; } });
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportCollection);
        }
    }
    newReport() {
        this.pivotGridObj.setProperties({ dataSource: { columns: [], rows: [], values: [], filters: [] } }, false);
    }
	beforeToolbarRender(args: any) {
        args.customToolbar.splice(6, 0, {
            type: 'Separator' 
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator' 
        });
    }

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

        this.displayOption = { view: 'Both' } as DisplayOption;
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
            'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'] as ToolbarItems[];

        this.dataSource = {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            data: data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        };
    }
}