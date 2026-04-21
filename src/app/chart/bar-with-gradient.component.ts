import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bar-with-gradient.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class BarWithGradientComponent {
    public chartData: Object[] = [
        { Company: 'Tata Motors',                         Revenue: 52.9  },
        { Company: 'State Bank of India',                 Revenue: 71.8  },
        { Company: 'Oil and Natural Gas Corporation',     Revenue: 77.5  },
        { Company: 'Indian Oil Corporation',              Revenue: 93.8  },
        { Company: 'Life Insurance Corporation of India', Revenue: 98.0  },
        { Company: 'Reliance Industries',                 Revenue: 108.8 }
    ];
    //Initializing Chart Width
    public width: string = Browser.isDevice ? '100%' : '90%';
    //Initializing Marker
    public marker: Object = { dataLabel: { visible: true, position: 'Outer', format: '{value} B' } };
    public cornerRadius: Object = { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 };
    public columnWidth: number = 0.75;
    //Initializing Primary X Axis
    public primaryXAxis: Object = { 
        valueType: 'Category', 
        majorGridLines: { width: 1 }, 
        majorTickLines: { width: 0 }, 
        lineStyle: { width: 0 },
        edgeLabelPlacement: 'Shift',
        enableWrap: true,
        maximumLabelWidth: 100
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = { visible: false };
    public linearGradient: Object = {
        x1: 0, y1: 0, x2: 1, y2: 0,
        gradientColorStop: [
            { color: '#1a9fd4', offset: 0, opacity: 1 },
            { color: '#9b4dca', offset: 50, opacity: 1 },
            { color: '#f95d8f', offset: 100, opacity: 1 }
        ]
    };
    public tooltip: Object = { enable: true, header: '', format: '${point.x}: <b>${point.y} B</b>' };
    public legend: Object = {
        visible: false
    }
    public columnSpacing: number = 0.25;
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Leading Revenue Drivers in India: 2024 Rankings';
    public subTitle: string = 'Source: Wikipedia (Forbes 2024) | Revenue in USD Billions';
    constructor() {
        //code
    };

}