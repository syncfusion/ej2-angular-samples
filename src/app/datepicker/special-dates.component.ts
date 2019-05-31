import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { addClass } from '@syncfusion/ej2-base';
@Component({
    selector: 'control-content',
    styleUrls: ['special-style.css'],
    templateUrl: 'special-dates.html',
    encapsulation: ViewEncapsulation.None
})
export class SpecialDatePickerComponent {

    public date: Object = new Date('1/7/2017');

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['special-style.css'];
    }
    onLoad(args: any) {
        /*Date need to be customized*/
        if (args.date.getDate() === 10) {
            let span: HTMLElement;
            span = document.createElement('span');
            span.setAttribute('class', 'e-icons highlight');
            addClass([args.element], ['special', 'e-day', 'birthday']);
            args.element.firstElementChild.setAttribute('title', 'Birthday !');
            args.element.setAttribute('title', ' Birthday !');
            args.element.appendChild(span);
        }
        if (args.date.getDate() === 15) {
            let span: HTMLElement;
            span = document.createElement('span');
            span.setAttribute('class', 'e-icons highlight');
            addClass([args.element], ['special', 'e-day', 'farewell']);
            args.element.firstElementChild.setAttribute('title', 'Farewell !');
            args.element.setAttribute('title', 'Farewell !');
            args.element.appendChild(span);

        }
        if (args.date.getDate() === 25) {
            let span: HTMLElement;
            span = document.createElement('span');
            span.setAttribute('class', 'e-icons highlight');
            addClass([args.element], ['special', 'e-day', 'vacation']);
            args.element.firstElementChild.setAttribute('title', 'Vacation !');
            args.element.setAttribute('title', 'Vacation !');
            args.element.appendChild(span);

        }
    }
}