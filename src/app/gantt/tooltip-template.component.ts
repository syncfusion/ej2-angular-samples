import { Component, OnInit} from '@angular/core';
import { tooltipData, editingResources } from './data';
import { Internationalization } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { NgIf } from '@angular/common';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
let instance: Internationalization = new Internationalization();
@Component({
  selector: 'ej2-gantttooltiptemplate',
  templateUrl: 'tooltip-template.html',
  standalone: true,
  imports: [
    SBActionDescriptionComponent,
    GanttAllModule,
    NgIf,
    SBDescriptionComponent,
  ],
})
export class GanttTooltipTemplateComponent implements OnInit {
  public data: object[];
  public resources: object[];
  public resourceFields: object;
  public taskSettings: object;
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public columns: object[];
  public splitterSettings: object;
  public tooltipSettings: object;
  public topTierData: any;
  public bottomTierData: any;
  public themeClass: string;
  public ngOnInit(): void {
    this.data = tooltipData;
    this.resources = editingResources;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      resourceInfo: 'resources',
      baselineStartDate: 'BaselineStartDate',
      baselineEndDate: 'BaselineEndDate',
      child: 'subtasks',
    };
    this.resourceFields = {
      id: 'resourceId',
      name: 'resourceName',
    };
    this.columns = [
      { field: 'TaskID', width: 80 },
      { field: 'TaskName', width: 250 },
      { field: 'StartDate' },
      { field: 'EndDate' },
      { field: 'Duration' },
      { field: 'Predecessor' },
      { field: 'Progress' },
      { field: 'BaselineStartDate' },
      { field: 'BaselineEndDate' },
      { field: 'resources' },
    ];
    this.labelSettings = {
      leftLabel: 'TaskName',
      rightLabel: 'resources',
    };
    this.splitterSettings = {
      columnIndex: 2,
    };
    (this.tooltipSettings = {
      showTooltip: true,
    }),
      (this.projectStartDate = new Date('03/24/2024'));
    this.projectEndDate = new Date('05/04/2024');
  }
  public format(value: Date): string {
    return instance.formatDate(value, { format: 'MM/dd/yyyy' });
  }
  public generateTopTierTooltip(value: any, date: Date, tier: string): string {
    return `<div>Top Tier: ${tier}</div>`;
  }
  public generateBottomTierTooltip(date: Date, tier: string): string {
    return `<div>Bottom Tier: ${tier}</div>`;
  }

  private getTooltipData(startDate: Date, endDate: Date, tier: string) {
    let ganttElement = document.getElementsByClassName('e-gantt')[0] as any;
    let gantt = ganttElement ? ganttElement.ej2_instances[0] : null;
    if (!gantt) return { activeTasks: 0, milestones: 0, overallProgress: 0 };

    let activeTasks;
    if (tier === 'topTier') {
      activeTasks = gantt.currentViewData.filter((task) => {
        let taskStart = new Date(task.StartDate);
        let taskEnd = new Date(task.EndDate);
        taskStart.setHours(0, 0, 0, 0);
        taskEnd.setHours(0, 0, 0, 0);
        return taskStart >= startDate && taskEnd <= endDate;
      });
    } else {
      activeTasks = gantt.currentViewData.filter((task) => {
        let taskStart = new Date(task.StartDate);
        let taskEnd = new Date(task.EndDate);
        taskStart.setHours(0, 0, 0, 0);
        taskEnd.setHours(0, 0, 0, 0);
        return (
          taskStart.getTime() === startDate.getTime() &&
          taskEnd.getTime() === endDate.getTime()
        );
      });
    }

    let milestones = activeTasks.filter((task) => task.Duration === 0);
    let totalProgress = activeTasks.reduce(
      (acc: number, task: any) => acc + (task.Progress || 0),
      0
    );
    let overallProgress =
      activeTasks.length > 0
        ? (totalProgress / activeTasks.length).toFixed(2)
        : '0';

    return {
      activeTasks: activeTasks.length,
      milestones: milestones.length,
      overallProgress: overallProgress,
    };
  }

  public topTierTooltip(value: string, date: Date, tier: string): string {
    let ganttElement = document.getElementsByClassName('e-gantt')[0] as any;
    let gantt = ganttElement ? ganttElement.ej2_instances[0] : null;
    if (!gantt) return '';

    let endDate;
    let startdate = new Date(date);
    if (gantt.timelineSettings.topTier.unit) {
      endDate = new Date(startdate.getTime());
      endDate.setDate(startdate.getDate() + 6);
    }
    this.topTierData = this.getTooltipData(startdate, endDate, tier);
    this.updateThemeClass();
  }

  public bottomTierTooltip(date: string, tier: string): string {
    let ganttElement = document.getElementsByClassName('e-gantt')[0] as any;
    let gantt = ganttElement ? ganttElement.ej2_instances[0] : null;
    if (!gantt) return '';

    let startdate = new Date(date);
    let endDate;
    if (gantt.timelineSettings.bottomTier.unit) {
      endDate = new Date(startdate.getTime());
    }
    this.bottomTierData = this.getTooltipData(startdate, endDate, tier);
    this.updateThemeClass();
  }

  private updateThemeClass(): void {
    const bodyClasses = document.body.classList;
    const themeIsDark = bodyClasses.contains('tailwind3-dark') ||
        bodyClasses.contains('fluent2') ||
        bodyClasses.contains('material3-dark') ||
        bodyClasses.contains('bootstrap5.3-dark') ||
        bodyClasses.contains('highcontrast');

    this.themeClass = themeIsDark ? 'black' : 'white';
}
  public executeTopTierTooltip(
    value: string,
    date: Date,
    tier: string
  ): boolean {
    this.topTierTooltip(value, date, tier);
    return true;
  }

  public executeBottomTierTooltip(date: string, tier: string): boolean {
    this.bottomTierTooltip(date, tier);
    return true;
  }
}
export interface DateFormat extends Window {
  format?: Function;
}
