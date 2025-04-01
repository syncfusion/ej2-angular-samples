import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { sampleData, lockRowDropDownData} from './jsontreegriddata';
import { RowDataBoundEventArgs, BeginEditArgs } from '@syncfusion/ej2-grids';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { TreeGridComponent, EditService  ,TreeGridAllModule, PageService } from '@syncfusion/ej2-angular-treegrid';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { MultiSelectComponent, MultiSelectAllModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

MultiSelect.Inject(CheckBoxSelection);

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'lockrow.html',
    providers: [EditService, PageService],
    styleUrls: ['lockrow.style.css'],
    encapsulation : ViewEncapsulation.None,
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent, MultiSelectModule]
})
export class LockRowComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar:string[];
    public value: number[] = [];
    public pageSettings: Object;
    public d1data: Object;
    public popupHeight: Object;
    public editparams: Object;
    public taskidrules: Object;
    public tasknamerules: Object;
    public startdaterules: Object;
    public durationrules: Object;
    public dateeditparam:Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('multiselect')
    public multiselect: MultiSelectComponent;
    ngOnInit(): void {
        this.data = sampleData.slice(0);
        this.editSettings ={ allowEditing: true,   mode: 'Row', newRowPosition: 'Child' }; 
        this.toolbar = ['Edit', 'Update', 'Cancel'];
        this.pageSettings= {pageSize: 2, pageSizeMode: 'Root'};
        this.d1data = lockRowDropDownData;
        this.value = [2,6];
        this.popupHeight='350px';
        this.dateeditparam = { params: { format: 'M/d/yyyy' } };
        this.taskidrules = { required: true , number: true};
        this.tasknamerules = { required: true};
        this.startdaterules = { date: ['M/d/yyyy', 'Please enter a valid date']};
        this.durationrules = {number: true , min: 0};
        this.editparams = {params: { format: 'n' }};
    }
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['lockrow.style.css'];
    }
    public rowDataBound (e: RowDataBoundEventArgs): void { 
        let key: string = 'taskID';
       if ((<Object[]>this.multiselect.value).indexOf(e.data[key]) !== -1) {
            addClass([e.row], 'disableRow');
        } else {
            removeClass([e.row], 'disableRow');
        }
    }
    public beginEdit (e: BeginEditArgs): void {
        let key: string = 'taskID';
       if ((<Object[]>this.multiselect.value).indexOf(e.rowData[key]) !== -1) {
            e.cancel = true;
        }
    }
    public select (e: any) :void {
        this.treegrid.refresh();
    }
    public removed (e: any) {
        this.treegrid.refresh();
    }
}
