/**
 * Rule Template Sample
 */

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { QueryBuilder, RuleModel } from '@syncfusion/ej2-querybuilder';
import { employeeData } from './data-source';
import { SBDescriptionComponent } from '../common/dp.component';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'rule-template.html',
    styleUrls: ['rule-template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, QueryBuilderModule, GridModule, DropDownListModule, RadioButtonModule, SBDescriptionComponent]
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
