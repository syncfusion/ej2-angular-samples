import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, Operators, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox, ChangeEventArgs as NumericEventArgs } from '@syncfusion/ej2-inputs';
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
    templateUrl: 'value-filtering.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['value-filtering.css']
})

export class ValueFilterComponent implements OnInit {
    public fieldCollections: { [key: string]: FilterModel } = {};
    public operators: string[] = ['Equals', 'DoesNotEquals', 'GreaterThan', 'GreaterThanOrEqualTo',
        'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
    public fields: string[] = ['Country', 'Products', 'Year'];
    public measures: { [key: string]: Object }[] = [
        { value: 'In_Stock', text: 'In Stock' },
        { value: 'Sold', text: 'Units Sold' },
        { value: 'Amount', text: 'Sold Amount' }];
    public dataSource: IDataOptions;
    public fieldsddl: DropDownList;
    public measuresddl: DropDownList;
    public operatorddl: DropDownList;
    public valueInput1: NumericTextBox;
    public valueInput2: NumericTextBox;
    public applyBtn: Button;
    public clearBtn: Button;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    setFilters(fieldName: string, measureName: string, condition: Operators, operand1: string, operand2: string): void {
        this.fieldCollections[fieldName] = {
            name: fieldName,
            measure: measureName,
            type: 'Value',
            condition: condition,
            value1: operand1,
            value2: operand2
        };
    }

    ondataBound(): void {
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
            allowValueFilter: true,
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
                    this.measuresddl.value = this.fieldCollections[args.value as string].measure;
                    this.operatorddl.value = this.fieldCollections[args.value as string].condition;
                } else {
                    this.setFilters(args.value as string, 'In_Stock', 'DoesNotEquals', '', '');
                    this.operatorddl.value = 'DoesNotEquals';
                    this.measuresddl.value = 'In_Stock';
                }
            }
        });
        this.fieldsddl.appendTo('#fields');
        this.measuresddl = new DropDownList({
            dataSource: this.measures,
            fields: { value: 'value', text: 'text' },
            value: 'In_Stock',
            width: '100%',
            change: (args: ChangeEventArgs) => {
                this.setFilters(this.fieldsddl.value as string,
                    args.value as string, this.operatorddl.value as Operators, this.valueInput1.value.toString(), this.valueInput2.value.toString());
            }
        });
        this.measuresddl.appendTo('#measures');
        this.operatorddl = new DropDownList({
            dataSource: this.operators,
            value: 'DoesNotEquals',
            change: (args: ChangeEventArgs) => {
                if (args.value === 'Between' || args.value === 'NotBetween') {
                    (document.querySelector('.input2cls') as HTMLElement).style.display = '';
                } else {
                    (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
                }
                this.setFilters(this.fieldsddl.value as string,
                    this.measuresddl.value as string, args.value as Operators, this.valueInput1.value.toString(), this.valueInput2.value.toString());
            }
        });
        this.operatorddl.appendTo('#conditions');
        this.valueInput1 = new NumericTextBox({
            value: 0,
            placeholder: "Example: 9590",
            change: (e: NumericEventArgs) => {
                this.setFilters(this.fieldsddl.value as string,
                    this.measuresddl.value as string, this.operatorddl.value as Operators, e.value.toString(), this.valueInput2.value.toString());
            },
            width: '100%'
        });
        this.valueInput1.appendTo('#value1');
        this.valueInput2 = new NumericTextBox({
            value: 0,
            placeholder: "Example: 17500",
            change: (e: NumericEventArgs) => {
                this.setFilters(this.fieldsddl.value as string,
                    this.measuresddl.value as string, this.operatorddl.value as Operators, this.valueInput1.value.toString(), e.value.toString());
            },
            width: '100%'
        });
        this.valueInput2.appendTo('#value2');
        this.applyBtn = new Button({
            isPrimary: true
        });
        this.applyBtn.appendTo('#apply');

        this.clearBtn = new Button();
        this.clearBtn.appendTo('#clear');

        document.getElementById('apply').onclick = () => {
            let filterOptions: FilterModel[] = [];
            filterOptions = [{
                name: this.fieldsddl.value as string,
                type: 'Value',
                measure: this.measuresddl.value as string,
                condition: this.operatorddl.value as Operators,
                value1: this.valueInput1.value === null ? '1' : this.valueInput1.value.toString(),
                value2: this.valueInput2.value === null ? '1' : this.valueInput2.value.toString()
            }];
            this.pivotGridObj.dataSource.filterSettings = filterOptions;
        };
        document.getElementById('clear').onclick = () => {
            this.pivotGridObj.dataSource.filterSettings = [];
            this.valueInput1.value = 0;
            this.valueInput2.value = 0;
            this.valueInput1.dataBind();
            this.valueInput2.dataBind();
        };
    }
}