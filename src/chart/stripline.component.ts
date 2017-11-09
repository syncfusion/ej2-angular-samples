import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-ng-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for stripLines
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stripline.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StripLineChartComponent {

    public data: Object[] = [
        { x: 'Sun', y: 28 }, { x: 'Mon', y: 27 }, { x: 'Tue', y: 33 }, { x: 'Wed', y: 36 },
        { x: 'Thu', y: 28 }, { x: 'Fri', y: 30 }, { x: 'Sat', y: 31 }
    ];
    //Initializing Primary Y Axis
    public primaryXAxis: Object = {
        valueType: 'Category', majorGridLines: { width: 0 },
        //Initializing Striplines
        stripLines: [
            {
                start: -1, end: 1.5, text: 'Winter', color: 'url(#winter)',
                textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
                border: { width: 0 }, rotation: -90, visible: true
            }, {
                start: 1.5, end: 3.5, text: 'Summer', color: 'url(#summer)',
                textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
                border: { width: 0 }, rotation: -90, visible: true
            }, {
                start: 3.5, end: 4.5, text: 'Spring', color: 'url(#spring)',
                textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
                border: { width: 0 }, rotation: -90, visible: true
            }, {
                start: 4.5, end: 5.5, text: 'Autumn', color: 'url(#autumn)',
                textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
                border: { width: 0 }, rotation: -90, visible: true
            }, {
                start: 5.5, end: 7, text: 'Winter', color: 'url(#winter)',
                textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
                border: { width: 0 }, rotation: -90, visible: true
            }
        ]
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 10, maximum: 40, interval: 5,
        lineStyle: { color: '#808080' }, labelFormat: '{value} °C', rangePadding: 'None',
        //Initializing Striplines
        stripLines: [
            {
                start: 30, end: 40, text: 'High Temperature', color: '#ff512f', visible: false,
                textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
            }, {
                start: 20, end: 30, text: 'Average Temperature', color: '#fc902a', visible: false,
                textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
            }, {
                start: 10, end: 20, text: 'Low Temperature', visible: false,
                textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, color: '#f9d423'
            }
        ]
    };
    public marker: Object = {
        visible: true, width: 10, height: 10, border: { width: 2, color: '#ffffff' }, fill: '#666666'
    };
    public tooltip: Object = {
        enable: true
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public title: string = 'Weather Report';
    @ViewChild('chart')
    public chart: ChartComponent;
    public mode: DropDownList;
    ngOnInit(): void {
        this.mode = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let mode: string = this.mode.value.toString();
                if (mode === 'Vertical') {
                    for (let i: number = 0; i <= 4; i++) {
                        if (i === 3 || i === 4) { this.chart.primaryYAxis.stripLines[i] = {}; }
                        this.chart.primaryYAxis.stripLines[i].visible = false;
                        this.chart.primaryXAxis.stripLines[i].visible = true;
                    }
                } else {
                    for (let i: number = 0; i <= 4; i++) {
                        this.chart.primaryYAxis.stripLines[i].visible = true;
                        this.chart.primaryXAxis.stripLines[i].visible = false;
                    }
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