/**
 * Rule Template Sample
 */

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { QueryBuilder, RuleModel } from '@syncfusion/ej2-querybuilder';
import { employeeData } from './data-source';

@Component({
    selector: 'control-content',
    templateUrl: 'rule-template.html',
    styleUrls: ['rule-template.css'],
    encapsulation: ViewEncapsulation.None
})

export class RuleTemplateQueryBuilderComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilder;
    dataSource: any = employeeData;
    public items:  { [key: string]: Object}[] = [{field:'USA', label:'USA'},{field:'England', label:'England'},{field:'India',label:'India'},{field:'Spain',label:'Spain'}];
    public fields: Object = { text: 'field', value: 'label' };
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
    fieldChange(e: any): void {
        this.qryBldrObj.notifyChange(e.value, e.element, 'field');
    }
    operatorChange(e: any): void {
        this.qryBldrObj.getRule(e.event.target).operator = e.value;
    }
    valueChange(e: any): void {
        this.qryBldrObj.notifyChange(e.value, e.element, 'value');
    }
}
