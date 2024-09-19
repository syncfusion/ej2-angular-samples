/**
 * Dynamic pie demo
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Marker, ILoadEventArgs, Legend, ILoadedEventArgs, IResizeEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { AccumulationChart, PieSeries, DataLabel, AccumulationTooltip } from '@syncfusion/ej2-charts';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

AccumulationChart.Inject(AccumulationChart, PieSeries, DataLabel, AccumulationTooltip);
declare var require: any;
let worldMap: object[] = require('./world-map.json');
Maps.Inject(Marker, Legend);
@Component({
    selector: 'control-content',
    templateUrl: 'pie.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SBDescriptionComponent]
})

export class MapsPieComponent {
    public zoomSettings: object = {
        enable: false
    };
    public chartCollection: AccumulationChart[] = [];
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    }
    // custom code end
    resize = (args: IResizeEventArgs) => {
        for (let i: number = 0; i < this.chartCollection.length; i++) {
            this.chartCollection[i].destroy();
        }
        this.chartCollection = [];
    }
    public titleSettings: object = {
        text: 'Top 6 largest countries age group details',
        titleStyle: { size: '16px' }
    };
    public legendSettings: object = {
        visible: true,
        position: 'Bottom'
    };

    public layers: object[] = [
        {
            shapeData: worldMap,
            shapeSettings: {
                fill: '#E5E5E5',
                colorMapping: [
                    {
                        from: 0, to: 4, color: '#634D6F', label: '0-14 years',
                    },
                    {
                        from: 5, to: 14, color: '#B34D6D', label: '15-24 years'
                    },
                    {
                        from: 15, to: 59, color: '#557C5C', label: '25-54 years'
                    },
                    {
                        from: 60, to: 100, color: '#5E55E2', label: '55-64 years'
                    }
                ]
            },
            markerSettings: [
                {
                    visible: true,
                    template: '<div id="pieChart1" style="height:70px;width:70px;"></div>',
                    dataSource: [
                        { 'latitude': 61.938950426660604, 'longitude': 97.03125 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '  <div id="pieChart2" style="height:70px;width:70px;">',
                    dataSource: [
                        { 'latitude': 57.70414723434193, 'longitude': -114.08203125 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '<div id="pieChart3" style="top:10px;left:10px;height:70px;width:70px;"></div>',
                    dataSource: [
                        { 'latitude': 39.90973623453719, 'longitude': -103.0078125 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '<div id="pieChart4" style="height:70px;width:70px;"></div>',
                    dataSource: [
                        { 'latitude': 35.746512259918504, 'longitude': 102.216796875 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '<div id="pieChart5" style="height:70px;width:70px;"></div>',
                    dataSource: [
                        { 'latitude': -8.667918002363107, 'longitude': -52.55859375 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '<div id="pieChart6" style="height:70px;width:70px;"></div>',
                    dataSource: [
                        { 'latitude': -23.725011735951796, 'longitude': 132.978515625 }
                    ],
                    animationDuration: 0
                }
            ]
        }
    ];
    public loaded(args: ILoadedEventArgs): void {
            let chart: AccumulationChart = new AccumulationChart({
                background: 'transparent', width: '70', height: '70',
                tooltip: { enable: true, format: '${point.x} : ${point.y}' },
                series: [{
                    name: 'Russia', explode: true, explodeIndex: 0, explodeOffset: '30%',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2'],
                    dataSource: [
                        { 'x': '0-14 years', y: 16 }, { 'x': '15-24 years', y: 11.5 },
                        { 'x': '25-54 years', y: 45.9 }, { 'x': '55-64 years', y: 13.5 },
                    ],
                     type: 'Pie', xName: 'x', yName: 'y'
                }],
                legendSettings: {visible: false}
            });
            chart.appendTo('#pieChart1');
            this.chartCollection.push(chart);
            let chart1: AccumulationChart = new AccumulationChart({
                background: 'transparent', width: '70', height: '70',
                tooltip: { enable: true, format: '${point.x} : ${point.y}' },
                series: [{
                    name: 'Canada', explode: true, explodeIndex: 0, explodeOffset: '30%',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2'],
                    dataSource: [
                        { 'x': '0-14 years', y: 15.5 }, { 'x': '15-24 years', y: 12.9 },
                        { 'x': '25-54 years', y: 41.4 }, { 'x': '55-64 years', y: 13.3 },
                    ],
                     type: 'Pie', xName: 'x', yName: 'y'
                }],
                legendSettings: {visible: false},
            });
            chart1.appendTo('#pieChart2');
            this.chartCollection.push(chart1);
            let chart2: AccumulationChart = new AccumulationChart({
                background: 'transparent', width: '70', height: '70',
                tooltip: { enable: true, format: '${point.x} : ${point.y}' },
                series: [{
                    name: 'USA', explode: true, explodeIndex: 0, explodeOffset: '30%',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2'],
                    dataSource: [
                        { 'x': '0-14 years', y: 20 }, { 'x': '15-24 years', y: 13.7 },
                        { 'x': '25-54 years', y: 40.2 }, { 'x': '55-64 years', y: 12.3 },
                    ],
                     type: 'Pie', xName: 'x', yName: 'y'
                }],
                legendSettings: {visible: false},
            });
            chart2.appendTo('#pieChart3');
            this.chartCollection.push(chart2);
            let chart3: AccumulationChart = new AccumulationChart({
                background: 'transparent', width: '70', height: '70',
                tooltip: { enable: true, format: '${point.x} : ${point.y}' },
                series: [{
                    name: 'China', explode: true, explodeIndex: 0, explodeOffset: '30%',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2'],
                    dataSource: [
                        { 'x': '0-14 years', y: 17.2 }, { 'x': '15-24 years', y: 15.4 },
                        { 'x': '25-54 years', y: 46.9 }, { 'x': '55-64 years', y: 11.3 },
                    ],
                     type: 'Pie', xName: 'x', yName: 'y'
                }],
                legendSettings: {visible: false},
            });
            chart3.appendTo('#pieChart4');
            this.chartCollection.push(chart3);
            let chart4: AccumulationChart = new AccumulationChart({
                background: 'transparent', width: '70', height: '70',
                tooltip: { enable: true, format: '${point.x} : ${point.y}' },
                series: [{
                    name: 'Brazil', explode: true, explodeIndex: 0, explodeOffset: '30%',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2'],
                    dataSource: [
                        { 'x': '0-14 years', y: 24.2 }, { 'x': '15-24 years', y: 16.7 },
                        { 'x': '25-54 years', y: 43.6 }, { 'x': '55-64 years', y: 8.2 },
                    ],
                     type: 'Pie', xName: 'x', yName: 'y'
                }],
                legendSettings: {visible: false},
            });
            chart4.appendTo('#pieChart5');
            this.chartCollection.push(chart4);
            let chart5: AccumulationChart = new AccumulationChart({
                background: 'transparent', width: '70', height: '70',
                tooltip: { enable: true, format: '${point.x} : ${point.y}' },
                series: [{
                    name: 'Australia', explode: true, explodeIndex: 0, explodeOffset: '30%',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2'],
                    dataSource: [
                        { 'x': '0-14 years', y: 18.1 }, { 'x': '15-24 years', y: 13.4 },
                        { 'x': '25-54 years', y: 42 }, { 'x': '55-64 years', y: 11.8 },
                    ],
                     type: 'Pie', xName: 'x', yName: 'y'
                }],
                legendSettings: {visible: false},
            });
            chart5.appendTo('#pieChart6');
            this.chartCollection.push(chart5);
        }
        // custom code start
        constructor(@Inject('sourceFiles') private sourceFiles: any) {
            sourceFiles.files = [ 'world-map.json'];
        };
        // custom code end
};