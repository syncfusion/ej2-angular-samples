import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
@Component({
    selector: 'control-content',
    styleUrls: ['presets-style.css'],
    templateUrl: 'presets.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DateRangePickerModule]
})
export class PresetsComponent {
	
    public today: Date = new Date(new Date().toDateString());
    public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
    public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
        - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
        ;
    public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
    public monthEnd: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString());
    public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    public lastEnd: Date = new Date(new Date(new Date().setDate(0)).toDateString());
    public yearStart: Date = new Date(new Date(new Date().getFullYear() - 1, 0, 1).toDateString());
    public yearEnd: Date = new Date(new Date(new Date().getFullYear() - 1, 11, 31).toDateString());

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['presets-style.css'];
    }

}