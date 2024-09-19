import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IAxisLabelRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

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
        }
    };
    //Initializing Width
    public width: string = Browser.isDevice ? '100%' : '75%';
    public data: Object[] = [
        { Year : "2012", USA_Total : 104, USA_Gold : 46, UK_Total : 65, UK_Gold : 29, China_Total : 91, China_Gold : 38},
        { Year : "2016", USA_Total : 121, USA_Gold : 46, UK_Total : 67, UK_Gold : 27, China_Total : 70, China_Gold : 26},
        { Year : "2020", USA_Total : 113, USA_Gold : 39, UK_Total : 65, UK_Gold : 22, China_Total : 88, China_Gold : 38},
];
    
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: {width: 0}, minorTickLines: {width: 0}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Medal Count',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
    };
    public tooltip: Object = {
        enable: true
    };
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
    }
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Olympics Medal Tally';
    constructor() {
        // code
    };
}