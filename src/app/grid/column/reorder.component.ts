import { Component, OnInit } from '@angular/core';
import { employeeData } from './data'
import { ReorderService, SortService, GridModule, FilterService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej-gridreorder',
    templateUrl: 'reorder.html',
    providers: [ReorderService, SortService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class ReorderComponent implements OnInit {
    public data: Object[];
    public filterSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public employeeidrules: Object;
    public firstnamerules: Object;

    ngOnInit(): void {
        this.data = employeeData;
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.employeeidrules = { required: true, number: true };
        this.firstnamerules = { required: true, minLength: 5 };
    }
}