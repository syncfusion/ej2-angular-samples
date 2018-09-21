import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Legend, Adaptor, Tooltip, ITooltipEventArgs, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * HeatMap array-row sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'array-row.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapArrayRowComponent {

    titleSettings: Object = {
        text: 'GDP Growth Rate for Major Economies (in Percentage)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal'
        }
    };
    xAxis: Object = {
        labels: ['China', 'India', 'Australia', 'Mexico', 'Canada', 'Brazil',
            'USA', 'UK', 'Germany', 'Russia', 'France', 'Japan'],
        labelRotation: 45,
        labelIntersectAction: 'None',
    };
    yAxis: Object = {
        labels: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
    };
    public paletteSettings: Object = {
        palette: [{ value: -1, color: '#F0D6AD' },
        { value: 0, color: '#9da49a' },
        { value: 3.5, color: '#d7c7a7' },
        { value: 6.0, color: '#6e888f' },
        { value: 7.5, color: '#466f86' },
        { value: 10, color: '#19547B' }
        ],
    };
    public legendSettings: Object = {
        visible: false
    };
    dataSource: Object = [
        [9.5, 2.2, 4.2, 8.2, -0.5, 3.2, 5.4, 7.4, 6.2, 1.4],
        [4.3, 8.9, 10.8, 6.5, 5.1, 6.2, 7.6, 7.5, 6.1, 7.6],
        [3.9, 2.7, 2.5, 3.7, 2.6, 5.1, 5.8, 2.9, 4.5, 5.1],
        [2.4, -3.7, 4.1, 6.0, 5.0, 2.4, 3.3, 4.6, 4.3, 2.7],
        [2.0, 7.0, -4.1, 8.9, 2.7, 5.9, 5.6, 1.9, -1.7, 2.9],
        [5.4, 1.1, 6.9, 4.5, 2.9, 3.4, 1.5, -2.8, -4.6, 1.2],
        [-1.3, 3.9, 3.5, 6.6, 5.2, 7.7, 1.4, -3.6, 6.6, 4.3],
        [-1.6, 2.3, 2.9, -2.5, 1.3, 4.9, 10.1, 3.2, 4.8, 2.0],
        [10.8, -1.6, 4.0, 6.0, 7.7, 2.6, 5.6, -2.5, 3.8, -1.9],
        [6.2, 9.8, -1.5, 2.0, -1.5, 4.3, 6.7, 3.8, -1.2, 2.4],
        [1.2, 10.9, 4.0, -1.4, 2.2, 1.6, -2.6, 2.3, 1.7, 2.4],
        [5.1, -2.4, 8.2, -1.1, 3.5, 6.0, -1.3, 7.2, 9.0, 4.2]
    ];
    public tooltipRender(args: ITooltipEventArgs): void {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' %'];
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