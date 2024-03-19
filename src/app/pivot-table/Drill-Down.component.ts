import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, IDataSet , PivotViewModule} from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs, MultiSelect, MultiSelectModule, DropDownListModule, SelectEventArgs, RemoveEventArgs, PopupEventArgs, CheckBoxSelection, DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);

/**
 * Pivot Table Member Sorting sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'Drill-Down.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['Drill-Down.css'],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, MultiSelectModule, DropDownListModule, ButtonModule]
})

export class DrillDownComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public isRowSelect: boolean = false;
    public isColumnSelect: boolean = false;
    public values: { [key: string]: Object }[] = [];
    public index: number;
    public fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    public options: { [key: string]: Object; }[] = [
        { value: 'allHeaders', text: 'All headers' },
        { value: 'rowHeaders', text: 'Row headers' },
        { value: 'columnHeader', text: 'Column headers' },
        { value: 'specificFields', text: 'Specific fields' },
        { value: 'specificHeaders', text: 'Specific headers' }
    ];
    public isInitial: boolean = true;
    public storeMembers: { [key: string]: string[] } = { 'Country': [], 'Year': [] };
    public fields: { [key: string]: Object }[] = [
        { Field: 'Country', expandAll: false },
        { Field: 'Year', expandAll: false }
    ];
    public fieldsOptionsdll: Object= { value: 'value', text: 'text' };
    public valueOptionsdll: string= 'rowHeaders';
    public fieldsFieldsddl: Object= { text: 'Field' };
    public waterMarkfieldsddl: string= 'Select fields';
    public fieldsField1:Object = { text: 'Field' };
    public valueField1: string = 'Country';
    public fieldsMembersOrder: Object = { text: 'Member' };
    public waterMark: string = 'Select headers'; 
    public mode: string;
    public data: { [key: string]: Object; }[] = [];

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('expandall')
    public optionsdll: DropDownListComponent;
    @ViewChild('expandFields')
    public fieldsddl: MultiSelectComponent;
    @ViewChild('expandMembers')
    public membersOrder: MultiSelectComponent;
    @ViewChild('expandFields1')
    public field1: DropDownListComponent;
    @ViewChild('apply')
    public applyBtn: ButtonComponent;

    /** To set the checked status of the members maintained in the object fieldCollections. */
    setMemberCheckedState(field: string, member: string, checkedState: string) {
        let members: { [key: string]: Object; }[] = this.fieldCollections[field];
        let membersLength: number = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Member === member) {
                members[membersLength].Checked = checkedState;
                break;
            }
            membersLength--;
        }
    }

    /** To get the checked members/status here as string array. */
    getSelectedMembers(field: string) {
        let membersCollection: string[] = [];
        let members: { [key: string]: Object; }[] = this.fieldCollections[field];
        let membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Checked === members[membersLength].Member + '_' + true) {
                membersCollection.push(members[membersLength].Member.toString());
            }
            membersLength--;
        }
        return membersCollection;
    }

    updateRowColumn(isExpand: boolean, isRowExpand: boolean, isColumnExpand: boolean) {
        this.pivotObj.setProperties({
            dataSourceSettings: {
                expandAll: isExpand, rows: [
                    { name: 'Country', expandAll: (this.fieldsddl.dataSource[0] as any).expandAll = isRowExpand },
                    { name: 'Products' }
                ], columns: [
                    { name: 'Year', expandAll: (this.fieldsddl.dataSource[1] as any).expandAll = isColumnExpand },
                    { name: 'Order_Source' }
                ]
            }
        }, true);
        this.pivotObj.refreshData();
    }

    clear() {
        (this.fieldsddl as any).value = [];
        this.isRowSelect = false;
        this.isColumnSelect = false;
        this.membersOrder.value = [];
        if (this.storeMembers['Country'].length > 0 || this.storeMembers['Year'].length > 0) {
            this.storeMembers = { 'Country': [], 'Year': [] };
            this.isInitial = true;
        }
    }

    dataBound(args: any): void {
        if (this.isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            let fieldCnt: number = this.fields.length - 1;
            while (fieldCnt > -1) {
                let members: string[] = Object.keys(this.pivotObj.engineModule.fieldList[this.fields[fieldCnt].Field as string].members);
                let memberCnt: number = members.length;
                let membersCollection: { Member: string; Checked: string; }[] = [];
                for (let i: number = 0; i < memberCnt; i++) {
                    membersCollection.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                this.fieldCollections[this.fields[fieldCnt].Field as string] = membersCollection;
                fieldCnt--;
            }
            this.values = this.fieldCollections[this.fields[0].Field as string];
            (this.membersOrder.dataSource as any) = this.values;
            this.membersOrder.dataBind();
            this.fieldsddl.dataBind();
            this.isInitial = false;
        }
    }

    changeOptionsdll (args: ChangeEventArgs): void {
        (document.querySelector('.field_cls') as HTMLElement).style.display = 'none';
        (document.querySelector('.field_cls_1') as HTMLElement).style.display = 'none';
        (document.querySelector('.members_cls') as HTMLElement).style.display = 'none';
        (document.querySelector('.apply_cls') as HTMLElement).style.display = 'none';
        if (args.value == 'allHeaders') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { expandAll: true, drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.pivotObj.refreshData();
        } else if (args.value == 'rowHeaders') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, true, false);
        } else if (args.value == 'columnHeader') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, false, true);
        } else if (args.value == 'specificFields') {
            (document.querySelector('.field_cls') as HTMLElement).style.display = '';
        } else if (args.value == 'specificHeaders') {
            (document.querySelector('.field_cls_1') as HTMLElement).style.display = '';
            (document.querySelector('.members_cls') as HTMLElement).style.display = '';
            (document.querySelector('.apply_cls') as HTMLElement).style.display = '';
        }
    }
  
    selectMembersOrder (args: SelectEventArgs): void {
        this.setMemberCheckedState((<any>this.field1).itemData.Field, args['item'].textContent, args['item'].textContent + '_' + true);
        this.applyBtn.disabled = false;
        this.storeMembers[(<any>this.field1).itemData.Field].push(args.itemData['Member']);
    }
    removedMembersOrder (args: RemoveEventArgs): void {
        this.setMemberCheckedState((<any>this.field1).itemData.Field, args['item'].textContent, args['item'].textContent + '_' + false);
        this.index = this.storeMembers[(<any>this.field1).itemData.Field].indexOf(args.itemData['Member']);
        if (this.storeMembers[(<any>this.field1).itemData.Field].indexOf(args.itemData['Member']) > -1) {
            this.storeMembers[(<any>this.field1).itemData.Field].splice(this.index, 1);
        }
    }
    openMembersOrder (args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    } 
  
    selectFieldsddl (args: SelectEventArgs): void {
        this.membersOrder.value = [];
        if (this.storeMembers['Country'].length > 0 || this.storeMembers['Year'].length > 0) {
            this.storeMembers = { 'Country': [], 'Year': [] };
            this.isInitial = true;
        }
        if (args.itemData['Field'] === 'Country') {
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, true, this.isColumnSelect);
            this.isRowSelect = true;
        }
        else if (args.itemData['Field'] === 'Year') {
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, this.isRowSelect, true);
            this.isColumnSelect = true;
        }
    }
    removedFieldsddl (args: RemoveEventArgs): void {
        if (args.itemData['Field'] === 'Country') {
            this.updateRowColumn(false, false, this.isColumnSelect);
            this.isRowSelect = false;
        }
        else if (args.itemData['Field'] === 'Year') {
            this.updateRowColumn(false, this.isRowSelect, false);
            this.isColumnSelect = false;
        }
    }
    openFieldsddl (args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }
    
    changeField1 (args: ChangeEventArgs): void {
        (this.membersOrder.dataSource as any) = this.fieldCollections[args.itemData['Field']];
        this.membersOrder.value = this.getSelectedMembers(args.itemData['Field']);
        this.membersOrder.dataBind();
        this.field1.dataBind();
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        document.getElementById('expand-apply').onclick = () => {
            this.fieldsddl.value = [];
            this.isRowSelect = false;
            this.isColumnSelect = false;
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: this.storeMembers['Country'] }, { name: 'Year', items: this.storeMembers['Year'] }] } }, true);
            this.updateRowColumn(false, false, false);
        };

        this.dataSourceSettings = {
            dataSource: Pivot_Data,
            expandAll: false,
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
            columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        };

        this.mode = 'CheckBox';
    }
}