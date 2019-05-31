import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

/**
 * MultiSelection Calendar component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['calendar-style.css'],
    templateUrl: 'multi-select.html',
    encapsulation: ViewEncapsulation.None
})
export class MultiSelectionComponent {
    public year: number = new Date().getFullYear();
    public month: number = new Date().getMonth();
    public multiSelection: boolean = true;
    @ViewChild('calendar')
    public calendarObj: CalendarComponent;
    public dates: Date[] = [new Date(this.year, this.month, 10), new Date(this.year, this.month, 15), new Date(this.year, this.month, 25)];
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['calendar-style.css'];
    }
    onValueChange(): void {
        let element: HTMLElement = document.getElementById('multiSelect');
        let tag: HTMLElement = document.createElement('br');
        element.innerHTML = '';
        element.appendChild(tag);
        for (let index: number = 0; index < this.calendarObj.values.length; index++) {
            element.insertBefore(document.createTextNode(this.calendarObj.values[index].toString()), element.children[0]);
            element.insertBefore(document.createElement('br'), element.childNodes[0]);
        }
    }
}
