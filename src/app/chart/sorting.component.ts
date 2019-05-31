import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs,ChartTheme, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { sort } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


/**
 * Sample for smart axis labels Positions
 */
@Component({
    selector: 'control-content',
    templateUrl: 'sorting.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SortingChartComponent {

    public data: Object[] = [
        { x: 'Asia', car: 120, trucks: 90, bike: 180, cycle: 90 },
        { x: 'Canada', car: 100, trucks: 80, bike: 90, cycle: 80 },
        { x: 'Europe', car: 80, trucks: 90, bike: 60, cycle: 50 },
        { x: 'Africa', car: 40, trucks: 20, bike: 30, cycle: 30 },
        { x: 'Mexico', car: 40, trucks: 50, bike: 80, cycle: 50 },
        { x: 'US', car: 140, trucks: 90, bike: 75, cycle: 70 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
        interval: 1, lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45', valueType: 'Category'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Sales', lineStyle: { width: 0 },
        majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
        minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
        labelFormat: '{value}K',
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {       
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
      };
     // custom code end
    public tooltip: Object = {
        enable: true
    };
    public title: string = 'Vehicle Sales by Region';
    @ViewChild('chart')
    public chart: ChartComponent;
    public sortMode: DropDownList;
    public isCheck(e: Event): void {
        this.sortDataSource(this.sortMode.value + '');
    }
    ngOnInit(): void {
        this.sortMode = new DropDownList({
            index: 0, placeholder: 'Select Range Bar Color',
            width: 120,
            change: () => {
                this.sortDataSource(this.sortMode.value + '');
            }
        });
        this.sortMode.appendTo('#sortMode');
    }
    public sortDataSource(value: string): void {
        let element: HTMLInputElement = document.getElementById('decending') as HTMLInputElement;
        let isDecending: boolean = element.checked;
        element.disabled = false;
        let sortData: Object[];
        if (value === 'X') {
            sortData = sort(this.data, ['x'], isDecending);
        } else if (value === 'Y') {
            sortData = sort(this.data, ['car', 'trucks', 'bike', 'cycle'], isDecending);
        } else {
            element.disabled = true;
            sortData = this.data;
        }
        this.chart.series[0].animation.enable = false;
        this.chart.series[1].animation.enable = false;
        this.chart.series[2].animation.enable = false;
        this.chart.series[3].animation.enable = false;
        this.chart.series[0].dataSource = sortData;
        this.chart.series[1].dataSource = sortData;
        this.chart.series[2].dataSource = sortData;
        this.chart.series[3].dataSource = sortData;
        this.chart.refresh();
    }
    constructor() {
        // code
    };
}