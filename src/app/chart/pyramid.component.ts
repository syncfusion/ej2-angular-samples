import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent, IAccLoadedEventArgs, IAccResizeEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Pyramid chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pyramid.html',
    encapsulation: ViewEncapsulation.None
})
export class PyramidComponent {
    public data: Object[] = [{ x: 'Sweet Treats', y: 120, text: '120 cal' },
    { x: 'Milk, Youghnut, Cheese', y: 435, text: '435 cal' },
    { x: 'Vegetables', y: 470, text: '470 cal' },
    { x: 'Meat, Poultry, Fish', y: 475, text: '475 cal' },
    { x: 'Fruits', y: 520, text: '520 cal' },
    { x: 'Bread, Rice, Pasta', y: 930, text: '930 cal' }];
    @ViewChild('pyramid')
    public pyramid: AccumulationChartComponent | AccumulationChart;
    public dataLabel: Object = {
        name: 'text', visible: true, position: 'Inside', font: {
            fontWeight: '600'
        }
    };
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
        toggleVisibility: false,
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
    public gapRatio: number = 0.03;
    public emptyPointSettings: Object = {
        fill: 'red', mode: 'Drop'
    };
    public explode: boolean = true;
    public tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y} cal</b>' };
    public title: string = 'Food Comparison Chart';
    constructor() {
        //code
    };

}