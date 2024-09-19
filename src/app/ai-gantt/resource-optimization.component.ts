import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
import { tasksCollection, resourceCollection } from './resource-ganttdata';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations'
import { ToolbarService } from '@syncfusion/ej2-angular-gantt'
import {getAzureChatAIRequest } from '../../azure-openai';

@Component({
  selector: 'app-resource-optimization',
  standalone: true,
  imports: [
    GanttModule,ToolbarModule
  ],
  providers: [ToolbarService],
  templateUrl: './resource-optimization.component.html',
  styleUrl: './resource-optimization.component.css'
})
export class ResourceOptimizationComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-resource-optimization.component.html',
      'resource-optimization.component.css',
    ];
  }
  @ViewChild('ganttDefault', { static: false }) gantt!: ElementRef;
  public data?: object[];
  public resource?: object[];
  public taskSettings?: object;
  public resourceSettings?: object;
  public labelSettings?:object;
  public splitterSettings?:object;
  public editSetting?:object;
  public labelSetting?:object;
  public selectionSettings?:object;
  public tooltipSettings?:object;
  public timelineSettings?:object;

  public toolbar?:object[];
  public viewType:string="viewType";
  public ngOnInit(): void {
    this.data = tasksCollection;
    this.resource = resourceCollection;
    
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      resourceInfo: 'resourceInfo',
      work: 'work',
      child: 'subtasks'
  };
    this.resourceSettings = {
      id: 'resourceId',
      name: 'resourceName',
      unit: 'resourceUnit',
      group: 'resourceGroup'
  };
    this.labelSettings= {
      rightLabel: 'resourceInfo'
  }
  this.splitterSettings= {
    columnIndex: 3
}
    this.editSetting = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true
  }
  this.labelSettings= {
    rightLabel: 'resourceInfo'
}
this.selectionSettings= {
  mode: 'Row',
  type: 'Single',
  enableToggle: false
}
this.tooltipSettings= {
  showTooltip: true
}
this.timelineSettings= {
  showTooltip: true,
  topTier: {
      unit: 'Week',
      format: 'dd/MM/yyyy'
  },
  bottomTier: {
      unit: 'Day',
      count: 1
  }
}
  this.toolbar=[{template: '<button id="toolbarButton" class="e-btn e-primary">Optimize resource allocation</button>', text:'Optimize resource allocation' }]
}
public toolbarClick(args: any) {
  if (args.item.text === 'Optimize resource allocation') {
    (this.gantt as any).showSpinner();

    let input = `I want you to act as an AI assistant tasked with updating resource assignments to tasks in a project management system. Your goal is to ensure that resources are not assigned to tasks that overlap in timeline with another task assigned to the same resource.
    This means checking the start and end dates of all tasks assigned to each resource and making sure no resource is double-booked during any task's duration. If you find that a resource is assigned multiple tasks with overlapping timelines(dates same or conflict any date), replace the conflicting task with another resource that has no tasks overlapping the same dates.
    Aim to reassign tasks in a way that ensures every task is assigned to a resource, minimizing the chance of any task being left unassigned unless it is unavoidable due to scheduling conflicts.
    Below is the list of tasks and their current details. It includes taskCollection Data with "resourceInfo" field as integer array collection which is assigned to respective tasks.This resourceInfo integer will be referencing from resourceId field of separate resourceCollection.
    First rearrange taskCollection based on resourceId, then if any resource tasks are overlapped in timeline, reassign any one of the task to other resource by comparing its existing tasks dates, if that too overlap in timeline try changing other resource, if you cannot reassign any one of the resource due to conflict then left the field blank. return only newly prepared collection as json format if you done any reassignment. I dont want code to achieve this, apply your logic to given taskcollection and resourceCollection and return only result in json format.
    Do not return any content or any other additional information only return JSON.
      Task Collection Data:` + JSON.stringify(tasksCollection);
      `Resource Collection Data:` + JSON.stringify(resourceCollection);
    let aioutput = getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] });
    aioutput.then((result: any) => {
      let cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
      cleanedJsonData = cleanedJsonData.replace(/\n}\n/g, '');
      (this.gantt as any).dataSource = JSON.parse(cleanedJsonData);
      (this.gantt as any).hideSpinner();
    });
  }
}
}
