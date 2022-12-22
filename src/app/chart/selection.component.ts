import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { SelectionMode, SelectionPattern, HighlightMode } from '@syncfusion/ej2-charts';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
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
    public selectpattern: DropDownList;
    public highpattern: DropDownList;
    public setMultiSelect(e: Event): void {
        this.chart.isMultiSelect = (<HTMLInputElement>e.target).checked === true;
        this.chart.dataBind();
    }
    public high(e: Event): void {
        let pattern: HTMLSelectElement = document.getElementById('selhigh') as HTMLSelectElement;
        if ((<HTMLInputElement>e.target).checked === true) {
            pattern.style.display = 'block';
            pattern.onchange = () => {
                this.chart.highlightMode = <HighlightMode>this.selectionMode.value;
                this.chart.highlightPattern = <SelectionPattern>pattern.value;
                this.chart.dataBind();
            };
        } else {
            this.chart.highlightMode = 'None';
            this.chart.highlightPattern = 'None';
            pattern.style.display = 'none';
            this.chart.dataBind();
        }
    }
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        labelIntersectAction: 'Rotate90',
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
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
    public animation: Object = {
        enable: false
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
    public ngOnInit(): void {
        this.selectionMode = new DropDownList({
            index: 0,
            change: () => {
                const element: HTMLInputElement = <HTMLInputElement>(document.getElementById('highlight'));
                let type: string = this.selectionMode.value.toString();
                this.chart.selectionMode = <SelectionMode>type;
                if (element.checked) {
                    this.chart.highlightMode = <HighlightMode>type;
                } else {
                    this.chart.highlightMode = 'None';
                }
                this.chart.dataBind();
            }
        });
        this.selectionMode.appendTo('#selmode');
        document.getElementById('select').onchange = () => {
            const element: HTMLInputElement = <HTMLInputElement>(document.getElementById('select'));
            this.chart.isMultiSelect = element.checked;
            this.chart.dataBind();
        }
        this.selectpattern = new DropDownList({
            index: 0,
            change: () => {
                this.chart.selectionPattern = <SelectionPattern>this.selectpattern.value;
                this.chart.dataBind();
            }
        });
        this.selectpattern.appendTo('#selpattern');
        let highlight: DropDownList = new DropDownList({
            index: 0,
            placeholder: 'Select pattern values',
            width: 120,
            change: () => {
                const element: HTMLInputElement = <HTMLInputElement>(document.getElementById('highlight'));
                if (element.checked) {
                    this.chart.highlightPattern = <SelectionPattern>highlight.value;
                } else {
                    this.chart.highlightPattern = 'None';
                }
                this.chart.dataBind();
            }
        });
        highlight.appendTo('#selhigh');
        document.getElementById('highlight').onchange = () => {
            const element: HTMLInputElement = <HTMLInputElement>(document.getElementById('highlight'));
            if (element.checked) {
                this.chart.highlightMode = <HighlightMode>this.selectionMode.value;
                this.chart.highlightPattern = <SelectionPattern>highlight.value;
            } else {
                this.chart.highlightMode = 'None';
                this.chart.highlightPattern = 'None';
            }
            this.chart.dataBind();
        };
        let colorPicker: ColorPicker = new ColorPicker(
            {
                value: 'null',
                mode: 'Palette',
                change: (args: ColorPickerEventArgs) => {
                    this.chart.highlightColor = args.currentValue.hex;
                    this.chart.dataBind();
                }
            });
        colorPicker.appendTo('#color-picker');
    }
    constructor() {
        //code
    }

}