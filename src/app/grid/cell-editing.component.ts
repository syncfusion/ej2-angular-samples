import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { appointmentData } from './data';
import { GridComponent, EditService, ToolbarService, PageService, SortService, GridModule, FilterService, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ej-gridcelledit',
    templateUrl: 'cell-editing.html',
    styleUrls: ['cell-editing.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, EditService, PageService, SortService, FilterService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent, NgIf]
})
export class CellEditComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public editparams: Object;
    public filterSettings: Object;
    @ViewChild('grid')
    public grid: GridComponent;
    public doctorList: string[] = [
        'Dr. Smitha',
        'Dr. Johnson',
        'Dr. Garcia',
        'Dr. Brianna',
        'Dr. Williams',
        'Dr. Martinez',
        'Dr. Davis',
        'Dr. Joanna',
    ];

    public ngOnInit(): void {
        this.data = appointmentData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Cell' };
        this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        this.editparams = { params: { showSpinButton: false } };
        this.filterSettings = { type: 'CheckBox' };
    }

    actionBegin(args: any): void {
        if (args.requestType === 'save' && args.action === 'add') {
            args.data.ApptID = 'APT-' + (Date.now() % 100000);
        }
    }

    actionComplete(args: any): void {
        if (args.requestType === 'save' && args.columnName === 'Doctor') {
            const doctorRoomMap: any = {
                'Dr. Smitha': 'R1',
                'Dr. Johnson': 'R2',
                'Dr. Garcia': 'R6',
                'Dr. Brianna': 'R4',
                'Dr. Williams': 'R3',
                'Dr. Martinez': 'R7',
                'Dr. Davis': 'R8',
                'Dr. Joanna': 'R5',
            };
            this.grid.updateCell(args.rowIndex, 'Room', doctorRoomMap[args.data.Doctor])
        }
    }

    public validateAppointmentTime(args: any): boolean {
        if (!args.value) {
            return false;
        }
        const date: Date = new Date(args.value);
        const hour: number = date.getHours();
        return hour >= 9 && hour <= 20;
    }

}
