import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, StripLineSettingsModel} from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser} from '@syncfusion/ej2-base';
/**
 * Sample for stripLines
 */
let fontSize: string = Browser.isDevice ? '14px' : '18px';
let xAxisStripLine: StripLineSettingsModel[] = [
    {
        start: -1, end: 1.5, text: 'Winter', color: 'url(#winter)',
        textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 1.5, end: 3.5, text: 'Summer', color: 'url(#summer)',
        textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 3.5, end: 4.5, text: 'Spring', color: 'url(#spring)',
        textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 4.5, end: 5.5, text: 'Autumn', color: 'url(#autumn)',
        textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 5.5, end: 7, text: 'Winter', color: 'url(#winter)',
        textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        startFromAxis: true, size: 2, isSegmented: true, segmentStart: 22.5, text: 'Average Temperature',
        segmentEnd: 27.5, visible: false, color: '#fc902a',
        textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
        rotation: 0
    }, {
        start: 3.5, size: 3, isSegmented: true, segmentStart: 22.5, text: 'Average Temperature',
        segmentEnd: 27.5, visible: false, color: '#fc902a',
        textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
        rotation: 0
    }, {
        start: 1.5, size: 2, isSegmented: true, segmentStart: 32.5, text: 'High Temperature',
        segmentEnd: 37.5, visible: false, color: '#ff512f',
        textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
        rotation: 0
    },
];
@Component({
    selector: 'control-content',
    templateUrl: 'strip-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StripLineChartComponent {

    public data: Object[] = [
        { x: 'Sun', y: 25 }, { x: 'Mon', y: 27 }, { x: 'Tue', y: 33 }, { x: 'Wed', y: 36 },
        { x: 'Thu', y: 26 }, { x: 'Fri', y: 27.5 }, { x: 'Sat', y: 23 }
    ];
    //Initializing Primary Y Axis
    public primaryXAxis: Object = {
        valueType: 'Category', majorGridLines: { width: 0 },
        //Initializing Striplines
        stripLines: xAxisStripLine
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 10, maximum: 40, interval: 5,
        lineStyle: { color: '#808080' }, labelFormat: '{value} °C', rangePadding: 'None',
        //Initializing Striplines
        stripLines: [
            {
                start: 30, end: 40, text: 'High Temperature', color: '#ff512f', visible: false,
                textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
            }, {
                start: 20, end: 30, text: 'Average Temperature', color: '#fc902a', visible: false,
                textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
            }, {
                start: 10, end: 20, text: 'Low Temperature', visible: false,
                textStyle: { size: fontSize, color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, color: '#f9d423'
            }
        ]
    };
    public marker: Object = {
        visible: true, width: 10, height: 10, border: { width: 2, color: '#ffffff' }, fill: '#666666'
    };
    public tooltip: Object = {
        enable: true
    };
    public legendSettings: Object = {
        visible: false
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Weather Report';
    @ViewChild('chart')
    public chart: ChartComponent;
    public mode: DropDownList;
    ngOnInit(): void {
        this.mode = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                this.chart.series[0].fill = 'white';
                this.chart.series[0].marker.fill = 'black';
                this.chart.series[0].marker.border.color = 'white';
                for (let i: number = 0; i < 3; i++) {
                    this.chart.primaryYAxis.stripLines[i].visible = false;
                }
                if (this.mode.value === 'Vertical') {
                    for (let i: number = 0; i <= 7; i++) {
                        this.chart.primaryXAxis.stripLines[i].visible = !this.chart.primaryXAxis.stripLines[i].isSegmented;
                    }
                } else if (this.mode.value === 'Horizontal') {
                    for (let i: number = 0; i < 3; i++) {
                        this.chart.primaryYAxis.stripLines[i].visible = true;
                    }
                    for (let i: number = 0; i <= 7; i++) {
                        this.chart.primaryXAxis.stripLines[i].visible = false;
                    }
                } else {
                    for (let i: number = 0; i <= 7; i++) {
                        this.chart.primaryXAxis.stripLines[i].visible = this.chart.primaryXAxis.stripLines[i].isSegmented;
                    }
                    this.chart.series[0].fill = 'black';
                    this.chart.series[0].marker.fill = 'white';
                    this.chart.series[0].marker.border.color = 'black';
                }
                this.chart.refresh();
            }
        });
        this.mode.appendTo('#selmode');
    }
    constructor() {
        //code
    };

}