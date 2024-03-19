/**
 * Default Sample
 */
import { Component, ViewChild } from '@angular/core';
import { RuleModel } from '@syncfusion/ej2-querybuilder';
import { getComponent } from '@syncfusion/ej2-base';
import { QueryBuilderComponent, QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { employeeData } from './data-source';
import { SBDescriptionComponent } from '../common/dp.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DialogModule, TooltipModule, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { SBActionDescriptionComponent } from '../common/adp.component';


declare let hljs: any;

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, QueryBuilderModule, GridModule, DialogModule, TooltipModule, SBDescriptionComponent]
})

export class DefaultQueryBuilderComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;
    @ViewChild('dialog') dialogObj: DialogComponent | any;
    dataSource: any = employeeData;
    values: string[] = ['Mr.', 'Mrs.'];
    dialogAnimation: Object= { effect: 'Zoom', duration: 400, delay: 0 };
    animationSettings: Object = { effect: 'Zoom', duration: 400, delay: 0 };
    closeOnEscape: boolean =false;
    targetElement: HTMLElement | any;
    visible: boolean = false;
    content: string = '';
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

    buttons: Object = [
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

    importClick(): void {
        this.dialogObj.show();
    }

    importQuery(e: any): void {
        try {
            let textAreacontent: HTMLTextAreaElement = document.getElementById('content-area') as HTMLTextAreaElement;
            this.qryBldrObj.setRules(JSON.parse(textAreacontent.value));
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

    updateRule() {
        let content = this.qryBldrObj.getValidRules();
        this.content = document.querySelector('.e-text-area-content .e-pre-content').textContent = JSON.stringify(content, null, 4);
        hljs.highlightBlock(document.querySelector('.e-text-area-content'));
    }

    createdControl(): void {
        this.updateRule();
    }

    beforeopen(): void {
        let dlgContentElement: any = document.getElementById('content-area');
        let errorElem: HTMLElement = document.getElementById('dlgSpan');
        dlgContentElement.value = this.content;
        errorElem.style.visibility = 'hidden';
        if (errorElem.classList.contains("error")) {
            errorElem.classList.remove("error");
        }
    }

    copyClipboard(e: any): void {
        navigator.clipboard.writeText(this.content);
        setTimeout(function() {
            (getComponent(e.target.closest('.e-tooltip'), 'tooltip') as any).close();
        }, 1000);
    }

    onmouseenter(e: any): void {
        const copyElement: HTMLElement = e.target.closest('.e-query-json-preview').querySelector('.copy-tooltip');
        copyElement.classList.remove('e-hidden');
    }

    onmouseleave(e: any): void {
        const copyElement: HTMLElement = e.target.closest('.e-query-json-preview').querySelector('.copy-tooltip');
        copyElement.classList.add('e-hidden');
    }
}
