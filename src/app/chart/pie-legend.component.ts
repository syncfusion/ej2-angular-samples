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
        { 'x': 'Chrome', y: 57.28, text: '57.28%' },
        { 'x': 'UC Browser', y: 4.37, text: '4.37%' },
        { 'x': 'Internet Explorer', y: 6.12, text: '6.12%' },
        { 'x': 'QQ', y: 5.96, text: '5.96%' },
        { 'x': 'Edge', y: 7.48, text: '7.48%' },
        { 'x': 'Others', y: 14.06, text: '18.76%' },
    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: true,
        toggleVisibility: false,
        position: 'Bottom',
        maximumColumns: Browser.isDevice ? 2 : 3,
        fixedWidth: true
    };
    public title: string = Browser.isDevice ? "Browser Market Share" : '';
    public innerRadius : string = '50%';
    public startAngle : number = 30
    public radius : string = Browser.isDevice ? '80%' : '85%'
    //Initializing Datalabel
    public dataLabel: Object = {
        name: 'text',
        visible: true,
        font: {
            fontWeight: '600',
            color: '#ffffff'
        }
    };
    public annotations: ChartAnnotationSettingsModel[] = [
        {
            content : Browser.isDevice ? " " : "<div style='font-Weight:600;font-size:14px'>Browser<br>Market<br>Share</div>", region:"Series",
            x:"51%", y:"50%"
        }
    ];
    private selectedTheme: string;
    public pointRender(args: IPointRenderEventArgs): void {
        let fluent2Colors: string[] = ['#6200EE', '#09AF74', '#0076E5', '#CB3587', '#E7910F', '#66CD15', '#F3A93C', '#107C10',
            '#C19C00'];
        if (this.selectedTheme === 'fluent2') {
            args.fill = fluent2Colors[args.point.index % 10];
        }
    };

          // custom code start
    public load(args: IAccLoadedEventArgs): void {
        this.selectedTheme = loadAccumulationChartTheme(args);
    }
    public tooltip: Object = {
        enable: true,
        format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:"",
        enableHighlight: true
    };
    constructor() {
        //code
    };

}


