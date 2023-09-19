import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ITextRenderEventArgs, IAxisLabelRenderEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Waterfall Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'waterfall.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class WaterfallChartComponent {

    public dataSource: Object[] = [
        { x: 'Income', y: 971  }, { x: 'Sales', y: -101 },
        { x: 'Development', y: -268 },
        { x: 'Revenue', y: 403  }, { x: 'Balance' },
        { x: 'Expense', y: -136 }, { x: 'Tax', y:  -365 },
        { x: 'Net Profit' }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 1250, interval: 250,
        majorGridLines: { width: 1 },
        title: 'USD',
        minorTickLines: {width: 0},
        lineStyle: {width: 0},
        labelFormat: "{value}K"
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    public title: string = 'Company Revenue and Profit';
    public tooltip: Object = {
        enable: true,
        format: '<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>', header: " " 
    };
    public legendSettings: Object = {
        visible: false
    };
    public marker: Object = {
        dataLabel: { visible: true, font: { color: '#ffffff' } }
    };
    public border: object = {
        color:'black' , width: 1
    }
    public connector: Object = {
        color: '#5F6A6A', width: 1.5
    };
    public sum: number[] = [7];
    public intermediate: number[] = [4];
   
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
     // custom code end
  
    constructor() {
        //code
    };

}