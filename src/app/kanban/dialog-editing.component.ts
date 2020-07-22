import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';

@Component({
  selector: 'control-content',
  templateUrl: 'dialog-editing.html',
  encapsulation: ViewEncapsulation.None
})
export class DialogEditingComponent {
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id'
  };
  public statusData: string[] = ['Open', 'InProgress', 'Testing', 'Close'];
  public priorityData: string[] = ['Low', 'Normal', 'Critical', 'Release Breaker', 'High'];
  public assigneeData: string[] = [
    'Nancy Davloio', 'Andrew Fuller', 'Janet Leverling',
    'Steven walker', 'Robert King', 'Margaret hamilt', 'Michael Suyama'
  ];
  addClick(): void {
    const cardIds = this.kanbanObj.kanbanData.map((obj: { [key: string]: string }) => parseInt(obj.Id.replace('Task ', ''), 10));
    const cardCount: number = Math.max.apply(Math, cardIds) + 1;
    const cardDetails = {
      Id: 'Task ' + cardCount, Status: 'Open', Priority: 'Normal',
      Assignee: 'Andrew Fuller', Estimate: 0, Tags: '', Summary: ''
    };
    this.kanbanObj.openDialog('Add', cardDetails);
  }
}

