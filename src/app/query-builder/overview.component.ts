/**
 * Overview Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RuleModel, ColumnsModel } from '@syncfusion/ej2-querybuilder';
import { QueryBuilderComponent, QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { closest } from '@syncfusion/ej2-base';
import { TabComponent, TabModule } from '@syncfusion/ej2-angular-navigations'
import { updateRuleValue, getNamedParameterSql, getParameterSql, getMongoQuery, getCELQuery, getSpELQuery } from './util';
import { employeeData } from './data-source';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, QueryBuilderModule, DropDownListModule, NgIf, ButtonModule, TabModule, RadioButtonModule, SBDescriptionComponent]
})

export class OverviewQueryBuilderComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;
    @ViewChild('tabDefault') tabObj: TabComponent;
    private selectedIndex: number = 0;
    dataSource: any = employeeData;
    private selectedContent: HTMLElement;
    public headerText: Object = [
        { text: "SQL" },
        { text: "JSON" },
        { text: "MongoDB" },
        { text: "CEL" },
        { text: "SpEL" }
    ];
    public items: { [key: string]: Object}[] = [{'key': 'AND', 'value': 'and'},{'key': 'OR', 'value': 'or'}];
    private content: string = "";
    private ruleValue: string[] = [];
    private queryType: string = 'inline';
    filter: ColumnsModel[] = [
        { field: "EmployeeID", label: "EmployeeID", type: "number" },
        { field: "FirstName", label: "FirstName", type: "string" },
        { field: "LastName", label: "LastName", type: "string" },
        { field: "HireDate", label: "HireDate", type: "date", format: "dd/MM/yyyy"},
        { field: "Country", label: "Country", type: "string" },
    ];
    fields = { text: 'key', value: 'value' };
    importRules: RuleModel = {
        condition: "and",
        rules: [
            { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Nan" },
            { label: "Employee ID", field: "EmployeeID", type: "number", operator: "equal", value: 1 },
            { condition: "or", rules: [
                    { label: "Hire Date", field: "HireDate", type: "date", operator: "equal", value: "22/11/2023" },
                    { label: "Employee ID", field: "EmployeeID", type: "number", operator: "between", value: [1, 5] }
                ]
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

    change(args: any): void {
        if (args.value === "Inline") {
            this.queryType = 'inline';
        } else if (args.value === "Parameterized") {
            this.queryType = 'parameterized';
        } else {
            this.queryType = 'namedParemeter';
        }
        this.updateContent();
    }

    tabChange(args: any): void {
        this.selectedIndex = args.selectedIndex;
        this.selectedContent = args.selectedContent;
        this.updateRule();
    }

    updateRule(): void {
        switch(this.selectedIndex) {
            case 0:
                this.updateContent();
                break;
            case 1:
                this.convertJSON();
                break;
            case 2:
                this.convertMongoQuery();
                break;
            case 3:
                this.convertCELQuery();
                break;
            case 4:
                this.convertSpELQuery();
                break;
        }
    }
    
    updateContent(): void {
        let qbrule: RuleModel = this.qryBldrObj.getValidRules();
        switch (this.queryType){
            case 'inline':
                this.content = this.qryBldrObj.getSqlFromRules(qbrule);;
                break;
            case 'parameterized':
                this.convertParameterSql(qbrule);
                break;
            default:
                this.convertNamedParameterSql(qbrule);
                break;
        }
        (document.getElementsByClassName('e-text-area-content')[0] as any).value = this.content;
    }
    
    convertParameterSql(qbrule: RuleModel): void {
        this.ruleValue = updateRuleValue(qbrule, false); 
        this.content = this.qryBldrObj.getSqlFromRules(qbrule); 
        this.content =  getParameterSql(this.content, this.ruleValue);
    }

    convertNamedParameterSql(qbrule: RuleModel): void {
        this.ruleValue = updateRuleValue(qbrule, true); 
        this.content = this.qryBldrObj.getSqlFromRules(qbrule); 
        this.content = getNamedParameterSql(this.content, this.ruleValue);
    }

    convertJSON(): void {
        let validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        let jsonValue = JSON.stringify(validRule, null, 4);
        (this.selectedContent.querySelector('.e-text-area-content') as any).value = jsonValue;
    }

    convertMongoQuery(): void {
        let mongoQuery: string = "{";
        const allRules = this.qryBldrObj.getValidRules();
        mongoQuery =  getMongoQuery(allRules, mongoQuery);
        const mongoJSON = JSON.parse(mongoQuery);
        mongoQuery = JSON.stringify(mongoJSON, null, 4);
        (this.selectedContent.querySelector('.e-text-area-content') as any).value = mongoQuery;
    }

    convertCELQuery(): string {
        const allRules = this.qryBldrObj.getValidRules();
        let celQuery: string = '';
        celQuery = getCELQuery(allRules, celQuery);
        (this.selectedContent.querySelector('.e-text-area-content') as any).value = celQuery;
        return (celQuery);
    }

    convertSpELQuery(): void {
        let spELQuery: string = '';
        const allRules = this.qryBldrObj.getValidRules();
        spELQuery = getSpELQuery(allRules, spELQuery);
        (this.selectedContent.querySelector('.e-text-area-content') as any).value = spELQuery;
    }
}