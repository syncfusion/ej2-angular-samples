import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IAxisLabelRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Stacked Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class StackedColumnChartComponent {

    public data: Object[] = [
        { Year : "2013", General : 9628912, Honda : 4298390, Suzuki : 2842133, BMW : 2006366 },
        { Year : "2014", General : 9609326, Honda : 4513769, Suzuki : 3016710, BMW : 2165566 },
        { Year : "2015", General : 7485587, Honda : 4543838, Suzuki : 3034081, BMW : 2279503 },
        { Year : "2016", General : 7793066, Honda : 4999266, Suzuki : 2945295, BMW : 2359756 },
        { Year : "2017", General : 6856880, Honda : 5235842, Suzuki : 3302336, BMW : 2505741 },
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Vehicles Production (In Millions)',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
    };
    public tooltip: Object = {
        enable: true
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    OnChartAxisLabeRender(args: IAxisLabelRenderEventArgs){
        if(args.value > 999999 || args.value < -999999) {
            args.text = args.text.replace("0000000","0M").replace("000000", "M");
        }
      };
     // custom code end
    public title: string = 'Motor Vehicle Production by Manufacturer';
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
    public border: Object = { color: '#ffffff', width:1 };
    public width: string = Browser.isDevice ? '100%' : '75%';

    constructor() {
        //code
    };

}