import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Pareto Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pare-to.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class ParetoSeriesChartComponent {
    //Initializing ChartArea
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    public data: Object[] = [
        { x: 'Button Defect', y: 23 }, { x: 'Pocket Defect', y: 16 },
        { x: 'Collar Defect', y: 10 }, { x: 'Cuff Defect', y: 7 },
        { x: 'Sleeve Defect', y: 6 }, { x: 'Other Defect', y: 2}
    ];
    
    public  cornerRadius: Object = { 
        topLeft: Browser.isDevice? 4 : 6, topRight: Browser.isDevice ? 4 : 6 
    }
     
    public paretoOptions: Object = {
        marker: {
            visible: true,
            isFilled: true,
            width: 7,
            height: 7
        },
        dashArray: '3,2',
        width: 2
        
    }
   
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        interval: 1,
        valueType: 'Category',
        majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
        labelRotation: Browser.isDevice ? -45 : 0
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Frequency of Occurence',
        minimum: 0,
        maximum: 25,
        interval: 5,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
        minorGridLines: { width: 1 }, minorTickLines: { width: 0 }
    };
    public legend: Object = {
        visible: true,
        enableHighlight: true
    };  
    public title: string = 'Defects in Shirts';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: ChartTheme | string = loadChartTheme(args);
        if(selectedTheme === 'material3'){
            args.chart.series[0].paretoOptions.fill = '#F7523F';
            args.chart.series[0].paretoOptions.marker.fill= '#F7523F';
        }
        else{
            args.chart.series[0].paretoOptions.fill = null;
            args.chart.series[0].paretoOptions.marker.fill= null;
        }
    };
    // custom code end
    public tooltip: Object = {
        enable: true,
        shared: true,
        format: '${series.name} : <b>${point.y}</b>'    
    };
    constructor() {
        //code
     };

}