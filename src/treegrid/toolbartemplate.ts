import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'toolbartemplate.html'
})
export class ToolbarTemplateComponent implements OnInit {
    public data: Object[] = [];
    public toolbar: Object[];
    public filterSettings: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    ngOnInit(): void {
        this.data = sampleData;
        this.toolbar= ['ExpandAll', 'CollapseAll',  {text: 'Quick Filter', tooltipText: 'Quick Filter', id: 'refresh'}];
        this.filterSettings= {hierarchyMode: 'Parent' }
    }
    public toolbarClick (e: ClickEventArgs): void {
        if (e.item.id === 'refresh') {
            this.treegrid.filterByColumn("taskName","startswith","Testing");;
     }
}
}
