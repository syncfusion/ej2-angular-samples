import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**

 * Default Calendar component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['range-style.css'],
    templateUrl: 'date-range.html',
    encapsulation: ViewEncapsulation.None
})
export class RangesCalendarComponent {
    public minDate: Object = new Date("05/05/2017");
    public maxDate: Object = new Date("05/27/2017");
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['range-style.css'];
    }    
    onValueChange(args: any):void {
	/*Displays selected date in the label*/
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
}