import { Component, OnInit, ViewChild } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TreeGridAllModule, DataStateChangeEventArgs, TreeGridComponent, EditService, PageService, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { TaskService } from './task-service';
import { AsyncPipe } from '@angular/common';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { Observable } from 'rxjs';

/**
 * Component that demonstrates the use of an async pipe to bind data to the Tree Grid.
 * It handles data operations like paging, sorting, filtering, and CRUD operations.
 */
@Component({
  selector: 'ej2-treegrid-container',
  templateUrl: 'async-pipe.html',
  standalone: true,
  providers: [EditService, PageService, FilterService],
  imports: [SBActionDescriptionComponent, SBDescriptionComponent, TreeGridAllModule, AsyncPipe, NgClass]
})
export class AsyncPipeComponent implements OnInit {
  public data: Observable<DataStateChangeEventArgs>;
  public pageSetting: Object;

  public editSettings: Object;
  public daterules: Object;
  public dateeditparam:Object;
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;

  /**
   * Initializes a new instance of the AsyncPipeComponent.
   * @param {TaskService} taskService - The service for handling data operations.
   */
  constructor(private taskService: TaskService) {
    this.data = taskService;
  }

  public ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: "Row" };
    this.pageSetting = { pageSize: 10, pageCount: 4 };
    this.daterules = { date: true, required: true };
    this.dateeditparam = { params: { format: 'M/d/yyyy' } };
    let state = { skip: 0, take: 10 };
    this.taskService.execute(state);
  }

  // Handles data state changes from the Tree Grid (e.g., paging, sorting, filtering).
  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.taskService.execute(state);
  }

  // Handles data source changes from the Tree Grid (e.g., CRUD operations).
  public dataSourceChange(state: any): void {
    if (state.action == 'add') {
      this.taskService.addRecord(state).subscribe({
        next: () => {
          (state as any).endEdit();
        }
      });
    }
    else if (state.action == 'edit') {
      this.taskService.updateRecord(state).subscribe({
        next: () => {
          (state as any).endEdit();
        }
      });
    }
    else if (state.requestType == 'delete') {
        this.taskService.deleteRecord(state).subscribe({
          next: () => {
            (state as any).endEdit();
          }
        });
    }
  }

  public getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Critical': return 'badge bg-danger';
      case 'High': return 'badge bg-warning';
      case 'Medium': return 'badge bg-info';
      case 'Low': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  public getStatusClass(status: string): string {
    switch (status) {
      case 'Open': return 'badge bg-primary';
      case 'In Progress': return 'badge bg-warning';
      case 'Resolved': return 'badge bg-success';
      case 'Closed': return 'badge bg-secondary';
      case 'Escalated': return 'badge bg-danger';
      default: return 'badge bg-light text-dark';
    }
  }
}