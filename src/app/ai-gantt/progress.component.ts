import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { TaskDataCollection } from './ganttdata';
import { serverAIRequest } from '../common/ai-service';
import * as data from './progress.json';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations'
import { ToolbarService } from '@syncfusion/ej2-angular-gantt'
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import {AIToastComponent} from '../common/ai-toast.component';  
import { ToastModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [GanttAllModule,ToolbarModule,ToastModule, AIToastComponent],
  providers: [ToolbarService],
  templateUrl: './progress.component.html'
})
export class ProgressComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-progress.component.html'
    ];
  }
  @ViewChild('ganttDefault', { static: false }) gantt!: ElementRef;
  public data?: object[];
  public taskSettings?: object;
  public editSetting?:object;
  public splitterSettings?:object;
  public toolbar?:object[];
  public projectStartDate= new Date('4/1/2026');
  public projectEndDate= new Date('6/2/2026');
  ngOnInit(): void {
    this.data = TaskDataCollection;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      parentID: "ParentTaskID"
  };
    this.editSetting = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true
  };
    this.splitterSettings = {
      position: "28%"
  };
    this.toolbar = [{template: '<button id="toolbarButton" class="e-btn e-primary">Predict milestone</button>', text:'Predict milestone' }];
  }

  public toolbarClick(args: any) {
    debugger
    if (args.item.text === 'Predict milestone') {
      console.log( (this.gantt as any).ganttProperties);
      (this.gantt as any).showSpinner();
        let input =
            "You analyze the multiple year HistoricalTaskDataCollections and current TaskDataCollection to predict project completion dates and milestones based on current progress and historical trends. Ignore the null or empty values, and collection values based parent child mapping. Avoid json tags with your response. No other explanation or content to be returned." +
            " HistoricalTaskDataCollections :" + getHistoricalCollection() +
            " TaskDataCollection: " + JSON.stringify(TaskDataCollection) +
            " Generate a JSON object named 'TaskDetails' containing:" +
            "- Key 'MilestoneTaskDate' with a list of milestone dates 'MilestoneDate' with 'TaskName' - task name. A milestone date is defined as the end date of tasks with a duration of 0 and only give current based milestone." +
            "- Key 'ProjectCompletionDate' indicating the latest end date among all tasks." +
            "- Key 'Summary' providing a summary of the project completion date and milestones.Ensure milestones are defined correctly based on tasks with a duration of 0, and the project completion date reflects the latest end date of all tasks "
        let aioutput = serverAIRequest({ messages: [{ role: 'user', content: input }] });
        aioutput.then((result: any) => {
          if (result) {
              let cleanedJsonData: string = result.replace(/^```json\n|```\n?$/g, '');
              let dataset: any = JSON.parse(cleanedJsonData);
              let details = dataset.TaskDetails || dataset;
              let eventMarkers: any = details.MilestoneTaskDate
                  .map((milestone: any) => ({
                      day: new Date(milestone["MilestoneDate"]),
                      label: milestone["TaskName"]
                  }));
              let projectDetails = {
                  day: new Date(details.ProjectCompletionDate),
                  label: "Project completion date"
              };
              eventMarkers.push(projectDetails);
              (this.gantt as any).eventMarkers = eventMarkers;

              (this.gantt as any).hideSpinner();
          } else {
              (this.gantt as any).hideSpinner();
          }
      });
    }
    function getHistoricalCollection(): string {
        let historicalDataCollection: string = '';
        const word = (<any>data);
        for (let year = 2021; year < 2026; year++) {
            historicalDataCollection += "HistoricalTaskDataCollection" + year + ":" + JSON.stringify(word["TaskDataCollection" + year]);
        }

        return historicalDataCollection;
    }
}
}
