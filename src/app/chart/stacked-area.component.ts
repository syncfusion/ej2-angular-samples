import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Stacked Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class StackedAreaChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    public data: Object[] = [
        { Period : new Date(2000, 1, 1), OrganicSales : 0.61, FairTradeSales : 0.03, VegAlternativesSales : 0.48, OtherSales : 0.23 },
        { Period : new Date(2002, 1, 1), OrganicSales : 0.91, FairTradeSales : 0.06, VegAlternativesSales : 0.57, OtherSales : 0.17 },
        { Period : new Date(2004, 1, 1), OrganicSales : 1.19, FairTradeSales : 0.14, VegAlternativesSales : 0.63, OtherSales : 0.23 },        
        { Period : new Date(2006, 1, 1), OrganicSales : 1.74, FairTradeSales : 0.29, VegAlternativesSales : 0.66, OtherSales : 0.43 },        
        { Period : new Date(2008, 1, 1), OrganicSales : 1.99, FairTradeSales : 0.64, VegAlternativesSales : 0.77, OtherSales : 0.72 },        
        { Period : new Date(2010, 1, 1), OrganicSales : 1.48, FairTradeSales : 1.06, VegAlternativesSales : 0.54, OtherSales : 1.38 },        
        { Period : new Date(2012, 1, 1), OrganicSales : 1.66, FairTradeSales : 1.55, VegAlternativesSales : 0.61, OtherSales : 2.16 },        
        { Period : new Date(2014, 1, 1), OrganicSales : 1.67, FairTradeSales : 1.65, VegAlternativesSales : 0.67, OtherSales : 2.61 }
    ];
   
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        intervalType: 'Years',
        majorGridLines: { width: 0 },
        labelFormat: 'y',
        edgeLabelPlacement: 'Shift', labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Amount of sales in €',
        minimum: 0,
        maximum: 7,
        interval: 1,
        labelFormat: '{value}K',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        showNearestTooltip: true,
        enableHighlight: true
    };
    public border: Object = {
        width: 1,
        color: '#666666'
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
    public title: string = 'Amount of Sales by Payment Mode';
    constructor() {
        //code
    };

}