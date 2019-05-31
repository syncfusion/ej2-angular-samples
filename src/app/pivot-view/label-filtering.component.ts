import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, Operators, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { MaskedTextBox, MaskChangeEventArgs } from '@syncfusion/ej2-inputs';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/dataSource-model';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
/**
 * PivotView Filtering Sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'label-filtering.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['label-filtering.css']
})

export class LabelFilterComponent implements OnInit {
    public fieldCollections: { [key: string]: FilterModel } = {};
    public operators: string[] = ['Equals', 'DoesNotEquals', 'BeginWith', 'DoesNotBeginWith', 'EndsWith',
        'DoesNotEndsWith', 'Contains', 'DoesNotContains', 'GreaterThan',
        'GreaterThanOrEqualTo', 'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
    public fields: string[] = ['Country', 'Products', 'Year'];
    public dataSource: IDataOptions;
    public fieldsddl: DropDownList;
    public operatorddl: DropDownList;
    public valueInput1: MaskedTextBox;
    public valueInput2: MaskedTextBox;
    public applyBtn: Button;
    public clearBtn: Button;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    setFilters(fieldName: string, condition: Operators, operand1: string, operand2: string): void {
        this.fieldCollections[fieldName] = {
            name: fieldName,
            type: 'Label',
            condition: condition,
            value1: operand1,
            value2: operand2
        };
    }

    updateButtonState(): void {
        this.applyBtn.disabled = true;
        for (let field of this.fields) {
            if (this.fieldCollections[field] &&
                (this.fieldCollections[field].value1 !== '' || this.fieldCollections[field].value2 !== '')) {
                this.applyBtn.disabled = false;
                break;
            }
        }
        this.applyBtn.dataBind();
    }

    ondataBound(args: any): void {
        this.fieldCollections = {};
        for (let field of this.pivotGridObj.dataSource.filterSettings) {
            this.fieldCollections[field.name] = field;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            allowLabelFilter: true,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }],
            data: Pivot_Data,
            expandAll: false
        };

        this.fieldsddl = new DropDownList({
            dataSource: this.fields,
            index: 0,
            width: '100%',
            change: (args: ChangeEventArgs) => {
                if (this.fieldCollections[args.value as string]) {
                    this.operatorddl.value = this.fieldCollections[args.value as string].condition;
                    this.valueInput1.value = this.fieldCollections[args.value as string].value1 as string;
                    this.valueInput2.value = this.fieldCollections[args.value as string].value2 as string;
                } else {
                    this.setFilters(args.value as string, 'DoesNotEquals', '', '');
                    this.operatorddl.value = 'DoesNotEquals';
                    this.valueInput1.value = '';
                    this.valueInput2.value = '';
                }
                this.operatorddl.dataBind();
                this.valueInput1.dataBind();
                this.valueInput2.dataBind();
                this.updateButtonState();
            }
        });
        this.fieldsddl.appendTo('#fields');
        this.operatorddl = new DropDownList({
            dataSource: this.operators,
            value: 'DoesNotEquals',
            change: (args: ChangeEventArgs) => {
                if (args.value === 'Between' || args.value === 'NotBetween') {
                    (document.querySelector('.input2cls') as HTMLElement).style.display = '';
                } else {
                    (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
                }
                this.setFilters(this.fieldsddl.value as string, args.value as Operators, this.valueInput1.value, this.valueInput2.value);
                this.updateButtonState();
            }
        });
        this.operatorddl.appendTo('#conditions');
        this.valueInput1 = new MaskedTextBox({
            value: '',
            placeholder: 'Example: "Germany"',
            change: (e: MaskChangeEventArgs) => {
                this.setFilters(this.fieldsddl.value as string, this.operatorddl.value as Operators, e.value, this.valueInput2.value);
                this.updateButtonState();
            },
            width: '100%'
        });
        this.valueInput1.appendTo('#value1');
        this.valueInput2 = new MaskedTextBox({
            value: '',
            placeholder: 'Example: "States"',
            change: (e: MaskChangeEventArgs) => {
                this.setFilters(this.fieldsddl.value as string, this.operatorddl.value as Operators, this.valueInput1.value, e.value);
                this.updateButtonState();
            },
            width: '100%'
        });
        this.valueInput2.appendTo('#value2');
        this.applyBtn = new Button({
            isPrimary: true, disabled: true
        });
        this.applyBtn.appendTo('#apply');

        this.clearBtn = new Button();
        this.clearBtn.appendTo('#clear');

        document.getElementById('apply').onclick = () => {
            let filterOptions: FilterModel[] = [];
            for (let field of this.fields) {
                if (this.fieldCollections[field] && this.fieldCollections[field].value1 !== '') {
                    filterOptions.push(this.fieldCollections[field]);
                }
            }
            if (filterOptions.length === 0) {
                filterOptions = [{
                    name: this.fieldsddl.value as string,
                    type: 'Label',
                    condition: this.operatorddl.value as Operators,
                    value1: this.valueInput1.value.toString(),
                    value2: this.valueInput2.value.toString()
                }];
            }
            this.pivotGridObj.dataSource.filterSettings = filterOptions;
        };
        document.getElementById('clear').onclick = () => {
            this.pivotGridObj.dataSource.filterSettings = [];
            this.valueInput1.value = '';
            this.valueInput2.value = '';
            this.valueInput1.dataBind();
            this.valueInput2.dataBind();
            this.fieldCollections = {};
            this.updateButtonState();
        };
    }
}