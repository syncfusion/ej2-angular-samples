import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartTheme, ILoadedEventArgs, ChartAllModule, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for No data template Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'no-data-template.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent, ButtonModule],
})
export class NodataTemplateChartComponent {
    @ViewChild('chart')
    public chart: ChartComponent;
    public hasData: boolean = false;

    public data: Object[] = [];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0}
    };
    //Initializing Primary X Axis
    public primaryYAxis: Object = {
        title: 'Production (in million pounds)',
        titleStyle: {
            fontWeight: '600'
        },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
    };
    public chartArea: Object= {
            border:{width:0}
    };
    public marker: Object = {
        visible: true,
        width: 7,
        height: 7
    };
    public tooltip: Object = {
        enable: true, format: '${point.x} : <b>${point.y}M</b>', header: 'Milk Production',
    };
    public width: string = '100%';

    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = loadChartTheme(args);
        this.data = this.hasData ? [
            { x: 'January', y: 19173 },
            { x: 'February', y: 17726 },
            { x: 'March', y: 19874 },
            { x: 'April', y: 19391 },
            { x: 'May', y: 20072 },
            { x: 'June', y: 19233 }
        ] : [];
    };

    // custom code start
    public loaded(args: ILoadedEventArgs): void {
        let selectedTheme: string = loadChartTheme(args);
        const noDataDiv = document.getElementById("noDataTemplateContainer");
        if (noDataDiv) {
            noDataDiv.className = selectedTheme.toLowerCase().indexOf("dark") > -1 || selectedTheme.toLowerCase().indexOf("highcontrast") > -1 ? 'dark-bg' : 'light-bg';
        }
    };

    public loadData(): void {
        this.data = [
            { x: 'January', y: 19173 },
            { x: 'February', y: 17726 },
            { x: 'March', y: 19874 },
            { x: 'April', y: 19391 },
            { x: 'May', y: 20072 },
            { x: 'June', y: 19233 }
        ];
        this.hasData = true;
        const values = this.data.map(d => (d as any).y);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;
        this.chart.primaryYAxis.minimum = Math.floor(min - range * 0.1);
        this.chart.primaryYAxis.maximum = Math.ceil(max + range * 0.1);
        this.chart.primaryYAxis.interval = Math.ceil(range / 5);
        this.chart.series[0].animation.enable = true;
        this.chart!.refresh();
    }

    // custom code end
    public title: string = 'Milk Production in US - 2025';
    public subTitle: string = 'Source: nass.usda.gov';

    constructor() {
    };

}