import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IPointRenderEventArgs, ChartComponent, ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { loadChartTheme, pointRender } from './theme-color';
/**
 * Sample for Chart Print
 */
@Component({
    selector: 'control-content',
    templateUrl: 'print.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChartAllModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class PrintChartComponent {

    public data: Object[] = [
        { x: 'John', y: 10, dataLabelMappingName: "$10k"  }, { x: 'Jake', y: 12, dataLabelMappingName: "$12k" }, { x: 'Peter', y: 18, dataLabelMappingName: "$18k"},
    { x: 'James', y: 11, dataLabelMappingName: "$11k" }, { x: 'Mary', y: 9.7, dataLabelMappingName: "$9.7k"}
    ];
     // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
    public pointRender(args: IPointRenderEventArgs): void {
        pointRender(args);
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '${value}k',
        minimum: 0,
        maximum: 20,
        lineStyle: {width : 0},
        minorTickLines: {width: 0},
        interval: 4,
        majorTickLines: {width : 0},
    };
   
    public marker: Object = {
        dataLabel: { visible: true, position: 'Top', name:'dataLabelMappingName', font:{fontWeight: 600} }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    @ViewChild('chart')
    public chart: ChartComponent;
    public title: string = 'Sales Comparision';
    public mode(e: Event): void {
        this.chart.print();
    }
    constructor() {
        //code
    };

}
