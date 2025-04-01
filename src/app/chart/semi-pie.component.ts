import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { AccumulationChartComponent, IAccLoadedEventArgs,ChartAllModule, AccumulationTheme, ChartAnnotationSettingsModel, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';
/**
 * Sample for Semi Pie Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'semi-pie.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class SemiPieComponent {
    public annotations: ChartAnnotationSettingsModel[] = [
        {
            content: Browser.isDevice ? "<div style='font-Weight:700; font-size:11px;'>Browser<br>Market<br>Shares</div>" : "<div style='font-Weight:600; font-size:14px;'>Browser<br>Market<br>Shares</div>",region:'Series',  x: Browser.isDevice ? "52%" : "51%", y: Browser.isDevice ? "85%" : "85%"
        },

    ];
    public data: Object[] = [
        { Browser :  "Chrome", Users : 100, text : "Chrome (100M)<br>40%", tooltipMappingName: '40%' },
        { Browser :  "UC Browser", Users : 40, text : "UC Browser (40M)<br>16%", tooltipMappingName: '16%' },
        { Browser :  "Opera", Users : 30, text : "Opera (30M)<br>12%", tooltipMappingName: '12%'  },
        { Browser :  "Safari", Users : 30, text : "Safari (30M)<br>12%", tooltipMappingName: '12%' },
        { Browser :  "Firefox", Users : 25, text : "Firefox (25M)<br>10%", tooltipMappingName: '10%' },
        { Browser :  "Others", Users : 25, text : "Others (25M)<br>10%", tooltipMappingName: '10%' },
    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    //Initializing DataLabel
    public dataLabel: Object = {
        visible: true, position: 'Inside',
        enableRotation:true,
        connectorStyle: { length: '20px', type: 'Curve' }, name: 'text',
        font: { fontWeight: '600',size: Browser.isDevice ? '8px' : '11px', color: '#ffffff' }, 

    };
     // custom code start
    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    }
     // custom code end
    public  radius : string =  Browser.isDevice ? '85%' : '100%';
    public enableAnimation: boolean = false;
    public startAngle: number = 270;
    public endAngle: number = 90;
    public tooltip: Object = { enable: true, format: "<b>${point.x}</b><br>Browser Share: <b>${point.tooltip}</b>", header:'', enableHighlight: true };
    constructor() {
        //code
    };

}