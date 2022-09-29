import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for 100 percent Stacked bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-bar-percent.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PercentStackedBarChartComponent {

    public data: Object[] = [
        { Month : "Jan", AppleSales : 6, OrangeSales : 6, Wastage : 1 },
        { Month : "Feb", AppleSales : 8, OrangeSales : 8, Wastage : 1.5 },
        { Month : "Mar", AppleSales : 12, OrangeSales : 11, Wastage : 2 },
        { Month : "Apr", AppleSales : 15, OrangeSales : 16, Wastage : 2.5 },
        { Month : "May", AppleSales : 20, OrangeSales : 21, Wastage : 3 },
        { Month : "Jun", AppleSales : 24, OrangeSales : 25, Wastage : 3.5 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Sales (In Percentage)',
        lineStyle: { width: 0},
        majorTickLines: {width: 0},
        labelFormat: '{value}%',
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>'
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public border: Object = { color: '#ffffff', width:1 };
    public title: string = 'Sales Comparison';
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
    constructor() {
       //code
    };

}