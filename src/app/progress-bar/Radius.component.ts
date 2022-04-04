import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProgressBar, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-progressbar';

/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'Radius.html',
    encapsulation: ViewEncapsulation.None,
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    }
    public load1(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.progressBar.progressColor = '#FFFFFF';
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        switch (selectedTheme) {
            case 'material':
                args.progressBar.trackColor = '#e91e63';
                break;
            case 'fabric':
                args.progressBar.trackColor = '#0078D6';
                break;
            case 'bootstrap':
                args.progressBar.trackColor = '#317ab9';
                break;
            case 'tailwind':
                args.progressBar.progressColor = '#4F46E5';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                break;
            case 'highcontrast':
                args.progressBar.trackColor = '#FFD939';
                args.progressBar.progressColor = '#000000';
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#000000;fill:#ffffff"><span>60%</span></div>';
                break;
            case 'bootstrap-dark':
            case 'fabric-dark':
            case 'material-dark':
                args.progressBar.progressColor = '#9A9A9A';
                break;
            case 'tailwind-dark':
                args.progressBar.progressColor = '#22D3EE';
                break;
            case 'bootstrap5':
            case 'bootstrap5-dark':
                args.progressBar.progressColor = '#0D6EFD';
                break;
            case 'fluent':
                if (args.progressBar.element.id === "full-background") {
                    args.progressBar.trackColor = '#0D6EFD';
                } else {
                    args.progressBar.progressColor = '#0D6EFD';
                }
                break;
            case 'fluent-dark':
                args.progressBar.progressColor = '#0D6EFD';
                break;
            default :
                args.progressBar.trackColor = '#007bff';
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
