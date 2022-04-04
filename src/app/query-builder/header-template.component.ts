/**
 * Header Template Sample
 */

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { QueryBuilderComponent, ColumnsModel } from '@syncfusion/ej2-angular-querybuilder';
import { closest } from '@syncfusion/ej2-base';
import { RuleModel } from '@syncfusion/ej2-querybuilder';

@Component({
    selector: 'control-content',
    templateUrl: 'header-template.html',
    styleUrls: ['header-template.css'],
    encapsulation: ViewEncapsulation.None
})

export class HeaderTemplateQueryBuilderComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;
    public items: { [key: string]: Object}[] = [{'key': 'AND', 'value': 'and'},{'key': 'OR', 'value': 'or'}];
    filter: ColumnsModel[] = [
        { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
        { field: 'FirstName', label: 'First Name', type: 'string'},
        { field: 'LastName', label: 'Last Name', type: 'string'},
        { field: 'HireDate', label: 'Hire Date', type: 'date'},
        { field: 'Country', label: 'Country', type: 'string'}
    ];
    fields = { text: 'key', value: 'value' };
    importRules: RuleModel = {
        'condition': 'and',
        'rules': [{
            'label': 'First Name',
            'field': 'FirstName',
            'type': 'string',
            'operator': 'equal',
            'value': 'Nancy'
        },
        {
            'label': 'Country',
            'field': 'Country',
            'type': 'string',
            'operator': 'equal',
            'value': "USA"
        }
        ]
    };

    conditionChange(e: any): void {
        this.qryBldrObj.notifyChange(e.value, e.element, 'condition');
    }
      
    addGroupClick(e: any): void {
        let btnId: string = e.target.id; 
        let btn: string[]= btnId.split('_');
        this.qryBldrObj.addGroups([{condition: 'or', 'rules': [{}]}], btn[1]);
    }

    addRuleClick(e: any): void {
        let btnId: string = e.target.id; 
        let btn: string[]= btnId.split('_');
        this.qryBldrObj.addRules([{}], btn[1]);
    }
       
    onClick(e: any): void {
       this.qryBldrObj.deleteGroup(closest(e.target.offsetParent, '.e-group-container'));
    }
}
