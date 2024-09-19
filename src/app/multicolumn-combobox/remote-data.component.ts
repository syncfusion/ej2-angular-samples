/**
 * MultiColumn Combobox Remote DataBinding Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    styleUrls: ['remote-data.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class RemotetMultiComboBoxComponent {
    // define the remote data
    public data: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/Employees',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    // maps the appropriate column to fields property
    public fields: Object = { text: 'FirstName', value: 'EmployeeID' };
    // bind the Query instance to query property
    public query: Query = new Query().select(['FirstName', 'EmployeeID', 'Designation', 'Country']).take(10).requiresCount();
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select a name';
}
