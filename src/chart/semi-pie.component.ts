import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-ng-charts';

/**
 * Semi Pie Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'semi-pie.html',
    encapsulation: ViewEncapsulation.None
})
export class SemiPieComponent {
    public data: Object[] = [
        { x: 'Australia', y: 53.3, text: 'Australia' },
        { x: 'China', y: 55.7, text: 'China' },
        { x: 'India', y: 60.5, text: 'India' },
        { x: 'Japan', y: 12.5, text: 'Japan' },
        { x: 'South Africa', y: 79.4, text: 'South Africa' },
        { x: 'United Kingdom', y: 70.9, text: 'United Kingdom' },
        { x: 'United States', y: 45.0, text: 'United States' }
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
        document.getElementById('startangle').innerHTML = rangeMin;
        this.pie.series[0].animation.enable =  false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public endangle(e: Event): void {
        let rangeMax: string = (<HTMLSelectElement>document.getElementById('range-max')).value;
        this.pie.series[0].endAngle = parseFloat(rangeMax);
        document.getElementById('endangle').innerHTML = rangeMax;
        this.pie.series[0].animation.enable =  false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public onChange(e: Event): void {
        let innerRadius: string = (<HTMLSelectElement>document.getElementById('inner-radius')).value;
        this.pie.series[0].innerRadius = innerRadius + '%';
        document.getElementById('innerradius').innerHTML = (parseInt(innerRadius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable =  false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    public startAngle: number = 270;
    public endAngle: number = 90;
    public tooltip: Object = { enable: true, format: '${point.x} : ${point.y}' };
    public title: string = 'Agricultural land percentage';
    constructor() {
        //code
    };

}