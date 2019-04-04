import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area-empty.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class EmptyAreaChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Width
    public width: string = Browser.isDevice ? '100%' : '60%';
    public data: Object[] = [
        { x: '2002', y: 2 }, { x: '2003', y: 1.7 }, { x: '2004', y: 1.8 }, { x: '2005', y: 2.1 },
        { x: '2006', y: 2.3 }, { x: '2007', y: 1.7 }, { x: '2008', y: 1.5 }, { x: '2009', y: 1.8 },
        { x: '2010', y: 2 }, { x: 2011, y: 3.1 }
    ];
    public data1: Object[] = [
        { x: '2002', y: 2.2 }, { x: '2003', y: 3.4 }, { x: '2004', y: 2.8 }, { x: '2005', y: null },
        { x: '2006', y: null }, { x: '2007', y: 2.5 }, { x: '2008', y: 2.9 }, { x: '2009', y: 3.8 },
        { x: '2010', y: 1.4 }, { x: 2011, y: 3.1 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 2,
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Rates',
        majorGridLines: { width: 0 },
        labelFormat: '{value}M',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: false
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Inflation Rate';
    constructor() {
        // code
    };
}