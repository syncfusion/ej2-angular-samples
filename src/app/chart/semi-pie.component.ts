import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Semi Pie Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'semi-pie.html',
    encapsulation: ViewEncapsulation.None
})
export class SemiPieComponent {
    public data: Object[] = [
        { x: 'Australia', y: 53, text: 'AUS: 14%' },
        { x: 'China', y: 56, text: 'CHN: 15%' },
        { x: 'India', y: 61, text: 'IND: 16%' },
        { x: 'Japan', y: 13, text: 'JPN: 3%' },
        { x: 'South Africa', y: 79, text: 'ZAF: 21%' },
        { x: 'United Kingdom', y: 71, text: 'UK: 19%' },
        { x: 'United States', y: 45, text: 'USA: 12%' }
    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
        position: 'Top'
    };
    //Initializing DataLabel
    public dataLabel: Object = {
        visible: true, position: 'Outside',
        connectorStyle: { length: '10%' }, name: 'text',
        font: { size: '14px' }
    };
    @ViewChild('pie')
    public pie: AccumulationChartComponent;
    public startangle(e: Event): void {
        let rangeMin: string = (<HTMLSelectElement>document.getElementById('range-min')).value;
        this.pie.series[0].startAngle = parseFloat(rangeMin);
        document.getElementById('range-minText').innerHTML = rangeMin;
        this.pie.series[0].animation.enable =  false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public endangle(e: Event): void {
        let rangeMax: string = (<HTMLSelectElement>document.getElementById('range-max')).value;
        this.pie.series[0].endAngle = parseFloat(rangeMax);
        document.getElementById('range-maxText').innerHTML = rangeMax;
        this.pie.series[0].animation.enable =  false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public onChange(e: Event): void {
        let innerRadius: string = (<HTMLSelectElement>document.getElementById('inner-radius')).value;
        this.pie.series[0].innerRadius = innerRadius + '%';
        document.getElementById('inner-radiusText').innerHTML = (parseInt(innerRadius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable =  false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
     // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    }
     // custom code end
    public explode: boolean = true;
    public enableAnimation: boolean = false;
    public startAngle: number = 270;
    public endAngle: number = 90;
    public tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y}%</b>' };
    public title: string = 'Agricultural Land percentage';
    constructor() {
        //code
    };

}