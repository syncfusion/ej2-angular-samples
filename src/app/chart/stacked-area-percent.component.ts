import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for 100 percent Stacked Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-area-percent.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PercentStackedAreaChartComponent {

    public data: Object[] = [
        { x: new Date(2000, 0, 1), y: 0.61 },
        { x: new Date(2001, 0, 1), y: 0.81 }, { x: new Date(2002, 0, 1), y: 0.91 },
        { x: new Date(2003, 0, 1), y: 1.00 }, { x: new Date(2004, 0, 1), y: 1.19 },
        { x: new Date(2005, 0, 1), y: 1.47 }, { x: new Date(2006, 0, 1), y: 1.74 },
        { x: new Date(2007, 0, 1), y: 1.98 }, { x: new Date(2008, 0, 1), y: 1.99 },
        { x: new Date(2009, 0, 1), y: 1.70 }, { x: new Date(2010, 0, 1), y: 1.48 },
        { x: new Date(2011, 0, 1), y: 1.38 }, { x: new Date(2012, 0, 1), y: 1.66 },
        { x: new Date(2013, 0, 1), y: 1.66 }, { x: new Date(2014, 0, 1), y: 1.67 }
    ];
    public data1: Object[]  = [
        { x: new Date(2000, 0, 1), y: 0.03 },
        { x: new Date(2001, 0, 1), y: 0.05 }, { x: new Date(2002, 0, 1), y: 0.06 },
        { x: new Date(2003, 0, 1), y: 0.09 }, { x: new Date(2004, 0, 1), y: 0.14 },
        { x: new Date(2005, 0, 1), y: 0.20 }, { x: new Date(2006, 0, 1), y: 0.29 },
        { x: new Date(2007, 0, 1), y: 0.46 }, { x: new Date(2008, 0, 1), y: 0.64 },
        { x: new Date(2009, 0, 1), y: 0.75 }, { x: new Date(2010, 0, 1), y: 1.06 },
        { x: new Date(2011, 0, 1), y: 1.25 }, { x: new Date(2012, 0, 1), y: 1.55 },
        { x: new Date(2013, 0, 1), y: 1.55 }, { x: new Date(2014, 0, 1), y: 1.65 }
    ];
    public data2: Object[] = [
        { x: new Date(2000, 0, 1), y: 0.48 },
        { x: new Date(2001, 0, 1), y: 0.53 }, { x: new Date(2002, 0, 1), y: 0.57 },
        { x: new Date(2003, 0, 1), y: 0.61 }, { x: new Date(2004, 0, 1), y: 0.63 },
        { x: new Date(2005, 0, 1), y: 0.64 }, { x: new Date(2006, 0, 1), y: 0.66 },
        { x: new Date(2007, 0, 1), y: 0.76 }, { x: new Date(2008, 0, 1), y: 0.77 },
        { x: new Date(2009, 0, 1), y: 0.55 }, { x: new Date(2010, 0, 1), y: 0.54 },
        { x: new Date(2011, 0, 1), y: 0.57 }, { x: new Date(2012, 0, 1), y: 0.61 },
        { x: new Date(2013, 0, 1), y: 0.67 }, { x: new Date(2014, 0, 1), y: 0.67 }
    ];
    public data3: Object[] = [
        { x: new Date(2000, 0, 1), y: 0.23 },
        { x: new Date(2001, 0, 1), y: 0.17 }, { x: new Date(2002, 0, 1), y: 0.17 },
        { x: new Date(2003, 0, 1), y: 0.20 }, { x: new Date(2004, 0, 1), y: 0.23 },
        { x: new Date(2005, 0, 1), y: 0.36 }, { x: new Date(2006, 0, 1), y: 0.43 },
        { x: new Date(2007, 0, 1), y: 0.51 }, { x: new Date(2008, 0, 1), y: 0.72 },
        { x: new Date(2009, 0, 1), y: 1.29 }, { x: new Date(2010, 0, 1), y: 1.38 },
        { x: new Date(2011, 0, 1), y: 1.82 }, { x: new Date(2012, 0, 1), y: 2.16 },
        { x: new Date(2013, 0, 1), y: 2.51 }, { x: new Date(2014, 0, 1), y: 2.61 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        intervalType: 'Years',
        majorGridLines: { width: 0 },
        labelFormat: 'y',
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        minimum: new Date(1999, 0, 1), maximum: new Date(2015, 0, 1),labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        majorTickLines: { width: 0 }, rangePadding: 'None', interval: 20, lineStyle: {width : 0}
    };
    public border: Object = {
        width: 1,
        color: '#ffffff'
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        showNearestTooltip: true,
        enableHighlight: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
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

    public title: string = 'Sales by Payment Mode';
    constructor() {
        //code
    };

}