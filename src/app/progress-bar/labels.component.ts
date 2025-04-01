import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProgressBar, ITextRenderEventArgs, AnimationModel, FontModel,ILoadedEventArgs,ProgressTheme } from '@syncfusion/ej2-progressbar';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { loadProgressBarTheme } from './theme-color';

/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'labels.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ProgressBarAllModule]
})

export class ProgressBarLabelComponent {
    public type: string = 'Linear';
    public width: string = '100%';
    public height: string = '40px';
    public trackThickness: number = 24;
    public progressThickness: number = 24;
    public min: number = 0;
    public max: number = 100;
    public value1: number = 40;
    public value2: number = 50;
    public value3: number = 60;
    public value4: number = 70;
    public showProgressValue: boolean = true;
    public role1:string = 'Success';
    public role2:string = 'Info';
    public role3:string = 'Warning';
    public role4:string = 'Danger';
    public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    public labelStyle1: FontModel = { textAlignment: 'Center', text: '40% Complete (Success)', color: '#ffffff'};
    public labelStyle2: FontModel = { textAlignment: 'Center', text: '50% Complete (Info)', color: '#ffffff'};
    public labelStyle3: FontModel = { textAlignment: 'Center', text: '60% Complete (Warning)', color: '#ffffff'};
    public labelStyle4: FontModel = { textAlignment: 'Center', text: '70% Complete (Danger)', color: '#ffffff'};
    @ViewChild('linear1')
    public linear1: ProgressBar;
    @ViewChild('linear2')
    public linear2: ProgressBar;
    @ViewChild('linear3')
    public linear3: ProgressBar;
    @ViewChild('linear4')
    public linear4: ProgressBar;
    public onClick = () => {
        this.linear1.refresh();
        this.linear2.refresh();
        this.linear3.refresh();
        this.linear4.refresh();
    }
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = loadProgressBarTheme(args);
        if (args.progressBar.theme === 'Material') {
            args.progressBar.trackColor = '#eee';
        }
        if (selectedTheme === 'highcontrast') {
            args.progressBar.labelStyle.color = '#000000';
            args.progressBar.trackColor = '#969696';
        }
    }
}