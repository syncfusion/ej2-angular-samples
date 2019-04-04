import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DashboardLayoutComponent, PanelModel, ResizeEventArgs } from '@syncfusion/ej2-angular-layouts';
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel
} from '@syncfusion/ej2-angular-charts';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ILoadedEventArgs, ChartComponent, ChartTheme, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { MapsTheme, Maps, Legend, Marker, MapsTooltip, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';

Maps.Inject(Legend, Marker, MapsTooltip);

/**

 * Default  component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['analytics-dashboard.css'],
    templateUrl: 'analytics-dashboard.html',
    encapsulation: ViewEncapsulation.None
})
export class AnalyticsDashboardComponent {

    @ViewChild('editLayout')
    public dashboard: DashboardLayoutComponent;
    @ViewChild('pie')
    public pie: AccumulationChart;
    @ViewChild('piechart') public piechart: ChartComponent;
    @ViewChild('lineChart') public lineChart: ChartComponent;
    @ViewChild('colchart') public colchart: ChartComponent;
    // Sidebar data
    public enableDock: boolean = true;
    public type: string = 'Over';
    public dockSize: string = '60px';
    public closeOnDocumentClick: boolean = true;
    // public target: string = '.sidebar-content';
    public target: string = '#target';
    public enablesmartlabel: boolean = true;
    public startAngle: number = 0;
    public endAngle: number = 360;
    public dataLabel: Object = {
        visible: true, position: 'Inside',
        name: 'text',
        font: { color: 'white', fontWeight: '600', size: '14px' }
    };
    public palettes: any = ['#357cd2', '#00bdae', '#e36593'];
    public legendSettings: Object = {
        visible: false, toggleVisibility: false,
        position: 'Right', height: '28%', width: '44%'
    };
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.x}</b>',
        format: 'Composition : <b>${point.y}%</b>'
    };
    public expenseData: any = [
        {
            'UniqueId': 'T100003',
            'DateTime': new Date(1488359820000),
            'Category': 'Food',
            'PaymentMode': 'Cash',
            'TransactionType': 'Expense',
            'Description': 'Confederate cush',
            'Amount': '900',
            'MonthShort': 'Mar',
            'MonthFull': 'March, 2017',
            'FormattedDate': '03/01/2017 08:53 PM',
            'Device': 'Tablet'
        }, {
            'UniqueId': 'T100004',
            'DateTime': new Date(1491038220000),
            'Category': 'Transportation',
            'PaymentMode': 'Credit Card',
            'TransactionType': 'Expense',
            'Description': 'Public and other transportation',
            'Amount': '1200',
            'MonthShort': 'Apr',
            'MonthFull': 'April, 2017',
            'FormattedDate': '04/01/2017 10:44 AM',
            'Device': 'Desktop'
        }, {
            'UniqueId': 'T100005',
            'DateTime': new Date(1493630220000),
            'Category': 'Transportation',
            'PaymentMode': 'Cash',
            'TransactionType': 'Expense',
            'Description': 'Public and other transportation',
            'Amount': '600',
            'MonthShort': 'May',
            'MonthFull': 'May, 2017',
            'FormattedDate': '05/01/2017 03:25 PM',
            'Device': 'Mobile'
        },
    ];

    // Map data
    public zoomSettings: Object = { enable: false };
    public maplegendSettings: Object = { visible: false };
    public mapLoad = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    public  layers: object[] = [
        {
            shapeData: new MapAjax('./source/dashboard-layout/worldmap.json'),
            shapePropertyPath: 'continent',
            shapeDataPath: 'continent',
            dataSource: new MapAjax('./source/dashboard-layout/datasource.json'),
            shapeSettings: {
                colorValuePath: 'color',
            },
            markerSettings: [
                {
                    visible: true,
                    dataSource: [
                        { latitude: 37.6276571, longitude: -122.4276688, name: 'San Bruno' },
                        { latitude: 33.5302186, longitude: -117.7418381, name: 'Laguna Niguel' },
                        { latitude: 40.7424509, longitude: -74.0081468, name: 'New York' },
                        { latitude: -23.5268201, longitude: -46.6489927, name: 'Bom Retiro' },
                        { latitude: 43.6533855, longitude: -79.3729994, name: 'Toronto' },
                        { latitude: 48.8773406, longitude: 2.3299627, name: 'Paris' },
                        { latitude: 52.4643089, longitude: 13.4107368, name: 'Berlin' },
                        { latitude: 19.1555762, longitude: 72.8849595, name: 'Mumbai' },
                        { latitude: 35.6628744, longitude: 139.7345469, name: 'Minato' },
                        { latitude: 51.5326602, longitude: -0.1262422, name: 'London' }
                    ],
                    shape: 'Image',
                    imageUrl: 'https://ej2.syncfusion.com/demos/src/maps/images/ballon.png',
                    height: 20,
                    width: 20,
                    offset: {
                        y: -10,
                        x: 0
                    },
                    tooltipSettings: {
                        visible: true,
                        valuePath: 'name'
                    },
                    animationDuration: 0
                },
            ]
        },
    ];

    // ColumnChart properties
    public primaryXAxis: object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    };
    public chartArea: object = { border: { width: 0 } };
    public margin: object = { top: 30 };
        //Initializing Primary X Axis
    public primaryYAxis: object = {
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    public collegendSettings: object = { visible: false};
    public marker: object = { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } };
    public data: any = [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }];
    public data1: any = [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }];
    public data2: any = [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }];

    // Line Chart
    lineprimaryXAxis: object = {
        valueType: 'DateTime',
        labelFormat: 'MMM',
        majorGridLines: { width: 0 },
        intervalType: 'Months',
        edgeLabelPlacement: 'Shift'
    };
    lineprimaryYAxis: object = {
        maximum: 4, interval: 1,
        labelFormat: '{value}',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public linelegendSettings: Object = { visible: false };
    public widthValue: any = '100%';
    public heightValue: any = '100%';
    public columnData: any = [
        { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
        { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
        { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
        { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
        { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
    ];
    public columnData1: any = [
        { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
        { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
        { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
        { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
        { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
    ];
    public lineborder: object = { color: 'transparent' };

    // PieChart data
    public center: object =  { x: '50%', y: '50%' };
    public piedataSource: any = [
        { 'x': 'Desktop', y: 37, text: '60%' }, { 'x': 'Mobile', y: 17, text: '10%' },
        { 'x': 'Tablet', y: 19, text: '20%' }
    ];
    piedataLabel: object = {
        visible: true, position: 'Inside', name: 'text', font: { fontWeight: '600' }
    };
    public piechartLoad(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    public explode: boolean = true;
    load(args: any): void  {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <any>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    animationComplete(args: any): void {
        this.centerTitle.style.fontSize = this.getFontSize(this.pie.initialClipRect.width);
        let rect: ClientRect = this.centerTitle.getBoundingClientRect();
        this.centerTitle.style.top = (this.pie.origin.y - rect.height / 2) + 'px';
        this.centerTitle.style.left = (this.pie.origin.x - rect.width / 2) + 'px';
        this.centerTitle.style.visibility = 'visible';
        let points: any[] = this.pie.visibleSeries[0].points;
        for (let i: number = 0; i < points.length; i++) {
            let point: any = points[i];
            if (point.labelPosition === 'Outside' && point.labelVisible) {
                let label: HTMLElement = document.getElementById('pie_datalabel_Series_0_text_' + point.index);
                label.setAttribute('fill', 'black');
            }
        }
    }
    textRender(args: any): void {
        args.series.dataLabel.font.size = this.getFontSize(this.pie.initialClipRect.width);
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
    public cellSpacing: number[] =  [5, 5];
    public aspectRatio : any = 100 / 85;
    public centerTitle: any;
    constructor(){
        this.centerTitle = (document.createElement('div') as HTMLElement);
    }
    ngAfterViewInit() {
    this.centerTitle.innerHTML = 'Active <br> users  &nbsp';
    this.centerTitle.style.position = 'absolute';
    this.centerTitle.style.visibility = 'hidden';
    }
}
