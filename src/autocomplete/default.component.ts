/**
 * AutoComplete Default functionality Sample
 */
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteComponent } from '@syncfusion/ej2-ng-dropdowns';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html'
})
export class DefaultAutoCompleteComponent {
    @ViewChild('sample')
    public AutoCompleteObj: AutoCompleteComponent;
    public sportsData: string[] = ['Badminton', 'Basketball', 'Cricket',
        'Football', 'Golf', 'Gymnastics',
        'Hockey', 'Rugby', 'Snooker', 'Tennis'];
    public value: string = 'Basketball';
    public waterMark: string = 'e.g. Basketball';
}