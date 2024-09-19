import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttComponent, SelectionService, FilterService, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { ButtonComponent, ButtonAllModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Query } from '@syncfusion/ej2-data';
import { QueryBuilderComponent, QueryBuilderAllModule} from '@syncfusion/ej2-angular-querybuilder';
import { SidebarComponent, SidebarAllModule} from '@syncfusion/ej2-angular-navigations';
import { projectNewData } from './data';

@Component({
  selector: 'ej2-ganttadvancedfiltering',
  templateUrl: 'advanced-filtering.html',
  styleUrls: ['advanced-filtering.css'],
  providers: [SelectionService, FilterService],
  standalone: true,
  imports: [CommonModule, GanttAllModule, ButtonModule, QueryBuilderAllModule, SidebarAllModule]
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
  public splitterSettings: object;
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public height: string;
  public create: any;
  public includeWeekend: boolean;
  public allowFiltering: boolean;
  public sidebarToggle: boolean = false;
  public isSideBar: boolean = false;
  public predicateValue: any;
  public queryBuilderEvent: boolean = false;
  public searchQuery: any;

  public ngOnInit(): void {
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      child: 'subtasks'
    };
    this.columns = [
      { field: 'TaskID', width: 80 },
      { field: 'TaskName', headerText: 'Name', width: 250 },
      { field: 'StartDate' },
      { field: 'Duration' },
      { field: 'EndDate' },
      { field: 'Progress' },
      { field: 'Predecessor' }
    ];
    this.splitterSettings = {
      columnIndex: 4
    };
    this.labelSettings = {
      rightLabel: 'TaskName'
    };
    this.height = '410px';
    this.includeWeekend = true;
    this.allowFiltering = true;
    this.projectStartDate = new Date('04/01/2024');
    this.projectEndDate = new Date('07/06/2024');
  }

  public triggerSidebar(): void {
    this.sidebarToggle = !this.sidebarToggle;
    this.isSideBar = true;
  }

  public handleClose(): void {
    this.sidebarToggle = false;
    this.isSideBar = false;
    this.create = this.queryBuilder.getSqlFromRules();
    this.sidebar.hide();
  }

  public onRowSelect(): void {
    this.sidebarToggle = false;
    if (this.isSideBar) {
      this.create = this.queryBuilder.getSqlFromRules();
      this.isSideBar = false;
      this.sidebar.isOpen = false;
    }
  }

  public onApplyClick(): void {
    if (this.predicateValue != null) {
      this.searchQuery = new Query().where(this.predicateValue);
    } else {
      this.searchQuery = new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']);
    }
    this.gantt.query = this.searchQuery;
    this.gantt.refresh();
  }

  public onClearClick(): void {
    this.queryBuilder.reset();
    this.predicateValue = null;
    this.searchQuery = new Query();
    this.gantt.refresh();
  }

  public updateRule(args: any): void {
    this.predicateValue = this.queryBuilder.getPredicate(args.rule);
    if (args.Type == "DeleteRule" && this.predicateValue != null) {
      this.searchQuery = new Query().where(this.predicateValue);
    } else if (this.predicateValue == null && args.Type == "DeleteRule") {
      this.searchQuery = new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']);
    }
  }

  public created(): void {
    this.queryBuilderEvent = true;
    if (this.create && this.create !== '') {
      this.queryBuilder.setRulesFromSql(this.create);
    }
  }
}
