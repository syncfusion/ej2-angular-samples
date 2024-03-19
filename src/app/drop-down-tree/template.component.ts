/**
 * Dropdown Tree Template Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DropDownTreeModule, SBDescriptionComponent]
})
export class TemplateDropDownTreeComponent {
    // define the JSON of data
    public data: { [key: string]: Object }[] = [
        { id: 1, name: 'Steven Buchanan', eimg: '10', job: 'General Manager', hasChild: true, expanded: true, status:'busy' },
        { id: 2, pid: 1, name: 'Laura Callahan', eimg: '2', job: 'Product Manager', hasChild: true, status:'online' },
        { id: 3, pid: 2, name: 'Andrew Fuller', eimg: '7', job: 'Team Lead', hasChild: true, status:'away' },
        { id: 4, pid: 3, name: 'Anne Dodsworth', eimg: '1', job: 'Developer', status:'busy' },
        { id: 10, pid: 3, name: 'Lilly', eimg: '5', job: 'Developer', status:'online' },
        { id: 5, pid: 1, name: 'Nancy Davolio', eimg: '4', job: 'Product Manager', hasChild: true, status:'away' },
        { id: 6, pid: 5, name: 'Michael Suyama', eimg: '9', job: 'Team Lead', hasChild: true, status:'online' },
        { id: 7, pid: 6, name: 'Robert King', eimg: '8', job: 'Developer ', status:'online' },
        { id: 11, pid: 6, name: 'Mary', eimg: '6', job: 'Developer ', status:'away' },
        { id: 9, pid: 1, name: 'Janet Leverling', eimg: '3', job: 'HR', status:'online' }
    ];
    // maps the appropriate column to fields property
    public fields: Object = { dataSource: this.data, text: 'name', value: 'id', parentValue: 'pid', hasChildren: 'hasChild' };
    // set the height of the popup element
    public height: string = '300px';
    // set the placeholder to Dropdown Tree input element
    public watermark: string = 'Select an employee';
    
}