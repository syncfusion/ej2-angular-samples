import { Component, ViewEncapsulation } from '@angular/core';
import {
    ChartAllModule,
    AccumulationChartAllModule,
    IAccLoadedEventArgs
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';

/**
 * Sample for Nested Donut chart (multiple pie series)
 */
@Component({
    selector: 'control-content',
    templateUrl: 'nested-donut.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class NestedDonut {

    public regionColors: { [key: string]: string } = {
        'South Asia': '#1f4e8c',
        'Middle East': '#7a3b8f',
        'S.E. Asia': '#e91e63',
        'Africa': '#f4c20d',
        'Others': '#66a99c'
    };

    public regionData: Object[] = [
        { x: 'South Asia', y: 55.85, color: this.regionColors['South Asia'], text: Browser.isDevice ? 'SA' : 'South Asia' },
        { x: 'Middle East', y: 16.15, color: this.regionColors['Middle East'], text: Browser.isDevice ? 'ME' : 'Middle East' },
        { x: 'S.E. Asia', y: 7.36, color: this.regionColors['S.E. Asia'], text: Browser.isDevice ? 'SEA' : 'S.E. Asia' },
        { x: 'Africa', y: 11.25, color: this.regionColors['Africa'], text: Browser.isDevice ? 'AF' : 'Africa' },
        { x: 'Others', y: 9.39, color: this.regionColors['Others'], text: Browser.isDevice ? 'Others' : 'Others' }
    ];

    public countryData: Object[] = [
        { x: 'India', y: 21.8, color: this.regionColors['South Asia'], text: Browser.isDevice ? 'IND' : 'India' },
        { x: 'Bangladesh', y: 12.5, color: this.regionColors['South Asia'], text: Browser.isDevice ? 'BGD' : 'Bangladesh' },
        { x: 'Nepal', y: 12.5, color: this.regionColors['South Asia'], text: Browser.isDevice ? 'NPL' : 'Nepal' },
        { x: 'Pakistan', y: 4.7, color: this.regionColors['South Asia'], text: Browser.isDevice ? 'PAK' : 'Pakistan' },
        { x: 'Sri Lanka', y: 4.35, color: this.regionColors['South Asia'], text: Browser.isDevice ? 'LKA' : 'Sri Lanka' },
        { x: 'Qatar', y: 10.5, color: this.regionColors['Middle East'], text: Browser.isDevice ? 'QAT' : 'Qatar' },
        { x: 'Iran', y: 1.0, color: this.regionColors['Middle East'], text: Browser.isDevice ? 'IRN' : 'Iran' },
        { x: 'Jordan', y: 1.6, color: this.regionColors['Middle East'], text: Browser.isDevice ? 'JOR' : 'Jordan' },
        { x: 'Syria', y: 1.8, color: this.regionColors['Middle East'], text: Browser.isDevice ? 'SYR' : 'Syria' },
        { x: 'Lebanon', y: 1.25, color: this.regionColors['Middle East'], text: Browser.isDevice ? 'LBN' : 'Lebanon' },
        { x: 'Philippines', y: 7.36, color: this.regionColors['S.E. Asia'], text: Browser.isDevice ? 'PHL' : 'Philippines' },
        { x: 'Sudan', y: 1.9, color: this.regionColors['Africa'], text: Browser.isDevice ? 'SDN' : 'Sudan' },
        { x: 'Egypt', y: 9.35, color: this.regionColors['Africa'], text: Browser.isDevice ? 'EGY' : 'Egypt' },
        { x: 'Others', y: 9.39, color: this.regionColors['Others'], text: Browser.isDevice ? 'Others' : 'Others' }
    ];

    public legendSettings: Object = {
        visible: true,
        mappingKey: 'x'
    };

    public outerDataLabel: Object = {
        visible: true,
        name: 'text',
        position: 'Outside'
    };

    public innerDataLabel: Object = {
        visible: true,
        name: 'text',
        position: 'Inside'
    };
    
    public tooltip: Object = {
        enable: true,
        format: '<b>${point.x}</b><br/>Population: <b>${point.y}%</b>',
        textStyle: { fontWeight: 'bold' }
    };

    public border: Object = {
        color: '#fff',
        width: 2
    };

    public animation: Object = {
        enable: false
    };

    public centerLabel: Object = {
        text: 'Qatar Population<br><b>3.1 Million</b>',
        textStyle: {
            size: '12px',
            fontWeight: 'bold'
        }
    };

    public title: string = 'The Population of Qatar by Nationality';

    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    }
}
