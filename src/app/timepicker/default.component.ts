import { Component, ViewEncapsulation, Inject, OnInit, ViewChild } from '@angular/core';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
/**

 * Default TimePicker component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['default-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TimePickerModule]
})
export class DefaultTimePickerComponent {
    
}