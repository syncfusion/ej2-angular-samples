import { Component, ViewEncapsulation } from '@angular/core';
import { scatterData } from './scatter-data';
import { Browser } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Scatter Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'scatter-plot.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ScatterPlotChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
           minimum: 100,
            maximum: 220,
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift',
            title: 'Height in Inches'

    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
                majorTickLines: {
                    width: 0
                },
                minimum: 50,
                maximum: 80,
                lineStyle: {
                    width: 0
                },
                  title: 'Weight in Pounds',
                rangePadding: 'None'

    };
    public marker1: Object = {
       visible: false,
       width: 12,
       height: 12,
       shape:  'Circle' 
    };
    public marker2: Object = {
       visible: false,
       width: 12,
       height: 12,
       shape: 'Diamond'
    };
    public tooltip: Object = {
        enable: true,
        format: 'Weight: <b>${point.x} lbs</b> <br/> Height: <b>${point.y}"</b>'
    };
   // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Height vs Weight';
    public series1: Object = scatterData.getMaleData;
    public series2: Object = scatterData.getFemaleData;
    constructor() {
        //code
     };

}