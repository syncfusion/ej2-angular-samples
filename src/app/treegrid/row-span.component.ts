import { Component, OnInit } from '@angular/core';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { TreeGridModule, SortService, ToolbarService, FreezeService, ColumnChooserService, PageService } from '@syncfusion/ej2-angular-treegrid';
import { rowSpanData } from './jsontreegriddata';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  selector: 'app-row-span',
  templateUrl: './row-span.html',
  styleUrls: ['row-span.component.css'],
  standalone: true,
  imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent],
  providers: [
    SortService,
    FreezeService,
    ToolbarService,
    ColumnChooserService,
    PageService
  ]
})
export class RowSpanComponent implements OnInit {
  public rowSpanData: any[];
  public pageSettings: Object;

  public scheduleColumns?: Object[];
  public personnelColumns?: Object[];
  public statusColumns?: Object[];
  public complianceColumns?: Object[];
  public materialsColumns?: Object[];
  public budgetColumns?: Object[];

  ngOnInit(): void {
    this.rowSpanData = rowSpanData;
    this.pageSettings= { pageSizeMode: 'All', pageSize: 18 };
    
    this.scheduleColumns = [
      { field: 'startDate', headerText: 'Start Date', type: 'date', format: 'MM/dd/yyyy', width: 140, textAlign: 'Center' },
      { field: 'endDate', headerText: 'End Date', type: 'date', format: 'MM/dd/yyyy', width: 140, textAlign: 'Center' }
    ];

    this.personnelColumns = [

 {
    field: 'supervisor',
    headerText: 'Supervisor',
    width: 180,
 },
      { field: 'team', headerText: 'Crew', width: 200 }
    ];

    this.statusColumns = [
      { field: 'status', headerText: 'Status', width: 180, textAlign: 'Center' }
    ];

    this.complianceColumns = [
      { field: 'permitStatus', headerText: 'Permit Status', width: 160, textAlign: 'Center' },
      { field: 'inspectionDate', headerText: 'Inspection Date', width: 180, type: 'date', format: 'MM/dd/yyyy', textAlign: 'Center' },
      { field: 'inspectionStatus', headerText: 'Inspection Status', width: 180, textAlign: 'Center' },
      { field: 'punchListStatus', headerText: 'Punch List Status', width: 180, textAlign: 'Center' }
    ];

    this.materialsColumns = [
      { field: 'materialUsed', headerText: 'Materials Used', width: 180, textAlign: 'Center' },
      { field: 'materialCost', headerText: 'Material Cost', width: 140, format: 'C2', textAlign: 'Right', enableRowSpan: false}
    ];

    this.budgetColumns = [
      { field: 'totalBudget', headerText: 'Planned Budget', width: 140, format: 'C2', textAlign: 'Center', enableColSpan: false, enableRowSpan: false},
      { field: 'paidToDate', headerText: 'Actual Spend', width: 140, format: 'C2', textAlign: 'Center', enableColSpan: false, enableRowSpan: false}
    ];

  }
}
