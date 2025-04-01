import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, IPointRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Chart, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Error bar 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'error-bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class ErrorBarChartComponent {

    public data: Object[] = [
        { x: 'Printer', y: 750, error: 50}, { x: 'Desktop', y: 500, error: 70  }, { x: 'Charger', y: 550, error: 60  },
        { x: 'Mobile', y: 575, error: 80  }, { x: 'Keyboard', y: 400, error: 20  },
        { x: 'Power Bank', y: 450, error: 90  }, { x: 'Laptop', y: 650, error: 40 }, { x: 'Battery', y: 525, error: 84  },
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: {width : 0},
        minorTickLines: {width: 0},  labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice ? 'None': 'Rotate45',
    };
  
       // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: ChartTheme | string = loadChartTheme(args);
        if (selectedTheme === 'Bootstrap5' || selectedTheme === 'Fluent') {
            args.chart.highlightColor = '#c7e9b6';
        }
    };
       // custom code end
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 1250, interval: 250,
        lineStyle: { width: 0 }, title: 'Quantity'
    };
    public legend: Object = {
        visible: false
    };
    public chartArea: Object = { border: { width: 0 } }; 
    public title: string = 'Quantity vs Items';
    public errorBar: Object = { visible: true, verticalError: 'error' };
    public marker: Object = { height: 10, width: 10 };
    public tooltip: Object = { enable: true , header: '', enableMarker: false};
    @ViewChild('chart')
    public chart: ChartComponent;
    public width: string = Browser.isDevice ? '100%' : '75%';
    public pointRender(args: IPointRenderEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        if (selectedTheme === 'bootstrap5' || selectedTheme === 'fluent') {
            args.fill = '#81ccbb';
        }
     };
    public tooltipRender(args): void {
        args.text =  '<b>'+args.data.pointX + ' Count' + ': ' + args.data.pointY + '</b> (error range: ' + (args.data.pointY - args.series.visiblePoints[args.data.pointIndex].verticalError / 2 ) + '-' + (args.data.pointY + args.series.visiblePoints[args.data.pointIndex].verticalError / 2 ) + ')';
    };
    ngOnInit(): void {
    }
    constructor() {
        // code
    };
}