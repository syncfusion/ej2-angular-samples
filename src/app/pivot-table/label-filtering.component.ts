import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, Operators, IDataSet, PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaskChangeEventArgs,  MaskedTextBoxComponent, MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
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
    templateUrl: 'label-filtering.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['label-filtering.css'],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, ButtonModule, MaskedTextBoxModule, DropDownListModule]
})

export class LabelFilterComponent implements OnInit {
    public fieldCollections: { [key: string]: FilterModel } = {};
    public operators: string[] = ['Equals', 'DoesNotEquals', 'BeginWith', 'DoesNotBeginWith', 'EndsWith',
        'DoesNotEndsWith', 'Contains', 'DoesNotContains', 'GreaterThan',
        'GreaterThanOrEqualTo', 'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
    public fields: string[] = ['Country', 'Products', 'Year'];
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public waterMark: string = 'Example: "Germany"';
    public waterMark1: string = 'Example: "States"';

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('fieldsddl')
    public fieldsddl: DropDownListComponent;
    @ViewChild('operatorddl')
    public operatorddl: DropDownListComponent;
    @ViewChild('mask1')
    public valueInput1: MaskedTextBoxComponent;
    @ViewChild('value2')
    public valueInput2: MaskedTextBoxComponent;
    @ViewChild('apply')
    public applyBtn: ButtonComponent;
    @ViewChild('clear')
    public clearBtn: ButtonComponent;

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
        for (let field of this.pivotObj.dataSourceSettings.filterSettings) {
            this.fieldCollections[field.name] = field;
        }
    }

    changeFieldsddl (args: ChangeEventArgs) {
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

    changeOperatorddl (args: ChangeEventArgs) {
        if (args.value === 'Between' || args.value === 'NotBetween') {
            (document.querySelector('.input2cls') as HTMLElement).style.display = '';
        } else {
            (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
        }
        this.setFilters(this.fieldsddl.value as string, args.value as Operators, this.valueInput1.value, this.valueInput2.value);
        this.updateButtonState();
    }

    changeValue1 (e: MaskChangeEventArgs) {
        if(e.value){
            this.setFilters(this.fieldsddl.value as string, this.operatorddl.value as Operators, e.value, this.valueInput2.value);
            this.updateButtonState();
        }
    }

    changeValue2 (e: MaskChangeEventArgs) {
        if(e.value){
            this.setFilters(this.fieldsddl.value as string, this.operatorddl.value as Operators, this.valueInput1.value, e.value);
            this.updateButtonState();
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSourceSettings = {
            allowLabelFilter: true,
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
            this.pivotObj.dataSourceSettings.filterSettings = filterOptions;
        };
        document.getElementById('clear').onclick = () => {
            this.pivotObj.dataSourceSettings.filterSettings = [];
            this.valueInput1.value = '';
            this.valueInput2.value = '';
            this.valueInput1.dataBind();
            this.valueInput2.dataBind();
            this.fieldCollections = {};
            this.updateButtonState();
        };
    }
}