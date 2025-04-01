import { Component, ViewEncapsulation } from '@angular/core';
import { IPointRenderEventArgs, ChartTheme, ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, pointRender } from './theme-color';
/**
 * Sample for Category axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'category.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class CategoryChartComponent {
    public data: Object[] = [
        { x: 'Germany', y: 72, country: 'GER: 72M'},
        { x: 'Russia', y: 103.1, country: 'RUS: 103.1M'},
        { x: 'Brazil', y: 139.1, country: 'BRZ: 139.1M'},
        { x: 'India', y: 462.1, country: 'IND: 462.1M'},
        { x: 'China', y: 721.4, country: 'CHN: 721.4M'},
        { x: 'United States<br>Of America', y: 286.9, country: 'USA:  286.9M'},
        { x: 'Great Britain', y: 115.1, country: 'GBR: 115.1M'},
        { x: 'Nigeria', y: 97.2, country: 'NGR: 97.2M'},
    ];
    public tooltipMappingName: 'country';
    public marker: Object = {
        dataLabel: {
            visible: true,
            position:  'Top', font: {
                fontWeight: '600',
                color:  '#ffffff'
            }
        }
    }
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        enableTrim: false,
        majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
    public pointRender(args: IPointRenderEventArgs): void {
        pointRender(args);
    };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
      // custom code end
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0,
        maximum: 800,
        labelFormat: '{value}M',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: false, format: '${point.tooltip}'
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public legend: Object = {
        visible: false
    }
    public width: string = Browser.isDevice ? '100%' : '75%';

    public title: string = 'Internet Users – 2016';
    constructor() {
        //code
    };

}