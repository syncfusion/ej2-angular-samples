/**
 * Template Sample
 */

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { QueryBuilderComponent, TemplateColumn, ColumnsModel, RuleChangeEventArgs, QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { getComponent, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Slider } from '@syncfusion/ej2-inputs';
import { RuleModel } from '@syncfusion/ej2-querybuilder';
import { expenseData } from './data-source';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { getCELQuery, getSpELQuery } from './util';
declare let hljs: any;
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, QueryBuilderModule, DropDownButtonModule, TabAllModule, TooltipModule, QueryBuilderModule, SBDescriptionComponent]
})

export class TemplateQueryBuilderComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;
    private selectedIndex: number = 0;
    private selectedContent: HTMLElement | any;
    private content: string = "";
    public headerText: any = [
        { text: "CEL" },
        { text: "SpEL" }
    ];
    dataSource: Object[] = expenseData;

    paymentTemplate: TemplateColumn = {
        create: () => {
            return createElement('input', { attrs: { 'type': 'text' } });
        },
        destroy: (args: { elementId: string }) => {
            let dropdown: DropDownList = (getComponent(document.getElementById(args.elementId), 'dropdownlist') as DropDownList);
            if (dropdown) {
                dropdown.destroy();
            }
        },
        write: (args: { elements: Element, values: string[] | string, operator: string }) => {
            let ds: string[] = ['Cash', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet'];
            let dropDownObj: DropDownList = new DropDownList({
                    dataSource: ds,
                    value: args.values as string,
                    change: (e: any) => {
                        this.qryBldrObj.notifyChange(e.itemData.value, e.element);
                    }
                });
                dropDownObj.appendTo('#' + args.elements.id);
        }
    };

    transactionTemplate: TemplateColumn = {
        create: () => {
            return createElement('input', { attrs: { 'type': 'checkbox' } });
        },
        destroy: (args: { elementId: string }) => {
            (getComponent(document.getElementById(args.elementId), 'checkbox') as CheckBox).destroy();
        },
        write: (args: { elements: Element, values: string }) => {
            let checked: boolean = args.values === 'IsExpensive' ? true : false;
            const boxObj: CheckBox = new CheckBox({
                label: 'Is Expensive',
                checked: checked,
                change: (e: any) => {
                    this.qryBldrObj.notifyChange(e.checked ? 'expensive' : 'income', e.event.target);
                }
            });
            boxObj.appendTo('#' + args.elements.id);
        }
    };

    amountTemplate: TemplateColumn = {
        create: () => {
            return createElement('div', { className: 'ticks_slider' });
        },
        destroy: (args: { elementId: string }) => {
            (getComponent(document.getElementById(args.elementId), 'slider') as Slider).destroy();
        },
        write: (args: { elements: Element, values: number }) => {
            const ticksSlider: Slider = new Slider({
                value: args.values,
                min: 0,
                max: 100,
                type: 'MinRange',
                // Initialize tooltip with placement and showOn
                tooltip: { isVisible: true, placement: 'Before', showOn: 'Hover' },
                change: (e: any) => {
                    if (e.isInteracted) {
                        this.qryBldrObj.notifyChange(e.value, args.elements);
                    }
                }
            });
            ticksSlider.appendTo('#' + args.elements.id);
        }
    };

    paymentOperators = [
        { value: 'equal', key: 'Equal' },
        { value: 'notequal', key: 'Not Equal' }
    ];

    amountOperators = [
        { key: 'Equal', value: 'equal' },
        { key: 'Not equal', value: 'notequal' },
        { key: 'Greater than', value: 'greaterthan' },
        { key: 'Less than', value: 'lessthan' },
        { key: 'Less than or equal', value: 'lessthanorequal' },
        { key: 'Greater than or equal', value: 'greaterthanorequal' }
    ];

    filter: ColumnsModel[] = [
        {
            field: 'Category', label: 'Category', type: 'string'
        },
        {
            field: 'PaymentMode', label: 'Payment Mode', type: 'string', operators: this.paymentOperators, template: this.paymentTemplate
        },
        {
            field: 'TransactionType', label: 'Transaction Type', type: 'string', operators: [{ key: 'Equal', value: 'equal' }, { key: 'Not Equal', value: 'notequal' }], template: this.transactionTemplate
        },
        { field: 'Description', label: 'Description', type: 'string' },
        { field: 'Date', label: 'Date', type: 'date' },
        {
            field: 'Amount', label: 'Amount', type: 'number', operators: this.amountOperators, template: this.amountTemplate
        }
    ];

    importRules: RuleModel = {
        'condition': 'and',
        'rules': [{
            'label': 'Category',
            'field': 'Category',
            'type': 'string',
            'operator': 'in',
            'value': ['Clothing']
        },
        {
            'condition': 'or',
            'rules': [{
                'label': 'Transaction Type',
                'field': 'TransactionType',
                'type': 'string',
                'operator': 'equal',
                'value': 'checked'
            },
            {
                'label': 'Payment Mode',
                'field': 'PaymentMode',
                'type': 'string',
                'operator': 'equal',
                'value': 'Cash'
            }]
        }, {
            'label': 'Amount',
            'field': 'Amount',
            'type': 'number',
            'operator': 'equal',
            'value': 10
        }
        ]
    };

    displayRule: any = '';

    tabChange(args: any) {
        this.selectedIndex = args.selectedIndex;
        this.selectedContent = args.selectedContent;
        this.updateRule();
    }
    
    updateRule(): void {
        if (isNullOrUndefined(this.selectedContent)) {
            this.selectedContent = document.getElementsByClassName('e-text-area-content')[0].parentElement;
        }
        switch (this.selectedIndex) {
            case 0:
                this.updateCELContentTemplate();
                break;
            case 1:
                this.updateSpCELContentTemplate();
                break;
        }
    }

    updateCELContentTemplate(): void {
        const allRules = this.qryBldrObj.getValidRules();
        let celQuery: string = '';
        celQuery = getCELQuery(allRules, celQuery);
        this.content = celQuery
        this.selectedContent.querySelector('.e-text-area-content .e-pre-content').textContent = this.content;
        hljs.highlightBlock(this.selectedContent.querySelector('.e-text-area-content'));
    }

    updateSpCELContentTemplate(): void {
        const allRules: any = this.qryBldrObj.getValidRules();
        let spelQuery: string = '';
        this.content = getSpELQuery(allRules, spelQuery);
        this.selectedContent.querySelector('.e-text-area-content .e-pre-content').textContent = this.content;
        hljs.highlightBlock(this.selectedContent.querySelector('.e-text-area-content'));
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
