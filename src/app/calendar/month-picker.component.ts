import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DateRangePickerComponent, CalendarView, CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { Internationalization } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'month-picker.html',
    styleUrls: ['month-picker.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, CalendarModule, SBDescriptionComponent]
})
export class MonthPickerComponent {
    public start: CalendarView = 'Year';
    public depth: CalendarView = 'Year';
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['month-picker.css'];
    }
    onValueChange(args: any): void {
        let Intl: Internationalization = new Internationalization();
        let value: string = Intl.formatDate(args.value, { type: 'dateTime', format: 'MMMM y' });
        /*Displays selected date in the label*/
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + value;
    }
}