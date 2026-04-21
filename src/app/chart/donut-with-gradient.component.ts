import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent, ChartAllModule,AccumulationChart, AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme, IPointRenderEventArgs, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { donutPointRender, loadAccumulationChartTheme } from './theme-color';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
/**
 * Sample for doughnut 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'donut-with-gradient.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class DonutWithGradient {
    public GradientDonutData: any[] = [
        { Country: "Austria", Share: 38.03, DataLabelMappingName: "Austria: 38.03%" },
        { Country: "Belgium", Share: 33.7, DataLabelMappingName: "Belgium: 33.7%" },
        { Country: "Germany", Share: 31.27, DataLabelMappingName: "Germany: 31.27%" },
        { Country: "The Netherlands", Share: 29.71, DataLabelMappingName: "The Netherlands: 29.71%" },
        { Country: "Lithuania", Share: 27.72, DataLabelMappingName: "Lithuania: 27.72%" },
        { Country: "Czechia", Share: 27.37, DataLabelMappingName: "Czechia: 27.37%" },
        { Country: "Poland", Share: 22.1, DataLabelMappingName: "Poland: 22.1%" },
        { Country: "Ireland", Share: 18.87, DataLabelMappingName: "Ireland: 18.87%" },
        { Country: "Croatia", Share: 14.88, DataLabelMappingName: "Croatia: 14.88%" },
    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: true,
        position: 'Right'
    };

    //Initializing DataLabel
    public dataLabel: Object = {
        visible: true,
        name: 'DataLabelMappingName',
        position: 'Outside',
        font: {
            size: Browser.isDevice ? '8px' : '12px'
        },
        connectorStyle: { 
            length: '10px',
         },
    };
    public tooltip: Object = { 
        enable: true,
        format: '${point.x} : <b>${point.y}%</b>',
        header:'',
    };
     // custom code start
    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    };
     // custom code end
    public radius: string = '70%';
    public innerRadius: string = '65%';
    public title: string = 'Share of E-commerce Orders by Country - 2025';
    public subTitle: string = 'Source: Data provided by Eurostat European Statistics';
    public titleStyle: Object = {
        position: 'Custom',
        x: Browser.isDevice ? 160 : 490,
        y: 15
    };
    // base colors for radial gradients
    private baseColors: string[] = ['#39B9E6', '#2E79CF', '#4960CF', '#5E47C6', '#8A44C9', '#C24F86', '#D8584E', '#E07245', '#F09A4A'];
    constructor() {
        //code
    };

    // set per-point radial gradient like the React sample
    public pointRender(args: IPointRenderEventArgs): void {
        const idx = args.point.index;
        const base = this.baseColors[idx % this.baseColors.length];
        (args as any).radialGradient = {
            cx: 0.5, cy: 0.5, fx: 0.5, fy: 0.5, r: 0.6,
            gradientColorStop: [
                { offset: 0, color: base, opacity: 1, brighten: 0.2, lighten: 0 },
                { offset: 45, color: base, opacity: 1, brighten: 0.1, lighten: 0 },
                { offset: 70, color: base, opacity: 1, brighten: 0, lighten: 0 },
                { offset: 85, color: base, opacity: 1, brighten: -0.1, lighten: 0 },
                { offset: 100, color: base, opacity: 1, brighten: -0.2, lighten: 0 }
            ]
        };
    }

    // update legend text to show the DataLabelMappingName (percent string)
    public legendRender(args: any): void {
        const country = args.text;
        const dataPoint = this.GradientDonutData.find(d => d.Country === country);
        if (dataPoint) { args.text = dataPoint.DataLabelMappingName; }
    }

}