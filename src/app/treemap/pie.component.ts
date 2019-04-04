/**
 * Pie sample
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { TreeMap, ILoadedEventArgs, TreeMapTooltip, IResizeEventArgs } from '@syncfusion/ej2-angular-treemap';
import { Continent_Data } from './pie-chart';
import { AccumulationChart, PieSeries, DataLabel, AccumulationTooltip } from '@syncfusion/ej2-charts';
import { ILoadEventArgs, TreeMapTheme, ITreeMapTooltipRenderEventArgs } from '@syncfusion/ej2-angular-treemap';
AccumulationChart.Inject(AccumulationChart, PieSeries, DataLabel, AccumulationTooltip);
TreeMap.Inject(TreeMapTooltip);

@Component({
    selector: 'control-content',
    templateUrl: 'pie.html',
    encapsulation: ViewEncapsulation.None
})

export class TreemapPieComponent {
    @ViewChild('treemap')
    public treemap: TreeMap;
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public count: number = 0;
    public chartCollection: AccumulationChart[] = [];
    public loaded(args: ILoadedEventArgs): void {
        let template: Element = document.getElementById(args.treemap.element.id + '_Label_Template_Group');
        if (template) {
            for (let i: number = 0; i < template.childElementCount; i++) {
                this.AccumulationChartRender((<Element>template.childNodes[i].childNodes[0]).id, i);
            }
        }
    }
    resize = (args: IResizeEventArgs) => {
        for (let i: number = 0; i < this.chartCollection.length; i++) {
            this.chartCollection[i].destroy();
        }
    }
tooltipRendering = (args: ITreeMapTooltipRenderEventArgs) => {
        //tslint:disable-next-line
        if (args.item['groupIndex'] !== 1 ) {
            args.cancel = true;
        }
    }
    // custom code start
    /*tslint:disable: no-string-literal */
    // custom code end
    public AccumulationChartRender(id: string, i: number): void {
        let chartData: any = this.getData(i);
        let dataSource: object = chartData['data'];
        let name: string = chartData['name'];
        let chart: AccumulationChart =  new AccumulationChart({
            // Initialize the chart series
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: name,
                    palettes: ['#1E1E1E', '#00BDAE', '#FFFFFF'],
                    dataSource: dataSource,
                    dataLabel: {
                        visible: false
                    },
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            background: 'transparent',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
        });
        chart.appendTo('#' + id);
        this.chartCollection.push(chart);
    }

    public getData(count: number): object {
        let dataSource: object[];
        let dataName: string;
        if (count === 0) {
            dataSource = [
                { 'x': '0-15 years', y: 40.8 }, { 'x': '15-64 years', y: 56.2 },
                { 'x': 'Above 64 years', y: 3.0 }
            ];
            dataName = 'Asia';
        } else if (count === 1) {
            dataSource = [
                { 'x': '0-15 years', y: 15.5 }, { 'x': '15-64 years', y: 12.9 },
                { 'x': 'Above 64 years', y: 41.4 }
            ];
            dataName = 'Asia';
        } else if (count === 2) {
            dataSource = [
                { 'x': '0-15 years', y: 25.1 }, { 'x': '15-64 years', y: 67.8 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'Afica';
        } else if (count === 3) {
            dataSource = [
                { 'x': '0-15 years', y: 15.3 }, { 'x': '15-64 years', y: 68.4 },
                { 'x': 'Above 64 years', y: 16.3 }
            ];
            dataName = 'Afica';
        } else if (count === 4) {
            dataSource = [
                { 'x': '0-15 years', y: 22.8 }, { 'x': '15-64 years', y: 65.9 },
                { 'x': 'Above 64 years', y: 11.4 }
            ];
            dataName = 'Europe';
        } else if (count === 5) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'Europe';
        } else if (count === 6) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 7) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 8) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'Oceania';
        } else if (count === 9) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'Oceania';
        } else if (count === 10) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'North America';
        } else if (count === 11) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'North America';
        }
        count++;
        return new Object({ name: dataName, data: dataSource });
    }
    tooltipSettings: object = {
        visible: true,
        format: ' ${Gender} : ${Population}'
    };
    titleSettings: object = {
        text: 'Population of the continents based on gender and age group - 2011',
        textStyle: { size: '15px' }
    };
    dataSource: object[] = Continent_Data;
    weightValuePath: string = 'Population';
    leafItemSettings: object = {
        labelPath: 'Gender',
        fill: '#A1317D',
        showLabels: false,
        border: { color: 'black', width: 0.5 },
        labelFormat: '${Gender} : ${Population}',
        templatePosition: 'Center',
        labelTemplate: '<div style="height:{{:PieHeight}};width:{{:PieWidth}};" id ={{:Id}}></div>',
    };
    levels: object[] = [
        {
            groupPath: 'Continent', fill: '#7E2361', border: { color: 'black', width: 1, },
            headerAlignment: 'Center', groupGap: 0, headerStyle: { size: '14px' }
        }
    ];
};

