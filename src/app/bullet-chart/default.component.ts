import { Component, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { BulletTooltipSettingsModel, AnimationModel, BulletChartAllModule } from '@syncfusion/ej2-angular-charts';
import { TextPosition, IBulletLoadedEventArgs, ChartTheme, MarginModel } from '@syncfusion/ej2-charts';
import { loadBulletChartTheme } from './theme-color';
/**
 * Local data Source sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BulletChartAllModule]
})

export class BulletChartDefaultComponent {
    public width: string = Browser.isDevice ? '100%' : '80%';
    public tooltip: BulletTooltipSettingsModel = { enable: true };
    public animation: AnimationModel = { enable: false };

    public titleRevenue: string = 'Revenue';
    public titleProfit: string = 'Profit';
    public titleAvg: string = 'Avg Order Size';
    public titleCustomers: string = 'New Customers';
    public titleRating: string = 'Cust Satisfaction';

    public width1: string = '80%';
    public minimum1: number = 0;
    public maximum1: number = 300;
    public interval1: number = 50;
    public data1: Object[] =  [{ value: 270, target: 250 }];

    public minimum2: number = 0;
    public maximum2: number = 30;
    public interval2: number = 5;
    public data2: Object[] =  [{ value: 23, target: 27 }];

    public minimum3: number = 0;
    public maximum3: number = 600;
    public interval3: number = 100;
    public data3: Object[] =  [{ value: 350, target: 550 }];

    public minimum4: number = 0;
    public maximum4: number = 2500;
    public interval4: number = 500;
    public data4: Object[] =  [{ value: 1600, target: 2100 }];

    public minimum5: number = 0;
    public maximum5: number = 5;
    public interval5: number = 1;
    public data5: Object[] =  [{ value: 4.9, target: 4 }];

    public load =  (args: IBulletLoadedEventArgs) => {
        loadBulletChartTheme(args);
    }

    public positionTitle: TextPosition = Browser.isDevice ? 'Top' : 'Left';

    public margin1: MarginModel = {
        left: Browser.isDevice ? 10 : 62,
        right: Browser.isDevice ? 10: 19
    };

    public margin2: MarginModel = {
        left: Browser.isDevice ? 10 : 85,
        right: Browser.isDevice ? 10: 19
    };

    public margin3: MarginModel = {
        left: Browser.isDevice ? 10 : 16,
        right: Browser.isDevice ? 10: 19
    };

    public margin4: MarginModel = {
        left: Browser.isDevice ? 10 : 10,
        right: Browser.isDevice ? 10: 19
    };

    public margin5: MarginModel = {
        left: Browser.isDevice ? 10 : 3,
        right: Browser.isDevice ? 10: 19
    };
}