import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Legend, Tooltip, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './data';
HeatMap.Inject(Tooltip, Legend);

/**
 * HeatMap default sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'empty-points.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapEmptyPointComponent {

    titleSettings: Object = {
        text: 'Deffective Count per 1000 Products from a Manufacturing Unit',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal'
        }
    };
    xAxis: Object = {
        labels: ['2007', '2008', '2009', '2010', '2011',
            '2012', '2013', '2014', '2015', '2016', '2017'],
    };
    yAxis: Object = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    };
    public cellSettings: Object = {
        border: {
            width: '0',
            color: 'white'
        },
        showLabel: true
    };
    public paletteSettings: Object = {
        palette: [{ color: 'rgb(172, 213, 242)' },
        { color: 'rgb(127, 168, 201)' },
        { color: 'rgb(82, 123, 160)' },
        { color: 'rgb(37, 78, 119)' },
        ],
        type: 'Gradient'
    };
    public legendSettings: Object = {
        position: 'Bottom',
        width: '250px',
        showLabel: true,
    };
    dataSource: Object = new SampleDataSource().emptyPointDataSource;
    public tooltipRender(args: ITooltipEventArgs): void {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' deffective units'];
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    constructor() {
        //code
    };
}