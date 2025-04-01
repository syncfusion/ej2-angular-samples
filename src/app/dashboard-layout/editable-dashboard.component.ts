import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { DashboardLayoutComponent, DashboardLayoutAllModule } from '@syncfusion/ej2-angular-layouts';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ChartComponent, AccumulationChart, AccumulationChartAllModule, ChartAllModule, IAccLoadedEventArgs, AccumulationTheme, Chart, LineSeries, Category, AccumulationDataLabel, PieSeries, AccumulationTooltip, } from '@syncfusion/ej2-angular-charts';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';

// Inject necessary services for the charts
Chart.Inject(LineSeries, Category);
AccumulationChart.Inject(AccumulationDataLabel, PieSeries, AccumulationTooltip);

@Component({
    selector: 'control-content',
    styleUrls: ['editable-dashboard.css'],
    templateUrl: 'editable-dashboard.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DashboardLayoutAllModule,
        ButtonModule,
        DialogModule,
        ChartAllModule,
        AccumulationChartAllModule,
        CommonModule
    ],
})
export class EditableDashboardComponent {
    @ViewChild('default_dashboard')
    public dashboardObject: DashboardLayoutComponent;
    @ViewChild('toggleBtn')
    public toggleBtn: ButtonComponent | any;
    @ViewChild('template')
    public dialogObj: DialogComponent | any;
    @ViewChild('pieChart')
    public pie: AccumulationChart;
    public centerTitle: any;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        this.centerTitle = document.createElement('div') as HTMLElement;
        sourceFiles.files = ['editable-dashboard.css'];
    }

    ngAfterViewInit() {
        this.centerTitle.innerHTML = 'Active <br> users  &nbsp';
        this.centerTitle.style.position = 'absolute';
        this.centerTitle.style.visibility = 'hidden';
    }

    // Dashboard
    public cellSpacing: number[] = [10, 10];
    public cellAspectRatio = 100 / 85;
    public count: number = 3;
    onPanelResizeStop(args) {
        if (args.element) {
            let innerElement =
                args.element.querySelector(
                    '.e-panel-container .e-panel-content .e-control'
                ) ||
                args.element.querySelector(
                    '.e-panel-container .e-panel-content div .e-control'
                );
            if (innerElement) {
                const innerElementInstance = innerElement.ej2_instances[0];
                innerElementInstance.height = '95%';
                innerElementInstance.width = '100%';
                innerElementInstance.refresh();
            }
        }
    }

    // Dialog
    public width: string = '500px';
    public dialogHeader: string = 'Add a widget';
    public height: string = '100px';
    public isModal: Boolean = true;
    public isVisible: Boolean = false;
    public showCloseIcon: Boolean = true;
    public target: string = '#target';
    public animationSettings = { effect: 'Zoom' };

    // Button
    onClick(): void {
        if (!this.toggleBtn.element.classList.contains('e-active')) {
            this.dashboardObject.allowResizing = true;
            this.dashboardObject.allowDragging = true;
            this.toggleBtn.content = 'SAVE';
            this.toggleBtn.iconCss = 'save';
            document.getElementById('dialogBtn').style.display = 'block';
        } else {
            this.dashboardObject.allowResizing = false;
            this.dashboardObject.allowDragging = false;
            this.toggleBtn.content = 'EDIT';
            this.toggleBtn.iconCss = 'edit';
            document.getElementById('dialogBtn').style.display = 'none';
        }
    }

    // Pie Chart
    public enablesmartlabel: boolean = true;
    public startAngle: number = 0;
    public endAngle: number = 360;
    public dataLabel: Object = {
        visible: true,
        position: 'Inside',
        name: 'value',
        font: { color: 'white', fontWeight: '600', size: '14px' },
    };
    public palettes: any = ['#00bdaed1', '#357cd2bf', '#e56691e8'];
    public legendSettings: Object = {
        visible: false,
        toggleVisibility: false,
    };
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.x}</b>',
        format: 'Composition : <b>${point.y}%</b>',
    };
    public pieData: any = [
        { x: 'Jan', y: 12.5, text: 'January' },
        { x: 'Feb', y: 25, text: 'February' },
        { x: 'Mar', y: 50, text: 'March' },
    ];
    public piechartLoad(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(
            (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
                /-dark/i,
                'Dark'
            )
        );
    }
    animationComplete(args: any): void {
        this.centerTitle.style.fontSize = this.getFontSize(
            this.pie.initialClipRect.width
        );
        let rect: ClientRect = this.centerTitle.getBoundingClientRect();
        this.centerTitle.style.top = this.pie.origin.y - rect.height / 2 + 'px';
        this.centerTitle.style.left = this.pie.origin.x - rect.width / 2 + 'px';
        this.centerTitle.style.visibility = 'visible';
        let points: any[] = this.pie.visibleSeries[0].points;
        for (let i: number = 0; i < points.length; i++) {
            let point: any = points[i];
            if (point.labelPosition === 'Outside' && point.labelVisible) {
                let label: HTMLElement = document.getElementById(
                    'pie_datalabel_Series_0_text_' + point.index
                );
                label.setAttribute('fill', 'black');
            }
        }
    }
    textRender(args: any): void {
        args.series.dataLabel.font.size = this.getFontSize(
            this.pie.initialClipRect.width
        );
        this.pie.animateSeries = true;
    }
    getFontSize(width: any): string {
        if (width > 300) {
            return '13px';
        } else if (width > 250) {
            return '13px';
        } else {
            return '13px';
        }
    }

    // Bar Chart
    public primaryXAxis: object = {
        valueType: 'Category',
        interval: 1,
        majorGridLines: { width: 0 },
    };
    public chartArea: object = { border: { width: 0 } };
    public primaryYAxis: object = {
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: { color: 'transparent' },
    };
    public marker: object = {
        dataLabel: {
            visible: false,
            position: 'Top',
            font: { fontWeight: '600', color: '#ffffff' },
        },
    };
    public data: any = [
        { x: 'Jan', y: 46 },
        { x: 'Feb', y: 27 },
        { x: 'Mar', y: 26 },
    ];
    public data1: any = [
        { x: 'Jan', y: 37 },
        { x: 'Feb', y: 23 },
        { x: 'Mar', y: 18 },
    ];
    public data2: any = [
        { x: 'Jan', y: 38 },
        { x: 'Feb', y: 17 },
        { x: 'Mar', y: 26 },
    ];

    // Spline Chart
    lineprimaryXAxis: object = {
        valueType: 'DateTime',
        labelFormat: 'MMM',
        majorGridLines: { width: 0 },
        intervalType: 'Months',
        edgeLabelPlacement: 'Shift',
    };
    lineprimaryYAxis: object = {
        maximum: 4,
        interval: 1,
        labelFormat: '{value}%',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
    };
    public linelegendSettings: Object = { visible: true };
    public widthValue: any = '100%';
    public heightValue: any = '100%';
    public splineData1: any = [
        { x: new Date(2002, 0, 1), y: 2.2 },
        { x: new Date(2003, 0, 1), y: 3.4 },
        { x: new Date(2004, 0, 1), y: 2.8 },
        { x: new Date(2005, 0, 1), y: 1.6 },
        { x: new Date(2006, 0, 1), y: 2.3 },
        { x: new Date(2007, 0, 1), y: 2.5 },
        { x: new Date(2008, 0, 1), y: 2.9 },
        { x: new Date(2009, 0, 1), y: 3.8 },
        { x: new Date(2010, 0, 1), y: 1.4 },
        { x: new Date(2011, 0, 1), y: 3.1 },
    ];
    public splineData2: any = [
        { x: new Date(2002, 0, 1), y: 2 },
        { x: new Date(2003, 0, 1), y: 1.7 },
        { x: new Date(2004, 0, 1), y: 1.8 },
        { x: new Date(2005, 0, 1), y: 2.1 },
        { x: new Date(2006, 0, 1), y: 2.3 },
        { x: new Date(2007, 0, 1), y: 1.7 },
        { x: new Date(2008, 0, 1), y: 1.5 },
        { x: new Date(2009, 0, 1), y: 2.8 },
        { x: new Date(2010, 0, 1), y: 1.5 },
        { x: new Date(2011, 0, 1), y: 2.3 },
    ];
    public lineborder: object = { color: 'transparent' };
    load(args: any): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <any>(
            (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
                /-dark/i,
                'Dark'
            )
        );
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].marker.dataLabel.font.color = '#000000';
            args.chart.series[1].marker.dataLabel.font.color = '#000000';
            args.chart.series[2].marker.dataLabel.font.color = '#000000';
        }
    }

    addWidget(): void {
        this.dialogObj.show();

        document.getElementById('bartemplate').onclick = () => {
            this.dialogObj.hide();
            var countValue = this.count.toString();
            var panel = [
                {
                    id: '_layout' + countValue,
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 0,
                    header: '<div>Bar Chart</div>',
                    content:
                        '<div id=_bar' +
                        countValue +
                        ' style="height:100%; width:100%"></div>',
                },
            ];
            this.count = this.count + 1;
            this.dashboardObject.addPanel(panel[0]);
            // Create bar chart and append to the new Dashboard panel content
            var barchartObj = new Chart({
                chartArea: this.chartArea,
                primaryXAxis: {
                    valueType: 'Category',
                    interval: 1,
                    majorGridLines: { width: 0 },
                },
                width: '99%',
                primaryYAxis: {
                    majorGridLines: { width: 0 },
                    majorTickLines: { width: 0 },
                    lineStyle: { width: 0 },
                    labelStyle: { color: 'transparent' },
                },
                height: '100%',
                series: [
                    {
                        type: 'Column',
                        xName: 'x',
                        width: 2,
                        yName: 'y',
                        name: 'Jan',
                        fill: '#00bdae',
                        dataSource: [
                            { x: 'Jan', y: 46 },
                            { x: 'Feb', y: 27 },
                            { x: 'Mar', y: 26 },
                        ],
                        marker: {
                            dataLabel: {
                                visible: false,
                                position: 'Top',
                                font: {
                                    fontWeight: '600',
                                    color: '#ffffff',
                                },
                            },
                        },
                    },
                    {
                        type: 'Column',
                        xName: 'x',
                        width: 2,
                        yName: 'y',
                        name: 'Feb',
                        fill: '#e56691',
                        dataSource: [
                            { x: 'Jan', y: 37 },
                            { x: 'Feb', y: 23 },
                            { x: 'Mar', y: 18 },
                        ],
                        marker: {
                            dataLabel: {
                                visible: false,
                                position: 'Top',
                                font: { fontWeight: '600', color: '#ffffff' },
                            },
                        },
                    },
                    {
                        type: 'Column',
                        xName: 'x',
                        width: 2,
                        yName: 'y',
                        name: 'Mar',
                        fill: '#357cd2',
                        dataSource: [
                            { x: 'Jan', y: 38 },
                            { x: 'Feb', y: 17 },
                            { x: 'Mar', y: 26 },
                        ],
                        marker: {
                            dataLabel: {
                                visible: false,
                                position: 'Top',
                                font: { fontWeight: '600', color: '#ffffff' },
                            },
                        },
                    },
                ],
            });
            barchartObj.appendTo('#' + '_bar' + countValue);
            barchartObj.refresh();
        };

        document.getElementById('pietemplate').onclick = () => {
            this.dialogObj.hide();
            var countValue = this.count.toString();
            var panel = [
                {
                    id: '_layout' + countValue,
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 0,
                    header: '<div>Pie Chart</div>',
                    content:
                        '<div id=_pie' +
                        countValue +
                        ' style="height:100%; width:100%"></div>',
                },
            ];
            this.count = this.count + 1;
            this.dashboardObject.addPanel(panel[0]);
            // Create pie chart and append to the new Dashboard panel content
            var pieChartObj = new AccumulationChart({
                series: [
                    {
                        dataSource: [
                            { x: 'Jan', y: 12.5, text: 'January' },
                            { x: 'Feb', y: 25, text: 'February' },
                            { x: 'Mar', y: 50, text: 'March' },
                        ],
                        palettes: ['#00bdaed1', '#357cd2bf', '#e56691e8'],
                        radius: '100%',
                        xName: 'x',
                        yName: 'y',
                        startAngle: 0,
                        endAngle: 360,
                        innerRadius: '40%',
                        name: 'Earnings',
                        dataLabel: {
                            visible: true,
                            name: 'value',
                            position: 'Inside',
                            font: { color: 'white', fontWeight: '600', size: '14px' },
                        },
                    },
                ],
                tooltip: {
                    enable: true,
                    header: '<b>${point.x}</b>',
                    format: 'Composition : <b>${point.y}%</b>',
                },
                legendSettings: {
                    visible: false,
                    toggleVisibility: false,
                },
                width: '100%',
                height: '100%',
            });
            pieChartObj.appendTo('#' + '_pie' + countValue);
            pieChartObj.refresh();
        };

        document.getElementById('splinetemplate').onclick = () => {
            this.dialogObj.hide();
            var countValue = this.count.toString();
            var panel = [
                {
                    id: '_layout' + countValue,
                    sizeX: 2,
                    sizeY: 1,
                    row: 0,
                    col: 0,
                    header: '<div>Spline Chart</div>',
                    content:
                        '<div id=_spline' +
                        countValue +
                        ' style="height:100%; width:100%"></div>',
                },
            ];
            this.count = this.count + 1;
            this.dashboardObject.addPanel(panel[0]);
            // Create a Spline chart and append to the new Dashboard panel content
            var chart = new Chart({
                primaryXAxis: {
                    valueType: 'DateTime',
                    labelFormat: 'MMM',
                    majorGridLines: { width: 0 },
                    intervalType: 'Months',
                    edgeLabelPlacement: 'Shift',
                },
                primaryYAxis: {
                    maximum: 4,
                    interval: 1,
                    labelFormat: '{value}',
                    lineStyle: { width: 0 },
                    majorTickLines: { width: 0 },
                    minorTickLines: { width: 0 },
                },
                chartArea: {
                    border: {
                        width: 0,
                    },
                },
                series: [
                    {
                        dataSource: [
                            { x: new Date(2002, 0, 1), y: 2.2 },
                            { x: new Date(2003, 0, 1), y: 3.4 },
                            { x: new Date(2004, 0, 1), y: 2.8 },
                            { x: new Date(2005, 0, 1), y: 1.6 },
                            { x: new Date(2006, 0, 1), y: 2.3 },
                            { x: new Date(2007, 0, 1), y: 2.5 },
                            { x: new Date(2008, 0, 1), y: 2.9 },
                            { x: new Date(2009, 0, 1), y: 3.8 },
                            { x: new Date(2010, 0, 1), y: 1.4 },
                            { x: new Date(2011, 0, 1), y: 3.1 },
                        ],
                        name: 'Jan',
                        xName: 'x',
                        yName: 'y',
                        type: 'SplineArea',
                        border: { color: 'transparent' },
                        fill: 'rgb(239, 183, 202)',
                        opacity: 0.5,
                    },
                    {
                        dataSource: [
                            { x: new Date(2002, 0, 1), y: 2 },
                            { x: new Date(2003, 0, 1), y: 1.7 },
                            { x: new Date(2004, 0, 1), y: 1.8 },
                            { x: new Date(2005, 0, 1), y: 2.1 },
                            { x: new Date(2006, 0, 1), y: 2.3 },
                            { x: new Date(2007, 0, 1), y: 1.7 },
                            { x: new Date(2008, 0, 1), y: 1.5 },
                            { x: new Date(2009, 0, 1), y: 2.8 },
                            { x: new Date(2010, 0, 1), y: 1.5 },
                            { x: new Date(2011, 0, 1), y: 2.3 },
                        ],
                        name: 'Feb',
                        xName: 'x',
                        yName: 'y',
                        type: 'SplineArea',
                        border: { color: 'transparent' },
                        fill: 'rgb(0, 189, 174)',
                        opacity: 0.5,
                    },
                ],
                width: '99%',
                height: '100%',
            });
            chart.appendTo('#' + '_spline' + countValue);
            chart.refresh();
        };
    }
}  