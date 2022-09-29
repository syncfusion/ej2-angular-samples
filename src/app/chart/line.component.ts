import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class LineChartComponent {

    public data: Object[] = [
        { Period : 2020, Can_Growth : 11.0, Viet_Growth : 19.5, Mal_Growth : 7.1, Egy_Growth : 8.2, Ind_Growth : 9.3 },
        { Period : 2019, Can_Growth : 12.9, Viet_Growth : 17.5, Mal_Growth : 6.8, Egy_Growth : 7.3, Ind_Growth : 7.8 },
        { Period : 2018, Can_Growth : 13.4, Viet_Growth : 15.5, Mal_Growth : 4.1, Egy_Growth : 7.8, Ind_Growth : 6.2  },
        { Period : 2017, Can_Growth : 13.7, Viet_Growth : 10.3, Mal_Growth : 2.8, Egy_Growth : 6.8, Ind_Growth : 5.3 },
        { Period : 2016, Can_Growth : 12.7, Viet_Growth : 7.8, Mal_Growth : 2.8, Egy_Growth : 5.0, Ind_Growth : 4.8 },
        { Period : 2015, Can_Growth : 12.5, Viet_Growth : 5.7, Mal_Growth : 3.8, Egy_Growth : 5.5, Ind_Growth : 4.9 },
        { Period : 2014, Can_Growth : 12.7, Viet_Growth : 5.9, Mal_Growth : 4.3, Egy_Growth : 6.5, Ind_Growth : 4.4 },
        { Period : 2013, Can_Growth : 12.4, Viet_Growth : 5.6, Mal_Growth : 4.7, Egy_Growth : 6.8, Ind_Growth : 2.6 },
        { Period : 2012, Can_Growth : 13.5, Viet_Growth : 5.3, Mal_Growth : 5.6, Egy_Growth : 6.6, Ind_Growth : 2.3 }
    ];
    
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Million Metric Tons',
        minimum: 0,
        maximum: 20,
        interval: 4,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public circleMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Circle' , isFilled: true };
    public triangleMarker: Object = { visible: true, height: 6, width: 6 , shape: 'Triangle' , isFilled: true };
    public diamondMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Diamond' , isFilled: true };
    public rectangleMarker: Object = { visible: true, height: 5, width: 5 , shape: 'Rectangle' , isFilled: true };
    public pentagonMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Pentagon' , isFilled: true };

    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public title: string = 'Crude Steel Production Annual Growth';
    constructor() {
       //code
    };

}