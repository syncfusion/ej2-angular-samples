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
        { Foods: "Oils", Calories: 2, DataLabelMappingName: "Oils: 2%" },
        { Foods: "Protein", Calories: 10, DataLabelMappingName: "Protein: 10%" },
        { Foods: "Fruits", Calories: 15, DataLabelMappingName: "Fruits: 15%" },
        { Foods: "Dairy", Calories: 23, DataLabelMappingName: "Dairy: 23%" },
        { Foods: "Vegetables", Calories: 23, DataLabelMappingName: "Vegetables: 23%" },
        { Foods: "Grains", Calories: 27, DataLabelMappingName: "Grains: 27%" }
    ];
    @ViewChild('pyramid')
    public pyramid: AccumulationChartComponent | AccumulationChart;
    public dataLabel: Object = {
        name: 'DataLabelMappingName', visible: true,   position: 'Outside',
        connectorStyle: {length: Browser.isDevice ? '10px' : '20px'}, font: {
            fontWeight: '600',  size: Browser.isDevice ? '7px' : '12px'
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
    public emptyPointSettings: Object = {
        fill: 'red', mode: 'Drop'
    };
    public neckWidth: string = '15%';
    public gapRatio: number = 0.03;
    public explode: boolean = false;
    public tooltip: Object = { header:'', enable: true, enableHighlight: true, format: '${point.x}: <b>${point.y}% of Daily Intake </b>' };
    public title: string = 'Food Consumption Pyramid';
    public subTitle: string = 'Source: wikipedia.org';
    constructor() {
        //code
    };

}
