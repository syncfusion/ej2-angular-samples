import { Component, ViewEncapsulation } from '@angular/core';
import { IAccLoadedEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * Smart Labels Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'smart-labels.html',
    encapsulation: ViewEncapsulation.None
})
export class SmartLabelsComponent {
    public data: Object[] = [
        { 'x': 'China', y: 26, text: 'China: 26' },
        { 'x': 'Russia', y: 19, text: 'Russia: 19' },
        { 'x': 'Germany', y: 17, text: 'Germany: 17' },
        { 'x': 'Japan', y: 12, text: 'Japan: 12' },
        { 'x': 'France', y: 10, text: 'France: 10' },
        { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
        { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
        { 'x': 'Italy', y: 8, text: 'Italy: 8' },
        { 'x': 'Australia', y: 8, text: 'Australia: 8' },
        { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
        { 'x': 'Hungary', y: 8, text: 'Hungary: 8' },
        { 'x': 'Brazil', y: 7, text: 'Brazil: 7' },
        { 'x': 'Spain', y: 7, text: 'Spain: 7' },
        { 'x': 'Kenya', y: 6, text: 'Kenya: 6' },
        { 'x': 'Jamaica', y: 6, text: 'Jamaica: 6' },
        { 'x': 'Croatia', y: 5, text: 'Croatia: 5' },
        { 'x': 'Cuba', y: 5, text: 'Cuba: 5' },
        { 'x': 'NewZealand', y: 4, text: 'New Zealand: 4' },
        { 'x': 'Canada', y: 4, text: 'Canada: 4' },
        { 'x': 'Uzbekistan', y: 4, text: 'Uzbekistan: 4' },
        { 'x': 'Kazakhstan', y: 3, text: 'Kazakhstan: 3' },
        { 'x': 'Colombia', y: 3, text: 'Colombia: 3' },
        { 'x': 'Switzerland', y: 3, text: 'Switzerland: 3' },
        { 'x': 'Iran', y: 3, text: 'Iran: 3' },
        { 'x': 'Greece', y: 3, text: 'Greece: 3' },
        { 'x': 'Argentina', y: 3, text: 'Argentina: 3' },
        { 'x': 'Denmark', y: 2, text: 'Denmark: 2' },
        { 'x': 'Sweden', y: 2, text: 'Sweden: 2' },
        { 'x': 'South Africa', y: 2, text: 'South Africa: 2' },
        { 'x': 'Ukraine', y: 2, text: 'Ukraine: 2' },
        { 'x': 'Serbia', y: 2, text: 'Serbia: 2' },
        { 'x': 'Poland', y: 2, text: 'Poland: 2' },
        { 'x': 'North Korea', y: 2, text: 'North Korea: 2' },
        { 'x': 'Belgium', y: 2, text: 'Belgium: 2' },
        { 'x': 'Thailand', y: 2, text: 'Thailand: 2' },
        { 'x': 'Slovakia', y: 2, text: 'Slovakia`: 2' }
    ];
    public legendSettings: Object = {
        visible: true,
        position: 'Right',
        border: { width: 1, color: 'black' },
        height: '70%',
        width: '12%'
    };
    public dataLabel: Object = {
        visible: true, position: 'Outside',
        border: { width: 1, color: 'black'},
        connectorStyle: { length: '10%' }, name: 'text',
    };
    public startAngle: number = 0;
    public endAngle: number = 360;
    public title: string = 'Rio Olympics Gold ';
    public onLoad(args: IAccLoadedEventArgs): void {
        if (args.pie.availableSize.width < 400) {
            args.pie.legendSettings.visible = false;
        } else {
            args.pie.legendSettings.visible = true;
        }
    }
    constructor() {
        //code
    };

}