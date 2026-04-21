import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { VirtualScrollService, GridComponent, EditService, ToolbarService, GridModule, LoadEventArgs } from '@syncfusion/ej2-angular-grids';
import { createVirtualOrderData, virtualOrderData } from './data';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ej2-gridvirtual',
    templateUrl: 'virtualization.html',
    styleUrls: ['virtualization.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [VirtualScrollService, EditService, ToolbarService],
    standalone: true,
    imports: [SBActionDescriptionComponent, ButtonModule, GridModule, SBDescriptionComponent, NgIf, RatingModule]
})
export class VirtualizationComponent implements OnInit {
    public vData: Object[] = virtualOrderData;
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('load')
    public loadButton: ButtonComponent;
    public date1: number;
    public date2: number;
    public flag: boolean = true;
    public ngOnInit(): void { }
    public validationSno: Object = { required: true, digits: true };
    public validationRules: Object = { required: true };
    public toolbar: string[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    public editSettings: Object = { allowEditing: true, allowDeleting: true, newRowPosition: 'Top' };
    public editparams?: Object = { params: { showSpinButton: false } };

    onClick = (args: any) => {
        this.loadButton.disabled = true
        this.show();
        if (!this.vData.length) {
            createVirtualOrderData();
            this.grid.dataSource = this.vData;
            this.grid.editSettings.allowAdding = true;
        }
        this.flag = true;
        this.date1 = new Date().getTime();
        this.grid.refresh();
    }
    onLoad(args: LoadEventArgs): void {
        if (this.grid.enableVirtualization) {
            args.enableSeamlessScrolling = true;
        }
    }
    show(): void {
        document.getElementById('popup').style.display = 'inline-block';
    }
    hide(): void {
        if (this.flag && this.date1) {
            this.date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (this.date2 - this.date1) + 'ms';
            this.flag = false;
        }
        document.getElementById('popup').style.display = 'none';
    }
}
