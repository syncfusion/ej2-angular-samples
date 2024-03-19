import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**

 * Default Calendar component

 */
@Component({
    selector: 'control-content',
    styleUrls: ['disabled-style.css'],
    templateUrl: 'disabled.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, CalendarModule, SBDescriptionComponent]
})
export class DisabledCalendarComponent {
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['disabled-style.css'];
    }
    onLoad(args: any){
    /*Date need to be disabled*/
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
    onValueChange(args: any) {
	/*Displays selected date in the label*/
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
}