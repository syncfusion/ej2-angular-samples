import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { SelectionMode } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * Sample for Selection in chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'selection.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectionChartComponent {

    public data: Object[] = [
        { x: 'CHN', y: 17 },
        { x: 'USA', y: 19 },
        { x: 'IDN', y: 29 },
        { x: 'JAP', y: 13 },
        { x: 'BRZ', y: 24 }
    ];
    public data1: Object[] = [
        { x: 'CHN', y: 54 },
        { x: 'USA', y: 67 },
        { x: 'IDN', y: 65 },
        { x: 'JAP', y: 61 },
        { x: 'BRZ', y: 68 }
    ];
    public data2: Object[] = [
        { x: 'CHN', y: 9 },
        { x: 'USA', y: 14 },
        { x: 'IDN', y: 6 },
        { x: 'JAP', y: 26 },
        { x: 'BRZ', y: 8 }
    ];
    @ViewChild('chart')
    public chart: ChartComponent;
    public setMultiSelect(e: Event): void {
        this.chart.isMultiSelect = (<HTMLInputElement>e.target).checked === true;
        this.chart.dataBind();
    }
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Countries',
        valueType: 'Category',
        interval: 1,
        labelIntersectAction: 'Rotate90'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Distribution',
        labelFormat: '{value}%',
        minimum: 0,
        maximum: 80
    };
    public legend: Object = {
        visible: true,
        toggleVisibility: false
    };
 // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Age Distribution by Country';
    public selectionMode: DropDownList;
    ngOnInit(): void {
        this.selectionMode = new DropDownList({
            index: 0,
            width: 80,
            change: () => {
                let type: string = this.selectionMode.value.toString();
                this.chart.selectionMode = <SelectionMode>type;
                this.chart.dataBind();
            }
        });
        this.selectionMode.appendTo('#selmode');
    }
    constructor() {
        //code
    };

}