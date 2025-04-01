import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Inversed Range Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'range-bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RangeBarChartComponent {

    public rangeBarData: Object[] = [
        { country: 'Solomon Islands', low: 44, high: 134 },
        { country: 'Tonga', low: 52, high: 131 },
        { country: 'Trinidad and Tobago', low: 36, high: 151 },
        { country: 'Samoa', low: 49, high: 131 },
        { country: 'Saint Lucia', low: 39, high: 148 },
        { country: 'Georgia', low: 68, high: 122 },
        { country: 'Peru', low: 56, high: 141 },
        { country: 'Grenada', low: 41, high: 147 },
        { country: 'Dominica', low: 46, high: 143 },
        { country: 'Ukraine', low: 64, high: 148 },
        { country: 'Colombia', low: 64, high: 134 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}',
        minimum: 0,
        maximum: 200,
        interval: 20,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        title: 'Growth in Visa-Free Destinations',
        labelRotation: Browser.isDevice ? -45 : 0
    };
    public title: string = 'Global Passport Rankings: Growth in Visa-Free Access (2006–2024)';
    public subTitle: string = 'Source: wikipedia.org';
    public tooltip: Object = {
        enable: true,
        format: '${point.x}: <b>${point.low} - ${point.high}</b>'
    };
    public marker: Object = {
        dataLabel: { visible: true, position: 'Outer' }
    };
    public cornerRadius: Object = { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public legendSettings: Object = { visible: false };

    constructor() {
        //code
    };

}