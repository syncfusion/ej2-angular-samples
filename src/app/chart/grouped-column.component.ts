import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ITooltipRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'grouped-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class GroupedColumnChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    //Initializing Width
    public width: string = Browser.isDevice ? '100%' : '75%';
    public data: Object[] = [
        { Year: "2016", USA_Total: 104, USA_Gold: 46, UK_Total: 65, UK_Gold: 29, China_Total: 91, China_Gold: 38 },
        { Year: "2020", USA_Total: 121, USA_Gold: 46, UK_Total: 67, UK_Gold: 27, China_Total: 70, China_Gold: 26 },
        { Year: "2024", USA_Total: 113, USA_Gold: 39, UK_Total: 65, UK_Gold: 22, China_Total: 88, China_Gold: 38 },
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        title: 'Number of Medals Won'
    };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true,
        header: '<b>${point.x}</b>',
        format: '${series.groupName} : <b>${point.y} Gold</b>'
    };
    public cornerRadius: Object = { topLeft: 4, topRight: 4 };
    //Initializing Marker
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: {
                fontWeight: '600',
                color: '#ffffff'
            }
        }
    };
    public legend: Object = {
        visible: true,
        shapeWidth: 9,
        shapeHeight: 9
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public tooltipRender = (args: ITooltipRenderEventArgs) => {
        const seriesName: string = args.series.name;
        const groupName: string = (args.series as { groupName?: string }).groupName ?? '';
        const value: number = args.point.y as number;
        args.text = seriesName.includes('Gold') ? `${groupName}: <b>${value} Gold</b>` : `${groupName}: <b>${value} Total</b>`;
    };
    //Initializing Chart Title
    public title: string = 'Olympic Medal Trends by Country and Year';
    public subTitle: string = 'A Historical Overview of Medal Counts Across Nations';
    constructor() {
        // code
    };
}