/**
 * Template Sample
 */

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { QueryBuilderComponent, TemplateColumn, ColumnsModel, RuleChangeEventArgs  } from '@syncfusion/ej2-angular-querybuilder';
import { getComponent, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Slider } from '@syncfusion/ej2-inputs';
import { RuleModel } from '@syncfusion/ej2-querybuilder';
import { expenseData } from './data-source';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateQueryBuilderComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;
    @ViewChild('radio') radioButton: RadioButtonComponent;
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
                    this.qryBldrObj.notifyChange(e.value, args.elements);
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

    updateRule(args: RuleChangeEventArgs ): void {
        if (this.radioButton.checked) {
            this.displayRule = this.qryBldrObj.getSqlFromRules(args.rule);
        } else {
            this.displayRule = JSON.stringify(args.rule, null, 4);
        }
    }
    change(): void {
        this.updateRule({rule: this.qryBldrObj.getValidRules(this.qryBldrObj.rule)})
    }
}
