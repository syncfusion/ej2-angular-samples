import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Tooltip, ILoadedEventArgs,ICellEventArgs, ITooltipEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './data';
HeatMap.Inject(Tooltip);
/**
 * HeatMap default sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multi-level-labels.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapMultilevelLabelComponent {

    titleSettings: Object = {
        text: 'Product wise Monthly sales revenue for a e-commerce website',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        }
    };
    xAxis: Object = {
        labels: ['Laptop', 'Mobile', 'Gaming', 'Cosmetics', 'Fragrance', 'Watches', 'Handbags', 'Apparel',
        'Kitchenware', 'Furniture', 'Home Decor'],
    border: {
        width: 1,
        type: 'Rectangle',
        color: '#a19d9d'
    },
    textStyle: {
        color: 'black',

    },
    multiLevelLabels: [
        {
            border: { type: 'Rectangle', color: '#a19d9d' },
            textStyle: {
                color: 'black',
                fontWeight: 'Bold'
            },
            categories: [
                { start: 0, end: 2, text: 'Electronics', },
                { start: 3, end: 4, text: 'Beauty and personal care', },
                { start: 5, end: 7, text: 'Fashion', },
                { start: 8, end: 10, text: 'Household', },
            ]
        },
    ]
    };
    yAxis: Object = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        border: {
            width: 0
        },
        textStyle: {
            color: 'black'
        },
        isInversed: true,
        multiLevelLabels: [
            {
                border: { type: 'Brace', color: '#a19d9d' },
                textStyle: {
                    color: 'black',
                    fontWeight: 'Bold'
                },
                categories: [
                    { start: 0, end: 2, text: 'Q1' },
                    { start: 3, end: 5, text: 'Q2' },
                    { start: 6, end: 8, text: 'Q3' },
                    { start: 9, end: 11, text: 'Q4' }
                ]
            },
        ]
    };
    public cellSettings: Object = {
        border: {
            width: 0
        }
    };
    public paletteSettings: Object = {
        palette: [{ color: '#F0ADCE' },
        { color: '#19307B' }
        ]
    };
    public legendSettings: Object = {
        visible: false
    };
    dataSource: Object = new SampleDataSource().multiLevelLabelData;

    public cellRender(args: ICellEventArgs): void {
        args.displayText = '$ ' + (args.value as number / 10) + 'K'; 
    };
    public tooltipRender(args: ITooltipEventArgs): void {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : $ ' + (args.value as number / 10) + 'K']; 
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if(selectedTheme === 'highcontrast')
        {
            args.heatmap.xAxis.textStyle.color = 'White';
            args.heatmap.yAxis.textStyle.color = 'White';
            args.heatmap.xAxis.multiLevelLabels[0].textStyle.color = 'White';
            args.heatmap.yAxis.multiLevelLabels[0].textStyle.color = 'White';
        }
        else
        {
            args.heatmap.xAxis.textStyle.color = 'Black';
            args.heatmap.yAxis.textStyle.color = 'Black';
            args.heatmap.xAxis.multiLevelLabels[0].textStyle.color = 'Black';
            args.heatmap.yAxis.multiLevelLabels[0].textStyle.color = 'Black';
        }
    };
    constructor() {
        //code
    };
}