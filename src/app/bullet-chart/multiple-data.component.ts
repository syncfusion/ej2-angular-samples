import { Component, ViewEncapsulation } from '@angular/core';
import { AnimationModel } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { IBulletLoadedEventArgs, ChartTheme, BulletTooltipSettingsModel } from '@syncfusion/ej2-charts';
/**
 * Local data Source sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multiple-data.html',
    encapsulation: ViewEncapsulation.None
})

export class BulletChartMultipleDataComponent {
    public minimum: number = 5;
    public maximum: number = 45;
    public interval: number = 5;
    public width: string = Browser.isDevice ? '100%' : '80%';
    public tooltip: BulletTooltipSettingsModel = { enable: true };
    public animation: AnimationModel = { enable: false };
    public data: Object[] = [
        {
            requiredStories: 20,
            completedStories: 25,
            name: 'David'
        },
        {
            requiredStories: 25,
            completedStories: 20,
            name: 'Asif'
        },
        {
            requiredStories: 15,
            completedStories: 10,
            name: 'Thomas'
        },
        {
            requiredStories: 40,
            completedStories: 39,
            name: 'Rohit'
        },
        {
            requiredStories: 35,
            completedStories: 40,
            name: 'Virat'
        },
        {
            requiredStories: 28,
            completedStories: 25,
            name: 'Jude'
        },
        {
            requiredStories: 10,
            completedStories: 18,
            name: 'Warner'
        },
        {
            requiredStories: 30,
            completedStories: 28,
            name: 'Malik'
        }
    ];

    public load =  (args: IBulletLoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.bulletChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast');
    }

    public chartTitle: string = 'Sprint Planning';
}