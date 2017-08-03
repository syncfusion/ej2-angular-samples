import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**

 * Default Calendar Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['calendar-style.css'],
    templateUrl: 'special.html',
    encapsulation: ViewEncapsulation.None
})
export class SpecialCalendarComponent {
     constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['calendar-style.css'];
    }
    onLoad(args: any) {
        if (args.date.getDate() === 10) {
            let span: HTMLElement;
            span = document.createElement('span');
            span.setAttribute('class', 'e-icons highlight');
            args.element.appendChild(span);
            args.element.setAttribute('title',"Birthday !");
            args.element.setAttribute('data-val',"Birthday !");
        }
        if (args.date.getDate() === 15) {
            args.element.className = 'special';
            args.element.setAttribute('title', "Farewell");
            args.element.setAttribute('data-val',"Farewell !");
        }
        if (args.date.getDate() === 20) {
            args.element.className = 'daycell';
        }
    }
    onValueChange(args: any) {
        let title: string = (<HTMLElement>event.currentTarget).querySelector(".e-day").getAttribute('data-val');
        title = title == null ? "" : " ( "+title+" )";
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString() + title;
    }
}