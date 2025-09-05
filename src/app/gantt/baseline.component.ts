import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GanttAllModule, GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { baselineData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
  selector: 'ganttBaseline',
  templateUrl: 'baseline.html',
  styleUrls: ['baseline-component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttBaselineComponent implements OnInit {
  public data: Object[] = baselineData;
  public taskSettings: object;
  public columns: object[];
  public gridLines: string;
  public timelineSettings: object;
  public labelSettings: object;
  public tooltipSettings: object;
  public splitterSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  @ViewChild('ganttBaseline')
  public ganttObj: GanttComponent;
  public themeColors: { [key: string]: { onTime: string; delayed: string; baseline: string; onTimeProgress?: string; delayedProgress?: string } } = {
    'material3': {
      onTime: '#F0FDF4',
      delayed: '#FFF7ED',
      baseline: '#DAA520',
      onTimeProgress: '#15803D',
      delayedProgress: '#C2410C'
    },
    'material3-dark': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    },
    'tailwind3': {
      onTime: '#F0FDF4',
      delayed: '#FFF7ED',
      baseline: '#DAA520',
      onTimeProgress: '#15803D',
      delayedProgress: '#C2410C'
    },
    'tailwind3-dark': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    },
    'bootstrap5.3': {
      onTime: '#F0FDF4',
      delayed: '#FFF7ED',
      baseline: '#DAA520',
      onTimeProgress: '#15803D',
      delayedProgress: '#C2410C'
    },
    'bootstrap5.3-dark': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    },
    'fluent2': {
      onTime: '#F0FDF4',
      delayed: '#FFF7ED',
      baseline: '#DAA520',
      onTimeProgress: '#15803D',
      delayedProgress: '#C2410C'
    },
    'fluent2-dark': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    },
    'fluent2-highcontrast': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    }
  };

  public getCurrentTheme(): string {
    const themeClasses = Object.keys(this.themeColors); // Extract theme names from themeColors
    const currentTheme = themeClasses.find(theme => document.body.classList.contains(theme));
    return currentTheme || 'material3'; // Default theme
  }

  public ngOnInit(): void {
    this.taskSettings = {
      id: 'TaskId',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      baselineStartDate: 'BaselineStartDate',
      baselineEndDate: 'BaselineEndDate',
      baselineDuration: 'baselineDur',
      parentID: 'ParentId',
      duration: 'Duration',
      dependency: 'Predecessor',
      progress: 'Progress'
    };
    this.gridLines = "Horizontal"
    this.columns = [
      { field: "TaskId", visible: false, headerText: "Task ID" },
      { field: "TaskName", headerText: "Task Name", allowReordering: false, width: 200 },
      { field: 'StartDate', width: 140, },
      { field: 'Duration', width: 125, },
      { field: "BaselineStartDate", headerText: "Baseline Start Date", width: 195, },
      { field: "baselineDur", type: "string", editType: "stringedit", width: 195, },
      { field: "variance", headerText: "Variance", allowEditing: false, width: 140, },
    ];
    this.timelineSettings = {
      topTier: {
        unit: 'Month',
        format: 'MMMM yyyy'
      },
      bottomTier: {
        unit: 'Day'
      }
    };

    this.labelSettings = {
      rightLabel: 'TaskName'
    };
    this.splitterSettings = {
      columnIndex: 4
    };
    this.projectStartDate = new Date('07/02/2025');
    this.projectEndDate = new Date('09/15/2025');
  }
  dataBound() {
    this.ganttObj.autoFitColumns(['TaskId', 'TaskName', 'StartDate', 'Duration', 'BaselineStartDate', 'baselineDur', 'variance']);
  }
  public format(value: Date): string {
    return this.ganttObj.getFormatedDate(value);
  }
  public queryTaskbarInfo(args: any): void {
    const currentTheme = this.getCurrentTheme();
    const colors = this.themeColors[currentTheme];
    const taskbarColor = !args.data.ganttProperties.baselineStartDate || !args.data.ganttProperties.baselineEndDate || args.data.ganttProperties.startDate <= args.data.ganttProperties.baselineStartDate ? colors.onTime : colors.delayed;
    const progressColor = !args.data.ganttProperties.baselineStartDate || !args.data.ganttProperties.baselineEndDate || args.data.ganttProperties.startDate <= args.data.ganttProperties.baselineStartDate ? colors.onTimeProgress : colors.delayedProgress;
    if (args.taskbarType !== 'ParentTask') {
      if (currentTheme === 'material3' || currentTheme === 'material3-dark') {
        if (args.taskbarType !== 'Milestone') {
          args.taskbarElement.querySelectorAll('.e-gantt-child-taskbar-inner-div')[0].style.setProperty('background', taskbarColor, 'important');
        } else {
          args.taskbarElement.querySelectorAll('.e-gantt-milestone')[0].style.setProperty('border', progressColor, 'important');
          args.rowElement.querySelectorAll('.e-baseline-gantt-milestone-container')[0].style.setProperty('border', colors.baseline, 'important');
        }
      }
      args.taskbarBgColor = taskbarColor;
      args.milestoneColor = progressColor;
      args.taskbarBorderColor = progressColor;
      args.progressBarBgColor = progressColor;
    }
  }

  public queryCellInfo(args: any): void {
    if (args.column.field === 'variance') {
      const start = args.data.ganttProperties.startDate;
      const baselineStart = args.data.ganttProperties.baselineStartDate;
      const baselineEnd = args.data.ganttProperties.baselineEndDate;
      if (!baselineStart || !baselineEnd || !start || start <= baselineStart) {
        args.data.variance = 0;
        args.data.taskData.variance = 0;
        args.cell.innerText = '0 days';
        return;
      }
      const diffInDays = (start - baselineStart) / (1000 * 60 * 60 * 24);
      const roundedDiff = Math.round(diffInDays);
      args.data.variance = roundedDiff;
      args.data.taskData.variance = roundedDiff;
      args.cell.innerText = roundedDiff + ' days';
    }
  }

}
