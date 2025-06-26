import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent,ChartAllModule, IAccLoadedEventArgs, AccumulationTheme, AccumulationChartAllModule, IAccPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme, roundedCornnerPointRender } from './theme-color';

/**
 * Sample for Pie with Various Radius
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rounded-corner.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class CornerRadiusComponent {
    public data: Object[] = [
      { x: 'Android', y: 45.49, text: 'Android: 45.49%' },
      { x: 'Windows', y: 25.35, text: 'Windows: 25.35%' },
      { x: 'iOS', y: 18.26, text: 'iOS: 18.26%' },
      { x: 'macOS', y: 5.06, text: 'macOS: 5.06%' },
      { x: 'Linux', y: 1.48, text: 'Linux: 1.48%' },
      { x: 'Others', y: 4.36, text: 'Others: 4.36%' }
    ];
    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    //Initializing Legend
    public legendSettings: Object = {
        visible: false
    };
    public radius: string = Browser.isDevice ? '25%' : '70%';
    //Initializing Datalabel
    public dataLabel: Object = {
      visible: true,
      position: 'Outside',
      name: 'text',
      font: { size: '12px', fontWeight: '600' },
      connectorStyle: { length: '20px', type: 'Curve' }
    };
    //Border
    public border: Object = {
      width : 0.5, color: '#ffffff'
    }
      // custom code start
    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    }
    // custom code end
    public enableAnimation: boolean = true;
    public tooltip: Object = {
        enable: true, header: '', format: '<b>${point.x}</b><br>Operating System Usage: <b>${point.y}%</b>', enableHighlight: true 
    };

    public pointRender(args: IAccPointRenderEventArgs): void {
      roundedCornnerPointRender(args);

    };
    public title: string = 'Global Operating System Usage Share - 2024';
    public subTitle: string = 'Source: wikipedia.org';
    constructor() {
        //code
    };

}


