import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { VirtualScrollService, TreeGridComponent, EditService, ToolbarService, RowDDService } from '@syncfusion/ej2-angular-treegrid';
import { virtualDataSource, virtualScrollData } from './jsontreegriddata';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgClass } from '@angular/common';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'virtual-scrolling.html',
    encapsulation: ViewEncapsulation.None,
    providers: [VirtualScrollService, ToolbarService, EditService, RowDDService],
    standalone: true,
    styleUrls: ['virtual-scrolling.style.css'],
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent, NgClass]
})
export class VirtualScrollingComponent implements OnInit {
    @ViewChild('treegridvirtual')
    public treegrid: TreeGridComponent;
    public data: any[];
    public toolbar: string[] = [
        'Add',
        'Edit',
        'Delete',
        'Update',
        'Cancel',
        'Indent',
        'Outdent',
    ];
    public getStatusClass(status: string | undefined): string {
        if (!status) return 'rg-status-maintenance'; // fallback

        const s = status.toLowerCase().trim();

        if (s.startsWith('run')) {
            return 'rg-status-running';
        }
        if (s.startsWith('stop')) {
            return 'rg-status-stopped';
        }
        if (s.startsWith('degrad')) {
            return 'rg-status-degraded';
        }
        // fallback / default
        return 'rg-status-maintenance';
    }
    public editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        mode: 'Row',
        newRowPosition: 'Child',
    };

    public pageSettings = { pageSize: 50 };
    
    public ngOnInit(): void {
        if (virtualScrollData.length === 0) {
            virtualDataSource();
        }
        this.data = virtualScrollData;
    }
    public getComplianceWidth(val: any): number {
        return Math.max(0, Math.min(100, parseInt(val || '0', 10)));
    }

    public getComplianceValue(val: any): number {
        return this.getComplianceWidth(val);
    }

    public getPriorityClass(p: string | undefined): string {
        const priority = (p || 'Medium').toLowerCase();
        if (priority === 'low') return 'rg-priority-low';
        if (priority === 'critical') return 'rg-priority-critical';
        if (priority === 'high') return 'rg-priority-high';
        return 'rg-priority-medium';
    }
    public actionBegin(args: any): void {
        if(args.requestType === 'save') {
            args.data.TaskID = 10000 + Math.floor(Math.random() * 10001);
        }
    }
    public load(args: any) {
        if (this.treegrid.enableVirtualization) {
            args.enableSeamlessScrolling = true;
        }
    }
}