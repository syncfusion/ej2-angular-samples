import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProgressBar, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-progressbar';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { loadProgressBarTheme } from './theme-color';
/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'semi-Circle.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ProgressBarAllModule]
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
    public annotationColors: string[] = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#4F46E5', '#FFD939', '#9A9A9A', '#22D3EE', '#0D6EFD', '#6750A4', '#D0BCFF', '#0F6CBD', '#1AEBFF', '#115EA3', '#6366F1'];
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = loadProgressBarTheme(args);
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
            case 'tailwind3':
                args.progressBar.annotations[0].content =
                    this.annotationElementContent(this.annotationColors[4], args.progressBar.element.id);
                break;
            case 'bootstrap-dark':
            case 'fabric-dark':
            case 'material-dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[6], args.progressBar.element.id);
                break;
            case 'fluent':
            case 'fluent-dark':
            case 'bootstrap5':
            case 'bootstrap5-dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[8], args.progressBar.element.id);
                break;
            case 'tailwind-dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[7], args.progressBar.element.id);
                break;
            case 'material3':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[9], args.progressBar.element.id);
                break;
            case 'material3-dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[10], args.progressBar.element.id);
                break;
            case "fluent2":
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[11], args.progressBar.element.id);
                break;
            case "fluent2-dark":
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[13], args.progressBar.element.id);
                break;
            case "fluent2-highcontrast":
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[12], args.progressBar.element.id);
                break;
            case 'tailwind3-dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[14], args.progressBar.element.id);
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