import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent,ChartAllModule, IAccLoadedEventArgs, IAccResizeEventArgs, AccumulationTheme, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';
/**
 * Sample for Pyramid chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pyramid.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule,AccumulationChartAllModule, SBDescriptionComponent]
})
export class PyramidComponent {
    public data: Object[] = [
        { Foods :  "Milk, Youghnut, Cheese", Calories : 435, DataLabelMappingName : Browser.isDevice ? 'Milk, Youghnut,<br> Cheese:  435 cal' :  "Milk, Youghnut, Cheese: 435 cal" },
        { Foods :  "Vegetables", Calories : 470, DataLabelMappingName : "Vegetables: 470 cal" },
        { Foods :  "Meat, Poultry, Fish", Calories : 475, DataLabelMappingName : Browser.isDevice ? 'Meat, Poultry,<br> Fish: 475 cal' : "Meat, Poultry, Fish: 475 cal" },
        { Foods :  "Rice, Pasta", Calories : 930, DataLabelMappingName : Browser.isDevice ? 'Rice, Pasta:<br> 930 cal' : "Rice, Pasta: 930 cal" },
        { Foods :  "Fruits", Calories : 520, DataLabelMappingName : Browser.isDevice ? 'Fruits: <br> 520 cal' : "Fruits: 520 cal" },
    ];
    @ViewChild('pyramid')
    public pyramid: AccumulationChartComponent | AccumulationChart;
    public dataLabel: Object = {
        name: 'DataLabelMappingName', visible: true,   position: 'Outside',
        connectorStyle: {length: '20px'}, font: {
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
        loadAccumulationChartTheme(args);
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
    public tooltip: Object = { header:'', enable: true, enableHighlight: true, format: '${point.x} : <b>${point.y} cal</b>' };
    public title: string = 'Food Comparison Chart';
    constructor() {
        //code
    };

}
