import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area-segments.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class AreaSegmentChartComponent {
    public dataValues: Object[] = [];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime', labelFormat: 'MMM', intervalType: 'Months',   majorGridLines: { width: 0 },
        interval: 1,  majorTickLines: {width : 0},
        minorTickLines: {width: 0},
        labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice? 'None' : 'Rotate45'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '${value}K',
        rangePadding: 'None',
        minimum: 0,
        maximum: 200,
        interval: 50,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    
    public winterX: Date = new Date(2016, 2, 1);
    public winterY: Number = 115;
    public summerX: Date = new Date(2016, 5, 1);
    public summerY: Number = 115;
    public springX: Date = new Date(2016, 10, 1);
    public springY: Number = 165;

    public legend: Object = { visible: false };
    public segments: Object[] = [{
        value: new Date(2016, 4, 1),
        color: 'url(#winter)'
    }, {
        value: new Date(2016, 8, 1),
        color: 'url(#summer)'
    }, {
        color: 'url(#spring)'
    }];
    public tooltip: Object = {
        enable: true,
        header: '<b>Revenue</b>',
        format: '${point.x} : <b>${point.y}</b>',
        showNearestTooltip: true
    };
       // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        [150, 71.5, 106.4, 100.25, 70.0, 106.0, 85.6, 78.5, 76.4, 86.1, 155.6, 160.4].map((value: number, index: number) => {
            this.dataValues.push({ XValue: new Date(2016, index, 1), YValue: value });
        });
    };
       // custom code end
    public title: string = 'US Season Retail Sales Growth';
    constructor() {
        //code
    };

}