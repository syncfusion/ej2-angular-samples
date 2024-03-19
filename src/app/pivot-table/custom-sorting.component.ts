import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, IDataSet, GroupingBarSettings, PivotViewModule, PivotActionCompleteEventArgs, GroupingBarService } from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs, MultiSelect, SelectEventArgs, RemoveEventArgs, PopupEventArgs, CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { SortModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { enableRipple } from '@syncfusion/ej2-base';
import { DropDownListComponent,DropDownListModule, MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent, ButtonModule, CheckBoxModule, CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
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
    templateUrl: 'custom-sorting.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['custom-sorting.css'],
    providers: [GroupingBarService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, CheckBoxModule, ButtonModule, DropDownListModule, MultiSelectModule]
})

export class CustomSortingComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public groupingBarSettings: GroupingBarSettings;
    public fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    public memOrder: string[] = [];
    public isInitial: boolean = true;
    public order: string[] = ['Ascending', 'Descending'];
    public getMembers: { [key: string]: string[] }  = { 'Country': [], 'Products': [], 'Year': [], 'Order_Source': [] };
    public index: number;
    public isMemberAdded: boolean = true;
    public isMemberAdded_1: boolean = true;
    public fields: { [key: string]: Object }[] = [
        { Field: 'Country', Order: 'Country_asc', caption: 'Country' },
        { Field: 'Products', Order: 'Products_desc', caption: 'Products' },
        { Field: 'Year', Order: 'Year_desc', caption: 'Year' },
        { Field: 'Order_Source', Order: 'Order_Source_asc', caption: 'Order Source' }
    ];
    public data: { [key: string]: Object; }[] = [];
    public fieldsMembers: Object = { text: 'Member' };
    public waterMarkMembers: string = 'Select headers';
    public mode: string = 'CheckBox';
    public fieldsSortingFields: Object = { text: 'caption', value: 'Order' };

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('sortingMembers')
    public membersOrder: MultiSelectComponent;
    @ViewChild('sortingFields')
    public fieldsObj: DropDownListComponent;
    @ViewChild('sortingOrder')
    public orderInfo: DropDownListComponent;
    @ViewChild('apply')
    public applyBtn: ButtonComponent;
    @ViewChild('sorting')
    public  checkBoxObj: CheckBoxComponent;

    /** To set the checked status of the members maintained in the object fieldCollections. */
    maintainCheckedState(field: string, member: string, checkedState: string) {
        let members: { [key: string]: Object; }[] = this.fieldCollections[field];
        let count: number = members.length - 1;
        while (count > -1) {
            if (members[count].Member === member) {
                members[count].Checked = checkedState;
                break;
            }
            count--;
        }
    }

    /** To get the checked members/status here as string array. */
    updateSelectedMembers(field: string) {
        let membersCollections: string[] = [];
        let members: { [key: string]: Object; }[] = this.fieldCollections[field];
        let count: number = members.length - 1;
        while (count > -1) {
            if (members[count].Checked === members[count].Member + '_' + true) {
                membersCollections.push(members[count].Member.toString());
            }
            count--;
        }
        return membersCollections;
    }

    updateOrder(sortDetails: SortModel[], i: number, fieldName: string, j: number) {
        if (sortDetails[i].order === 'Ascending') {
            if ((<any>this.fieldsObj).itemData.Field === fieldName) {
                this.orderInfo.index = 0;
            }
            this.memOrder[j] = 'Ascending';
        }
        else {
            if ((<any>this.fieldsObj).itemData.Field === fieldName) {
                this.orderInfo.index = 1;
            }
            this.memOrder[j] = 'Descending';
        }
    }

    dataBound(args: any): void {
        if (this.isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            let fieldCount: number = this.fields.length - 1;
            while (fieldCount > -1) {
                let members: string[] = Object.keys(this.pivotObj.engineModule.fieldList[this.fields[fieldCount].Field as string].members);
                let memberCnt: number = members.length;
                let memberColl: { Member: string; Checked: string; }[] = [];
                for (let i: number = 0; i < memberCnt; i++) {
                    memberColl.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                this.fieldCollections[this.fields[fieldCount].Field as string] = memberColl;
                fieldCount--;
            }
            this.fieldCollections.Order_Source.reverse();
            this.data = (this.fieldCollections[this.fields[0].Field as string]) as { [key: string]: Object }[];
            this.membersOrder.dataSource = this.data;
            this.fieldCollections.Country[0].Checked = "France_true";
            this.fieldCollections.Country[3].Checked = "United States_true";
            this.getMembers.Country.push('France', 'United States');
            this.getMembers.Year.push('FY 2018', 'FY 2017');
            this.getMembers.Products.push('Gloves', 'Bottles and Cages');
            this.membersOrder.value = this.updateSelectedMembers("Country").reverse();
            this.membersOrder.dataBind();
            this.isInitial = false;
        }
    }

    actionComplete(args: PivotActionCompleteEventArgs): void {
        let sortDetails: SortModel[] = this.pivotObj.dataSourceSettings.sortSettings;
        for (let i: number = 0; i < (this.pivotObj.dataSourceSettings.rows.length + this.pivotObj.dataSourceSettings.columns.length); i++) {
            if (sortDetails.length > 0) {
                if (sortDetails[i] && sortDetails[i].name === 'Country') {
                    this.updateOrder(sortDetails, i, 'Country', 0);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Products') {
                    this.updateOrder(sortDetails, i, 'Products', 1);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Year') {
                    this.updateOrder(sortDetails, i, 'Year', 2);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Order_Source') {
                    this.updateOrder(sortDetails, i, 'Order_Source', 3);
                }
            }
        }
    }

    select (args: SelectEventArgs): void {
        this.applyBtn.disabled = false;
        this.maintainCheckedState((<any>this.fieldsObj).itemData.Field, args.item.textContent, args.item.textContent + '_' + true);
        this.getMembers[(<any>this.fieldsObj).itemData.Field].push(args.itemData['Member']);
    }
    removed (args: RemoveEventArgs): void {
        this.maintainCheckedState((<any>this.fieldsObj).itemData.Field, args.item.textContent, args.item.textContent + '_' + false);
        this.index = this.getMembers[(<any>this.fieldsObj).itemData.Field].indexOf(args.itemData['Member']);
        if (this.getMembers[(<any>this.fieldsObj).itemData.Field].indexOf(args.itemData['Member']) > -1) {
            this.getMembers[(<any>this.fieldsObj).itemData.Field].splice(this.index, 1);
        }
    }
    open (args: PopupEventArgs): void {
        if (args.popup.element.querySelector(".e-filter-parent")) {
            (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
        }
    }

    changeSortingFields (args: ChangeEventArgs) {
        if ((this.fieldsObj.dataSource as any)[this.fieldsObj.index].Order === (this.fieldsObj.dataSource as any)[this.fieldsObj.index].Field + '_asc') {
            this.orderInfo.index = 0;
        } else {
            this.orderInfo.index = 1;
        }
        if (this.memOrder.length > 0) {
            if (this.memOrder[this.fieldsObj.index] === 'Ascending') {
                this.orderInfo.index = 0;
            }
            else if (this.memOrder[this.fieldsObj.index] === 'Descending') {
                this.orderInfo.index = 1;
            }
        }
        if (args.itemData['Field'] === 'Year' && this.isMemberAdded) {
            this.fieldCollections.Year[3].Checked = "FY 2018_true";
            this.fieldCollections.Year[2].Checked = "FY 2017_true";
            this.membersOrder.value = this.updateSelectedMembers("Year").reverse();
            this.isMemberAdded = false;
        }
        else if (args.itemData['Field'] === 'Products' && this.isMemberAdded_1) {
            this.fieldCollections.Products[9].Checked = "Gloves_true";
            this.fieldCollections.Products[0].Checked = "Bottles and Cages_true";
            this.membersOrder.value = this.updateSelectedMembers("Products").reverse();
            this.isMemberAdded_1 = false;
        }
        (this.membersOrder.dataSource as any) = this.fieldCollections[args.itemData['Field']];
        this.membersOrder.value = this.updateSelectedMembers(args.itemData['Field']);
        this.membersOrder.dataBind();
        this.orderInfo.dataBind();
    }

    changeSortingOrder (args: ChangeEventArgs) {
        if (args.value === 'Ascending') {
            (this.fieldsObj.dataSource as any)[this.fieldsObj.index].Order = (this.fieldsObj.dataSource as any)[this.fieldsObj.index].Field + '_asc';
        } else {
            (this.fieldsObj.dataSource as any)[this.fieldsObj.index].Order = (this.fieldsObj.dataSource as any)[this.fieldsObj.index].Field + '_desc';
        }
        this.fieldsObj.refresh();
    }

    changeSorting (args: any) {
        let ischecked: boolean = args.checked;
        this.fieldsObj.enabled = ischecked;
        this.orderInfo.enabled = ischecked;
        this.membersOrder.enabled = ischecked;
        this.applyBtn.disabled = !ischecked;
        this.pivotObj.dataSourceSettings.enableSorting = ischecked;
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.groupingBarSettings = {
            showRemoveIcon: false, showFilterIcon: false, showSortIcon: true, showValueTypeIcon: false, allowDragAndDrop: false
        } as GroupingBarSettings;

        document.getElementById('sorting-apply').onclick = () => {
            if (this.checkBoxObj.checked) {
                this.pivotObj.setProperties({
                    dataSourceSettings: {
                        enableSorting: true, sortSettings: [
                            { name: 'Country', order: (this.fieldsObj.dataSource[0] as any).Order === 'Country_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Country'] },
                            { name: 'Products', order: (this.fieldsObj.dataSource[1] as any).Order === 'Products_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Products'] },
                            { name: 'Year', order: (this.fieldsObj.dataSource[2] as any).Order === 'Year_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Year'] },
                            { name: 'Order_Source', order: (this.fieldsObj.dataSource[3] as any).Order === 'Order_Source_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Order_Source'] }
                        ]
                    }
                }, true);
            } else {
                this.pivotObj.setProperties({ dataSourceSettings: { enableSorting: false, sortSettings: [] } }, true);
            }
            this.pivotObj.refreshData();
        };

        this.dataSourceSettings = {
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            dataSource: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            drilledMembers: [{name: 'Country', items: ['Germany']}],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            sortSettings: [{ name: 'Country', order: 'Ascending', membersOrder: ['France', 'United States'] }, { name: 'Year', order: 'Descending', membersOrder: ['FY 2018', 'FY 2017'] },
            { name: 'Products', order: 'Descending', membersOrder: ['Gloves', 'Bottles and Cages'] }],
            columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }]
        };
    }
}