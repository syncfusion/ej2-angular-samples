/**
 * Default Sample
 */
import { Component, ViewChild } from '@angular/core';
import { getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { QueryBuilderComponent, RuleModel, QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { QueryLibrary } from '@syncfusion/ej2-querybuilder';
import { TabComponent, TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { employeeData } from './data-source';
import { SBDescriptionComponent } from '../common/dp.component';
import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { RadioButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

QueryBuilderComponent.Inject(QueryLibrary);

declare let hljs: any;

@Component({
    selector: 'control-content',
    templateUrl: 'mongo.html',
    styleUrls: ['mongo.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, QueryBuilderModule, RadioButtonAllModule, DropDownButtonModule, DialogModule, TabAllModule, TooltipModule, SBDescriptionComponent]
})

export class MongoComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent | any;
    @ViewChild('tabDefault') tabObj: TabComponent | any;
    @ViewChild('dialog') dialogObj: DialogComponent | any;
    public targetElement: HTMLElement | any;
    public items: ItemModel[] = [
        {
            text: 'Import Mongo Query'
        },
        {
            text: 'Import Inline Sql'
        },
        {
            text: 'Import Parameter Sql'
        },
        {
            text: 'Import Named Parameter Sql'
        }
    ];
    public visible: boolean = false;
    public header: string | any;
    public visible1: boolean = false;
    public dialogAnimation: Object= { effect: 'Zoom', duration: 400, delay: 0 };
    public animationSettings: Object = { effect: 'Zoom', duration: 400, delay: 0 };
    public closeOnEscape: boolean =false;
    public currentvalue: any = {
        value: '',
        rule: ''
    };
    footerTemplate: string='<span style="float: left;font-size: 14px;padding-left: 15px;color: rgba(0, 0, 0, 0.54);">Click the close button to Exit</span>';
    private selectedIndex: number = 0;
    dataSource: any = employeeData;
    private selectedContent: HTMLElement | any;
    public headerText: any = [
        { text: "SQL" },
        { text: "MongoDB" }
    ];
    private content: string = "";
    private queryType: string = 'inline';

    fields = { text: 'key', value: 'value' };
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

    public buttons: Object = [
        {
            'click': () => {
                this.dialogObj.hide();
            },
              buttonModel: {
                content: 'Cancel',
                cssClass: 'e-flat'
            }
        },
        {
            'click': this.importQuery.bind(this),
            buttonModel: {
                content:'Import',
                isPrimary: true
            }
        }
    ];

    onSelect(args: MenuEventArgs){
        let validRule: RuleModel = this.qryBldrObj.getValidRules();
        switch (args.item.text) {
            case 'Import Mongo Query':
                let mongoQuery = JSON.parse(this.qryBldrObj.getMongoQuery(validRule));
                mongoQuery = JSON.stringify(mongoQuery, null, 4);
                this.currentvalue.value = mongoQuery;
                this.currentvalue.rule = 'mongo';
                this.header = "Mongo Query";
                this.dialogObj.show();
                break;
            case 'Import Inline Sql':
                this.currentvalue.value = this.qryBldrObj.getSqlFromRules(validRule);
                this.currentvalue.rule = 'sql';
                this.header = "SQL";
                this.dialogObj.show();
                break;
            case 'Import Parameter Sql':
                this.currentvalue.value = JSON.stringify(this.qryBldrObj.getParameterizedSql(validRule), null, 4);
                this.currentvalue.rule = 'parameter';
                this.header = "Parameter SQL";
                this.dialogObj.show();
                break;
            case 'Import Named Parameter Sql':
                this.currentvalue.value = JSON.stringify(this.qryBldrObj.getParameterizedNamedSql(validRule), null, 4);
                this.currentvalue.rule = 'namedparameter';
                this.header = "NamedParameter SQL";
                this.dialogObj.show();
                break;
            default:
                break;
        }
    }
    importQuery(e: any): void {
        try {
            let textAreacontent: HTMLTextAreaElement = document.getElementById('content-area') as HTMLTextAreaElement;
            if (this.currentvalue.rule != 'sql') {
                let textAreaValue: any = JSON.parse(textAreacontent.value);
            }
            switch (this.currentvalue.rule) {
                case 'mongo':
                    this.qryBldrObj.setMongoQuery(textAreacontent.value);
                    break;
                case 'namedparameter':
                    this.qryBldrObj.setParameterizedNamedSql(JSON.parse(textAreacontent.value));
                    break;
                case 'parameter':
                    this.qryBldrObj.setParameterizedSql(JSON.parse(textAreacontent.value));
                    break;
                case 'sql':
                    this.qryBldrObj.setRulesFromSql(textAreacontent.value, true);
                    break;
            }
            this.updateRule();
            this.dialogObj.hide();
        } catch (error) {
            let errorElem: HTMLElement = document.getElementById('dlgSpan') as HTMLElement;
            if (!errorElem.classList.contains("error")) {
                errorElem.style.visibility = 'visible';
                errorElem.classList.add("error");
            }
        }
    }

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
                this.convertMongoQuery();
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

    convertJSON(): void {
        let validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        let jsonValue = JSON.stringify(validRule, null, 4);
        this.content = this.selectedContent.querySelector('.e-text-area-content .e-pre-content').textContent = jsonValue;
        hljs.highlightBlock(this.selectedContent.querySelector('.e-text-area-content'));
    }

    convertMongoQuery(): void{
        let validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        let mongoQuery = JSON.parse(this.qryBldrObj.getMongoQuery(validRule));
        mongoQuery =  JSON.stringify(mongoQuery, null, 4);
        this.content = this.selectedContent.querySelector('.e-text-area-content .e-pre-content').textContent = mongoQuery;
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
