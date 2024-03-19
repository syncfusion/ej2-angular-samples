/**
 * DropDownList inline Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'inline.html',
    styleUrls: ['inline.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DropDownListModule, SBDescriptionComponent]
})
export class InlineDropDownListComponent {
    // define the JSON of data
   public data: { [key: string]: Object }[] = [
        { Name: 'Andrew', Eimg: '7'},
        { Name: 'Anne', Eimg: '1' },
        { Name: 'Janet', Eimg: '3'},
        { Name: 'Laura', Eimg: '2'},
        { Name: 'Margaret', Eimg: '6'},
        { Name: 'Michael', Eimg: '9'},
        { Name: 'Nancy', Eimg: '4'},
        { Name: 'Robert', Eimg: '8'},
        { Name: 'Steven', Eimg: '10'}
    ];
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name'};
    // set the height of the popup element
    public height: string = '200px';
    public width: string = '65px';
    public popupWidth: string = '140px';
    // set the placeholder to DropDownList input element
    public value: string = 'Michael';
    // set the placeholder to DropDownList input element
    public watermark: string = 'Select an employee';
}
