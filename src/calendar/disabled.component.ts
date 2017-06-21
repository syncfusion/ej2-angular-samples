import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**

 * Default Calendar Component

 */
@Component({
    selector: 'control-content',
    styleUrls: ['calendar-style.css'],
    templateUrl: 'disabled.html',
    encapsulation: ViewEncapsulation.None
})
export class DisabledCalendarComponent {

    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['calendar-style.css'];
    }
    onLoad(args: any){
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
    onValueChange(args: any) {
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
}