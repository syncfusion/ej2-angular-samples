import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})
export class TemplateMultiSelectComponent {
    public multidata: { [key: string]: Object }[] = [
        { Name: 'Andrew Fuller', Eimg: '7', Job: 'Team Lead', Country: 'England' },
        { Name: 'Anne Dodsworth', Eimg: '1', Job: 'Developer', Country: 'USA' },
        { Name: 'Janet Leverling', Eimg: '3', Job: 'HR', Country: 'USA' },
        { Name: 'Laura Callahan', Eimg: '2', Job: 'Product Manager', Country: 'USA' },
        { Name: 'Margaret Peacock', Eimg: '6', Job: 'Developer', Country: 'USA' },
        { Name: 'Michael Suyama', Eimg: '9', Job: 'Team Lead', Country: 'USA' },
        { Name: 'Nancy Davolio', Eimg: '4', Job: 'Product Manager', Country: 'USA' },
        { Name: 'Robert King', Eimg: '8', Job: 'Developer ', Country: 'England' },
        { Name: 'Steven Buchanan', Eimg: '10', Job: 'CEO', Country: 'England' }
    ];
    public multifields: Object = { text: 'Name', value: 'Eimg' };
    public multiwatermark: string = 'Select employees';
    public box : string = 'box';
}