import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**

 * Default Calendar component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['calendar-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultCalendarComponent {

   constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['calendar-style.css'];
    }
    onValueChange(args: any):void {
        /*Displays selected date in the label*/
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
}