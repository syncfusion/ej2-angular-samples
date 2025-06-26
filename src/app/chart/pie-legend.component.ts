import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent, IPointRenderEventArgs,ChartAllModule, IAccAnimationCompleteEventArgs, AccPoints, IAccTextRenderEventArgs, IAccLoadedEventArgs, AccumulationTheme, Selection, ChartAnnotationSettingsModel, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';

/**
 * Sample for Doughnut chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-legend.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class DefaultDonutComponent {
    public data: Object[] = [
        { 'x': 'China', y: 35, text: '35%' },
        { 'x': 'India', y: 30, text: '30%' },
        { 'x': 'USA', y: 10.7, text: '10.7%' },
        { 'x': 'Indonesia', y: 7, text: '7%' },
        { 'x': 'Brazil', y: 5.3, text: '5.3%' },
        { 'x': 'Others', y: 12, text: '12%' },
    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: true,
        toggleVisibility: false,
        position: 'Bottom', textWrap: 'Wrap'
    };
    public innerRadius : string = '50%';
    public startAngle : number = 30
    public radius : string = Browser.isDevice ? '80%' : '85%'
    //Initializing Datalabel
    public dataLabel: Object = {
        visible: false
    };
    public border: Object = { width: 1, color: '#ffffff' };
    public annotations: ChartAnnotationSettingsModel[] = [
        {
            content : Browser.isDevice ? " " : "<div style='font-Weight:600;font-size:14px'>Internet Users <br> by Country<br>2025</div>", region:"Series",
            x:"50%", y:"50%"
        }
    ];
    private selectedTheme: string;
          // custom code start
    public load(args: IAccLoadedEventArgs): void {
        this.selectedTheme = loadAccumulationChartTheme(args);
    }
    public tooltip: Object = {
        enable: true,
        format: '<b>${point.x}</b><br>Percentage: <b>${point.y}%</b>',header:"",
        enableHighlight: true
    };
    constructor() {
        //code
    };

}


