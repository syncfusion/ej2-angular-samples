import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel } from '@syncfusion/ej2-angular-kanban';
import { kanbanPizzaData } from './data';

@Component({
  selector: 'app-workflow',
  templateUrl: 'workflow.html',
  styleUrls: ['workflow.style.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkflowComponent {
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  public kanbanData: Object[] = extend([], kanbanPizzaData, null, true) as Object[];
  public cardSettings: CardSettingsModel = {
    headerField: 'Id'
  };
  public orderColumns: string[] = ['Ready to Serve', 'Ready to Deliver'];
  public serveColumns: string[] = ['Served'];
  public deliverColumns: string[] = ['Delivered'];
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['workflow.style.css'];
  }
}
