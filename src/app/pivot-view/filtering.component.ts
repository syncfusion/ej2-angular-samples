import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, FilterType, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, MultiSelect, ChangeEventArgs, SelectEventArgs, RemoveEventArgs, PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/dataSource-model';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);
/**
 * PivotView Filtering Sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'filtering.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['filtering.css']
})

export class FilteringComponent implements OnInit {
    public dataSource: IDataOptions;
    public fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    public filterCollections: { [key: string]: FilterModel } = {};
    public isInitial: boolean = true;
    public type: string[] = ['Include', 'Exclude'];
    public values: { [key: string]: Object }[] = [];
    public fields: string[] = ['Country', 'Products', 'Year'];
    public fieldsddl: DropDownList;
    public typeddl: DropDownList;
    public valuesddl: MultiSelect;
    public applyBtn: Button;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    /** To get the checked members here as string array. */
    getSelectedMembers(field: string): string[] {
        let membersColl: string[] = [];
        let members: { [key: string]: Object }[] = this.fieldCollections[field];
        let memLength: number = members.length - 1;
        while (memLength > -1) {
            if (members[memLength]['Checked'] === members[memLength]['Member'] + '_' + true) {
                membersColl.push(members[memLength]['Member'].toString());
            }
            memLength--;
        }
        return membersColl;
    }

    /** To set the checked status of the members maintained in the object fieldCollections. */
    setMemberCheckedState(field: string, member: string, checkedState: string): void {
        let members: { [key: string]: Object }[] = this.fieldCollections[field];
        let memLength: number = members.length - 1;
        while (memLength > -1) {
            if (members[memLength]['Member'] === member) {
                members[memLength]['Checked'] = checkedState;
                break;
            }
            memLength--;
        }
    }

    /** To set the filter type of the members maintained in the object filterCollections. */
    updateFilterType(fieldName: string): FilterType {
        if ((this.fieldsddl as any).itemData === fieldName) {
            return (this.typeddl as any).itemData;
        } else if (this.filterCollections[fieldName]) {
            return this.filterCollections[fieldName].type;
        } else {
            return 'Exclude';
        }
    }

    /** To set disabled/enabled state in the Apply button. */
    setApplyBtnState(): void {
        let fieldArray: string[] = ['Country', 'Products', 'Year'];
        let loopCount: number = fieldArray.length - 1;
        let isSelected: boolean = false;
        while (loopCount > -1) {
            if (this.getSelectedMembers(fieldArray[loopCount]).length > 0) {
                isSelected = true;
                break;
            }
            loopCount--;
        }
        this.applyBtn.disabled = !isSelected;
    }

    ondataBound(args: any): void {
        if (this.isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            let fieldCnt: number = this.fields.length - 1;
            while (fieldCnt > -1) {
                let members: string[] = Object.keys(this.pivotGridObj.engineModule.fieldList[this.fields[fieldCnt]].members);
                let memberCnt: number = members.length - 1;
                let memberColl: { [key: string]: Object }[] = [];
                while (memberCnt > -1) {
                    memberColl.push({ Member: members[memberCnt], Checked: members[memberCnt] + '_' + false });
                    memberCnt--;
                }
                this.fieldCollections[this.fields[fieldCnt]] = memberColl;
                fieldCnt--;
            }
            this.values = this.fieldCollections[this.fields[0]];
            this.valuesddl.dataSource = this.values;
            this.valuesddl.dataBind();
            this.isInitial = false;
        }
        for (let field of this.pivotGridObj.dataSource.filterSettings) {
            this.filterCollections[field.name] = field;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }],
            data: Pivot_Data,
            expandAll: false
        };

        this.valuesddl = new MultiSelect({
            dataSource: this.values,
            mode: 'CheckBox',
            showDropDownIcon: true,
            showClearButton: false,
            enableSelectionOrder: false,
            fields: { text: 'Member' },
            select: (args: SelectEventArgs): void => {
                this.applyBtn.disabled = false;
                this.applyBtn.dataBind();
                this.setMemberCheckedState((<any>this.fieldsddl).itemData, args.item.textContent, args.item.textContent + '_' + true);
            },
            removed: (args: RemoveEventArgs): void => {
                this.setMemberCheckedState((<any>this.fieldsddl).itemData, args.item.textContent, args.item.textContent + '_' + false);
                this.setApplyBtnState();
                this.applyBtn.dataBind();
            },
            open: (args: PopupEventArgs): void => {
                if (args.popup.element.querySelector(".e-filter-parent")) {
                    (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
                }
            }
        });
        this.valuesddl.appendTo('#values');

        this.fieldsddl = new DropDownList({
            dataSource: this.fields,
            index: 0,
            width: '98%',
            change: (args: ChangeEventArgs) => {
                this.valuesddl.dataSource = this.fieldCollections[args.value.toString()];
                this.valuesddl.value = this.getSelectedMembers(args.value.toString());
                if (this.filterCollections[args.value.toString()]) {
                    this.typeddl.value = this.filterCollections[args.value.toString()].type;
                }
                this.valuesddl.dataBind();
                this.typeddl.dataBind();
            }
        });
        this.fieldsddl.appendTo('#fields');

        this.typeddl = new DropDownList({
            dataSource: this.type,
            width: '98%',
            index: 1
        });
        this.typeddl.appendTo('#type');

        this.applyBtn = new Button({
            cssClass: 'e-flat', isPrimary: true, disabled: true
        });
        this.applyBtn.appendTo('#apply');

        document.getElementById('apply').onclick = () => {
            /** You can set your filter settings here. */
            this.pivotGridObj.dataSource.filterSettings = [
                { name: this.fields[0], items: this.getSelectedMembers(this.fields[0]), type: this.updateFilterType(this.fields[0]) },
                { name: this.fields[1], items: this.getSelectedMembers(this.fields[1]), type: this.updateFilterType(this.fields[1]) },
                { name: this.fields[2], items: this.getSelectedMembers(this.fields[2]), type: this.updateFilterType(this.fields[2]) },
            ];
        };
    }
}