import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent, AccumulationChart, IAccLoadedEventArgs, AccumulationTheme, AccumulationChartAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';
/**
 * Sample for Pie chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default-pie.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, AccumulationChartAllModule, ChartAllModule,SBDescriptionComponent]
})
export class DefaultPieComponent {
    public data: Object[] = [
        { Browser: "Coal", Users: 34.4, DataLabelMappingName: "Coal: 34.4%" },
        { Browser: "Natural Gas", Users: 22.1, DataLabelMappingName: "Natural Gas: 22.1%" },
        { Browser: "Hydro", Users: 14.4, DataLabelMappingName: "Hydro: 14.4%" },
        { Browser: "Nuclear", Users: 9.0, DataLabelMappingName: "Nuclear: 9.0%" },
        { Browser: "Wind", Users: 8.1, DataLabelMappingName: "Wind: 8.1%" },
        { Browser: "Others", Users: 12.0, DataLabelMappingName: "Others: 12.0%" }

    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    //Initializing Datalabel
    public dataLabel: Object = {
        visible: true,
        position: 'Outside', name: 'DataLabelMappingName',
        font: {
            size: Browser.isDevice ? '8px' : '12px',
            fontWeight: '600'
        },
        connectorStyle: { length: Browser.isDevice ? '10px' : '20px', type: 'Curve'},
        
    };
    public border: Object = { width: 1, color: 'white' };
    
      // custom code start
    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    };
      // custom code end
    public startAngle: number = Browser.isDevice ? 70 : 30;
    public radius: string = Browser.isDevice ? '40%' : '60%'
    public explode: boolean = true;
    public enableAnimation: boolean = true;
    public tooltip: Object = { 
        enable: true,
        enableHighlight: true,
        format: '<b>${point.x}</b><br>Percentage: <b>${point.y}%</b>',
        header:'',

    };
    
    public title: string = 'Global Electricity Generation by Source - 2024';
    public subTitle: string = 'Source: wikipedia.org';
    constructor() {
        //code
    };

}