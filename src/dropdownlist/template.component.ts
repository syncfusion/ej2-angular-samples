import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})
export class TemplateDropDownListComponent {
    public data: { [key: string]: Object }[] = [
        { name: 'Anne Dodsworth', eimg: '1', job: 'Developer', country: 'USA' },
        { name: 'Laura Callahan', eimg: '2', job: 'Product Manager', country: 'USA' },
        { name: 'Andrew Fuller', eimg: '7', job: 'Team Lead', country: 'England' },
        { name: 'Robert King', eimg: '8', job: 'CEO', country: 'England' },
        { name: 'Michael Suyama', eimg: '9', job: 'Team Lead', country: 'USA' },
        { name: 'Margaret Peacock', eimg: '6', job: 'Developer', country: 'USA' },
        { name: 'Janet Leverling', eimg: '3', job: 'HR', country: 'USA' },
        { name: 'Steven Buchanan', eimg: '10', job: 'Developer', country: 'England' },
        { name: 'Nancy Davolio', eimg: '4', job: 'Product Manager', country: 'USA' },
    ];
    public fields: Object = { text: 'name', value: 'eimg' };
    public height: string = '250px';
    public watermark: string = 'Select an employee';
}