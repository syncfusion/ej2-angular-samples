import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttComponent, SelectionService, FilterService, GanttModule } from '@syncfusion/ej2-angular-gantt';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Query } from '@syncfusion/ej2-data';
import { QueryBuilderComponent, QueryBuilderAllModule } from '@syncfusion/ej2-angular-querybuilder';
import { SidebarComponent, SidebarAllModule } from '@syncfusion/ej2-angular-navigations';
import { projectNewData } from './data';

@Component({
  selector: 'ej2-ganttadvancedfiltering',
  templateUrl: 'advanced-filtering.html',
  styleUrls: ['advanced-filtering.css'],
  providers: [SelectionService, FilterService],
  standalone: true,
  imports: [CommonModule, GanttModule, ButtonModule, QueryBuilderAllModule, SidebarAllModule]
})

export class GanttAdvancedFilteringComponent implements OnInit {
  @ViewChild('gantt')
  public gantt: GanttComponent;
  @ViewChild('sidebar')
  public sidebar: SidebarComponent;
  @ViewChild('querybuilder')
  public queryBuilder: QueryBuilderComponent;
  public data: object[] = projectNewData;
  public taskSettings: object;
  public columns: object[];
  public queryBuilderColumns: object[];
  public splitterSettings: object;
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  
  public includeWeekend: boolean;
  public allowFiltering: boolean;
  public sidebarToggle: boolean = false;
  public isSideBar: boolean = false;
  public predicateValue: any;
  public searchQuery: any;
  private sqlQuery: string = '';

  public ngOnInit(): void {
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      parentID: 'ParentID'
    };
    this.columns = [
      { field: 'TaskID', width: 120 },
      { field: 'TaskName', headerText: 'Name', width: 250 },
      { field: 'StartDate' },
      { field: 'Duration' },
      { field: 'EndDate' },
      { field: 'Progress' },
      { field: 'Predecessor', type: 'string', width: 190 }
    ];
    this.queryBuilderColumns = [
      { field: 'TaskID', label: 'Task ID', type: 'number' },
      { field: 'TaskName', label: 'Task Name', type: 'string' },
      { field: 'StartDate', label: 'Start Date', type: 'date', format: 'MM/dd/yyyy' },
      { field: 'Duration', label: 'Duration', type: 'number' },
      { field: 'EndDate', label: 'End Date', type: 'date', format: 'MM/dd/yyyy' },
      { field: 'Progress', label: 'Progress', type: 'number' },
      { field: 'Predecessor', label: 'Predecessor', type: 'string' }
    ];
    this.splitterSettings = {
      columnIndex: 2
    };
    this.labelSettings = {
      rightLabel: 'TaskName'
    };
    this.includeWeekend = true;
    this.allowFiltering = true;
    this.projectStartDate = new Date('03/30/2025');
    this.projectEndDate = new Date('06/21/2025');
  }

  public triggerSidebar(): void {
    this.sidebarToggle = !this.sidebarToggle;
    this.isSideBar = true;
  }

  public handleClose(): void {
    this.sidebarToggle = false;
    if (this.queryBuilder) {
      this.sqlQuery = this.queryBuilder.getSqlFromRules();
    }
    this.isSideBar = false;
    this.sidebar.hide();
  }

  public onRowSelect(): void {
    this.sidebarToggle = false;
    if (this.isSideBar) {
      this.sqlQuery = this.queryBuilder.getSqlFromRules();
      this.isSideBar = false;
      this.sidebar.isOpen = false;
    }
  }

  public onApplyClick(): void {
    if (this.predicateValue != null) {
      this.searchQuery = new Query().where(this.predicateValue);
    } else {
      // If no filter rules are applied, select all available fields
      this.searchQuery = new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']);
    }
    this.gantt.query = this.searchQuery;
    this.gantt.refresh();
  }

  public onClearClick(): void {
    this.queryBuilder.reset();
    this.predicateValue = null;
    this.searchQuery = new Query();
    this.gantt.query = this.searchQuery;
    this.gantt.refresh();
  }

  public updateRule(args: any): void {
    this.predicateValue = this.queryBuilder.getPredicate(args.rule);
    if (args.Type === "DeleteRule" && this.predicateValue !== null) {
      this.searchQuery = new Query().where(this.predicateValue);
    } else if (this.predicateValue === null && args.Type === "DeleteRule") {
      this.searchQuery = new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']);
    }
  }

  public created(): void {
    if (this.sqlQuery && this.sqlQuery !== '') {
      this.queryBuilder.setRulesFromSql(this.sqlQuery);
    }
  }
}
