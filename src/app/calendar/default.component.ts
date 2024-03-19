import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**

 * Default Calendar component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['default-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, CalendarModule, SBDescriptionComponent]
})
export class DefaultCalendarComponent {
   constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['default-style.css'];
    }
    onValueChange(args: any):void {
        /*Displays selected date in the label*/
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
}