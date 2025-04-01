import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { AnimationModel, ProgressTheme, ILoadedEventArgs, TooltipSettingsModel, ProgressBar } from '@syncfusion/ej2-progressbar';
import { Button } from '@syncfusion/ej2-buttons';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { loadProgressBarTheme } from './theme-color';

/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ProgressBarAllModule]
})

export class ProgressBarTooltipComponent {
    public type: string = 'Linear';
    public width: string = '100%';
    public height: string = '60';
    public min: number = 0;
    public max: number = 100;
    public type1: string = 'Linear';
    public width1: string = '650';
    public height1: string = '60';
    public min1: number = 0;
    public max1: number = 100;
    public isIndeterminate1: boolean = true;
    public type2: string = 'Linear';
    public width2: string = '650';
    public height2: string = '60';
    public min2: number = 0;
    public max2: number = 100;
    public secondaryProgress2: number = 62;
    public type3: string = 'Linear';
    public width3: string = '650';
    public height3: string = '60';
    public min3: number = 0;
    public max3: number = 100;
    public gapWidth3: number = 10;
    public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    public tooltip: Object = {
        enable: true
    };
    @ViewChild('linear')
    public linear: ProgressBar;
    @ViewChild('linear1')
    public linear1: ProgressBar;
    @ViewChild('linear2')
    public linear2: ProgressBar;
    @ViewChild('linear3')
    public linear3: ProgressBar;
    @ViewChild('linear4')
    public linear4: ProgressBar;
    public onClick = () => {
        this.linear.refresh();
        this.linear1.refresh();
        this.linear2.refresh();
        this.linear3.refresh();
        this.linear4.refresh();
    }
    public load(args: ILoadedEventArgs): void {
        let div: HTMLCollection = document.getElementsByClassName('progressbar-label-tooltip');
        let selectedTheme: string = loadProgressBarTheme(args);
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
        || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'Tailwind3Dark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark' || args.progressBar.theme === 'Fluent2Dark' || args.progressBar.theme === 'Fluent2HighContrast') {
                for (let i = 0; i < div.length; i++) {
                    div[i].setAttribute('style', 'color:white');
                }
        } else if (selectedTheme.indexOf('bootstrap') > -1) {
            for (let i = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'top: 0px');
            }
        }
    }
}