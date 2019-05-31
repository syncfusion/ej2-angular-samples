import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, IAxisSet, Condition, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { HyperCellClickEventArgs, HyperlinkSettings } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox, MaskedTextBox } from '@syncfusion/ej2-inputs';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
/**
 * PivotView Hyperlink Sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'hyper-link.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['hyper-link.css']
})

export class HyperLinkComponent implements OnInit {
    public operators: string[] = ['Equals', 'NotEquals', 'GreaterThan', 'GreaterThanOrEqualTo',
        'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
    public measures: { [key: string]: Object }[] = [
        { value: 'In Stock', text: 'In Stock' },
        { value: 'Units Sold', text: 'Units Sold' },
        { value: 'Sold Amount', text: 'Sold Amount' }
    ];
    public options: { [key: string]: Object }[] = [
        { value: 'allcells', text: 'All cells' },
        { value: 'rowheader', text: 'Row headers' },
        { value: 'columnheader', text: 'Column headers' },
        { value: 'valuecells', text: 'Value cells' },
        { value: 'summarycells', text: 'Summary cells' },
        { value: 'conditional', text: 'Condition based option' },
        { value: 'headertext', text: 'Header based option' }
    ];
    public dataSource: IDataOptions;
    public hyperlinkSettings: HyperlinkSettings;
    public optionsdll: DropDownList;
    public measuresddl: DropDownList;
    public operatorddl: DropDownList;
    public valueInput1: NumericTextBox;
    public valueInput2: NumericTextBox;
    public textInput: MaskedTextBox;
    public applyBtn: Button;
    public clearBtn: Button;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    public eventHeader: string = 'Low Battery';
    public showCloseIcon: Boolean = false;
    public isModel: Boolean = false;
    public visible: Boolean = false;
    // public confirmCloseIcon: Boolean = true;
    public target: string = '.control-section';
    public alertWidth: string = '300px';

    onCellClick(args: HyperCellClickEventArgs): void {
        let cell: string = '';
        if (args.currentCell.className.indexOf('e-stot') > -1 ||
            args.currentCell.className.indexOf('e-gtot') > -1 ||
            args.currentCell.className.indexOf('e-summary') > -1) {
            cell += 'Summary ';
        }
        if (args.currentCell.querySelector('.e-headercelldiv') && !(args.data as IAxisSet).indexObject) {
            cell += 'Value Header ';
        } else if (args.currentCell.className.indexOf('e-rowsheader') > -1) {
            cell += 'Row Header ';
        } else if (args.currentCell.className.indexOf('e-columnsheader') > -1) {
            cell += 'Column Header ';
        } else if (args.currentCell.className.indexOf('e-valuescontent') > -1) {
            cell += 'Value ';
        }
        if (args.currentCell.querySelector('a') &&
            (args.currentCell.querySelector('a').innerText === 'France' || args.currentCell.querySelector('a').innerText === 'Germany')) {
            let country: string = args.currentCell.querySelector('a').innerText;
            args.currentCell.querySelector('a').setAttribute('data-url', (country === 'France' ?
                'https://en.wikipedia.org/wiki/France' : 'https://en.wikipedia.org/wiki/Germany'));
            args.cancel = false;
        } else {
            this.appendElement('<b>' + cell + '</b>' + ' cell click event called<hr>');
        }
    }

    appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }

    onChange(args: ChangeEventArgs): void {
        (document.querySelector('.text1cls') as HTMLElement).style.display = 'none';
        (document.querySelector('.text2cls') as HTMLElement).style.display = 'none';
        (document.querySelector('.measurecls') as HTMLElement).style.display = 'none';
        (document.querySelector('.conditioncls') as HTMLElement).style.display = 'none';
        (document.querySelector('.input1cls') as HTMLElement).style.display = 'none';
        (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
        (document.querySelector('.textinputcls') as HTMLElement).style.display = 'none';
        (document.querySelector('.updatecls') as HTMLElement).style.display = 'none';
        if (args.value === 'allcells') {
            this.pivotGridObj.hyperlinkSettings = {
                showHyperlink: true,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        } else if (args.value === 'rowheader') {
            this.pivotGridObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: true,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        } else if (args.value === 'columnheader') {
            this.pivotGridObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: true,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        } else if (args.value === 'valuecells') {
            this.pivotGridObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: true,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        } else if (args.value === 'summarycells') {
            this.pivotGridObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: true,
                headerText: undefined,
                conditionalSettings: []
            };
        } else if (args.value === 'conditional') {
            (document.querySelector('.text1cls') as HTMLElement).style.display = '';
            (document.querySelector('.measurecls') as HTMLElement).style.display = '';
            (document.querySelector('.conditioncls') as HTMLElement).style.display = '';
            (document.querySelector('.input1cls') as HTMLElement).style.display = '';
            if (this.operatorddl.value === 'Between' || this.operatorddl.value === 'NotBetween') {
                (document.querySelector('.input2cls') as HTMLElement).style.display = '';
            }
            (document.querySelector('.updatecls') as HTMLElement).style.display = '';
        } else if (args.value === 'headertext') {
            (document.querySelector('.text2cls') as HTMLElement).style.display = '';
            (document.querySelector('.textinputcls') as HTMLElement).style.display = '';
            (document.querySelector('.updatecls') as HTMLElement).style.display = '';
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.hyperlinkSettings = {
            showValueCellHyperlink: true,
            cssClass: 'e-custom-class'
        } as HyperlinkSettings;

        this.dataSource = {
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            data: Pivot_Data,
            expandAll: true
        };

        this.optionsdll = new DropDownList({
            dataSource: this.options,
            fields: { value: 'value', text: 'text' },
            value: 'valuecells',
            width: '100%',
            change: this.onChange.bind(this)
        });
        this.optionsdll.appendTo('#hyperlinks');
        this.measuresddl = new DropDownList({
            dataSource: this.measures,
            fields: { value: 'value', text: 'text' },
            value: 'In Stock',
            width: '100%'
        });
        this.measuresddl.appendTo('#measures');
        this.operatorddl = new DropDownList({
            value: 'NotEquals',
            dataSource: this.operators,
            change: function (args: ChangeEventArgs) {
                if (args.value === 'Between' || args.value === 'NotBetween') {
                    (document.querySelector('.input2cls') as HTMLElement).style.display = '';
                } else {
                    (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
                }
            }
        });
        this.operatorddl.appendTo('#conditions');
        this.valueInput1 = new NumericTextBox({
            width: '100%',
            value: 0,
            placeholder: 'Example: 400'
        });
        this.valueInput1.appendTo('#value1');
        this.valueInput2 = new NumericTextBox({
            width: '100%',
            value: 0,
            placeholder: 'Example: 4000'
        });
        this.valueInput2.appendTo('#value2');
        this.textInput = new MaskedTextBox({
            value: '',
            placeholder: 'Example: "FY 2015.In Stock"',
            width: '100%'
        });
        this.textInput.appendTo('#text');
        this.applyBtn = new Button({
            isPrimary: true
        });
        this.applyBtn.appendTo('#apply');

        document.getElementById('apply').onclick = () => {
            if (this.optionsdll.value === 'conditional') {
                this.pivotGridObj.hyperlinkSettings = {
                    showHyperlink: false,
                    showRowHeaderHyperlink: false,
                    showColumnHeaderHyperlink: false,
                    showValueCellHyperlink: false,
                    showSummaryCellHyperlink: false,
                    headerText: undefined,
                    conditionalSettings: [
                        {
                            measure: this.measuresddl.value as string,
                            conditions: this.operatorddl.value as Condition,
                            value1: this.valueInput1.value,
                            value2: this.valueInput2.value
                        }
                    ]
                };
            } else if (this.optionsdll.value === 'headertext') {
                this.pivotGridObj.hyperlinkSettings = {
                    showHyperlink: false,
                    showRowHeaderHyperlink: false,
                    showColumnHeaderHyperlink: false,
                    showValueCellHyperlink: false,
                    showSummaryCellHyperlink: false,
                    headerText: this.textInput.value,
                    conditionalSettings: []
                };
            }
        };

        this.clearBtn = new Button();
        this.clearBtn.appendTo('#clear');

        document.getElementById('clear').onclick = () => {
            document.getElementById('EventLog').innerHTML = '';
        };
    }
}