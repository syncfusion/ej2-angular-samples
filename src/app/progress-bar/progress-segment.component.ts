import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProgressBar, ITextRenderEventArgs, AnimationModel, FontModel } from '@syncfusion/ej2-progressbar';
import {ILoadedEventArgs, ProgressTheme} from '@syncfusion/ej2-progressbar';
import { Browser } from '@syncfusion/ej2-base';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { loadProgressBarTheme } from './theme-color';

/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'progress-segment.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ProgressBarAllModule]
})

export class ProgressBarProgressSegmentComponent {
    public type1: string = 'Linear';
    public width1: string = '70%';
    public height1: string = '30px';
    public type2: string = 'Circular';
    public width2: string = '200px';
    public height2: string = '200px';
    public trackThickness: number = 15;
    public progressThickness: number = 15;
    public segmentCount: number = Browser.isDevice ? 25 : 50;
    public gapWidth: number = 5;
    public min: number = 0;
    public max: number = 100;
    public value1: number = 40;
    public value2: number = 40;
    public startAngle: number = 220;
    public endAngle: number = 140;
    public progresstimer: any;
    public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    @ViewChild('linear')
    public linear: ProgressBar;
    @ViewChild('circular')
    public circular: ProgressBar;
    public load1(args: ILoadedEventArgs): void {
        let selectedTheme = loadProgressBarTheme(args);
        if (selectedTheme === 'highcontrast') {
            args.progressBar.trackColor = '#969696';
        }

    }
    public load2(args: ILoadedEventArgs): void {
        let selectedTheme: string = loadProgressBarTheme(args);
        switch (selectedTheme) {
            case 'material':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                break;
            case 'fabric':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                break;
            case 'bootstrap':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                break;
            case 'bootstrap4':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                break;
            case 'tailwind':
            case 'tailwind3':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                break;
            case 'bootstrap-dark':
            case 'fabric-dark':
            case 'material-dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                break;
            case 'fluent':
            case 'fluent-dark':
            case 'bootstrap5':
            case 'bootstrap5-dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                break;
            case 'tailwind-dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                break; 
            case 'tailwind3-dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
                break;
            case 'material3':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                break;
            case 'material3-dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                break;
            case "fluent2":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                break;
            case "fluent2-dark":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                break;
            case "fluent2-highcontrast":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                break; 
            default:
                args.progressBar.trackColor = '#969696';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#FFD939"><span></span></div>';
                break;
        }
    }
    ngOnInit() {
        this.progresstiming = this.progresstiming.bind(this);
        setTimeout(() => {
        this.progresstimer = setInterval(this.progresstiming, 2500);
        }, 2000);
    }
    public progresstiming() {
        if (this.circular.value >= this.circular.maximum) {
            clearInterval(this.progresstimer);
        } else {
            this.circular.value = this.value1 += 20;
            this.linear.value = this.value2 += 20;
        }
    }
}