import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'control-content',
  templateUrl: 'dialog-editing.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ KanbanModule, NgClass, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, ButtonModule, TextBoxModule, CommonModule ]
})
export class DialogEditingComponent {
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
  public enableContent: boolean = true;
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
  onDialogClose() {
    this.enableContent = false;
  }
  onDialogOpen() {
    this.enableContent = true;
  }
}

