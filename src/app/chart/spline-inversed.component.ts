import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline-inversed.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class InversedSplineChartComponent {
    public data: Object[] = [
        { country: 'United States', y: 194.55 },
        { country: 'Japan', y: 146.2 },
        { country: 'China', y: 65.1 },
        { country: 'France', y: 84.9 },
        { country: 'India', y: 140.1 },
        { country: 'Canada', y: 160.7 },
        { country: 'Brazil', y: 68.4 },
        { country: 'United Kingdom', y: 100.2 },
        { country: 'Sweden', y: 162 },
        { country: 'Netherlands', y: 132.3 },
        { country: 'Bangladesh', y: 27.7 }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        minorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        labelPlacement: 'OnTicks'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%',
        title: 'Capitalization Ratio (% of GDP)',
        interval: 40,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        labelRotation: Browser.isDevice ? -45 : 0
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public marker: Object = {
        visible: true,
        height: 7,
        width: 7,
        isFilled: true
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        showNearestTooltip: true,
        header: '<b>Stock Market Cap</b>',
        format: '${point.x}: <b>${point.y}</b>',
        enableHighlight: true
    };
    // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public legendSettings: Object = { visible: false };
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Stock Market Capitalization as a Percentage of GDP by Country';
    public subTitle: string = 'Source: wikipedia.org';
    constructor() {
        //code
    };

}