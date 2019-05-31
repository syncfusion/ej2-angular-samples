import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, DateTime, AreaSeries, Chart, RangeTooltip } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for multi level labels without series
 */
let data: Object[] = [];
let value: number = 0; let point: Object = {};
for (let j: number = 1; j < 1090; j++) {
    value += (Math.random() * 10 - 5);
    value = value < 0 ? Math.abs(value) : value;
    point = { x: new Date(2000, 0, j), y: value, z: value + 10 };
    data.push(point);
}
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';

@Component({
    selector: 'control-content',
    templateUrl: 'multilevel.html',
    encapsulation: ViewEncapsulation.None
})

export class MultilevelComponent {
    public tooltip: Object = { enable: true, displayMode: 'Always'  };

    public dataSource: Object = data;

    public width: string = Browser.isDevice ? '100%' : '80%';

    public theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    public value: Object = [new Date('2001-01-01'), new Date('2002-01-01')];

     public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };

}