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
        { x: 'USA', y: 40, text: Browser.isDevice ? 'USA: 40' : 'United States of America: 40' },
        { x: 'China', y: 40, text: 'China: 40' },
        { x: 'Japan', y: 20, text: 'Japan: 20' },
        { x: 'Australia', y: 18, text: Browser.isDevice ? 'AU: 18' : 'Australia: 18' },
        { x: 'France', y: 16, text: 'France: 16' },
        { x: 'Netherlands', y: 15, text: Browser.isDevice ? 'NL: 15' : 'Netherlands: 15' },
        { x: 'Great Britain', y: 14, text: Browser.isDevice ? 'GB: 14' : 'Great Britain: 14' },
        { x: 'South Korea', y: 13, text: Browser.isDevice ? 'SK: 13' : 'South Korea: 13' },
        { x: 'Germany', y: 12, text: Browser.isDevice ? 'GE: 12' : 'Germany: 12' },
        { x: 'Italy', y: 12, text: 'Italy: 12' },
        { x: 'NewZealand', y: 10, text: Browser.isDevice ? 'NZ: 10' : 'New Zealand: 10' },
        { x: 'Canada', y: 9, text: Browser.isDevice ? 'CA: 9' : 'Canada: 9' },
        { x: 'Uzbekistan', y: 8, text: Browser.isDevice ? 'UZB: 8' : 'Uzbekistan: 8' },
        { x: 'Hungary', y: 6, text: Browser.isDevice ? 'HU: 6' : 'Hungary: 6' },
        { x: 'Kenya', y: 4, text: Browser.isDevice ? 'KE: 4' : 'Kenya: 4' },
        { x: 'Georgia', y: 3, text: Browser.isDevice ? 'GE: 3' : 'Georgia: 3' },
        { x: 'North Korea', y: 2, text: Browser.isDevice ? 'NK: 2' : 'North Korea: 2' },
        { x: 'Hong Kong', y: 2, text: Browser.isDevice ? 'HK: 2' : 'South Africa: 2' }
    ];
    //Initializing Legend
    public legendSettings: LegendSettingsModel = {
        visible: false
    };
    public dataLabel: AccumulationDataLabelSettingsModel = {
        visible: true, position: 'Outside', textWrap: Browser.isDevice ? 'Wrap' : 'Normal',
        connectorStyle: { length: Browser.isDevice ? '2px' : '20px', type: 'Curve' }, name: 'text',
        font: { fontWeight: '600', size: Browser.isDevice ? '7px' : '12px', }
    };
    public startAngle: number = 60;
    public radius: string = Browser.isDevice ? '40%' : '65%'
    //Initializing Tooltip
    public tooltip: TooltipSettingsModel = {
        header:'',
        enable: true, format: '<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>',
        enableHighlight: true
    };
    public title: string = 'Summer Olympics 2024 - Gold Medals';
    public subTitle: string = 'Source: wikipedia.org';
     // custom code start
    public onLoad(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    }
     // custom code end
    constructor() {
        //code
    };

}