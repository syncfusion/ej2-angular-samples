import { Component, OnInit, ViewChild} from '@angular/core';
import { BaselineTemplateData } from './data';
import { GanttAllModule, TaskFieldsModel, SplitterSettingsModel, LabelSettingsModel, ColumnModel, TooltipSettingsModel } from '@syncfusion/ej2-angular-gantt';
import { CommonModule } from '@angular/common';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';

@Component({
  selector: 'ej2-ganttbaselinetemplate',
  templateUrl: 'baseline-template.html',
  standalone: true,
  imports: [GanttAllModule, CommonModule, SBActionDescriptionComponent, SBDescriptionComponent],
})

export class GanttBaselineTemplateComponent implements OnInit {
  public data: Object[];
  public taskSettings: TaskFieldsModel;
  public splitterSettings: SplitterSettingsModel;
  public labelSettings: LabelSettingsModel;
  public columns: ColumnModel[];
  public projectStartDate: Date;
  public projectEndDate: Date;
  public baselineTemplate: any;
  public gridLines: string = 'Both';
  public tooltipSettings: TooltipSettingsModel;

  @ViewChild('baselineTemplate', { static: true })
  baselineTemplateRef: any;

  @ViewChild('gantt', { static: true }) public ganttObj: any;

  ngAfterViewInit(): void {
    this.ganttObj.baselineTemplate = this.baselineTemplateRef;
  }

  public ngOnInit(): void {
    this.data = BaselineTemplateData;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      baselineStartDate: 'BaselineStartDate',
      baselineDuration: 'BaselineDuration',
      dependency: 'Predecessor',
      child: 'subtasks'
    };

    this.columns = [
      { field: 'TaskID' },
      { field: 'TaskName', width: '270px' },
      { field: 'BaselineStartDate', headerText: 'Baseline Start Date', type: 'date', format: 'dd/MM/yyyy', width: '180px' },
      { field: 'BaselineDuration', headerText: 'Baseline Duration', width: '180px' },
      { field: 'BaselineStartDate1', headerText: 'Baseline1 Start Date', type: 'date', format: 'dd/MM/yyyy', width: '180px' },
      { field: 'BaselineDuration1', headerText: 'Baseline1 Duration', width: '180px' },
      { field: 'BaselineStartDate2', headerText: 'Baseline2 Start Date', type: 'date', format: 'dd/MM/yyyy', width: '180px' },
      { field: 'BaselineDuration2', headerText: 'Baseline2 Duration', width: '180px' }
    ];

    this.splitterSettings = {
      columnIndex: 3
    };
    this.tooltipSettings = {
      showTooltip: false
    }
    this.labelSettings = {
      rightLabel: 'TaskName'
    } 
    this.projectStartDate = new Date('2024-05-01');
    this.projectEndDate = new Date('2024-05-30');
  }
  getLeft(date: Date, row: any): number {
    const gp = row.taskData.ganttProperties;
    return this.ganttObj.dataOperation.getTaskLeft(
      new Date(date),
      false,
      gp.calendarContext
    );
  }

  getWidth(start: Date, duration: number, row: any): number {
    if (!start || duration == null || duration === 0) return 0;

    const end = new Date(start);
    end.setDate(end.getDate() + duration);

    return this.getLeft(end, row) - this.getLeft(start, row);
  }

  getMilestoneLeft(date: Date, row: any): number {
    const chart = this.ganttObj.chartRowsModule;
    const milestoneHeight = chart.milestoneHeight;
    const enableRtl = this.ganttObj.enableRtl;
    const left = this.getLeft(date, row);
    return enableRtl
      ? left - (milestoneHeight / 2) + 3
      : left - (milestoneHeight / 2) + 1;
  }

  getBaselineMilestoneTop(index: number): number {
    const chart = this.ganttObj.chartRowsModule;
    const rowHeight = this.ganttObj.rowHeight;
    const milestoneMarginTop = chart.milestoneMarginTop;
    const baselineGap = 4;     
    const baselineMilestoneHeight = 5;
    return (
      (-Math.floor(rowHeight - milestoneMarginTop) + baselineMilestoneHeight)
      + 2
      + (index * baselineGap)
    );
  }
  getBaselineTop(index: number): number {
    const chart = this.ganttObj.chartRowsModule;
    const baselineTop = chart.baselineTop; 
    const gap = 9;                           
    return baselineTop + (index * gap);
  }
}