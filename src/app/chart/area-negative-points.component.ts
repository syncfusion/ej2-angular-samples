import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area-negative-points.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
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
        { Vegetable : new Date(2017, 0, 1),  Price : 3000 },
        { Vegetable : new Date(2018, 0, 1), Price : 4000 },
        { Vegetable : new Date(2019, 0, 1), Price : -4000 },
        { Vegetable : new Date(2020, 0, 1), Price : -2000 },
        { Vegetable : new Date(2021, 0, 1), Price : 5000 }
    ];
    public PatriciaValues : Object[] = [
        { Vegetable : new Date(2017, 0, 1),  Price : 2000 },
        { Vegetable : new Date(2018, 0, 1), Price : 3000 },
        { Vegetable : new Date(2019, 0, 1), Price : 4000 },
        { Vegetable : new Date(2020, 0, 1), Price : 2000 },
        { Vegetable : new Date(2021, 0, 1), Price : 3000 }
    ];
    public LindaValues : Object[] = [
        { Vegetable : new Date(2017, 0, 1),  Price : 2000 },
        { Vegetable : new Date(2018, 0, 1), Price : -1000 },
        { Vegetable : new Date(2019, 0, 1), Price : -3000 },
        { Vegetable : new Date(2020, 0, 1), Price : 4000 },
        { Vegetable : new Date(2021, 0, 1), Price : 1000 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
        minimum:new Date(2017, 0, 1), maximum: new Date(2021, 0, 1), intervalType: 'Years', labelFormat: 'y',
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
        showNearestTooltip: true,
        enableHighlight: true
    };
    public legendSettings: Object = {
        visible: true,
        enableHighlight : true
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Profit and Loss';
    constructor() {
        // code
    };
}