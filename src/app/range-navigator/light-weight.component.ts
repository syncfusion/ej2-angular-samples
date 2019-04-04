import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, IChangedEventArgs, RangeTooltip, IRangeLoadedEventArgs, DateTime } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { GetDateTimeData } from './data-service';

/**
 *  Sample for range navigator without series
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';

@Component({
    selector: 'control-content',
    templateUrl: 'light-weight.html',
    encapsulation: ViewEncapsulation.None
})

export class LightWeightComponent {

    public valueType: string = 'DateTime';

    public intervalType: string = 'Months';

    public labelFormat: string = 'MMM';

    public value: Date[] = [new Date('2018-06-01'), new Date('2018-07-01')];

    public dataSource: Object[] = GetDateTimeData(new Date('2018-01-01'), new Date('2019-01-01'));

    public xName: string = 'x';

    public yName: string = 'y';

    public width: string = Browser.isDevice ? '100%' : '80%';

    public theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    public navigatorStyleSettings: Object = {
        thumb: {
                    type: 'Rectangle'
                },
    };
    public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };
    public changed(args: IChangedEventArgs): void {
        let currentDate: Date = new Date(+args.start);
        let workingDaysCount: number = 0;
        let holidaysDaysCount: number = 0;
        while (currentDate <= new Date(+args.end)) {
            if (currentDate.getDay() > 0 && currentDate.getDay() <= 5) {
                workingDaysCount++;
            } else {
                holidaysDaysCount++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        document.getElementById('workingcount').innerHTML = ' ' + workingDaysCount;
        document.getElementById('weekendcount').innerHTML = ' ' + holidaysDaysCount;

    };
}