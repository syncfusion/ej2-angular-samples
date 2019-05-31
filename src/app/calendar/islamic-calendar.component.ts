import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ChangedEventArgs, IslamicService } from '@syncfusion/ej2-angular-calendars';
import { addClass , Internationalization } from '@syncfusion/ej2-base';

/**

 * islamic Calendar component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['islamic-calendar.css'],
    templateUrl: 'islamic-calendar.html',
    encapsulation: ViewEncapsulation.None,
	providers: [IslamicService]
})
export class IslamicCalendarComponent {
     public globalize: Internationalization = new Internationalization('en');
     constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['islamic-calendar.css'];
    }  

    onLoad(args: any) {
         /*Date need to be disabled*/
         if (args.date.getDate() === 12 || args.date.getDate() === 17 || args.date.getDate() === 22) {
            args.isDisabled = true;
        }
        /*Dates need to be customized*/
        if (args.date.getDate() === 13) {
            let span: HTMLElement;
            span = document.createElement('span');
            args.element.children[0].className += 'e-day sf-icon-cup highlight';
            addClass([args.element], ['special', 'e-day', 'dinner']);
            args.element.setAttribute('data-val', ' Dinner !');
            args.element.appendChild(span);
          }
          if (args.date.getDate() === 23) {
            let span: HTMLElement;
            span = document.createElement('span');
            args.element.children[0].className += 'e-day sf-icon-start highlight';
            span.setAttribute('class', 'sx !');
            //use the imported method to add the multiple classes to the given element
            addClass([args.element], ['special', 'e-day', 'holiday']);
            args.element.setAttribute('data-val', ' Holiday !');
            args.element.appendChild(span);
          }
    }    
    onValueChange(args: any) {
		(document.getElementById('selected')).textContent = 'Selected Value: ' + this.globalize.formatDate(args.value, { type: 'date', format: 'ddMMMyyyy', calendar: 'islamic' });
    }
}