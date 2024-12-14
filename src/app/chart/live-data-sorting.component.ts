import { Component, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { ILoadedEventArgs, IPointRenderEventArgs, IAxisRangeCalculatedEventArgs, ChartTheme, ChartAllModule, Series, ChartComponent, sort } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'live-data-sorting.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class LiveDataSortingComponent implements OnDestroy {
    @ViewChild('chart')
    public chart: ChartComponent;
    public updatedData: Object[] = [
        { x: 'India', y: 97.21 },
        { x: 'France', y: 95.21 },
        { x: 'Indonesia', y: 62.74 },
        { x: 'Iceland', y: 61.71 },
        { x: 'United States', y: 57.97 },
        { x: 'Greece', y: 57.51 },
        { x: 'Iran', y: 55.31 },
        { x: 'Canada', y: 48.76 },
        { x: 'Finland', y: 48.50 },
        { x: 'Brazil', y: 45.13 },

    ];
    public updatedData2: Object[] = [
        { x: 'India', y: 102.54 },
        { x: 'France', y: 90.76 },
        { x: 'Indonesia', y: 64.61 },
        { x: 'Iceland', y: 70.95 },
        { x: 'United States', y: 61.52 },
        { x: 'Greece', y: 49.03 },
        { x: 'Iran', y: 33.05 },
        { x: 'Canada', y: 59.83 },
        { x: 'Finland', y: 43.13 },
        { x: 'Brazil', y: 55.56 },
    ];
    public updatedData3: Object[] = [
        { x: 'India', y: 99.33 },
        { x: 'France', y: 94.50 },
        { x: 'Indonesia', y: 64.86 },
        { x: 'Iceland', y: 77.86 },
        { x: 'United States', y: 62.14 },
        { x: 'Greece', y: 47.73 },
        { x: 'Iran', y: 39.97 },
        { x: 'Canada', y: 66.53 },
        { x: 'Finland', y: 43.15 },
        { x: 'Brazil', y: 50.02 }
    ];
    public updatedData4: Object[] = [
        { x: 'India', y: 98.85 },
        { x: 'France', y: 101.11 },
        { x: 'Indonesia', y: 60.72 },
        { x: 'Iceland', y: 71.09 },
        { x: 'United States', y: 60.97 },
        { x: 'Greece', y: 52.07 },
        { x: 'Iran', y: 37.99 },
        { x: 'Canada', y: 58.35 },
        { x: 'Finland', y: 43.41 },
        { x: 'Brazil', y: 58.61 }
    ];
    public updatedData5: Object[] = [
        { x: 'India', y: 100.02 },
        { x: 'France', y: 100.55 },
        { x: 'Indonesia', y: 62.84 },
        { x: 'Iceland', y: 89.05 },
        { x: 'United States', y: 59.46 },
        { x: 'Greece', y: 54.04 },
        { x: 'Iran', y: 42.58 },
        { x: 'Canada', y: 59.90 },
        { x: 'Finland', y: 46.18 },
        { x: 'Brazil', y: 65.06 }
    ];
    public updatedData6: Object[] = [
        { x: 'India', y: 102.54 },
        { x: 'France', y: 103.56 },
        { x: 'Indonesia', y: 60.23 },
        { x: 'Iceland', y: 94.00 },
        { x: 'United States', y: 59.39 },
        { x: 'Greece', y: 50.11 },
        { x: 'Iran', y: 34.23 },
        { x: 'Canada', y: 60.40 },
        { x: 'Finland', y: 44.73 },
        { x: 'Brazil', y: 50.04 }
    ];
    public updatedData7: Object[] = [
        { x: 'India', y: 98.84 },
        { x: 'France', y: 101.95 },
        { x: 'Indonesia', y: 60.86 },
        { x: 'Iceland', y: 89.51 },
        { x: 'United States', y: 58.26 },
        { x: 'Greece', y: 53.20 },
        { x: 'Iran', y: 34.28 },
        { x: 'Canada', y: 57.22 },
        { x: 'Finland', y: 42.99 },
        { x: 'Brazil', y: 51.68 }
    ];
    public updatedData8: Object[] = [
        { x: 'India', y: 100.41 },
        { x: 'France', y: 108.54 },
        { x: 'Indonesia', y: 56.44 },
        { x: 'Iceland', y: 107.98 },
        { x: 'United States', y: 57.75 },
        { x: 'Greece', y: 56.34 },
        { x: 'Iran', y: 35.53 },
        { x: 'Canada', y: 57.49 },
        { x: 'Finland', y: 43.32 },
        { x: 'Brazil', y: 64.56 }
    ];
    public updatedData9: Object[] = [
        { x: 'India', y: 104.45 },
        { x: 'France', y: 102.07 },
        { x: 'Indonesia', y: 61.19 },
        { x: 'Iceland', y: 97.05 },
        { x: 'United States', y: 59.53 },
        { x: 'Greece', y: 55.61 },
        { x: 'Iran', y: 41.84 },
        { x: 'Canada', y: 64.13 },
        { x: 'Finland', y: 43.69 },
        { x: 'Brazil', y: 64.73 }
    ];
    public updatedData10: Object[] = [
        { x: 'India', y: 111.84 },
        { x: 'France', y: 95.53 },
        { x: 'Indonesia', y: 55.15 },
        { x: 'Iceland', y: 85.79 },
        { x: 'United States', y: 59.53 },
        { x: 'Greece', y: 58.93 },
        { x: 'Iran', y: 46.53 },
        { x: 'Canada', y: 59.52 },
        { x: 'Finland', y: 45.67 },
        { x: 'Brazil', y: 67.84 }
    ];

    public yearIndex: number = 2;

    private intervalId: any;
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        border: { width: 0 },
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        labelRotation: -90,
        labelIntersectAction:'None',
        interval: 1
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        interval: 30,
        title: 'Nitrogen Fertilizer Use(KG/Ha)',
        labelFormat: '{value}',
        border: { width: 0 },
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };


    //Initializing Marker
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: { color: '#ffffff' },
            size: Browser.isDevice?'10px': '12px',
            enableRotation: Browser.isDevice?true: false,
            angle : -90
        }
    };

    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    public cornerRadius: Object = {
        topLeft: Browser.isDevice ? 2 : 5,
        topRight: Browser.isDevice ? 2 : 5
    };
    ngOnDestroy(): void {
        this.updateClearInterval();
    }
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        this.updateClearInterval();
        this.intervalId = setInterval(() => {
            let container: HTMLElement = document.getElementById('data-sorting-container');
            if (container && container.id === args.chart.element.id) {
                let newData: Object[] = (this['updatedData' + this.yearIndex] || []).map(function (item: { x: string; y: number; }) {
                    return { x: item.x, y: item.y };
                });
                if (args.chart.series.length > 0) {
                    let newSource: Object[] = sort(newData, ['y'], true);
                    args.chart.series[0].setData(newSource, 1400);
                }
                this.yearIndex = this.yearIndex < 10 ? this.yearIndex + 1 : 2;
            }
            else {
                this.updateClearInterval();
            }
        }, 2000);
    };
    public pointRender(args: IPointRenderEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
            '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
            '#ea7a57', '#404041', '#00bdae'];
        let highContrastColors: string[] = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773', '#BA98FF',
            '#FA83C3', '#00C27A', '#43ACEF', '#D681EF', '#D8BC6E'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
            '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
        let fluent2Colors: string[] = ['#6200EE', '#09AF74', '#0076E5', '#CB3587', '#E7910F', '#0364DE', '#66CD15', '#F3A93C', '#107C10',
            '#C19C00'];
        let fluent2HighContrastColors: string[] = ['#9BB449', '#2A72D5', '#43B786', '#3F579A', '#584EC6', '#E85F9C', '#6E7A89', '#EA6266',
            '#0B6A0B', '#C19C00'];
        let pointTailwindColors: string[] = ["#5A61F6", "#65A30D", "#334155", "#14B8A6", "#8B5CF6", "#0369A1", "#F97316", "#9333EA", "#F59E0B",
            "#15803D"];
        let pointTailwindDarkColors: string[] = ["#8B5CF6", "#22D3EE", "#F87171", "#4ADE80", "#E879F9", "#FCD34D", "#F97316", "#2DD4BF", "#F472B6",
            "#10B981"];
        let pointTailwind3Colors: string[] = ['#2F4074', '#03B4B4', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
        let pointTailwind3DarkColors: string[] = ['#8029F1', '#1ABC9C', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = highContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent2') {
            args.fill = fluent2Colors[args.point.index % 10];
        } else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
            args.fill = fluent2HighContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind') {
            args.fill = pointTailwindColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind-dark') {
            args.fill = pointTailwindDarkColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind3') {
            args.fill = pointTailwind3Colors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind3-dark') {
            args.fill = pointTailwind3DarkColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    };

    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            if (args.maximum > 120) {
                args.interval = 30;
            }
            else {
                args.interval = 20;
            }
            if (args.maximum > 150) {
                args.maximum = 150;
            }
        }
    }

    private updateClearInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    public title: string = 'Nitrogen Fertilizer Usage';
    constructor() {
        //code
    };

}