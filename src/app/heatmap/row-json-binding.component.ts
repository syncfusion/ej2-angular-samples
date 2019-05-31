import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Legend, Adaptor, Tooltip, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * HeatMap row-json sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'row-json-binding.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapRowJsonComponent {

    titleSettings: Object = {
        text: 'Olympic Medal Achievements of most Successful Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal'
        }
    };
    xAxis: Object = {
        labels: ['China', 'France', 'GBR', 'Germany', 'Italy', 'Japan', 'KOR', 'Russia', 'USA'],
        labelRotation: 45,
        labelIntersectAction: 'None',
    };
    yAxis: Object = {
        title: { text: 'Olympic Year' },
        labels: ['2000', '2004', '2008', '2012', '2016'],
    };
    dataSource: Object = {
        data: [
            { 'Region': 'USA', '2000': 93, '2004': 101, '2008': 112, '2012': 103, '2016': 121 },
            { 'Region': 'GBR', '2000': 28, '2004': 30, '2008': 49, '2012': 65, '2016': 67 },
            { 'Region': 'China', '2000': 58, '2004': 63, '2008': 100, '2012': 91, '2016': 70 },
            { 'Region': 'Russia', '2000': 89, '2004': 90, '2008': 60, '2012': 69, '2016': 55 },
            { 'Region': 'Germany', '2000': 56, '2004': 49, '2008': 41, '2012': 44, '2016': 42 },
            { 'Region': 'Japan', '2000': 18, '2004': 37, '2008': 25, '2012': 38, '2016': 41 },
            { 'Region': 'France', '2000': 38, '2004': 33, '2008': 43, '2012': 35, '2016': 42 },
            { 'Region': 'KOR', '2000': 28, '2004': 30, '2008': 32, '2012': 30, '2016': 21 },
            { 'Region': 'Italy', '2000': 34, '2004': 32, '2008': 27, '2012': 28, '2016': 28 }],
        isJsonData: true,
        adaptorType: 'Table',
        xDataMapping: 'Region',
    };
    public paletteSettings: Object = {
        palette: [{ color: '#F0C27B' },
        { color: '#4B1248' }
        ],
    };
    public cellSettings: Object = {
        border: {
            width: 1,
            radius: 4,
            color: 'white'
        }
    };
    public tooltipRender(args: ITooltipEventArgs): void {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' medals'];
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