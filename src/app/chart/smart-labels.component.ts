import { Component, ViewEncapsulation } from '@angular/core';
import { IAccLoadedEventArgs, AccumulationTheme, AccumulationChartAllModule ,ChartAllModule} from '@syncfusion/ej2-angular-charts';
import { AccumulationDataLabelSettingsModel, LegendSettingsModel, TooltipSettingsModel } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';
/**
 * Sample for Smart Labels in Pie chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'smart-labels.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class SmartLabelsComponent {
    public data: Object[] = [
        { 'x': 'USA', y: 46, text: Browser.isDevice ? 'USA: 46' : 'United States of America: 46' },
        { 'x': 'China', y: 26, text: 'China: 26' },
        { 'x': 'Russia', y: 19, text: 'Russia: 19' },
        { 'x': 'Germany', y: 17, text: 'Germany: 17' },
        { 'x': 'Kazakhstan', y: 3, text: Browser.isDevice ? 'KZ: 3' : 'Kazakhstan: 3' },
        { 'x': 'New Zealand', y: 4, text: Browser.isDevice ? 'NZ: 4' : 'New Zealand: 4' },
        { 'x': 'South Korea', y: 9, text: Browser.isDevice ? 'KR: 9' : 'South Korea: 9' },
        { 'x': 'Great Britain', y: 27, text: Browser.isDevice ? 'GB: 27' : 'Great Britain: 27' },
        { 'x': 'Switzerland', y: 3, text: Browser.isDevice ? 'CH: 3' : 'Switzerland: 3' },
        { 'x': 'Australia', y: 8, text: Browser.isDevice ? 'ASTL: 8' : 'Australia: 8' },
        { 'x': 'Netherlands', y: 8, text: Browser.isDevice ? 'NL: 8' : 'Netherlands: 8' },
        { 'x': 'Colombia', y: 3, text: 'Colombia: 3' },
        { 'x': 'Uzbekistan', y: 4, text: Browser.isDevice ? 'Uzbekistan: <br> 4' : 'Uzbekistan: 4' },
        { 'x': 'Japan', y: 12, text: 'Japan: 12' },
        { 'x': 'France', y: 10, text: 'France: 10' },
        { 'x': 'Italy', y: 8, text: 'Italy: 8' },
        { 'x': 'Argentina', y: 3, text: Browser.isDevice ? 'AR: 3' : 'Argentina: 3' },
        { 'x': 'South Africa', y: 2, text: Browser.isDevice ? 'SA: 2' : 'South Africa: 2' },
        { 'x': 'North Korea', y: 2, text: Browser.isDevice ? 'KP: 2' : 'North Korea: 2' }
    ];
    //Initializing Legend
    public legendSettings: LegendSettingsModel = {
        visible: false
    };
    public dataLabel: AccumulationDataLabelSettingsModel = {
        visible: true, position: 'Outside',
        connectorStyle: { length: '20px', type: 'Curve' }, name: 'text',
        font: { fontWeight: '600' }
    };
    public startAngle: number = 60;
    public radius: string = Browser.isDevice ? '40%' : '70%'
    //Initializing Tooltip
    public tooltip: TooltipSettingsModel = {
        header:'',
        enable: true, format: '<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>',
        enableHighlight: true
    };
    public title: string = 'Rio Olympics Gold ';
     // custom code start
    public onLoad(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    }
     // custom code end
    constructor() {
        //code
    };

}