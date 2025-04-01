import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    IDataOptions, PivotView, FieldListService, CalculatedFieldService,
    ToolbarService, ConditionalFormattingService, ToolbarItems, DisplayOption, IDataSet,
    NumberFormattingService,PivotViewModule, IAxisSet, GroupingBarService, GroupingService, VirtualScrollService, DrillThroughService, QueryCellInfoEventArgs, PDFExportService, ExcelExportService
} from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple, createElement, select } from '@syncfusion/ej2-base';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { Observable } from 'rxjs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Overview Sample
 */
declare var require: any;
let Universitydata: IDataSet[] = require('./universitydata.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'overview.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['overview.css'],
    providers: [CalculatedFieldService, ToolbarService, ConditionalFormattingService, FieldListService, NumberFormattingService, GroupingBarService, GroupingService, VirtualScrollService, DrillThroughService, PDFExportService, ExcelExportService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class OverviewComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public toolbarOptions: ToolbarItems[];
    public chartSettings: ChartSettings;
    public displayOption: DisplayOption;
    public observable = new Observable();

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    getCellContent(args: any): string {
        if (args.cellInfo && args.cellInfo.axis === 'value' && this.pivotObj.pivotValues[args.cellInfo.rowIndex] && this.pivotObj.pivotValues[args.cellInfo.rowIndex][0].hasChild) {
          if (args.targetCell.classList.contains(args.cellInfo.cssClass)) {
            args.targetCell.classList.remove(args.cellInfo.cssClass);
            args.cellInfo.style = undefined;
          }
        }
        if (args.cellInfo && args.targetCell.querySelectorAll('.university-logo').length === 0 && args.cellInfo.axis === 'row' && args.cellInfo.valueSort.axis === 'university') {
          let imgElement = createElement('img', {
            className: 'university-logo',
            attrs: {
              'src': Universitydata[args.cellInfo.index[0]].logo as string,
              'alt': args.cellInfo.formattedText,
              'width': '30',
              'height': '30'
            },
          });
          let cellValue = select('.e-cellvalue', args.targetCell);
          cellValue.classList.add('e-hyperlinkcell');
          cellValue.addEventListener('click', this.hyperlinkCellClick.bind(this));
          args.targetCell.firstElementChild.insertBefore(imgElement, cellValue);
        }
        return '';
    }

    hyperlinkCellClick(args: MouseEvent) {
        let cell: Element = (args.target as Element).closest('.e-rowsheader');
        let pivotValue: IAxisSet = this.pivotObj.pivotValues[Number(cell.getAttribute('index'))][Number(cell.getAttribute('aria-colindex')) - 1] as IAxisSet;
        let link: string = Universitydata[pivotValue.index[0]].link as string;
        window.open(link, '_blank');
    }

    saveReport(args: any) {
        let reports = [];
        let isSaved: boolean = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            let report = JSON.parse(args.report);
            report.dataSourceSettings.dataSource = [];
            report.pivotValues = [];
            args.report = JSON.stringify(report);
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
            let report = JSON.parse(args.report);
            report.dataSourceSettings.dataSource = this.pivotObj.dataSourceSettings.dataSource;
            this.pivotObj.dataSourceSettings = report.dataSourceSettings;
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
    newReport() {
        this.pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    }
    chartSeriesCreated() {
        this.pivotObj.chartSettings.chartSeries.legendShape = this.pivotObj.chartSettings.chartSeries.type === 'Polar' ? 'Rectangle' : 'SeriesType';
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
            title: 'Top Universities Analysis',
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
            columnWidth: 120, allowSelection: true, rowHeight: 36,
            selectionSettings: { mode: 'Cell', type: 'Single', cellSelectionMode: 'Box' },
            excelQueryCellInfo: this.observable.subscribe(args  => {
                if (((args as ExcelQueryCellInfoEventArgs).cell as IAxisSet).axis === 'value' && ((args as ExcelQueryCellInfoEventArgs).cell as IAxisSet).value === undefined) {
                    (args as ExcelQueryCellInfoEventArgs).style.numberFormat = undefined;
                }
            }) as any
        } as GridSettings;

        this.toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
            'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'Formatting', 'FieldList'] as ToolbarItems[];

        this.dataSourceSettings = {
            enableSorting: true,
            columns: [{ name: 'region', caption: 'Region' }, { name: 'country', caption: 'Country' }],
            rows: [{ name: 'rank_display', caption: 'Rank', expandAll: true, allowDragAndDrop: false },
            { name: 'university', caption: 'University', expandAll: true, allowDragAndDrop: false }],
            formatSettings: [{ name: 'international_students', format: 'N0' },
            { name: 'faculty_count', format: 'N0' }],
            dataSource: Universitydata,
            expandAll: false,
            values: [{ name: 'international_students', caption: 'Students' },
            { name: 'faculty_count', caption: 'Faculty' }],
            filters: [{ name: 'type', caption: 'University Type' }],
            filterSettings: [{
                name: 'region',
                type: 'Exclude',
                items: ['Africa', 'Latin America']
            }],
            fieldMapping: [{ name: 'rank_display', dataType: 'number' },
            { name: 'country', caption: 'Country' },
            { name: 'city', caption: 'City' },
            { name: 'region', caption: 'Region' },
            { name: 'research_output', caption: 'Research Output' },
            { name: 'student_faculty_ratio', caption: 'Student faculty ratio' }],
            groupSettings: [{ name: 'rank_display', type: 'Number', rangeInterval: 100 }],
            conditionalFormatSettings: [
                {
                    measure: 'international_students',
                    value1: 1,
                    value2: 5000,
                    conditions: 'Between',
                    style: {
                        backgroundColor: '#E10000',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'international_students',
                    value1: 50000,
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#0C860C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'faculty_count',
                    value1: 1,
                    value2: 1000,
                    conditions: 'Between',
                    style: {
                        backgroundColor: '#E10000',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'faculty_count',
                    value1: 10000,
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#0C860C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                }
            ],
            showHeaderWhenEmpty: false,
            emptyCellsTextContent: '-',
            excludeFields: ['link', 'logo']
        };
    }
}
