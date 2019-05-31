import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, PageService} from '@syncfusion/ej2-angular-treegrid';
import { DropDownListComponent, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs as ChangeArgs } from '@syncfusion/ej2-angular-dropdowns';
import { PageEventArgs } from '@syncfusion/ej2-grids';
import { NumericTextBoxComponent, ChangeEventArgs, NumericTextBoxAllModule} from '@syncfusion/ej2-angular-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'paging-api.html',
    providers: [ PageService ],

})
export class PagingAPIComponent implements OnInit {
    public data: Object[] = [];
    public d1data: Object;
    public value1: string;
    public ddlfields: Object;
    public pageSettings: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    @ViewChild('pageSize')
    public pageSize: NumericTextBoxComponent;
    @ViewChild('currentPage')
    public currentPage: NumericTextBoxComponent;
    @ViewChild('pageCount')
    public pageCount: NumericTextBoxComponent;
    @ViewChild('enablePaging')
    public enablePaging: CheckBoxComponent;
    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings= { pageCount: 2 },
        this.ddlfields = { text: 'type' , value: 'id'};
        this.d1data= [{ id: 'All', type: 'All' }, {id: 'Root', type: 'Root'}],
        this.value1= 'All';
    }
    public change (e: ChangeEventArgs): void {
        this.pageSize.value = this.pageSize.value > this.treegrid.pageSettings.totalRecordsCount ?
        this.treegrid.pageSettings.totalRecordsCount : this.pageSize.value;
        this.treegrid.pageSettings.pageSize = this.pageSize.value;
        this.currentPage.max = Math.ceil(this.treegrid.pageSettings.totalRecordsCount / this.treegrid.pageSettings.pageSize);
    }
    public changed (e: ChangeEventArgs): void {
        this.currentPage.value = this.currentPage.value > this.currentPage.max ? this.currentPage.max : this.currentPage.value;
        let pageNumber: number = this.currentPage.value;
        this.treegrid.goToPage(pageNumber);
    }
    public changeCount (e: ChangeEventArgs) : void {
        this.pageCount.value = this.pageCount.value > 8 ? 8 : this.pageCount.value;
        this.treegrid.pageSettings.pageCount = this.pageCount.value;

    }
    
    // custom code start

    public onChange (e: ChangeArgs): void {
        let type: string = <string>e.value;
        if (type === 'Root') {
            this.treegrid.pageSettings = { pageSizeMode: 'Root', pageSize: 2 };
        } else {
            this.treegrid.pageSettings = { pageSizeMode: 'All', pageSize: this.pageSize.value };
        }
        this.toggleInputs(type === 'All');
    }
    public onClick(e: ChangeArgs): void {
        this.treegrid.allowPaging = this.enablePaging.checked;
        this.toggleInputs(this.enablePaging.checked, true);
    };
    public toggleInputs(state: boolean, isPager?: boolean): void {
        if (!isNullOrUndefined(isPager)) {
            (<HTMLElement>document.getElementsByClassName('con-prop1')[0]).style.display = state ? 'table-row' : 'none';
        }
        let flag: Boolean = this.dropdown1.value === 'All';
        let elem: HTMLCollectionOf<Element> = document.getElementsByClassName('con-prop2');
        for (let i: number = 0; i < elem.length; i++) {
            (<HTMLElement>elem[i]).style.display = state && flag ? 'table-row' : 'none';
        }
    }
    
    // custom code end
}
