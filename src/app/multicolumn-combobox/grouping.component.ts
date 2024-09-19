/**
 * MultiColumn Combobox Grouping Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
@Component({
    selector: 'control-content',
    templateUrl: 'grouping.html',
    styleUrls: ['grouping.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class GroupingMultiComboBoxComponent {
    // define the JSON of data
    public employeeData: Object[] = [
        { Name: "John Smith", Department: "HR", Position: "Manager", PhoneNo: "7801234567", Location: "New York"},
        { Name: "John Doe", Department: "IT", Position: "Developer", PhoneNo: "7812345678", "Location": "San Francisco"},
        { Name: "Alice Brown", Department: "Finance", Position: "Analyst", PhoneNo: "7823456789", Location: "Chicago"},
        { Name: "Robert", Department: "Marketing", Position: "Coordinator", PhoneNo: "7834567890", Location: "Boston"},
        { Name: "Emma Black", Department: "IT", Position: "SysAdmin", PhoneNo: "7845678901", Location: "Seattle"},
        { Name: "Michael", Department: "HR", Position: "Recruiter", PhoneNo: "7856789012", Location: "New York"},
        { Name: "Linda Blue", Department: "Finance", Position: "Controller", PhoneNo: "7856789012", Location: "SanFrancisco"},
        { Name: "Steve Grey", Department: "Marketing", Position: "Specialist", PhoneNo: "7878901234", Location: "Chicago"},
        { Name: "Natalie", Department: "Sales", Position: "Executive", PhoneNo: "7889012345", Location: "Boston"},
        { Name: "Paul Red", Department: "Sales", Position: "Manager", PhoneNo: "7890123456", Location: "Seattle"},
        { Name: "Rachel", Department: "IT", Position: "Developer", PhoneNo: "7901234567", Location: "New York"},
        { Name: "Eric Pink", Department: "Marketing", Position: "Analyst", PhoneNo: "7912345678", Location: "San Francisco"},
        { Name: "Jessica", Department: "HR", Position: "Assistant", PhoneNo: "7923456789", Location: "Chicago"},
        { Name: "James", Department: "Finance", Position: "Auditor", PhoneNo: "7934567890", Location: "Boston"},
        { Name: "Olivia Teal", Department: "Sales", Position: "Developer", PhoneNo: "7945678901", Location: "Seattle"}
    ];
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Department', groupBy: 'Position' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select a name';
}
