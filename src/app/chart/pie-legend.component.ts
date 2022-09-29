import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    AccumulationChart, AccumulationChartComponent, IAccAnimationCompleteEventArgs, AccPoints,
    IAccTextRenderEventArgs, IAccLoadedEventArgs, AccumulationTheme, Selection
} from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Doughnut chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-legend.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultDonutComponent {
    public data: Object[] = [
        { 'x': 'Net-tution', y: 21, text: '21%' },
        { 'x': 'Private Gifts', y: 8, text: '8%' },
        { 'x': 'All Other', y: 9, text: '9%' },
        { 'x': 'Local Revenue', y: 4, text: '4%' },
        { 'x': 'State Revenue', y: 21, text: '21%' },
        { 'x': 'Federal Revenue', y: 16, text: '16%' },
        { 'x': 'Self-supporting Operations', y: 21, text: '21%' }
    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: true,
        toggleVisibility: false,
        position: 'Right',
        height: '28%',
        width: '36%',
        textWrap:'Wrap',
        maximumLabelWidth:100,
    };
    //Initializing Datalabel
    public dataLabel: Object = {
        name: 'text',
        visible: true,
        font: {
            color: 'white',
            fontWeight: 600,
            size: '13px'
        }
    };
          // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    }
    public tooltip: Object = {
        enable: false
    };
    constructor() {
        //code
    };

}


