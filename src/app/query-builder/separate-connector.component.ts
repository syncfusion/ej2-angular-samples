import { Component, ViewChild } from '@angular/core';
import { getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { QueryBuilderComponent, RuleModel, QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { QueryLibrary } from '@syncfusion/ej2-querybuilder';
import { TabComponent, TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { employeeData } from './data-source';
import { SBDescriptionComponent } from '../common/dp.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RadioButtonAllModule } from '@syncfusion/ej2-angular-buttons';

QueryBuilderComponent.Inject(QueryLibrary);

declare let hljs: any;

@Component({
    selector: 'control-content',
    templateUrl: 'separate-connector.html',
    styleUrls: ['separate-connector.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, QueryBuilderModule, GridModule, RadioButtonAllModule, TabAllModule, TooltipModule, SBDescriptionComponent]
})

export class SeparateConnectorComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent | any;
    @ViewChild('tabDefault') tabObj: TabComponent | any;
    public currentvalue: any = {
        value: '',
        rule: ''
    };
    private selectedIndex: number = 0;
    dataSource: any = employeeData;
    private selectedContent: HTMLElement | any;
    public headerText: any = [
        { text: "SQL" },
        { text: "JSON" }
    ];
    private content: string = "";
    private queryType: string = 'inline';

    fields = { text: 'key', value: 'value' };
    importRules: RuleModel = {
        condition: "",
        rules: [
            { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre", condition: "and" },
            { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'], condition: "or" },
            { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29, condition: "and" },
            {
                condition: "or", rules: [
                    { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true, condition: "and" },
                    { label: "Primary Framework", field: "PrimaryFramework", type: "string", operator: "equal", value: "React" }
                ]
            },
            { label: "Hire Date", field: "HireDate", type: "date", operator: "between", value: ["22/11/2023", "30/11/2023"] },
        ],
    };

    change(args: any){
        if (args.value === "Inline") {
            this.queryType = 'inline';
        } else if (args.value === "Parameterized") {
            this.queryType = 'parameterized';
        } else {
            this.queryType = 'namedParemeter';
        }
        this.updateContent();
    }

    tabChange(args: any) {
        this.selectedIndex = args.selectedIndex;
        this.selectedContent = args.selectedContent;
        this.updateRule();
    }

    updateRule() {
        switch(this.selectedIndex) {
            case 0:
                this.updateContent();
                break;
            case 1:
                this.convertJsonQuery();
                break;
        }
    }
    
    updateContent(): void {
        let qbrule: RuleModel = this.qryBldrObj.getValidRules();
        if (isNullOrUndefined(this.selectedContent)) {
            this.selectedContent = document.getElementsByClassName('e-text-area-content')[0].parentElement;
        }
        switch (this.queryType){
            case 'inline':
                this.convertInlineSql(qbrule);
                break;
            case 'parameterized':
                this.convertParameterSql(qbrule);
                break;
            default:
                this.convertNamedParameterSql(qbrule);
                break;
        }
    }

    convertInlineSql(qbrule: RuleModel): void {
        let content = this.qryBldrObj.getSqlFromRules(qbrule);
        this.content = this.selectedContent.querySelector('.e-text-area-content .e-pre-content').textContent = content;
        hljs.highlightBlock(this.selectedContent.querySelector('.e-text-area-content'));
    }
    
    convertParameterSql(qbrule: RuleModel): void {
        let content = JSON.stringify(this.qryBldrObj.getParameterizedSql(qbrule), null, 4);
        this.content = this.selectedContent.querySelector('.e-text-area-content .e-pre-content').textContent = content;
        hljs.highlightBlock(this.selectedContent.querySelector('.e-text-area-content'));
    }

    convertNamedParameterSql(qbrule: RuleModel): void {
        let content = JSON.stringify(this.qryBldrObj.getParameterizedNamedSql(qbrule), null, 4);
        this.content = this.selectedContent.querySelector('.e-text-area-content .e-pre-content').textContent = content;
        hljs.highlightBlock(this.selectedContent.querySelector('.e-text-area-content'));
    }

    convertJsonQuery(): void{
        let validRule = this.qryBldrObj.getValidRules();
        this.content = this.selectedContent.querySelector('.e-text-area-content .e-pre-content').textContent = JSON.stringify(validRule, null, 4);
        hljs.highlightBlock(this.selectedContent.querySelector('.e-text-area-content'));
    }

    beforeopen(): void {
        let dlgContentElement: any = document.getElementById('content-area');
        let errorElem: HTMLElement = document.getElementById('dlgSpan');
        if (dlgContentElement && this.currentvalue) {
            dlgContentElement.value = this.currentvalue.value;
            errorElem.style.visibility = 'hidden';
            if (errorElem.classList.contains("error")) {
                errorElem.classList.remove("error");
            }
        }
    }

    copyClipboard(e: any): void {
        navigator.clipboard.writeText(this.content);
        setTimeout(function() {
            (getComponent(e.target.closest('.e-tooltip'), 'tooltip') as any).close();
        }, 1000);
    }

    onmouseenter(e: any): void {
        const copyElement: HTMLElement = e.target.closest('.preview').querySelector('.e-copy-tooltip');
        copyElement.classList.remove('e-hidden');
    }

    onmouseleave(e: any): void {
        const copyElement: HTMLElement = e.target.closest('.preview').querySelector('.e-copy-tooltip');
        copyElement.classList.add('e-hidden');
    }
}
