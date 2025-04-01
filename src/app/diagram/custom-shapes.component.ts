import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { extend } from '@syncfusion/ej2-base';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { ChartComponent, AccumulationChartModule, ChartModule, ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import {
    IAccTextRenderEventArgs, IAccLoadedEventArgs, AccumulationChartComponent,
    IAccAnimationCompleteEventArgs, ILoadedEventArgs
} from '@syncfusion/ej2-angular-charts';
import { DiagramComponent, DiagramTools, NodeModel, NodeConstraints, DiagramModule } from "@syncfusion/ej2-angular-diagrams";
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { expenseData, startDate, endDate} from './complexShapes.data';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { RangeEventArgs } from '@syncfusion/ej2-calendars';
import { DateRangePickerComponent, DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";
import { SBDescriptionComponent } from '../common/dp.component';
import { CircularGaugeModule } from "@syncfusion/ej2-angular-circulargauge";
import { NgIf, CurrencyPipe } from '@angular/common';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CommonModule } from '@angular/common';
/**
 * Sample for ComplexShapes
 */

@Component({
    selector: 'control-content',
    templateUrl: 'custom-shapes.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,CommonModule, DiagramModule, NgIf, DateRangePickerModule, AccumulationChartModule, GridModule, ChartModule, CircularGaugeModule, SBDescriptionComponent, CurrencyPipe,ChartAllModule,AccumulationChartAllModule]
})

export class ComplexShapesDiagramComponent {
    @ViewChild('diagram') diagram: DiagramComponent;
    @ViewChild('dateRangePicker') dateRangePicker: DateRangePickerComponent;
    @ViewChild('lineChart') lineChart: ChartComponent;
    @ViewChild('columnChart') columnChart: ChartComponent;
    @ViewChild('pie') pie: AccumulationChartComponent;
    @ViewChild('legendGrid') lGrid: GridComponent;
// custom code start
    serverCreated = false;
    public back: any;
    public lineObj: any;
    public marker: Object;
    public margin: Object;
    public cBorder: Object;
    public tooltip: Object;
    public titleStyle: Object;
    public incomeDS: any = [];
    public expenseDS: any = [];
    public primaryXAxis: Object;
    public primaryYAxis: Object;
    public legendSettings: Object;
    public initialRender: boolean = true;
    public animation: Object;
    public lmarker: Object;
    public lmargin: Object;
    public ltooltip: Object;
    public lBorder: Object;
    public lchartArea: Object;
    public lprimaryXAxis: Object;
    public lprimaryYAxis: Object;
    public lanimation: Object;
    public predicate: Predicate;
    public datePresets: Object[];
    public lineChartData: Object[];
    public predicateEnd: Predicate;
    public predicateStart: Predicate;
    public colChartIncomeData: Object[];
    public colChartExpenseData: Object[];
    public dataSource: Object[];
    public startDate: Date;
    public endDate: Date;
    public minDate: Object = new Date(2017, 0o5, 0o1);
    public maxDate: Object = new Date(2017, 10, 30);
    public tool = DiagramTools.ZoomPan;
    public dataLabel: Object;
    public groupValue: string;
    public hiGridData: Object[];
    public expTotal: number = 0;
    public acclegendSettings: Object;
    public colorPalettes: Object[];
    public category: string[] = [];
    public tempData: IExpenseData[];
    public legendData: Object[] = [];
    public pieLegendData: Object[] = [];
    public pieRenderData: Object[] = [];
    public enableLegend: boolean = false;
    public pieRenderingData: Object[] = [];
    public accanimation: Object;
    public showWaitingPopup: boolean = false;
    //Initialization method called when Angular initializes the component
    public ngOnInit(): void {
        this.startDate = startDate;
        this.back = '#F5F5F5';
        this.endDate = endDate;
        this.dataSource = expenseData;
        this.datePresets = [
            { label: 'Last Month', start: new Date('10/1/2017'), end: new Date('10/31/2017') },
            { label: 'Last 3 Months', start: new Date('9/1/2017'), end: new Date('11/30/2017') },
            { label: 'All Time', start: new Date('6/1/2017'), end: new Date('11/30/2017') }
        ];
        // Initialization of chart properties, axes, and other configurations
        this.primaryXAxis = {
            labelFormat: 'MMM',
            valueType: 'DateTime',
            intervalType: 'Months',
            edgeLabelPlacement: 'Shift'
        };
        this.primaryYAxis = {
            minimum: 3000,
            maximum: 9000,
            labelFormat: 'c0'
        };
        this.titleStyle = { textAlignment: 'Near', fontWeight: '500', size: '16', color: '#000' };
        this.legendSettings = { visible: true };
        this.tooltip = {
            fill: '#707070',
            enable: true,
            shared: true,
            format: '${series.name} : ${point.y}',
            header: 'Month - ${point.x} ',
        };
        this.marker = { visible: true, height: 10, width: 10 };
        this.margin = { top: 90 };
        this.cBorder = { width: 0.5, color: '#A16EE5' };
        this.animation = { enable: false };
        this.lprimaryXAxis = {
            valueType: 'DateTime',
            labelFormat: 'MMM',
            majorGridLines: { width: 0 },
            intervalType: 'Months'
        };
        this.lprimaryYAxis = {
            maximum: 1800,
            interval: 300,
            labelFormat: 'c0'
        };
        this.ltooltip = {
            fill: '#707070',
            enable: true,
            shared: true,
            format: '${series.name} : ${point.y}',
            header: 'Month - ${point.x} '
        };
        this.lchartArea = {
            border: { width: 0 }
        };
        this.lmargin = { top: 90 };
        this.lBorder = { width: 0.5, color: '#0470D8' };
        this.lmarker = {
            visible: true,
            width: 10,
            height: 10,
            fill: 'white',
            border: { width: 2, color: '#0470D8' },
        };
        this.lanimation = { enable: false };
        this.acclegendSettings = { visible: false };
        this.colorPalettes = ['#61EFCD', '#CDDE1F', '#FEC200', '#CA765A', '#2485FA', '#F57D7D', '#C152D2', '#8854D9', '#3D4EB8',
            '#00BCD7'];
        this.dataLabel = {
            name: 'x', visible: true,
            position: 'Outside', connectorStyle: { length: '10%' },
            font: { color: 'Black', size: '14px', fontFamily: 'Roboto' }
        };
        this.accanimation = { enable: false };

    }
     /**
     * Method executed when chart is loaded
     * @param args Event arguments
     */
    public onChartLoaded(args: ILoadedEventArgs): void {
        if (this.initialRender) {
            this.initialRender = false;
        } else {
            this.initialRender = false;
        }
    }
    // custom code end
    public initialRenderr(): void {
        this.startDate = startDate;
        this.endDate = endDate;
        this.expenseDS = expenseData;
        this.predicateStart = new Predicate('DateTime', 'greaterthanorequal', startDate);
        this.predicateEnd = new Predicate('DateTime', 'lessthanorequal', endDate);
        this.predicate = this.predicateStart.and(this.predicateEnd);
        this.updateChartData();
        this.refreshPieChart()
    }
    // Method to handle date range change
    public onDateRangeChange(args: RangeEventArgs): void {
        this.startDate = args.startDate;
        this.endDate = args.endDate;
        this.predicateStart = new Predicate('DateTime', 'greaterthanorequal', args.startDate);
        this.predicateEnd = new Predicate('DateTime', 'lessthanorequal', args.endDate);
        this.predicate = this.predicateStart.and(this.predicateEnd);
        this.getTotalExpense();
        this.updateChartData();
        setTimeout(() => {
            this.pie.refresh();
            this.lineChart.refresh();
            this.columnChart.refresh();
        }, 400);
        setTimeout(() => {
            this.refreshPieChart();
        }, 1000);
    }
    // custom code start
    public name: string;
    public lineD: any = [];
    public lineDS: any = [];
    public curDateTime: any;
    public tempLineDS: any = {};
    public colIncomeDS: any = [];
    public colExpenseDS: any = [];
    public tempIncomeDS: any = {};
    public tempExpenseDS: any = {};
    // Function to combine objects and arrays
    public objectAssign(e: any): object[] {
        let result: Object[] = [];
        let obj: any;
        obj = extend(obj, e.result, {}, true);
        for (let data: number = 0; data < Object.keys(e.result).length; data++) {
            result.push(obj[data]);
        }
        return result;
    }
    // Function to get data for column chart (income)( bar & line chart)
    public getColumnChartIncomeDS(e: any): Object[] {
        this.colIncomeDS = [];
        this.tempIncomeDS = [];
        let result: Object[] = this.objectAssign(e);
        for (let i: number = 0; i < result.length; i++) {
            let cur: any = result[i];
            if (cur.DateTime.getMonth() in this.tempIncomeDS) {
                this.curDateTime = this.tempIncomeDS[cur.DateTime.getMonth()];
                this.tempIncomeDS[cur.DateTime.getMonth()].Amount = parseInt(this.curDateTime.Amount, 0) + parseInt(cur.Amount, 0);
            } else {
                this.tempIncomeDS[cur.DateTime.getMonth()] = cur;
                this.tempIncomeDS[cur.DateTime.getMonth()].DateTime = new Date(new Date(this.tempIncomeDS[cur.DateTime.getMonth()].DateTime.setHours(0, 0, 0, 0)).setDate(1));
            }
        }
        for (let data in this.tempIncomeDS) {
            this.colIncomeDS.push(this.tempIncomeDS[data]);
        }
        return this.colIncomeDS;
    }
    // Function to get data for column chart (expense) ( bar & line chart)
    public getColumnChartExpenseDS(e: any): Object[] {
        this.colExpenseDS = [];
        this.tempExpenseDS = [];
        let result: Object[] = this.objectAssign(e);
        for (let i: number = 0; i < result.length; i++) {
            let cur: any = result[i];
            if (cur.DateTime.getMonth() in this.tempExpenseDS) {
                this.curDateTime = this.tempExpenseDS[cur.DateTime.getMonth()];
                this.tempExpenseDS[cur.DateTime.getMonth()].Amount = parseInt(this.curDateTime.Amount, 0) + parseInt(cur.Amount, 0);
            } else {
                this.tempExpenseDS[cur.DateTime.getMonth()] = cur;
                this.tempExpenseDS[cur.DateTime.getMonth()].DateTime = new Date(new Date(this.tempExpenseDS[cur.DateTime.getMonth()].DateTime.setHours(0, 0, 0, 0)).setDate(1));
            }
        }
        for (let data in this.tempExpenseDS) {
            this.colExpenseDS.push(this.tempExpenseDS[data]);
        }
        return this.colExpenseDS;
    }
    // Function to prepare data for the line chart
    public getLineChartDS(): Object[] {
        this.lineD = [];
        this.lineDS = [];
        this.tempLineDS = [];
        let result: Object[] = [];
        let obj: any;
        obj = extend(obj, (this.colIncomeDS.concat(this.colExpenseDS)), {}, true);
        for (let data: number = 0; data < Object.keys((this.colIncomeDS.concat(this.colExpenseDS))).length; data++) {
            result.push(obj[data]);
        }
        this.tempLineDS = result;
        for (let i: number = 0; i < this.tempLineDS.length; i++) {
            let cur: any = this.tempLineDS[i];
            if (cur.DateTime.getMonth() in this.lineD) {
                this.curDateTime = this.lineD[cur.DateTime.getMonth()];
                this.lineD[cur.DateTime.getMonth()].Amount = Math.abs((parseInt(this.curDateTime.Amount, 0) - parseInt(cur.Amount, 0)));
            } else {
                this.lineD[cur.DateTime.getMonth()] = cur;
            }
        }
        for (let data: number = 0; data <= this.lineD.length; data++) {
            if (this.lineD[data]) {
                this.lineDS.push(this.lineD[data]);
            }
        }
        return this.lineDS;
    }
    // Method to update chart data based on expense data
    public updateChartData(): void {
        new DataManager(<JSON[]>expenseData).executeQuery(new Query()
            .where(this.predicate.and('TransactionType', 'equal', 'Expense')))
            .then((e: any) => {
                this.colChartExpenseData = this.getColumnChartExpenseDS(e);
            });
        new DataManager(<JSON[]>expenseData).executeQuery(new Query()
            .where(this.predicate.and('TransactionType', 'equal', 'Income')))
            .then((e: any) => {
                this.colChartIncomeData = this.getColumnChartIncomeDS(e);
                this.lineChartData = this.getLineChartDS();
            });
    }
// custom code start
    /** Sets the pie chart's font size based on its size */
    public getFontSize(width: number): string {
        if (width > 300) {
            return '13px';
        } else if (width > 250) {
            return '8px';
        } else {
            return '6px';
        }
    }
    // Event handler when the accumulation chart (pie chart) is loaded
    public acconChartLoaded(args: IAccLoadedEventArgs): void {
        this.createLegendData('pie');
        this.enableLegend = true;
    }
    // Event handler for customizing text during rendering of pie chart labels
    public onTextRender(args: IAccTextRenderEventArgs): void {
        args.series.dataLabel.font.size = this.getFontSize(this.pie.initialClipRect.width);
        this.pie.animateSeries = true;
        if (args.text.indexOf('Others') > -1) {
            args.text = 'Others';
        }
    }
    // Event handler executed after animation completes in the pie chart
    public onAnimateCompleted(args: IAccAnimationCompleteEventArgs): void {
        let element: HTMLElement = document.getElementById('total-expense_datalabel_Series_0');
        if (!isNOU(element)) { element.style.visibility = 'visible'; }
    }
     // Method to calculate total expenses and prepare data for pie chart
    public getTotalExpense(): void {
        this.tempData = <IExpenseData[]>this.dataSource;
        this.expTotal = 0;
        this.category = [];
        this.legendData = [];
        let renderingData: { x: string; y: number; text: string; }[] = [];

        /** Extracts the category based data from the whole expense data */
        this.tempData.forEach((item: IExpenseData) => {
            if (item.TransactionType === 'Expense' && this.startDate.valueOf() <= item.DateTime.valueOf()
                && this.endDate.valueOf() >= item.DateTime.valueOf()) {
                this.expTotal += Number(item.Amount);
                this.legendData.push(item);
                if (this.category.indexOf(item.Category) < 0) {
                    this.category.push(item.Category);
                }
            }
        });

        /** From the category data, percentage calculation for legend grid */
        this.category.forEach((str: string) => {
            let total: number = 0;
            this.legendData.forEach((item: IExpenseData) => {
                if (str === item.Category) {
                    total += Number(item.Amount);
                }
            });
            let percent: string = ((total / this.expTotal) * 100).toFixed(2) + '%';
            renderingData.push({ x: str, y: total, text: percent });
        });

        /** Generates the pie chart data (pieRenderingData) */
        this.pieRenderingData = new DataManager(JSON.parse(JSON.stringify(renderingData)))
            .executeLocal((new Query().sortByDesc('y')));
        if (this.pieRenderingData.length > 10) {
            let temp: { x: string; y: number; text: string; } = <{ x: string; y: number; text: string; }>
                new DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new Query()
                    .sortByDesc('y').range(0, 9)))[8];
            this.groupValue = (temp.y - 1).toString();
            this.hiGridData = new DataManager(JSON.parse(JSON.stringify(renderingData)))
                .executeLocal((new Query().sortByDesc('y').skip(9)));
        } else {
            this.groupValue = null;
        }
    }
     /**
     * Method to create legend data for pie chart
     * @param initiate Initialization flag
     */
    public createLegendData(initiate: string): void {
        if (this.pie && (initiate === 'pieUpdate' || this.pieLegendData.length === 0)) {
            this.pieLegendData = [];
            this.pieLegendData = this.pie.visibleSeries[0].points;
        }
        /** Generates the legend grid data (pieRenderData) */
        this.pieRenderData = [];
        for (let i: number = 0; i < this.pieLegendData.length; i++) {
            let data: { [k: string]: any } = this.pieLegendData[i];
            if (data.text.indexOf('Others') > -1) {
                data.x = ((data.y / this.expTotal) * 100).toFixed(2).toString() + '%';
            }
            this.pieRenderData.push(data);
        }
    }
     /**
     * Method executed when grid data is bound
     * @param args Event arguments
     */
    public onGridDataBound(args: Object): void {
        this.showWaitingPopup = false;
    }
    // Method executed when grid is loaded
    public onGridLoad(args: any): void {
        /** While the legend grid loads, it gets the data from pie chart and process to this */
        this.createLegendData('pie');
        this.showWaitingPopup = true;
    }
    // Method to refresh pie chart data
    public refreshPieChart(): void {
        this.getTotalExpense();
        this.createLegendData('pieUpdate');
    }
    // Method to update pie chart based on container width
    public updatePieChart(): void {
        let pieContainerObj: HTMLElement = document.getElementById('totalExpense');
        if (!isNOU(pieContainerObj) && pieContainerObj.offsetWidth < 480) {
            this.disableChartLabel();
        } else if (!isNOU(pieContainerObj) && pieContainerObj.offsetWidth > 480) {
            this.enableChartLabel();
        }
    }
    // Method to disable data labels in the pie chart
    public disableChartLabel(): void {
        this.pie.series[0].dataLabel.visible = false;
        this.pie.refresh();
    }
    // Method to enable data labels in the pie chart
    public enableChartLabel(): void {
        this.pie.series[0].dataLabel.visible = true;
        this.pie.refresh();
    }
    // custom code end
    // define the JSON of data
    public nodes: NodeModel[] = [
        {
            id: 'node1_template', offsetX: 409, offsetY: -151, width: 250, height: 30,
            shape: { type: "HTML" }, constraints: NodeConstraints.Default & ~NodeConstraints.Resize & ~NodeConstraints.Rotate
        },
        {
            id: 'node2_template', offsetX: -434, offsetY: -157, width: 250, height: 30, constraints: NodeConstraints.Default & ~NodeConstraints.Select,
            style: { fill: 'transparent', strokeColor: 'transparent' },
            annotations: [{
                content: 'EXPENSE TRACKER',
                style: { fontSize: 16, color: '#797979', bold: true }
            }]
        },
        {
            id: 'node3_template', offsetX: 276, offsetY: 550, width: 512, height: 408,
            shape: { type: "HTML" }, constraints: NodeConstraints.Default & ~NodeConstraints.Resize & ~NodeConstraints.Rotate
        },
        {
            id: 'node4_template', offsetX: -257, offsetY: 550, width: 512, height: 408,
            shape: { type: "HTML" }, constraints: NodeConstraints.Default & ~NodeConstraints.Resize & ~NodeConstraints.Rotate
        }, {
            id: 'node5_template', offsetX: 10, offsetY: 100, width: 1050, height: 450,
            shape: { type: "HTML" }, constraints: NodeConstraints.Default & ~NodeConstraints.Resize & ~NodeConstraints.Rotate
        }
    ];

    public targetElement: HTMLElement;

    public created(): void {
        this.initialRenderr();
        this.diagram.fitToPage();
    }

}
/**
 * Interface for expense data structure
 */
export interface IExpenseData {
    Amount: number;
    Category: string;
    DateTime: Date;
    Description: string;
    PaymentMode: string;
    TransactionType: string;
    UniqueId: string;
}
// custom code end
