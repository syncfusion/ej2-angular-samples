/**
 * MultiColumn Combobox Template Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class TemplateMultiComboBoxComponent {
    @ViewChild('template')
    public multicomboBoxObj: MultiColumnComboBoxComponent;
    // define the JSON of data
    public empData: Object[] = [
        { Name: "Andrew Fuller", Eimg: "7", Designation: "Team Lead", Country: "England", DateofJoining: "12/10/2010" },
        { Name: "Anne Dodsworth", Eimg: "1", Designation: "Developer", Country: "USA", DateofJoining: "10/05/2000" },
        { Name: "Janet Leverling", Eimg: "3", Designation: "HR", Country: "Russia", DateofJoining: "23/02/2016" },
        { Name: "Laura Callahan", Eimg: "2", Designation: "Product Manager", Country: "Ukraine", DateofJoining: "30/1/2012" },
        { Name: "Margaret Peacock", Eimg: "6", Designation: "Developer", Country: "Egypt", DateofJoining: "15/08/2014" },
        { Name: "Michael Suyama", Eimg: "9", Designation: "Team Lead", Country: "Africa", DateofJoining: "27/07/2015" },
        { Name: "Nancy Davolio", Eimg: "4", Designation: "Product Manager", Country: "Australia", DateofJoining: "24/05/2017" },
        { Name: "Robert King", Eimg: "8", Designation: "Developer", Country: "India", DateofJoining: "08/09/2018" },
        { Name: "Steven Buchanan", Eimg: "10", Designation: "CEO", Country: "Ireland", DateofJoining: "05/03/2020" }
    ];
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Eimg' };
    // set the placeholder to MultiColumn ComboBox input element
    public waterMark: string = 'Select an employee';
    // set the gridSettings to MultiColumn ComboBox input element
    public gridSettings: Object = { rowHeight: 40 };
}
