import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent} from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'custom-contextmenu.html'
})
export class CustomContextMenuComponent implements OnInit {
    public data: Object[] = [];
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    public contextMenuItems: Object;
    ngOnInit(): void {
        this.data = sampleData;
        this.contextMenuItems= [
            {text: 'Collapse the Row', target: '.e-content', id: 'collapserow'},
            {text: 'Expand the Row', target: '.e-content', id: 'expandrow'} ]
    }
    contextMenuOpen (arg?: BeforeOpenCloseEventArgs): void {
        let elem: Element = arg.event.target as Element;
        let uid: string = elem.closest('.e-row').getAttribute('data-uid');
        if (isNullOrUndefined(getValue('hasChildRecords', this.treegrid.grid.getRowObjectFromUID(uid).data))) {
            arg.cancel = true;
        } else {
            let flag: boolean = getValue('expanded', this.treegrid.grid.getRowObjectFromUID(uid).data);
            let val: string = flag ? 'none' : 'block';
            document.querySelectorAll('li#expandrow')[0].setAttribute('style','display: ' + val + ';');
            val = !flag ? 'none' : 'block';
            document.querySelectorAll('li#collapserow')[0].setAttribute('style','display: ' + val + ';');
        }
    }
    contextMenuClick (args?: MenuEventArgs): void {
        this.treegrid.getColumnByField('taskID');
        if (args.item.id === 'collapserow') {
            this.treegrid.collapseRow(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]), this.treegrid.getSelectedRecords()[0]);
        } else {
            this.treegrid.expandRow(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]), this.treegrid.getSelectedRecords()[0]);
            }
    }
}
