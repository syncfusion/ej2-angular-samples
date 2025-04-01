import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProgressBar, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-progressbar';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { loadProgressBarTheme } from './theme-color';

/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'Radius.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ProgressBarAllModule],
})

export class ProgressBarRadiusComponent {
    public type: string = 'Circular';
    public height: string = '160px';
    public width: string = '160px';
    public min: number = 0;
    public max: number = 100;
    public value: number = 60;
    public radius: string = '100%';
    public innerRadius: string = '190%';
    public theme: string = 'Material';
    public trackThickness: number = 80;
    public cornerRadius: string = 'Round';
    public progressThickness: number = 10;

    public min2: number = 0;
    public max2: number = 100;
    public value2: number = 90;
    public progressThickness2: number = 8;
    public cornerRadius2: string = 'Round';
    public innerRadius2: string = '72';

    public min3: number = 0;
    public max3: number = 100;
    public value3: number = 90;
    public trackThickness3: number = 3;
    public progressThickness3: number = 8;
    public min4: number = 0;
    public max4: number = 100;
    public value4: number = 70;
    public enablePieProgress4: boolean = true;
    public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    public load(args: ILoadedEventArgs): void {
        loadProgressBarTheme(args);
    }
    public load1(args: ILoadedEventArgs): void {
        args.progressBar.progressColor = '#FFFFFF';
        let selectedTheme: string = loadProgressBarTheme(args);
        switch (selectedTheme) {
            case 'material':
                args.progressBar.trackColor = '#f8c2d4';
                args.progressBar.progressColor = '#e91e63';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                break;
            case 'fabric':
                args.progressBar.progressColor = '#0078D6';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                break;
            case 'bootstrap':
                args.progressBar.progressColor = '#317ab9';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                break;
            case 'tailwind':
            case 'tailwind3':
                args.progressBar.progressColor = '#4F46E5';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                break;
            case 'highcontrast':
                args.progressBar.progressColor = '#FFD939';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#FFD939;"><span>60%</span></div>';
                break;
            case 'bootstrap-dark':
            case 'fabric-dark':
            case 'material-dark':
                args.progressBar.progressColor = '#9A9A9A';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                break;
            case 'tailwind-dark':
                args.progressBar.progressColor = '#22D3EE';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                break;
            case 'tailwind3-dark':
                args.progressBar.progressColor = '#6366F1';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
            case 'bootstrap4':
                args.progressBar.progressColor = '#007bff';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                break;
            case 'bootstrap5':
            case 'bootstrap5-dark':
            case 'fluent':
            case 'fluent-dark':
                args.progressBar.progressColor = '#0D6EFD';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                break;
            case 'material3':
                args.progressBar.progressColor = '#6750A4';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                break;
            case 'material3-dark':
                args.progressBar.progressColor = '#D0BCFF';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                break; 
            case 'fluent2':
                args.progressBar.progressColor = '#0F6CBD';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                break;
            case 'fluent2-dark':
                args.progressBar.progressColor = '#115EA3';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                break;
            case 'fluent2-highcontrast':
                args.progressBar.progressColor = '#1AEBFF';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                break;
            default :
                args.progressBar.progressColor = '#D0BCFF';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                break;
        }
}
    @ViewChild('radius1')
    public radius1: ProgressBar;
    @ViewChild('radius2')
    public radius2: ProgressBar;
    @ViewChild('radius3')
    public radius3: ProgressBar;
    @ViewChild('radius4')
    public radius4: ProgressBar;
    public onClick = () => {
        this.radius1.refresh();
        this.radius2.refresh();
        this.radius3.refresh();
        this.radius4.refresh();
    }
}
