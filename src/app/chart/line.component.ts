import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

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
        { Period : 2016, Can_Growth : 4.8 , Viet_Growth : 7.8 , Mal_Growth : 14.6, Egy_Growth : 8.9, Ind_Growth : 19.0 },
        { Period : 2017, Can_Growth : 5.2 , Viet_Growth : 10.3, Mal_Growth : 15.5, Egy_Growth : 10.3, Ind_Growth : 20.0 },
        { Period : 2018, Can_Growth : 6.2 , Viet_Growth : 15.5, Mal_Growth : 15.4, Egy_Growth : 10.8, Ind_Growth : 20.2 },
        { Period : 2019, Can_Growth : 7.8 , Viet_Growth : 17.5, Mal_Growth : 14.4, Egy_Growth : 9.0, Ind_Growth : 18.4 },
        { Period : 2020, Can_Growth : 9.3 , Viet_Growth : 19.5, Mal_Growth : 11.6, Egy_Growth : 7.9, Ind_Growth : 16.8 },
        { Period : 2021, Can_Growth : 14.3, Viet_Growth : 23.0, Mal_Growth : 13.9, Egy_Growth : 8.5, Ind_Growth : 18.5 },
        { Period : 2022, Can_Growth : 15.6, Viet_Growth : 20.0, Mal_Growth : 12.1, Egy_Growth : 7.4, Ind_Growth : 18.4  },
        { Period : 2023, Can_Growth : 16.0, Viet_Growth : 19.0, Mal_Growth : 10.0, Egy_Growth : 6.4, Ind_Growth : 16.3 },
        { Period : 2024, Can_Growth : 17.0, Viet_Growth : 22.1, Mal_Growth : 10.8, Egy_Growth : 7.1, Ind_Growth : 13.7 },
    ];
    
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Double',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Volume in million metric tons', 
        labelFormat: '{value}', 
        rangePadding: 'None', 
        minimum: 0, 
        maximum: 25, 
        interval: 5, 
        lineStyle: { width: 0 }, 
        majorTickLines: { width: 0 }, 
        minorTickLines: { width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public circleMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Circle' , isFilled: true };
    public triangleMarker: Object = { visible: true, height: 6, width: 6 , shape: 'Triangle' , isFilled: true };
    public diamondMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Diamond' , isFilled: true };
    public rectangleMarker: Object = { visible: true, height: 5, width: 5 , shape: 'Rectangle' , isFilled: true };
    public pentagonMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Pentagon' , isFilled: true };

    public tooltip: Object = {
        enable: true,
        enableHighlight: true, 
        showNearestTooltip: true,
        header: '<b>${series.name}</b>', format: '${point.x} : <b>${point.y}M</b>'
    };
    public legend: Object = {
        visible: true,
        enableHighlight: true
    }
    // custom code start
    public load(args: ILoadedEventArgs): void {
       loadChartTheme(args);
    };

    // custom code end
    public title: string = 'Annual Crude Steel Production by Country (2016–2024)';
    public subTitle: string = 'Source: wikipedia.org';
    constructor() {
       //code
    };

}