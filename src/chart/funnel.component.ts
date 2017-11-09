import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    AccumulationChartComponent, AccumulationChart, IAccLoadedEventArgs,
    IAccResizeEventArgs, AccumulationTheme
} from '@syncfusion/ej2-ng-charts';

/**
 * Sample for Funnel Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'funnel.html',
    encapsulation: ViewEncapsulation.None
})
export class FunnelComponent {
    public data: Object[] = [{ x: 'Renewed', y: 18.20, text: '18.20%' },
    { x: 'Subscribed', y: 27.3, text: '27.3%' },
    { x: 'Support', y: 55.9, text: '55.9%' },
    { x: 'Downloaded', y: 76.8, text: '76.8%' },
    { x: 'Visited', y: 100, text: '100%' }];
    @ViewChild('funnel')
    public funnel: AccumulationChartComponent | AccumulationChart;
    public funnelNeckWidth(e: Event): void {
        let value: string = (document.getElementById('funnelNeckWidth') as HTMLSelectElement).value;
        this.funnel.series[0].neckWidth = value + '%';
        document.getElementById('neckWidth').innerHTML = value + '%';
        this.funnel.removeSvg();
        this.funnel.refreshSeries();
        this.funnel.refreshChart();
    };
    public funnelNeckHeight(e: Event): void {
        let value: string = (document.getElementById('funnelNeckHeight') as HTMLSelectElement).value;
        this.funnel.series[0].neckHeight = value + '%';
        document.getElementById('neckHeight').innerHTML = value + '%';
        this.funnel.removeSvg();
        this.funnel.refreshSeries();
        this.funnel.refreshChart();
    };
    //Initializing DataLabel
    public dataLabel: Object = {
        name: 'text', visible: true, position: 'Inside', font: {
            fontWeight: '600'
        }
    };
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };

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
    public explode: boolean = true;
    public tooltip: Object = { enable: true, format: '${point.x} : ${point.y} %' };
    public title: string = 'Website Visitors';
    constructor() {
        //code
    };

}