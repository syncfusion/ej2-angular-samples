import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule, ISeriesRenderEventArgs} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class LineChartComponent {

    public data: Object[] = [
        { Period : new Date(2012, 6, 11), Can_Growth : 13.5, Viet_Growth : 5.3, Mal_Growth : 5.6, Egy_Growth : 6.6, Ind_Growth : 2.3 },
        { Period : new Date(2013, 6, 11), Can_Growth : 12.4, Viet_Growth : 5.6, Mal_Growth : 4.7, Egy_Growth : 6.8, Ind_Growth : 2.6 },
        { Period : new Date(2014, 6, 11), Can_Growth : 12.7, Viet_Growth : 5.9, Mal_Growth : 4.3, Egy_Growth : 6.5, Ind_Growth : 4.4 },
        { Period : new Date(2015, 6, 11), Can_Growth : 12.5, Viet_Growth : 5.7, Mal_Growth : 3.8, Egy_Growth : 5.5, Ind_Growth : 4.9 },
        { Period : new Date(2016, 6, 11), Can_Growth : 12.7, Viet_Growth : 7.8, Mal_Growth : 2.8, Egy_Growth : 5.0, Ind_Growth : 4.8 },
        { Period : new Date(2017, 6, 11), Can_Growth : 13.7, Viet_Growth : 10.3, Mal_Growth : 2.8, Egy_Growth : 6.8, Ind_Growth : 5.3 },
        { Period : new Date(2018, 6, 11), Can_Growth : 13.4, Viet_Growth : 15.5, Mal_Growth : 4.1, Egy_Growth : 7.8, Ind_Growth : 6.2  },
        { Period : new Date(2019, 6, 11), Can_Growth : 12.9, Viet_Growth : 17.5, Mal_Growth : 6.8, Egy_Growth : 7.3, Ind_Growth : 7.8 },
        { Period : new Date(2020, 6, 11), Can_Growth : 11.0, Viet_Growth : 19.5, Mal_Growth : 7.1, Egy_Growth : 8.2, Ind_Growth : 9.3 },
    ];
    
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        labelFormat: 'y'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Million Metric Tons',
        minimum: 0,
        maximum: 20,
        interval: 4,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
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
        enableHighlight: true
    }
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };

    // custom code end
    public title: string = 'Crude Steel Production Annual Growth';
    constructor() {
       //code
    };

}