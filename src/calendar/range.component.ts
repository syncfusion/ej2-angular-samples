import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**

 * Default Calendar Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['calendar-style.css'],
    templateUrl: 'range.html',
    encapsulation: ViewEncapsulation.None
})
export class RangesCalendarComponent {
    public minDate: Object = new Date("05/05/2017");
    public maxDate: Object = new Date("05/27/2017");
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['calendar-style.css'];
    }
    onValueChange(args: any):void {
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
}