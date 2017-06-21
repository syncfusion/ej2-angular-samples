import { Component, ViewEncapsulation } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-ng-charts';
/**
 * Category axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'category.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryChartComponent {

    public data: Object[] = [
        { x: 'GER', y: 71.7 },
        { x: 'RUS', y: 103.1 },
        { x: 'BRZ', y: 139.1 },
        { x: 'IND', y: 462.1 },
        { x: 'CHN', y: 721.4 },
        { x: 'USA', y: 286.9 },
        { x: 'GBR', y: 60.2 },
        { x: 'JAP', y: 115.1 },
        { x: 'NGR', y: 97.2 },
    ];
    public primaryXAxis: Object = {
        title: 'Countries',
        valueType: 'Category'
    };
    public pointRender(args: IPointRenderEventArgs): void {
        let seriesColor: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
            '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
        args.fill = seriesColor[args.point.index];
    };
    public primaryYAxis: Object = {
        title: 'Users in Millions',
        minimum: 0,
        maximum: 800,
        labelFormat: '{value}M',
        edgeLabelPlacement: 'Shift'
    };
    public tooltip: Object = {
        enable: true,
        format: '${point.x} : ${point.y}'
    };
    public title: string = 'Internet Users – 2016';
    constructor() {
        //code
    };

}
