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
    public data: Object[] = [
        { Foods :  "Milk, Youghnut, Cheese", Calories : 435, DataLabelMappingName : "Milk, Youghnut, Cheese: 435 cal" },
        { Foods :  "Vegetables", Calories : 470, DataLabelMappingName : "Vegetables: 470 cal" },
        { Foods :  "Meat, Poultry, Fish", Calories : 475, DataLabelMappingName : "Meat, Poultry, Fish: 475 cal" },
        { Foods :  "Fruits", Calories : 520, DataLabelMappingName : "Fruits: 520 cal" },
        { Foods :  "Bread, Rice, Pasta", Calories : 930, DataLabelMappingName : "Bread, Rice, Pasta: 930 cal" },
    ];
    @ViewChild('pyramid')
    public pyramid: AccumulationChartComponent | AccumulationChart;
    public dataLabel: Object = {
        name: 'DataLabelMappingName', visible: true, position: 'Outside', font: {
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
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
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
    public tooltip: Object = { header:'', enable: true, format: '${point.x} : <b>${point.y} cal</b>' };
    public title: string = 'Food Comparison Chart';
    constructor() {
        //code
    };

}