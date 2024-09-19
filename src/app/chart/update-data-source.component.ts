import { Component, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { ILoadedEventArgs, IPointRenderEventArgs, IAxisRangeCalculatedEventArgs, ChartTheme, ChartAllModule, Series, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'update-data-source.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class UpdateDataSourceComponent  implements OnDestroy {
    @ViewChild('chart')
    public chart: ChartComponent;
    public data3: Object[] = [
        { x: 'Jewellery', y: 75 },
        { x: 'Shoes', y: 45 },
        { x: 'Footwear', y: 73 },
        { x: 'Pet Services', y: 53 },
        { x: 'Business Clothing', y: 85},
        { x: 'Office Supplies', y: 68 },
        { x: 'Food', y: 45 }
    ];
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
        labelStyle: { size: Browser.isDevice ? '11px' : '12px' },
        majorGridLines: { width: 0 },
        labelIntersectAction: 'Rotate90'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Sales (in percentage)', 
        labelFormat: '{value}%', 
        interval: 5, 
        lineStyle: { width: 0 }, 
        majorTickLines: { width: 0 }, minimum: 0, maximum: 100
    };
    public cornerRadius: Object = {
        topLeft: Browser.isDevice ? 10 : 15, 
        topRight: Browser.isDevice ? 10 : 15
    };

    //Initializing DataLabel
    public marker: Object = {
        visible: false, dataLabel: {visible: true, position: 'Top', format: '{value}%', font: { color: '#ffffff' } }
    };
    ngOnDestroy(): void {
        this.clearInterval();
    }
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        this.clearInterval();
        this.intervalId = setInterval(function () {
            var container = document.getElementById('UpdateData');
            if (container && container.id === args.chart.element.id) {
                const newData = (args.chart.series[0].dataSource as Object[]).map((item: { x: string, y: number }) => {
                    const min: number = 10;
                    const max: number = 90;
                    const value: number = Math.floor(Math.random() * (max - min + 1)) + min;
                    return { x: item.x, y: value };
                });
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 500);
                }
            }
            else {
                this.clearInterval();
            }
        }, 1500);
    };
    private clearInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    public pointRender (args: IPointRenderEventArgs): void {
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
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    };
    public axisRangeCalculated (args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.maximum = args.maximum as number > 100 ? 100 : args.maximum;
            if (args.maximum > 80) {
                args.interval = 20;
            } else if(args.maximum > 40){
                args.interval = 10;
            }
        }
    }
    public getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public title: string = 'Sales by product';
    constructor() {
        //code
    };

}