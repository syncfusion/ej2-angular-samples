import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { data } from './data';
import { Browser, enableRipple } from '@syncfusion/ej2-base';
import { PageService, FilterService, SortService, GroupService, ToolbarService, GroupSettingsModel, ResizeService, AggregateService, EditService, GridComponent, ExcelExportService, PdfExportService, ColumnChooserService, ColumnMenuService, GridModule } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';
enableRipple(false);

@Component({
    selector: 'ej2-adaptive',
    templateUrl: 'adaptive-layout.html',
    styleUrls: ['adaptive-layout.style.css'],
    providers: [PageService, FilterService, GroupService, ToolbarService, SortService, ResizeService, AggregateService, EditService, ExcelExportService, PdfExportService, ColumnChooserService, ColumnMenuService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, GridModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AdaptiveLayoutComponent implements OnInit {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['adaptive-layout.style.css'];
    }

    @ViewChild('adaptive')
    public grid: GridComponent;
    public data: Object[] = [];
    public editSettings: Object;
    public groupOptions: GroupSettingsModel;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public pageSettings: Object;
    public rowMode: string;
    public filterSettings: Object;
    public isDeskTop: Boolean;
    ngOnInit(): void {
        this.data = data;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ColumnChooser', 'ExcelExport', 'PdfExport'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.pageSettings = { pageCount: 3, pageSizes: true };
        this.groupOptions = { showGroupedColumn: true };
        this.rowMode = 'Vertical';
        this.filterSettings = { type: 'Excel' };
        this.isDeskTop = !Browser.isDevice;
    }
    public changeHandler(e: any): void {
        this.grid.rowRenderingMode = e.checked ? 'Horizontal' : 'Vertical';
        this.grid.allowGrouping = e.checked;
    }

    public toolbarClick(args: ClickEventArgs): void {
        switch (args.item.id) {
            case this.grid.element.id + '_pdfexport':
                this.grid.pdfExport();
                break;
            case this.grid.element.id + '_excelexport':
                this.grid.excelExport();
                break;
        }
    }

    public onLoad(): void {
        this.grid.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
        if(this.grid.pageSettings.pageSizes) {
          document.querySelector('.e-adaptive-demo').classList.add('e-pager-pagesizes');
        }
        else{
            document.querySelector('.e-adaptive-demo').classList.remove('e-pager-pagesizes');
        }
    }
}
