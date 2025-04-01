import { Component, ViewEncapsulation } from '@angular/core';
import { IPointRenderEventArgs, ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, bubblePointRender } from './theme-color';
/**
 * Sample for Bubble Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bubble.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})

export class BubbleChartComponent {

    public data: Object[] = [
        { Literacy : 92.2, GDPGrowth : 7.8, BubbleSize : 1.347, TooltipMappingName : "China", Text : "China" },
        { Literacy : 74, GDPGrowth : 6.5, BubbleSize : 1.241, TooltipMappingName : "India", Text : "India" },
        { Literacy : 90.4, GDPGrowth : 6.0, BubbleSize : 0.238, TooltipMappingName : Browser.isDevice ? 'ID' : "Indonesia", Text :   "Indonesia" },
        { Literacy : 99.4, GDPGrowth : 2.2, BubbleSize : 0.312, TooltipMappingName : "US", Text : "United States" },
        { Literacy : 88.6, GDPGrowth : 1.3, BubbleSize : 0.197, TooltipMappingName : Browser.isDevice ? 'BR' : "Brazil", Text :  "Brazil" },
        { Literacy : 99, GDPGrowth : 0.7, BubbleSize : 0.0818, TooltipMappingName : Browser.isDevice ? 'DE' :"Germany", Text :   "Germany" },
        { Literacy : 72, GDPGrowth : 2.0, BubbleSize : 0.0826, TooltipMappingName :  Browser.isDevice ? 'EG' :"Egypt", Text :  "Egypt" },
        { Literacy : 99.6, GDPGrowth : 3.4, BubbleSize : 0.143, TooltipMappingName : Browser.isDevice ? 'RUS' :"Russia", Text :   "Russia" },
        { Literacy : 96.5, GDPGrowth : 0.2, BubbleSize : 0.128, TooltipMappingName : Browser.isDevice ? 'JP' : "Japan", Text :   "Japan" },
        { Literacy : 86.1, GDPGrowth : 4.0, BubbleSize : 0.115, TooltipMappingName : "MLI", Text : "MeLiteracy Ion" },
        { Literacy : 92.6, GDPGrowth : 5.2, BubbleSize : 0.096, TooltipMappingName : "PH", Text : "Philipines" },
        { Literacy : 82.2, GDPGrowth : 3.97, BubbleSize : 0.7, TooltipMappingName : Browser.isDevice ? 'HK' : "Hong Kong", Text :   "Hong Kong" },
        { Literacy : 79.2, GDPGrowth : 4.9, BubbleSize : 0.162, TooltipMappingName : "NL", Text : "NetherLand" },
        { Literacy : 72.5, GDPGrowth : 4.5, BubbleSize : 0.7, TooltipMappingName : "Jordan", Text : "Jordan" },
        { Literacy : 81, GDPGrowth : 2.5, BubbleSize : 0.21, TooltipMappingName : Browser.isDevice ? 'AU' : "Australia", Text :  "Australia" },
        { Literacy : 66.8, GDPGrowth : 3.9, BubbleSize : 0.028, TooltipMappingName : "MN", Text : "Mongolia" },
        { Literacy : 78.4, GDPGrowth : 2.9, BubbleSize : 0.231, TooltipMappingName : Browser.isDevice ? 'TW' :"Taiwan", Text :   "Taiwan" }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        crossesAt: 5,
        minimum: 65,
        maximum: 102,
        interval: 5
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        crossesAt: 85,
        minimum: 0,
        maximum: 10,
        interval: 2.5
    };

    public marker: Object = {
        dataLabel: { name: 'TooltipMappingName' , visible: true , position: 'Middle' , font: { fontWeight: '500', color: '#ffffff' }}
    };
    //Initializing Tooltip
    public tooltip: Object = {
        header: '<b>${point.tooltip}</b>',
        enableMarker: false,
        enable: true,
        format: "Literacy Rate : <b>${point.x}%</b> <br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>"
    };
    public border: Object = {
        width: 2,
    };
    public legend: Object = {
        visible: false
    };
    public minRadius: number = 3;
    public maxRadius: number = 8;
    public pointRender(args: IPointRenderEventArgs): void {
        this.SetTheme(args);
     };
     public SetTheme(args: IPointRenderEventArgs): void {
        bubblePointRender(args);
      };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
    public width: string = Browser.isDevice ? '100%' : '75%';
    public title: string = 'World Countries Details' ;
    constructor() {
        // code
    };
}