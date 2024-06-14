import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent,ChartAllModule, IAccAnimationCompleteEventArgs, AccPoints, IAccTextRenderEventArgs, IAccLoadedEventArgs, AccumulationTheme, Selection, ChartAnnotationSettingsModel, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

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
        { 'x': 'Internet Explorer', y: 6.12, text: '6.12%' }, { 'x': 'Chrome', y: 57.28, text: '57.28%' },
        { 'x': 'Safari', y: 4.73, text: '4.73%' },
        { 'x': 'QQ', y: 5.96, text: '5.96%' },
        { 'x': 'UC Browser', y: 4.37, text: '4.37%' },
        { 'x': 'Edge', y: 7.48, text: '7.48%' },
        { 'x': 'Others', y: 14.06, text: '14.06%' },
    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: true,
        toggleVisibility: false,
        position: Browser.isDevice ? 'Bottom' : 'Right',
        height: Browser.isDevice ? '20%' : '30%', width: Browser.isDevice ? '80%' :'20%',
        textWrap:'Wrap',
        maximumLabelWidth: 66,
    };
    public title: string = Browser.isDevice ? "Browser Market Share" : '';
    public innerRadius : string = '43%'
    public startAngle : number = 30
    public radius : string = '80%'
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

          // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    public tooltip: Object = {
        enable: true,
        format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:""
    };
    constructor() {
        //code
    };

}


