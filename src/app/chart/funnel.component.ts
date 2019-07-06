import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    AccumulationChartComponent, AccumulationChart, IAccLoadedEventArgs,
    IAccResizeEventArgs, AccumulationTheme
} from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Funnel Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'funnel.html',
    encapsulation: ViewEncapsulation.None
})
export class FunnelComponent {
    public data: Object[] = [{ 'x': 'China', y: 1409517397, text: 'China' },
    { 'x': 'India', y: 1339180127, text: 'India' },
    { 'x': 'United States', y: 324459463, text: 'United States' },
    { 'x': 'Indonesia', y: 263991379, text: 'Indonesia' },
    { 'x': 'Brazil', y: 209288278, text: 'Brazil' },
    { 'x': 'Pakistan', y: 197015955, text: 'Pakistan' },
    { 'x': 'Nigeria', y: 190886311, text: 'Nigeria' },
    { 'x': 'Bangladesh', y: 164669751, text: 'Bangladesh' },
    { 'x': 'Russia', y: 143989754, text: 'Russia' },
    { 'x': 'Mexico', y: 129163276, text: 'Mexico' },
    { 'x': 'Japan', y: 127484450, text: ' Japan' },
    { 'x': 'Ethiopia', y: 104957438, text: 'Ethiopia' },
    { 'x': 'Philippines', y: 104918090, text: 'Philippines' },
    { 'x': 'Egypt', y: 97553151, text: 'Egypt' },
    { 'x': 'Vietnam', y: 95540800, text: 'Vietnam' },
    { 'x': 'Germany', y: 82114224, text: 'Germany' }
];
    @ViewChild('funnel')
    public funnel: AccumulationChartComponent | AccumulationChart;
    public funnelNeckWidth(e: Event): void {
        let value: string = (document.getElementById('funnelNeckWidth') as HTMLSelectElement).value;
        this.funnel.series[0].neckWidth = value + '%';
        document.getElementById('funnelNeckWidth').innerHTML = value + '%';
        this.funnel.removeSvg();
        this.funnel.refreshSeries();
        this.funnel.refreshChart();
    };
    public funnelNeckHeight(e: Event): void {
        let value: string = (document.getElementById('funnelNeckHeight') as HTMLSelectElement).value;
        this.funnel.series[0].neckHeight = value + '%';
        document.getElementById('funnelNeckHeight').innerHTML = value + '%';
        this.funnel.removeSvg();
        this.funnel.refreshSeries();
        this.funnel.refreshChart();
    };
    //Initializing DataLabel
    public dataLabel: Object = {
        name: 'text', visible: true, position: 'Outside', connectorStyle: { length: '6%' }
    };
    // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
   // custom code end
    public onChartResized(args: IAccResizeEventArgs): void {
        let bounds: ClientRect = document.getElementById('container').getBoundingClientRect();
        if (bounds.width < bounds.height) {
            args.accumulation.series[0].width = '80%';
            args.accumulation.series[0].height = '70%';
        } else {
            args.accumulation.series[0].width = '60%';
            args.accumulation.series[0].height = '80%';
        }
    };
    public neckWidth: string = '15%';
    public neckHeight: string = '18%';
    public gapRatio: number = 0.03;
    public emptyPointSettings: Object = {
        fill: 'red', mode: 'Drop'
    };
    public explode: boolean = false;
    public enableAnimation: boolean = false;
    public legendSettings: Object = { visible: false, toggleVisibility: false };
    public tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y}</b>' };
    public title: string = 'Top populated countries in 2017';
    constructor() {
        //code
    };

}