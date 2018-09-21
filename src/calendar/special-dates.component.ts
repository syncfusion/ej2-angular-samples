import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { addClass } from '@syncfusion/ej2-base';

/**

 * Default Calendar component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['special-style.css'],
    templateUrl: 'special-dates.html',
    encapsulation: ViewEncapsulation.None
})
export class SpecialCalendarComponent {
     constructor(@Inject('sourceFiles') private sourceFiles:any) {
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
             args.element.setAttribute('data-val', 'Birthday!');
            args.element.appendChild(span);
        }
        if (args.date.getDate() === 15) {
            let span: HTMLElement;
            span = document.createElement('span');
            span.setAttribute('class', 'e-icons highlight');
            addClass([args.element], ['special', 'e-day', 'farewell']);
             args.element.firstElementChild.setAttribute('title', 'Farewell !');
            args.element.setAttribute('title', 'Farewell !');
            args.element.setAttribute('data-val', 'Farewell!');
            args.element.appendChild(span);
        }
        if (args.date.getDate() === 20) {
           let span: HTMLElement;
            span = document.createElement('span');
            span.setAttribute('class', 'e-icons highlight');
            addClass([args.element], ['special', 'e-day', 'vacation']);
            args.element.firstElementChild.setAttribute('title', 'Vacation !');
            args.element.setAttribute('title', 'Vacation !');
            args.element.setAttribute('data-val', 'Vacation!');
            args.element.appendChild(span);
        }
    }    
    onValueChange(args: any) {
		let title: string = '';
        if(args.event){
	        /*Displays selected date in the label*/
            title = args.event.currentTarget.getAttribute('data-val');
            title = title == null ? "" : " ( "+title+" )";
        }
		(document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString() + title;
    }
}