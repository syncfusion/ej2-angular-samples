import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area-negative-points.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class AreaNegativePointsComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Width
    public width: string = Browser.isDevice ? '100%' : '75%';
    public margin = { left : Browser.isDevice ? 2 : 10, right : Browser.isDevice ? 2 : 10, top : Browser.isDevice ? 2 : 10, bottom : Browser.isDevice ? 2 : 10};
    public MaryValues: Object[] = [
        { Vegetable : "Onion",  Price : 3000 },
        { Vegetable : "Potato", Price : 4000 },
        { Vegetable : "Tomato", Price : -4000 },
        { Vegetable : "Corn", Price : -2000 },
        { Vegetable : "Carrot", Price : 5000 }
    ];
    public PatriciaValues : Object[] = [
        { Vegetable : "Onion",  Price : 2000 },
        { Vegetable : "Potato", Price : 3000 },
        { Vegetable : "Tomato", Price : 4000 },
        { Vegetable : "Corn", Price : 2000 },
        { Vegetable : "Carrot", Price : 3000 }
    ];
    public LindaValues : Object[] = [
        { Vegetable : "Onion",  Price : 2000 },
        { Vegetable : "Potato", Price : -1000 },
        { Vegetable : "Tomato", Price : -3000 },
        { Vegetable : "Corn", Price : 4000 },
        { Vegetable : "Carrot", Price : 1000 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
        axisLabelStyle:{fontStyle:'bold'}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        maximum: 8000,
        minimum: -4000,
        interval: 2000,
        labelFormat: '${value}',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
    };
    public circleMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Circle' , isFilled: true };
    public diamondMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Diamond' , isFilled: true };
    public rectangleMarker: Object = { visible: true, height: 5, width: 5 , shape: 'Rectangle' , isFilled: true };
    public border: Object = {
        width: 2,
    };
    public tooltip: Object = {
        enable: true,
    };
    public legendSettings: Object = {
        visible: true,
        enableHighlight : true
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Profit and Loss';
    constructor() {
        // code
    };
}