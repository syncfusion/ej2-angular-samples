import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProgressBar, ProgressAnnotation, IProgressValueEventArgs, ILoadedEventArgs, ProgressTheme,
    AnimationModel } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { loadProgressBarTheme } from './theme-color';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
ProgressBar.Inject(ProgressAnnotation);

/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom-content.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ProgressBarAllModule]
})

export class ProgressBarCustomComponent {
    public clearTimeout1: number;
    public clearTimeout2: number;
    public annotationColors: {
        material: string,
        fabric: string,
        bootstrap: string,
        bootstrap4: string,
        highcontrast: string,
        tailwind: string,
        bootstrap5dark: string,
        bootstrapdark: string,
        fabricdark: string,
        materialdark: string,
        tailwinddark: string,
        bootstrap5: string,
        fluent: string,
        fluentdark: string,
        material3: string,
        material3dark: string
        fluent2: string,
        fluent2dark: string,
        fluent2highcontrast: string,
        tailwind3: string,
        tailwind3dark: string,
    } = { fluent: '#0D6EFD', fluentdark: '#0D6EFD',  material: '#e91e63', fabric: '#0078D6', bootstrap: '#317ab9', bootstrap4: '#007bff', highcontrast: '#FFD939', tailwind: '#4F46E5', bootstrap5: '#0D6EFD', bootstrap5dark: '#0D6EFD', bootstrapdark: '#9A9A9A', fabricdark: '#9A9A9A', materialdark: '#9A9A9A', tailwinddark: '#22D3EE', material3 : '#6750A4', material3dark: '#D0BCFF', fluent2: '#0F6CBD', fluent2highcontrast: '#1AEBFF', fluent2dark: '#115EA3', tailwind3: '#4F46E5', tailwind3dark: '#6366F1' };
    public load: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = loadProgressBarTheme(args);
        if (args.progressBar.element.id === 'label-container') {
            // tslint:disable-next-line:max-line-length
            args.progressBar.annotations[0].content = '<div id="point1" class="plabeltxt" style="color: ' + this.annotationColors[selectedTheme.replace(/-/i, '')] + ';font-size:25px "><span>80%</span></div>';
        } else if (args.progressBar.element.id === 'download-container') {
            args.progressBar.annotations[0].content = '<img src="./assets/progress-bar/images/' + selectedTheme.replace(/-/i, '') + '-Download.svg" alt="Download Icon"></img>';
        } else {
            args.progressBar.annotations[0].content = '<img src="./assets/progress-bar/images/' + selectedTheme.replace(/-/i, '') + '-pause.svg" alt="Pause Icon"></img>';
        }
    }
    public type1: string = 'Circular';
    public type2: string = 'Circular';
    public type3: string = 'Circular';
    public min1: number = 0;
    public max1: number = 100;
    public value1: number = 80;
    public startAngle1: number = 180;
    public endAngle1: number = 180;
    public width: string = '150';
    public height: string = '150';
    public min2: number = 0;
    public max2: number = 100;
    public value2: number = 100;
    public min3: number = 0;
    public max3: number = 100;
    public value3: number = 100;
    public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    @ViewChild('annotation1')
    public annotation: ProgressBar;
    @ViewChild('annotation2')
    public pausePlay: ProgressBar;
    @ViewChild('annotation3')
    public downloadProgress: ProgressBar;
    public onClick = () => {
        this.annotation.refresh();
        this.pausePlay.refresh();
        this.downloadProgress.refresh();
    }
    public progressComplete(args: IProgressValueEventArgs): void {
        clearTimeout(this.clearTimeout1);
        this.clearTimeout1 = window.setTimeout(
            () => {
                //tslint:disable-next-line
                this.pausePlay.annotations[0].content = '<img src="./assets/progress-bar/images/' + (this.pausePlay.theme).toLowerCase() + '-Play.svg" alt=\"Play Icon\"></img>';
                this.pausePlay.dataBind();
            },
            2000
        );
    }
    public progressComplete1(args: IProgressValueEventArgs): void {
        clearTimeout(this.clearTimeout2);
        this.clearTimeout2 = window.setTimeout(
            () => {
                //tslint:disable-next-line
                this.downloadProgress.annotations[0].content = '<img src="./assets/progress-bar/images/' + (this.downloadProgress.theme).toLowerCase() + '-Tick.svg" alt=\"Tick Icon\"></img>';
                this.downloadProgress.dataBind();
            },
            2000
        );
    }
}
