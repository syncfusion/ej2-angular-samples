import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent, AccumulationChart } from '@syncfusion/ej2-ng-charts';

/**
 * Default Pie
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default-pie.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultPieComponent {
    public data: Object[] = [
        { 'x': 'Chrome', y: 37.42, text: 'Chrome 37.42%' }, { 'x': 'UC Browser', y: 16.94, text: 'UC Browser 16.94%' },
        { 'x': 'iPhone', y: 17.94, text: 'iPhone 17.94%' },
        { 'x': 'Internet Explorer Mobile', y: 2.04, text: 'Internet Explorer Mobile 2.04%' },
        { 'x': 'Others', y: 3.69, text: 'Others 3.69%' }, { 'x': 'Opera mini', y: 11.37, text: 'Opera mini 11.37%' },
        { 'x': 'Android', y: 11.73, text: 'Android 11.73%' }
    ];

    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    public pieangle(e: Event): void {
        let angle: string = (document.getElementById('pieangle') as HTMLSelectElement).value;
        this.pie.series[0].startAngle = parseFloat(angle);
        this.pie.series[0].endAngle = parseFloat(angle);
        this.pie.series[0].animation.enable = false;
        document.getElementById('anglevalue').innerHTML = angle;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public pieradius(e: Event): void {
        let radius: string = (document.getElementById('pieradius') as HTMLSelectElement).value;
        this.pie.series[0].radius = radius + '%';
        document.getElementById('radius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public pieinnerradius(e: Event): void {
        let radius: string = (document.getElementById('pieinnerradius') as HTMLSelectElement).value;
        this.pie.series[0].innerRadius = radius + '%';
        document.getElementById('innerradius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public pieexploderadius(e: Event): void {
        let radius: string = (document.getElementById('pieexploderadius') as HTMLSelectElement).value;
        this.pie.visibleSeries[0].explodeOffset = radius + '%';
        document.getElementById('exploderadius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public pieexplodeindex(e: Event): void {
        let index: number = +(document.getElementById('pieexplodeindex') as HTMLSelectElement).value;
        this.pie.visibleSeries[0].explodeIndex = index;
        document.getElementById('explodeindex').innerHTML = index.toString();
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public animation: Object = {
        enable: false
    };
    public legendSettings: Object = {
        visible: false,
    };
    public dataLabel: Object = {
        visible: true,
        position: 'Outside',
        name: 'text',
        connectorStyle: { type: 'Curve', length: '10%' },
        font: {
            size: '14px'
        }
    };
    public startAngle: number = 0;
    public endAngle: number = 360;
    public tooltip: Object = { enable: true, format: '${point.x} <br> ${point.y} %' };
    public title: string = 'Mobile Browser Statistics';
    constructor() {
        //code
    };

}