import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './default-table-data-source';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip-template.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapTooltipComponent {

    titleSettings: Object = {
        text: 'Crude Oil Production of Non-OPEC Countries (in Million barrels per day)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontFamily: 'inherit'
        }
    };
    xAxis: Object = {
        labels: ['Canada', 'China', 'Egypt', 'Mexico', 'Norway', 'Russia', 'UK', 'USA'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    dataSource: Object = new SampleDataSource().defaultTableDataSource;
    public cellSettings: Object = {
        border: {
            width: 0
        },
        format: '{value} M',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public legendSettings: Object = {
        visible: false,
    };
    public tooltipSettings: Object = {
        fill: '#265259',
        textStyle: {
            color: '#FFFFFF',
            size: '12px',
            fontFamily: 'inherit'
        },
        border: {
            width: 1,
            color: '#98BABF'
        },
    };
    public paletteSettings: Object = {
        palette: [{ value: 0, color: '#C2E7EC' },
        { value: 0.6, color: '#AEDFE6' },
        { value: 0.75, color: '#9AD7E0' },
        { value: 1, color: '#86CFDA' },
        { value: 1.5, color: '#72C7D4' },
        { value: 2, color: '#5EBFCE' },
        { value: 2.5, color: '#4AB7C8' },
        { value: 3, color: '#36AFC2' },
        { value: 3.5, color: '#309DAE' },
        { value: 5, color: '#2B8C9B' },
        { value: 5.5, color: '#257A87' },
        { value: 6, color: '#206974' },
        { value: 8, color: '#1B5761' },
        { value: 9, color: '#15464D' },
        { value: 9.5, color: '#000000' }
        ],
        type: 'Fixed'
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    };
    public tooltipRender(args: ITooltipEventArgs): void {
        if (args.heatmap.theme.indexOf('Dark') > -1 || args.heatmap.theme.indexOf('HighContrast') > -1) {
            args.heatmap.tooltipSettings.template = '<div style=" border-radius: 5px;fontFamily: inherit; padding-left: 10px;padding-right: 10px;padding-bottom: 6px;padding-top: 6px;background:white; border: 1px #919191;" ><span style="color:black;font-size: 12px">In ${yLabel}, the ${xLabel} produced ${value} million barrels per day.<span></div>';

        }
        else {
            args.heatmap.tooltipSettings.template = '<div style=" border-radius: 5px;fontFamily: inherit; padding-left: 10px;padding-right: 10px;padding-bottom: 6px;padding-top: 6px;background:#000000; border: 1px #919191;" ><span style="color:white;font-size: 12px">In ${yLabel}, the ${xLabel} produced ${value} million barrels per day.<span></div>';
        }
    };
    constructor() {
        //code
    };
}