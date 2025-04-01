import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ITextRenderEventArgs, IAxisLabelRenderEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Waterfall Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'waterfall.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class WaterfallChartComponent {

    public dataSource: Object[] = [
        { x: 'Income', y: 971  }, { x: 'Sales', y: -101 },
        { x: 'Development', y: -268 },
        { x: 'Revenue', y: 403  }, { x: 'Balance' },
        { x: 'Expense', y: -136 }, { x: 'Tax', y:  -365 },
        { x: 'Net Profit' }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        labelRotation: Browser.isDevice ? -90 : 0,
        interval: 1,
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 1250, interval: 250,
        majorGridLines: { width: 1 },
        title: 'USD',
        minorTickLines: {width: 0},
        lineStyle: {width: 0},
        labelFormat: "{value}K"
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    public title: string = 'Company Revenue and Profit';
    public tooltip: Object = {
        enable: true,
        format: '<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>', header: " " 
    };
    public legendSettings: Object = {
        visible: false
    };
    public marker: Object = {
        dataLabel: { visible: true, font: { color: '#ffffff' } }
    };
    public border: object = {
        color:'black' , width: 0.2
    }
    public connector: Object = {
        width: 0.8, color: '#5F6A6A', dashArray: '1,2'
    };
    public cornerRadius: Object = {
        topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3
      }
    public sum: number[] = [7];
    public intermediate: number[] = [4];
    public onTextRender(args: ITextRenderEventArgs): void {
        args.series.marker.dataLabel.font.size = Browser.isDevice ? '8px' : '12px';
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
  
    constructor() {
        //code
    };

}