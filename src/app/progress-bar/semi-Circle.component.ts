import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProgressBar, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-progressbar';

/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'semi-Circle.html',
    encapsulation: ViewEncapsulation.None
})

export class ProgressBarSemiComponent {
    public type = 'Circular';
    public width: string = '160px';
    public height: string = '160px';
    public min: number = 0;
    public max: number = 100;
    public startAngle: number = 240;
    public endAngle: number = 120;
    public trackThickness: number = 5;
    public progressThickness: number = 5;
    public value: number = 100;
    public cornerRadius: string = 'Round';
    public type1: string = 'Circular';
    public min1: number = 0;
    public max1: number = 100;
    public startAngle1: number = 180;
    public endAngle1: number = 0;
    public trackThickness1: number = 5;
    public progressThickness1: number = 5;
    public value1: number = 100;
    public cornerRadius1: string = 'Round';
    public type2: string = 'Circular';
    public min2: number = 0;
    public max2: number = 100;
    public startAngle2: number = 0;
    public endAngle2: number = 180;
    public trackThickness2: number = 5;
    public progressThickness2: number = 5;
    public value2: number = 100;
    public cornerRadius2: string = 'Round';
    public type3: string = 'Circular';
    public min3: number = 0;
    public max3: number = 100;
    public startAngle3: number = 270;
    public endAngle3: number = 90;
    public trackThickness3: number = 5;
    public progressThickness3: number = 5;
    public value3: number = 100;
    public cornerRadius3: string = 'Round';
    public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    public animation1: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    public animation2: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    public animation3: AnimationModel = { enable: true, duration: 2000, delay: 0 };
    public annotationElementContent(color: string, controlID: string): string {
        let content: string;
        switch (controlID) {
            case 'semicircle':
                content = '100%';
                break;
            case 'semicircle1':
                content = '100%';
                break;
            case 'semicircle2':
                content = '100%';
                break;
            case 'semicircle3':
                content = '100%';
                break;
        }
        return ('<div id="point1" style="font-size:20px;font-weight:bold;color:' + color + '"><span>' + content + '</span></div>');
    }
    public annotationColors: string[] = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#4F46E5', '#FFD939'];
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        switch (selectedTheme) {
            case 'material':
                args.progressBar.annotations[0].content =
                    this.annotationElementContent(this.annotationColors[0], args.progressBar.element.id);
                break;
            case 'fabric':
                args.progressBar.annotations[0].content =
                    this.annotationElementContent(this.annotationColors[1], args.progressBar.element.id);
                break;
            case 'bootstrap':
                args.progressBar.annotations[0].content =
                    this.annotationElementContent(this.annotationColors[2], args.progressBar.element.id);
                break;
            case 'bootstrap4':
                args.progressBar.annotations[0].content =
                    this.annotationElementContent(this.annotationColors[3], args.progressBar.element.id);
                break;
            case 'tailwind':
                args.progressBar.annotations[0].content =
                    this.annotationElementContent(this.annotationColors[4], args.progressBar.element.id);
                break;
            default:
                args.progressBar.annotations[0].content =
                    this.annotationElementContent(this.annotationColors[5], args.progressBar.element.id);
                break;
        }
    }
    @ViewChild('semicircle')
    public semicircle: ProgressBar;
    @ViewChild('semicircle1')
    public semicircle1: ProgressBar;
    @ViewChild('semicircle2')
    public semicircle2: ProgressBar;
    @ViewChild('semicircle3')
    public semicircle3: ProgressBar;
    public onClick = () => {
        this.semicircle.refresh();
        this.semicircle1.refresh();
        this.semicircle2.refresh();
        this.semicircle3.refresh();
    }
}