/**
 * MultiColumn Combobox Sorting Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
@Component({
    selector: 'control-content',
    templateUrl: 'sorting.html',
    styleUrls: ['sorting.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class SortingMultiComboBoxComponent {
    // define the JSON of data
    public workDetails: { [key: string]: Object; }[] = [
        { Name: "John Smith", YearOfJoining: "15/01/2020", Status: "Active", Experience: 4, Location: "New York"},
        { Name: "John Doe", YearOfJoining: "22/05/2019", Status: "In-active", Experience: 5, Location: "San Francisco"},
        { Name: "Alice Brown", YearOfJoining: "30/07/2021", Status: "Active", Experience: 3, Location: "Chicago"},
        { Name: "Robert White", YearOfJoining: "10/11/2018", Status: "Active", Experience: 5, Location: "Boston"},
        { Name: "Emma Black", YearOfJoining: "05/03/2022", Status: "In-active", Experience: 2, Location: "Seattle"},
        { Name: "Michael Green", YearOfJoining: "19/08/2020", Status: "Active", Experience: 4, Location: "New York"},
        { Name: "Linda Blue", YearOfJoining: "12/12/2017", Status: "Active", Experience: 6, Location: "San Francisco"},
        { Name: "Steve Grey", YearOfJoining: "25/09/2019", Status: "Active", Experience: 4, Location: "Chicago"},
        { Name: "Natalie Gold", YearOfJoining: "17/06/2021", Status: "In-active", Experience: 3, Location: "Boston"},
        { Name: "Paul Red", YearOfJoining: "08/04/2016", Status: "Active", Experience: 8, Location: "Seattle"},
        { Name: "Rachel Orange", YearOfJoining: "21/01/2022", Status: "In-active", Experience: 2, Location: "New York"},
        { Name: "Eric Pink", YearOfJoining: "14/10/2018", Status: "Active", Experience: 5, Location: "San Francisco"},
        { Name: "Jessica Violet", YearOfJoining: "11/11/2021", Status: "Active", Experience: 3, Location: "Chicago"},
        { Name: "James Indigo", YearOfJoining: "19/02/2019", Status: "Active", Experience: 5, Location: "Boston"},
        { Name: "Olivia Teal", YearOfJoining: "30/06/2022", Status: "In-active", Experience: 2, Location: "Seattle"}
        ];
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'YearOfJoining' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select a name';
    //set sort order to ascending
    public sortOrder: string = 'Ascending';
    //set sort type to multi column
    public sortType: string ='MultiColumn';
}
