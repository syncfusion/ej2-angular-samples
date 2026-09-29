import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
    GridComponent,
    GridModule,
    GroupService,
    ColumnChooserService,
    InfiniteScrollService,
} from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { createSalesDataSource, salesDataSource } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridresponsive',
    templateUrl: 'responsive-grid.html',
    providers: [
        PageService,
        SortService,
        FilterService,
        ToolbarService,
        EditService,
        GroupService,
        ColumnChooserService,
        InfiniteScrollService,
    ],
    standalone: true,
    styleUrls: ['responsive-grid.style.css'],
    imports: [GridModule, CheckBoxModule, CommonModule, SBActionDescriptionComponent, SBDescriptionComponent],
    encapsulation: ViewEncapsulation.None,
})
export class ResponsiveGridComponent {
    @ViewChild('desktopgrid', { static: false }) desktopGrid?: GridComponent;
    @ViewChild('adaptive')
    public grid!: GridComponent;

    public isMobileLayout = false;
    public salesData: Object[] = [];

    public pageSettings: { pageSize: number } = { pageSize: 50 };
    public filterOptions: object = { type: 'CheckBox', enableInfiniteScrolling: true };
    public currentMonth: string = new Date().toLocaleString('default', { month: 'long' });

     public toolbarOptions: string[] = [
        'Add',
        'Edit',
        'Delete',
        'Update',
        'Cancel',
        'ColumnChooser',
    ];

    public toolbarOptionsMobile: string[] = [
        'Search',
        'ColumnChooser',
        'Add',
        'Edit',
        'Update',
        'Delete'
    ];

    public renderingMode = 'Vertical';

    
   // Common base settings
    public baseEditSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
    };

    // Mobile → Dialog mode
    public editSettingsMobile = { ...this.baseEditSettings, mode: 'Dialog' };

    // Desktop → Inline mode
    public editSettingsDesktop = { ...this.baseEditSettings, mode: 'Normal' };

    public orderidRules = { required: true, number: true };

    constructor() {
        createSalesDataSource();
        this.salesData = salesDataSource;
    }

    onChange(e: any) {
        this.isMobileLayout = e?.checked;
    }

    onGridLoad = () => {
       (this.grid as GridComponent).adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
    }

}