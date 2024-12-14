import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DetailRowService, SortService, FilterService, GridModule } from '@syncfusion/ej2-angular-grids';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { employeeDetail, taskDetail } from './data';
import { CardSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ChartModule, LineSeriesService, CategoryService, TooltipService, LegendService } from '@syncfusion/ej2-angular-charts';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-griddetailtemplate',
    templateUrl: 'detail-template.html',
    styleUrls: ['detail-template.style.css'],
    providers: [DetailRowService, SortService, FilterService, LineSeriesService, CategoryService, TooltipService, LegendService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ GridModule, TabModule, ChartModule, SBActionDescriptionComponent, SBDescriptionComponent, KanbanModule]
})
export class DetailTemplateComponent implements OnInit {
  public data: any;
  public taskDetail: any;
  public salesData: any;
  public filterSettings: Object;
  public pageSettings: Object;
  public headerText: Record<string, any>[] = [];
  public cardSettings: CardSettingsModel;
  public statusColumns: Object[];
  constructor() {

  }

  ngOnInit(): void {
    this.data = employeeDetail;
    this.filterSettings = { type: 'CheckBox' };
    this.headerText = [{ 'text': 'Taskboard' }, { 'text': 'Burndown Chart' }];
    this.cardSettings = {
      headerField: 'Id',
    };
    this.statusColumns = [
      { headerText: 'Open', keyField: 'Open' },
      { headerText: 'In Progress', keyField: 'InProgress' },
      { headerText: 'Testing', keyField: 'Testing' },
      { headerText: 'Done', keyField: 'Close' }
    ];
  }

  public detailDataBound(args: any) {
    var rowData = args.data;
    this.taskDetail = taskDetail.filter((item: any) => item.Assignee === rowData.Name);
    this.salesData = this.generateData(this.taskDetail);
  }

  public generateData(taskData: any[]): any[] {
    const statusCategories = ['Open', 'InProgress', 'Testing', 'Close'];
    const statusData = statusCategories.map((status) => {
      const filteredTasks = taskData.filter((task: any) => task.Status === status);
      const estimatedHours = filteredTasks.reduce((sum: any, task: any) => sum + task.Estimate, 0);
      const spentHours = filteredTasks.reduce((sum: any, task: any) => sum + task.Spent, 0);
      let taskid = '';
      if (filteredTasks.length) {
        taskid = filteredTasks[0].Id;
      }
      return { spentHours, estimatedHours, status, taskid };
    });
    return statusData;
  }
}