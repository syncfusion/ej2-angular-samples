/**
 * Default Sample
 */
import { Component, ViewChild } from '@angular/core';
import { RuleModel } from '@syncfusion/ej2-querybuilder';
import { Browser } from '@syncfusion/ej2-base';
import { QueryBuilderComponent } from '@syncfusion/ej2-angular-querybuilder';
import { employeeData } from './data-source';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css']
})

export class DefaultQueryBuilderComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;

    dataSource: any = employeeData;
    values: string[] = ['Mr.', 'Mrs.'];

    importRules: RuleModel = {
        'condition': 'and',
        'rules': [{
                'label': 'Employee ID',
                'field': 'EmployeeID',
                'type': 'number',
                'operator': 'equal',
                'value': 1
            },
            {
                'label': 'Title',
                'field': 'Title',
                'type': 'string',
                'operator': 'equal',
                'value': 'Sales Manager'
            }]
        };

        createdControl(): void {
          if (Browser.isDevice) {
              this.qryBldrObj.summaryView = true;
            }
        }
}
