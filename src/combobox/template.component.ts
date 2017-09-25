/**
 * ComboBox Template Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})
export class TemplateComboBoxComponent {
    public data: { [key: string]: Object }[] = [
        { name: 'Andrew Fuller', eimg: '7', designation: 'Team Lead', country: 'England' },
        { name: 'Anne Dodsworth', eimg: '1', designation: 'Developer', country: 'USA' },
        { name: 'Janet Leverling', eimg: '3', designation: 'HR', country: 'USA' },
        { name: 'Laura Callahan', eimg: '2', designation: 'Product Manager', country: 'USA' },
        { name: 'Margaret Peacock', eimg: '6', designation: 'Developer', country: 'USA' },
        { name: 'Michael Suyama', eimg: '9', designation: 'Team Lead', country: 'USA' },
        { name: 'Nancy Davolio', eimg: '4', designation: 'Product Manager', country: 'USA' },
        { name: 'Robert King', eimg: '8', designation: 'Developer ', country: 'England' },
        { name: 'Steven Buchanan', eimg: '10', designation: 'CEO', country: 'England' }
    ];
    public fields: Object = { text: 'name', value: 'eimg' };
    public height: string = '250px';
    public watermark: string = 'Select an employee';
}