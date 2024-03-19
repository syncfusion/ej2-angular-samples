/**
 * Default Sample
 */
import { Component, ViewChild } from '@angular/core';
import { RuleModel } from '@syncfusion/ej2-querybuilder';
import { QueryBuilderComponent, QueryBuilderModule, ShowButtonsModel } from '@syncfusion/ej2-angular-querybuilder';
import { employeeData } from './data-source';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'lock.html',
    styleUrls: ['lock.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, QueryBuilderModule, SBDescriptionComponent]
})

export class LockComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;
    dataSource: any = employeeData;
    boolOperators: object = [
        { value: 'equal', key: 'Equal' },
    ];
    importRules: RuleModel = {
        condition: "and",
        rules: [
            { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre" },
            { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'] },
            { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29 },
            {
                condition: "or", rules: [
                    { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true },
                    { label: "Primary Framework", field: "PrimaryFramework", type: "string", operator: "equal", value: "React" }
                ]
            },
            { label: "Hire Date", field: "HireDate", type: "date", operator: "between", value: ["22/11/2023", "30/11/2023"] },
        ],
    };
    showButtons: ShowButtonsModel = { lockGroup: true, lockRule: true };
}
