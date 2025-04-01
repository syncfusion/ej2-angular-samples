import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProgressBar, ITextRenderEventArgs, AnimationModel, FontModel } from '@syncfusion/ej2-progressbar';
import { ILoadedEventArgs, ProgressTheme, ModeType} from '@syncfusion/ej2-progressbar';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { loadProgressBarTheme } from './theme-color';

/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stripes.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ProgressBarAllModule]
})

export class ProgressBarStripesComponent {
    public type: string = 'Linear';
    public width: string = '100%';
    public height: string = '30px';
    public min: number = 0;
    public max: number = 100;
    public value1: number = 20;
    public value2: number = 40;
    public value3: number = 70;
    public value4: number = 100;
    public role1: ModeType = 'Success';
    public role2: ModeType = 'Info';
    public role3: ModeType = 'Warning';
    public role4: ModeType = 'Danger';
    public progressColor1: string = '#d9534f';
    public progressColor2: string = '#f0ad4e';
    public progressColor3: string = '#5bc0de';
    public progressColor4: string = '#5CB85C';
    public isStriped:boolean = true;
    public progressThickness: number = 20;
    public trackThickness: number = 20;
    public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    @ViewChild('linear1')
    public linear1: ProgressBar;
    @ViewChild('linear2')
    public linear2: ProgressBar;
    @ViewChild('linear3')
    public linear3: ProgressBar;
    @ViewChild('linear4')
    public linear4: ProgressBar;
    public onClick = () => {
        let animationBtn: HTMLElement = document.getElementById('animation') as HTMLElement;
        if(! this.linear1.animation.enable) {
            this.linear1.animation.enable = true;
            animationBtn.innerHTML = 'Stop Animation';
            this.linear1.refresh();
            } else {
            this.linear1.animation.enable = false;
            animationBtn.innerHTML = 'Start Animation';
            this.linear1.refresh(); 
            }
            if(!this.linear2.animation.enable) {
                this.linear2.animation.enable = true;
                this.linear2.refresh();
            } else {
                this.linear2.animation.enable = false;
                this.linear2.refresh();
            }
            if(!this.linear3.animation.enable) {
                this.linear3.animation.enable = true;
                this.linear3.refresh();
            } else {
                this.linear3.animation.enable = false;
                this.linear3.refresh();
            }
            if(!this.linear4.animation.enable) {
                this.linear4.animation.enable = true;
                this.linear4.refresh();
            } else {
                this.linear4.animation.enable = false;
                this.linear4.refresh();
            }
    }
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = loadProgressBarTheme(args);
            if (args.progressBar.theme === 'Material') {
                args.progressBar.trackColor = '#eee';
            }
            if (selectedTheme === 'highcontrast') {
                args.progressBar.trackColor = '#969696';
            }

    }
}