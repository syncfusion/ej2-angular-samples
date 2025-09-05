import { Component, OnInit } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgModule, ViewChild } from '@angular/core'
import { PageService, SortService, TreeGridComponent, TreeGridModule } from '@syncfusion/ej2-angular-treegrid'
import { FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid'
import { templateCompiler } from '@syncfusion/ej2-grids';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'empty-record-template.html',
    styleUrls: ['empty-record-template.style.css'],
    standalone: true,
    imports: [TreeGridModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent],
    providers: [FilterService, EditService, ToolbarService, PageService, SortService],
})
export class EmptyRecordTemplateComponent implements OnInit {
    public pageSettings: Object;
    @ViewChild('emptyTreeGrid', { static: false }) public treegrid: TreeGridComponent;
    @ViewChild('emptyRecordTemplate', { static: false }) public emptyRecordTemplate: any;
    @ViewChild('addRecordBtn') public addRecordButton: ButtonComponent;
    public data: Object[] = [];
    public toolbar: string[];
    public filterSettings: any;
    public editSettings: Object;
    public taskIdRules: Object = { required: true, number: true };
    public taskNameRules: Object = { required: true };
    public priorityParams: Object = { params: { dataSource: [{priority:"Low"},{priority:"Medium"},{priority:"High"},{priority:"Critical"}] } };
    public statusParams: Object = { params:{dataSource:[{status:"Open"},{status:"Inprogress"},{status:"Review-Request"},{status:"Review-Reject"},{status:"Closed"}]}}

    public onActionComplete(args: any) {
      
      
      // Toggle filter dialog based on visible records
      if (args.requestType === 'filterAfterOpen' && this.treegrid.flatData.length === 0) {
        if (args.filterModel.filterSettings.columns.length > 0 && args.filterModel.filterSettings.columns.some((col: any) => col.field === args.columnName)) {
          args.filterModel.dlgObj.show();
        }
        else {
          args.filterModel.dlgObj.hide();
        }
      }
      if ((args.requestType === 'delete' || args.requestType === 'searching') && this.treegrid.flatData.length === 0 && this.treegrid.searchSettings.key === '') {
            this.treegrid.toolbarModule.enableItems([this.treegrid.element.id + '_gridcontrol_searchbar'], false);
      }
      if(args.action === 'clearFilter' && this.treegrid.flatData.length !== 0) {
          this.treegrid.toolbarModule.enableItems([this.treegrid.element.id + '_gridcontrol_searchbar'], true);
      }
    }
   
     public dataBound(args:any){

        const isGridEmpty = this.treegrid.flatData.length === 0;
        if (this.treegrid.searchSettings.key === '' || this.treegrid.searchSettings.key === undefined) {
           this.treegrid.toolbarModule.enableItems([this.treegrid.element.id + '_gridcontrol_searchbar'], !isGridEmpty);
        }

        const filterMenudivs: any = this.treegrid.element.querySelectorAll('.e-filtermenudiv');
        filterMenudivs.forEach((div: HTMLElement) => {
            if (isGridEmpty && this.treegrid.grid.filterSettings.columns.length == 0) {
                div.classList.add('e-disabled');
                div.style.cursor = 'default';
            } else {
                div.classList.remove('e-disabled');
                div.style.removeProperty('cursor');
            }
        });
    }
    ngOnInit(): void {
        this.data = [];
        this.toolbar = ["Add","Update", "Cancel","Delete", "Search"];
        this.editSettings = { allowAdding: true,allowDeleting: true, allowEditing: true };
        this.filterSettings = { type: 'Menu', hierarchyMode: 'Parent' };
    }
    
}
