import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, Operators, IDataSet, PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs as NumericEventArgs, NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);
/**
 * Pivot Table Filtering Sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'value-filtering.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['value-filtering.css'],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, ButtonModule, DropDownListModule, NumericTextBoxModule]
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
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public fieldsMeasuresddl: Object = { value: 'value', text: 'text' };

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('fieldsddl')
    public fieldsddl: DropDownListComponent;
    @ViewChild('measuresddl')
    public measuresddl: DropDownListComponent;
    @ViewChild('operatorddl')
    public operatorddl: DropDownListComponent;
    @ViewChild('value1')
    public valueInput1: NumericTextBoxComponent;
    @ViewChild('value2')
    public valueInput2: NumericTextBoxComponent;
    @ViewChild('apply')
    public applyBtn: ButtonComponent;
    @ViewChild('clear')
    public clearBtn: ButtonComponent;

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
        for (let field of this.pivotObj.dataSourceSettings.filterSettings) {
            this.fieldCollections[field.name] = field;
        }
    }

    changeFieldsddl (args: ChangeEventArgs) {
        if (this.fieldCollections[args.value as string]) {
            this.measuresddl.value = this.fieldCollections[args.value as string].measure;
            this.operatorddl.value = this.fieldCollections[args.value as string].condition;
        } else {
            this.setFilters(args.value as string, 'In_Stock', 'DoesNotEquals', '', '');
            this.operatorddl.value = 'DoesNotEquals';
            this.measuresddl.value = 'In_Stock';
        }
    }

    changeMeasuresddl (args: ChangeEventArgs) {
        this.setFilters(this.fieldsddl.value as string,
            args.value as string, this.operatorddl.value as Operators, this.valueInput1.value.toString(), this.valueInput2.value.toString());
    }

    changeOperatorddl (args: ChangeEventArgs) {
        if (args.value === 'Between' || args.value === 'NotBetween') {
            (document.querySelector('.input2cls') as HTMLElement).style.display = '';
        } else {
            (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
        }
        this.setFilters(this.fieldsddl.value as string,
            this.measuresddl.value as string, args.value as Operators, this.valueInput1.value.toString(), this.valueInput2.value.toString());
    }

    changeValue1 (e: NumericEventArgs) {
        this.setFilters(this.fieldsddl.value as string,
            this.measuresddl.value as string, this.operatorddl.value as Operators, e.value.toString(), this.valueInput2.value.toString());
    }

    changeValue2 (e: NumericEventArgs) {
        this.setFilters(this.fieldsddl.value as string,
            this.measuresddl.value as string, this.operatorddl.value as Operators, this.valueInput1.value.toString(), e.value.toString());
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSourceSettings = {
            allowValueFilter: true,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }],
            dataSource: Pivot_Data,
            expandAll: false
        };

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
            this.pivotObj.dataSourceSettings.filterSettings = filterOptions;
        };
        document.getElementById('clear').onclick = () => {
            this.pivotObj.dataSourceSettings.filterSettings = [];
            this.valueInput1.value = 0;
            this.valueInput2.value = 0;
            this.valueInput1.dataBind();
            this.valueInput2.dataBind();
        };
    }
}