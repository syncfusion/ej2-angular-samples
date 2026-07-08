import { Component, OnInit } from '@angular/core';
import { tooltipData, editingResources } from './data';
import { Internationalization } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { NgIf } from '@angular/common';
import { DayMarkersService, GanttModule, SelectionService, SortService } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';

interface TooltipData {
  activeTasks: number;
  milestones: number;
  overallProgress: string;
}
@Component({
  selector: 'ej2-gantttooltiptemplate',
  templateUrl: 'tooltip-template.html',
  standalone: true,
  providers: [SelectionService, DayMarkersService, SortService],
  imports: [SBActionDescriptionComponent, GanttModule, NgIf, SBDescriptionComponent,
  ],
})
export class GanttTooltipTemplateComponent implements OnInit {
  private intl: Internationalization = new Internationalization();
  public data: object[];
  public resources: object[];
  public resourceFields: object;
  public taskSettings: object;
  public labelSettings: object;
  public projectStartDate: Date = new Date();
  public projectEndDate: Date = new Date();
  public columns: object[];
  public splitterSettings: object;
  public tooltipSettings: object;
  public topTierData: TooltipData = { activeTasks: 0, milestones: 0, overallProgress: '0' };
  public bottomTierData: TooltipData = { activeTasks: 0, milestones: 0, overallProgress: '0' };
  public themeClass: string = 'white';
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
      { field: 'TaskName', width: 290 },
      { field: 'StartDate' },
      { field: 'EndDate' },
      { field: 'Duration' },
      { field: 'Predecessor' },
      { field: 'Progress' },
      { field: 'BaselineStartDate', width: 200 },
      { field: 'BaselineEndDate', width: 200 },
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
      (this.projectStartDate = new Date('03/26/2025'));
    this.projectEndDate = new Date('06/01/2025');
  }
  public format(value: Date): string {
    return this.intl.formatDate(value, { format: 'MM/dd/yyyy' });
  }

  private getTooltipData(startDate: Date, endDate: Date | undefined, tier: string): TooltipData {
    const ganttElement = document.getElementsByClassName('e-gantt')[0] as any;
    const gantt = ganttElement ? ganttElement.ej2_instances[0] : null;
    if (!gantt || !endDate) {
      return { activeTasks: 0, milestones: 0, overallProgress: '0' };
    }

    let activeTasks: any[] = [];
    if (tier === 'topTier') {
      activeTasks = gantt.currentViewData.filter((task: any) => {
        const taskStart = new Date(task.StartDate);
        const taskEnd = new Date(task.EndDate);
        taskStart.setHours(0, 0, 0, 0);
        taskEnd.setHours(0, 0, 0, 0);
        return taskStart >= startDate && taskEnd <= endDate;
      });
    } else {
      activeTasks = gantt.currentViewData.filter((task: any) => {
        const taskStart = new Date(task.StartDate);
        const taskEnd = new Date(task.EndDate);
        taskStart.setHours(0, 0, 0, 0);
        taskEnd.setHours(0, 0, 0, 0);
        return (
          taskStart.getTime() === startDate.getTime() &&
          taskEnd.getTime() === endDate.getTime()
        );
      });
    }

    const milestones = activeTasks.filter((task: any) => task.Duration === 0);
    const totalProgress = activeTasks.reduce(
      (acc: number, task: any) => acc + (task.Progress || 0),
      0
    );
    const overallProgress =
      activeTasks.length > 0
        ? (totalProgress / activeTasks.length).toFixed(2)
        : '0';

    return {
      activeTasks: activeTasks.length,
      milestones: milestones.length,
      overallProgress,
    };
  }

  private calculateTopTierTooltip(value: string, date: Date, tier: string): void {
    const ganttElement = document.getElementsByClassName('e-gantt')[0] as any;
    const gantt = ganttElement ? ganttElement.ej2_instances[0] : null;
    if (!gantt) return;

    let endDate: Date | undefined;
    const startDate = new Date(date);
    if (gantt.timelineSettings?.topTier?.unit) {
      endDate = new Date(startDate.getTime());
      endDate.setDate(startDate.getDate() + 6);
    }
    this.topTierData = this.getTooltipData(startDate, endDate, tier);
    this.updateThemeClass();
  }

  private calculateBottomTierTooltip(date: string, tier: string): void {
    const ganttElement = document.getElementsByClassName('e-gantt')[0] as any;
    const gantt = ganttElement ? ganttElement.ej2_instances[0] : null;
    if (!gantt) return;

    const startDate = new Date(date);
    let endDate: Date | undefined;
    if (gantt.timelineSettings?.bottomTier?.unit) {
      endDate = new Date(startDate.getTime());
    }
    this.bottomTierData = this.getTooltipData(startDate, endDate, tier);
    this.updateThemeClass();
  }

  private updateThemeClass(): void {
    const bodyClasses = document.body.classList;
    const themeIsDark = bodyClasses.contains('tailwind3-dark') ||
      bodyClasses.contains('material3-dark') ||
      bodyClasses.contains('bootstrap5.3-dark') ||
      bodyClasses.contains('highcontrast');
    this.themeClass = themeIsDark ? 'black' : 'white';
  }
  public executeTopTierTooltip(value: string, date: Date, tier: string): boolean {
    this.calculateTopTierTooltip(value, date, tier);
    return true;
  }

  public executeBottomTierTooltip(date: string, tier: string): boolean {
    this.calculateBottomTierTooltip(date, tier);
    return true;
  }
}
