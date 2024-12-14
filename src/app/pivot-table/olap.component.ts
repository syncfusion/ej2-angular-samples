import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    PivotView, FieldListService, CalculatedFieldService,
    ToolbarService, ConditionalFormattingService, PivotViewModule, ToolbarItems, DisplayOption, GroupingBarService
} from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Observable } from 'rxjs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Olap Sample
 */
/* tslint:disable */
declare var require: any;
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'olap.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['olap.css'],
    providers: [CalculatedFieldService, ToolbarService, ConditionalFormattingService, FieldListService, GroupingBarService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class OlapComponent implements OnInit {
    public dataSourceSettings;
    public gridSettings: GridSettings;
    public toolbarOptions: ToolbarItems[];
    public chartSettings: ChartSettings;
    public displayOption: DisplayOption;
    public observable = new Observable();

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    fetchReport(args: any) {
        let reportsCollection: string[] = [];
        let reeportList: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportsCollection.map(function (item: any): void { reeportList.push(item.reportName); });
        args.reportName = reeportList;
    }
    removeReport(args: any) {
        let reportsCollection: any[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        for (let i: number = 0; i < reportsCollection.length; i++) {
            if (reportsCollection[i].reportName === args.reportName) {
                reportsCollection.splice(i, 1);
            }
        }
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportsCollection);
        }
    }
    loadReport(args: any) {
        let reportsCollection: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportsCollection.map(function (item: any): void {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
        if (args.report) {
            this.pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
        }
    }
    beforeToolbarRender(args: any) {
        args.customToolbar.splice(6, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator'
        });
    }
    renameReport(args: any) {
        let reportsCollection: any[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.isReportExists) {
            for (let i: number = 0; i < reportsCollection.length; i++) {
                if (reportsCollection[i].reportName === args.rename) {
                    reportsCollection.splice(i, 1);
                }
            }
        }
        reportsCollection.map(function (item: any): any { if (args.reportName === item.reportName) { item.reportName = args.rename; } });
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportsCollection);
        }
    }
    saveReport(args: any) {
        let report = [];
        let isSave: boolean = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            report = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            report.map(function (item: any): any {
                if (args.reportName === item.reportName) {
                    item.report = args.report; isSave = true;
                }
            });
            if (!isSave) {
                report.push(args);
            }
            localStorage.pivotviewReports = JSON.stringify(report);
        }
    }
    newReport() {
        this.pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    }

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

        this.displayOption = { view: 'Both' } as DisplayOption;
        this.gridSettings = {
            columnWidth: 160
        } as GridSettings;

        this.toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
            'Grid', 'Chart', 'MDX', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'] as ToolbarItems[];

        this.dataSourceSettings = {
            catalog: 'Adventure Works DW 2008 SE',
            cube: 'Adventure Works',
            providerType: 'SSAS',
            url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
            localeIdentifier: 1033,
            enableSorting: true,
            rows: [
                { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' },
            ],
            columns: [
                { name: '[Product].[Product Categories]', caption: 'Product Categories' },
                { name: '[Measures]', caption: 'Measures' },
            ],
            values: [
                { name: '[Measures].[Customer Count]', caption: 'Customer Count' },
                { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' }
            ],
            filters: [
                { name: '[Date].[Fiscal]', caption: 'Date Fiscal' },
            ]
        };
    }
}