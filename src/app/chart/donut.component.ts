import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent, ChartAllModule,AccumulationChart, AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme, IPointRenderEventArgs, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { donutPointRender, loadAccumulationChartTheme } from './theme-color';
/**
 * Sample for doughnut 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'donut.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class DonutComponent {
    public data: Object[] = [
        { x: 'Chrome', y: 61.3, DataLabelMappingName: Browser.isDevice ? 'Chrome: <br> 61.3%' : 'Chrome: 61.3%' },
        { x: 'Safari', y: 24.6, DataLabelMappingName: Browser.isDevice ? 'Safari: <br> 24.6%' : 'Safari: 24.6%' },
        { x: 'Edge', y: 5.0, DataLabelMappingName: 'Edge: 5.0%' },
        { x: 'Samsung Internet', y: 2.7, DataLabelMappingName: Browser.isDevice ? 'Samsung Internet: <br> 2.7%' : 'Samsung Internet: 2.7%' },
        { x: 'Firefox', y: 2.6, DataLabelMappingName: Browser.isDevice ? 'Firefox: <br> 2.6%' : 'Firefox: 2.6%' },
        { x: 'Others', y: 3.6, DataLabelMappingName: Browser.isDevice ? 'Others: <br> 3.6%' :'Others: 3.6%' }
    ];
    public pointRender(args: IPointRenderEventArgs): void {
        donutPointRender(args);
     };
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    //Initializing DataLabel
    public dataLabel: Object = {
        visible: true,
        name: 'DataLabelMappingName',
        position: 'Outside',
        font: {
            fontWeight: '600',
        },
        connectorStyle: { 
            length: '20px',
            type: 'Curve'
         },
    };
    public centerLabel: Object = {
        text: 'Mobile<br>Browsers<br>Statistics',
        hoverTextFormat: '${point.x}<br>Browser Share<br>${point.y}%',
        textStyle: {
            fontWeight: '600',
            size: Browser.isDevice ? '7px' : '15px'
        },
    };
    public border: object = {
        width: 1
    };
     // custom code start
    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    };
     // custom code end
    public radius: string = Browser.isDevice ? '40%' : '70%'
    public startAngle: number =  Browser.isDevice ? 30 : 62;
    constructor() {
        //code
    };

}