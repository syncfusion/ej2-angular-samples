import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IPointRenderEventArgs, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { ChartTheme, ScrollBar, Zoom, IScrollEventArgs, LineSeries, Tooltip } from '@syncfusion/ej2-charts';
import { Chart, DateTime, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Internationalization, DateFormatOptions } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DatePicker, ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { NumericTextBox, ChangeEventArgs as NumericChange } from '@syncfusion/ej2-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';

/**
 * Sample for Lazy Loading
 */
@Component({
    selector: 'control-content',
    templateUrl: 'lazy-loading.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
// tslint:disable:max-func-body-length
export class LazyLoadingComponent {
    public intl: Internationalization = new Internationalization();
    @ViewChild('point')
    private pointslength: NumericTextBoxComponent;
    public min: number = 1000;
    public max: number = 10000;
    public value: number = 1000;
    public step: number = 100;
    public enabled: boolean = false;
    public format: string = 'n';
    public dropValue: string = 'Range';
    public minValue: Date = new Date(2009, 0, 1);
    public maxValue: Date = new Date(2014, 0, 1);
    public dropDownData: Object = [
        { value: 'Range' },
        { value: 'Points Length' }

    ];
    public fields: Object = { text: 'value', value: 'value' };
    public data: Object[] = this.GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1));
    @ViewChild('chart')
    public chart: ChartComponent;
    // Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Day',
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift',
        skeleton: 'yMMM',
        skeletonType: 'Date',
        scrollbarSettings: {
            range: {
                minimum: new Date(2009, 0, 1),
                maximum: new Date(2014, 0, 1)
            },
            enable: true,
            pointsLength: 1000
        }
    };
    public height: string = '450';
    public width: string = '100%';
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Server Load',
        labelFormat: '{value}MB'
    };
    public tooltip: Object = {
        enable: true, shared: true,
        header : "<b>${point.x}</b>", format : "Server load : <b>${point.y}</b>"
    };
    public legend: Object = {
        visible: false
    };
    public title: string = 'Network Load';
    public animation: Object = { enable: false };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public scrollEnd(args: IScrollEventArgs): void {
        if (this.lazymode.value === 'Range') {
            this.chart.series[0].dataSource = this.GetDateTimeData(args.currentRange.minimum as Date, args.currentRange.maximum as Date);
        } else {
            this.chart.series[0].dataSource = this.GetNumericData(args.currentRange.minimum as number, args.currentRange.maximum as number);
        }
        this.chart.dataBind();
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public GetDateTimeData(start: Date, end: Date): { x: Date, y: number }[] {
        let series1: { x: Date, y: number }[] = [];
        let date: number;
        let value: number = 30;
        let option: DateFormatOptions = {
            skeleton: 'full',
            type: 'dateTime'
        };
        let dateParser: Function = this.intl.getDateParser(option);
        let dateFormatter: Function = this.intl.getDateFormat(option);
        for (let i: number = 0; start <= end; i++) {
            date = Date.parse(dateParser(dateFormatter(start)));
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            } else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = this.getRandomInt(20, 40);
            }
            let point1: { x: Date, y: number } = { x: new Date(date), y: Math.round(value) };
            new Date(start.setDate(start.getDate() + 1));
            series1.push(point1);
        }
        return series1;
    }
    public GetNumericData(start: number, end: number): { x: number, y: number }[] {
        let series1: { x: number, y: number }[] = [];
        let value: number = 30;
        for (let i: number = start; i <= end; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            } else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = this.getRandomInt(20, 40);
            }
            let point: { x: number, y: number } = { x: i, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    }
    public getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public minChange(args: ChangedEventArgs): void {
        this.chart.primaryXAxis.scrollbarSettings.range.minimum = args.value;
        this.chart.refresh();
    };
    public maxChange(args: ChangedEventArgs): void {

        this.chart.primaryXAxis.scrollbarSettings.range.maximum = args.value;
        this.chart.refresh();

    }
    public pointChange(arg: NumericChange): void {
        this.chart.primaryXAxis.scrollbarSettings.pointsLength = arg.value;
        this.chart.refresh();
    }
    public modeChange(arg: ChangeEventArgs): void {
        let min: number | Date;
        let max: number | Date;
        if (arg.value === 'Range') {
            this.chart.primaryXAxis.valueType = 'DateTime';
            min = this.chart.primaryXAxis.scrollbarSettings.range.minimum = new Date(2009, 0, 1);
            max = this.chart.primaryXAxis.scrollbarSettings.range.maximum = new Date(2014, 0, 1);
            this.chart.series[0].dataSource = this.GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1));
            this.chart.refresh();
            this.minDate.enabled = true;
            this.maxDate.enabled = true;
            this.pointslength.enabled = false;
        } else {
            this.chart.primaryXAxis.valueType = 'Double';
            this.chart.primaryXAxis.scrollbarSettings.range.minimum = null;
            this.chart.primaryXAxis.scrollbarSettings.range.maximum = null;
            this.chart.primaryXAxis.scrollbarSettings.pointsLength = 1000;
            this.chart.series[0].dataSource = this.GetNumericData(1, 200);
            this.chart.refresh();
            this.minDate.enabled = false;
            this.maxDate.enabled = false;
            this.pointslength.enabled = true;
        }
    };

    @ViewChild('mode')
    public lazymode: DropDownListComponent;
    @ViewChild('min')
    public minDate: DatePickerComponent;
    public minimumDate: Date = new Date(2009, 0, 1);
    @ViewChild('max')
    public maxDate: DatePickerComponent;
    public maximumDate: Date = new Date(2014, 0, 1);
    constructor() {
        //code
    };
}
