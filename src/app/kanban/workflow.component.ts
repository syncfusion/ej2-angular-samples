import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { kanbanPizzaData } from './data';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  selector: 'app-workflow',
  templateUrl: 'workflow.html',
  styleUrls: ['workflow.style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, NgClass]
})
export class WorkflowComponent {
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  public kanbanData: Object[] = extend([], kanbanPizzaData, null, true) as Object[];
  public cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Description',
  };
  public orderColumns: string[] = ['Ready to Serve', 'Ready to Deliver'];
  public serveColumns: string[] = ['Served'];
  public deliverColumns: string[] = ['Delivered'];
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['workflow.style.css'];
  }
}
