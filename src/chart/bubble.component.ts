import { Component, ViewEncapsulation } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * Bubble Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bubble.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})

export class BubbleChartComponent {

    public data: Object[] = [
        { x: 92.2, y: 7.8, size: 1.347, text: 'China' },
        { x: 74, y: 6.5, size: 1.241, text: 'India' },
        { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia' },
        { x: 99.4, y: 2.2, size: 0.312, text: 'US' },
        { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil' },
        { x: 54.9, y: 3.7, size: 0.177, text: 'Pakistan' },
        { x: 99, y: 0.7, size: 0.0818, text: 'Germany' },
        { x: 72, y: 2.0, size: 0.0826, text: 'Egypt' },
        { x: 99.6, y: 3.4, size: 0.143, text: 'Russia' },
        { x: 99, y: 0.2, size: 0.128, text: 'Japan' },
        { x: 86.1, y: 4.0, size: 0.115, text: 'Mexico' },
        { x: 92.6, y: 6.6, size: 0.096, text: 'Philippines' },
        { x: 61.3, y: 14.5, size: 0.162, text: 'Nigeria' },
        { x: 56.8, y: 6.1, size: 0.151, text: 'Bangladesh' }];

    public primaryXAxis: Object = {
        title: 'Literacy Rate',
        minimum: 60,
        maximum: 100,
        interval: 5
    };
    public primaryYAxis: Object = {
        title: 'GDP growth rate',
        minimum: -2,
        maximum: 16,
        interval: 2
    };

    public marker: Object = {
        dataLabel: { name: 'text' }
    };
    public tooltip: Object = {
        enable: true,
        format:
        '${point.text}<br/>Literacy Rate : ${point.x}%<br/>GDP Annual Growth Rate : ${point.y}<br/>Population : ${point.size} Billion'
    };

    public pointRender(args: IPointRenderEventArgs): void {
        let seriesColor: string[] = ['#E94649', '#F6B53F', '#6FAAB0', '#C4C24A', '#FB954F', '#D9CEB2', '#FF8D8D',
            '#69D2E7', '#E27F2D', '#6A4B82', '#F6B53F', '#C4C24A', '#FF8D8D', '#69D2E7'];
        args.fill = seriesColor[args.point.index];
    };

    public legend: Object = {
        visible: false
    };

    public title: string = 'World Countries Details';

    constructor() {
        // code
    };
}