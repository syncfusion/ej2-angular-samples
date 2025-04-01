import { Component, ViewEncapsulation } from '@angular/core';
import { scatterData } from './scatter-data';
import { Browser } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Scatter Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'scatter-plot.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class ScatterPlotChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
            minimum: 40,
            maximum: 56,
            majorGridLines: { width: 0 },
            title: 'Shoulder Breadth (cm)'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
                majorTickLines: { width: 0 },
                minimum: 70,
                maximum: 140,
                interval: 10,
                lineStyle: {
                    width: 0
                },
                rangePadding: 'None',
                title: 'Bust Chest Circumference (cm)'
    };
    public marker: Object = {
       width: 10,
       height: 10,
       shape:  'Circle' 
    };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
   // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
    public series1: Object = scatterData.getCluster1Value;
    public series2: Object = scatterData.getCluster2Value;
    public series3: Object = scatterData.getCluster3Value;
    public series4: Object = scatterData.getCluster4Value;
    public series5: Object = scatterData.getCluster5Value;
    constructor() {
        //code
     };

}