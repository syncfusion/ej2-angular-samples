import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
import { tasksCollection, resourceCollection } from './ganttdata';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ToolbarService } from '@syncfusion/ej2-angular-gantt';
import { getAzureChatAIRequest } from '../../azure-openai';

@Component({
  selector: 'app-prioritize-task',
  standalone: true,
  imports: [GanttModule, ToolbarModule],
  providers: [ToolbarService],
  templateUrl: './prioritize-task.component.html'
})
export class PrioritizeTaskComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = ['ai-prioritize-task.component.html'];
}
  @ViewChild('ganttDefault', { static: false }) gantt!: ElementRef;
  public data?: object[];
  public resource?: object[];
  public taskSettings?: object;
  public resourceSettings?: object;
  public labelSettings?: object;
  public splitterSettings?: object;
  public editSetting?: object;
  public mode: string = 'EllipsisWithTooltip';
  public toolbar?: object[];

  public ngOnInit(): void {
    this.data = tasksCollection;
    this.resource = resourceCollection;
    this.taskSettings = {
      id: 'Id',
      name: 'Name',
      startDate: 'StartDate',
      endDate: 'EndDate',
      progress: 'Progress',
      parentID: 'ParentId',
      resourceInfo: 'resourceInfo',
      baselineStartDate: 'BaselineStartDate',
      baselineEndDate: 'BaselineEndDate',
    };
    this.resourceSettings = {
      id: 'Id',
      name: 'Name',
      unit: 'MaxUnit',
    };
    this.labelSettings = {
      rightLabel: 'resourceInfo',
    };
    this.splitterSettings = {
      position: '23%',
    };
    this.editSetting = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true,
    };
    this.toolbar = [
      {
        template:
          '<button id="toolbarButton" class="e-btn e-primary">Assign prioritize tasks</button>',
        text: 'Assign prioritize tasks',
      },
    ];
  }

  public rowDataBound(args: any) {
    if (args.data.taskData.isCritical) {
      args.row.style.backgroundColor = '#ffecd4';
    }
  }
  public queryTaskbarInfo(args: any) {
    if (args.data.taskData.isCritical) {
      args.taskbarElement.parentElement.parentElement.style.backgroundColor =
        '#ffecd4';
    }
  }

  public toolbarClick(args: any) {
    debugger;
    if (args.item.text === 'Assign prioritize tasks') {
      (this.gantt as any).showSpinner();
      let input = `
    Analyze the following TaskCollection to identify critical tasks. 
    A task is considered critical if its EndDate is greater than its BaselineEndDate, comparing only the dates (not the time). 
    Both EndDate and BaselineEndDate must not be null.
    Here is the 'TaskCollection': ${JSON.stringify(tasksCollection)};
    For each task, add an additional property called isCritical. Set this property to true if the task is critical based on the criteria provided, otherwise set it to false. 
    Ensure that:
    1. Only the date part (not time) of EndDate and BaselineEndDate is compared.
    2. Tasks with both EndDate and BaselineEndDate being not null and where EndDate is greater than BaselineEndDate are marked as critical.
    Return the entire modified TaskCollection in JSON format. Ensure all tasks are included with their updated isCritical property. Do not include any other text or additional information.`;
      let prompt = input;
      debugger;
      let aioutput = getAzureChatAIRequest({
        messages: [{ role: 'user', content: prompt }],
      });
      aioutput.then((result: any) => {
        let cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
        cleanedJsonData = cleanedJsonData.replace(/\n}\n/g, '');
        let criticalTask = JSON.parse(cleanedJsonData);
        let input1 = `Analyze the following JSON data:

      - 'TaskCollection': ${JSON.stringify(tasksCollection)}
      - 'ResourceCollection': ${JSON.stringify(resourceCollection)}
      - 'CriticalCollection': ${JSON.stringify(cleanedJsonData)}
      
      Perform the following steps:
      1. For each task in 'CriticalCollection' where 'isCritical' is 'true':
         - Identify unassigned resources by comparing 'ResourceCollection' with the 'resourceInfo' property in 'TaskCollection'.
         - Add each unassigned resource to the 'resourceInfo' property of the corresponding critical task without removing any existing resources.
         - Ensure that each critical task receives a unique unassigned resource, if available.
      
      Return the modified 'CriticalCollection' with the additional resources assigned.
      
      Additionally, create a new property called 'AddedResourceIds' that contains the IDs of tasks in 'CriticalCollection' where 'isCritical' is 'true' and additional resources were added.
      
      Provide the result in JSON format, including:
      - The modified 'CriticalCollection'.
      - The 'AddedResourceIds' property with the IDs of tasks where additional resources were added.
      
      Do not include any additional text or information.`;
        let aioutput1 = getAzureChatAIRequest({
          messages: [{ role: 'user', content: input1 }],
        });
        aioutput1.then((result: any) => {
          let cleanedJsonData1 = result.replace(/^```json\n|```\n?$/g, '');
          let criticalTask1 = JSON.parse(cleanedJsonData1);
          (this.gantt as any).dataSource = criticalTask1.CriticalCollection;
          let modifiedtaskID = criticalTask1.AddedResourceIds;
          let taskIdsString = modifiedtaskID.join(', ');
          let csfooterElement = document.getElementById('csfooter');
          if (csfooterElement) {
            csfooterElement.innerText =
              ' Critical task containing Task Id: ' +
              taskIdsString +
              ' new resources has been added';
          }
          (this.gantt as any).hideSpinner();
        });
      });
    }
  }
}
