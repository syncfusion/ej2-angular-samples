import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { GanttAllModule, GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { projectNewData } from './data';
import { ToolbarItem } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'ej2-ganttundoredo',
  templateUrl: 'undo-redo.html',
  styleUrls:['undo-redo.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttUndoRedoComponent implements OnInit {
  @ViewChild('ganttundoredo') public ganttObj: GanttComponent;
  public data: object[];
  public taskSettings: object;
  public splitterSettings: object;
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public toolbar: any;
  public editSettings: any;
  public undoRedoActions: any;
  public columns: any;

  public ngOnInit(): void {
    this.data = projectNewData;
   
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      parentID: 'parentId'
    };
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true
    };
    this.undoRedoActions = [
      'Sorting', 'Add', 'ColumnReorder', 'ColumnResize', 'ColumnState',
      'Delete', 'Edit', 'Filtering', 'Indent', 'Outdent',
      'NextTimeSpan', 'PreviousTimeSpan', 'RowDragAndDrop', 'Search'
    ];
    this.toolbar = [
      'Add', 'Edit', 'Update', 'Delete', 'Cancel',
      { text: 'Undo', tooltipText: 'Undo', id: 'Undo' },
      { text: 'Redo', tooltipText: 'Redo', id: 'Redo' }
    ];
    
    
    this.columns = [
      { field: 'TaskID', headerText: 'ID', width: 100 },
      { field: 'TaskName', headerText: 'Name', width: 250 },
      { field: 'StartDate' },
      { field: 'EndDate' },
      { field: 'Duration' },
      { field: 'Progress' },
      { field: 'Predecessor', headerText: 'Dependency' }
    ];
    this.splitterSettings = {
      columnIndex: 3
    };
    this.projectStartDate = new Date('03/30/2025');
    this.projectEndDate = new Date('07/20/2025');
    this.labelSettings = {
      rightLabel: 'TaskName'
    };
  }

  public toolbarClick(args: any): void {
    if (args.item.id === 'Undo') {
      this.ganttObj.undo();
    } else if (args.item.id === 'Redo') {
      this.ganttObj.redo();
    }
    this.updateBadges();
  }

  public actionComplete(): void {
    this.updateBadges();
  }
  public dataBound(): void {
    this.updateBadges();
  }
  public resizeStop(): void{
    this.updateBadges();
  }



  private updateBadges(): void {
    const undoBtn = document.querySelector('[aria-label="Undo"]');
    const redoBtn = document.querySelector('[aria-label="Redo"]');
    undoBtn['style'].position = 'relative'
    undoBtn['style'].overflow = 'visible'
    if (undoBtn) {
      undoBtn.classList.add("e-overlay");
    }
    if (redoBtn) {
      redoBtn.classList.add("e-overlay");
    }
    redoBtn['style'].position = 'relative'
    redoBtn['style'].overflow = 'visible'


    const undoCount = this.ganttObj.getUndoActions().length;
    const redoCount = this.ganttObj.getRedoActions().length;

    this.setBadge(undoBtn, undoCount, 'Undo');
    this.setBadge(redoBtn, redoCount, 'Redo');
  }

  private setBadge(button: Element, count: number, type: string): void {
    if (!button) return;
    let badge = button.querySelector('.e-badge.e-badge-danger.e-badge-notification.e-badge-overlap.e-badge-circle');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'e-badge e-badge-danger e-badge-notification e-badge-overlap e-badge-circle';
      button.appendChild(badge);
    }
    const tailwind3 = document.body.classList.contains('tailwind3') || document.body.classList.contains('tailwind3-dark');
    const bootstrap5 = document.body.classList.contains('bootstrap5.3') || document.body.classList.contains('bootstrap5.3-dark');
    const material3 = document.body.classList.contains('material3') || document.body.classList.contains('material3-dark');
    const fluent = document.body.classList.contains('fluent') || document.body.classList.contains('fluent-dark');
    const fluent2 = document.body.classList.contains('fluent2') || document.body.classList.contains('fluent2-dark');

    if (tailwind3) {
      badge['style'].backgroundColor = '#c2410c';
      badge['style'].color = '#fff';
      badge['style'].marginTop = '3px';
      badge['style'].paddingTop = '2px';
    } else if (bootstrap5) {
      badge['style'].backgroundColor = '#ffc107';
      badge['style'].color = '#000';
      badge['style'].paddingTop = '3px';
      badge['style'].marginTop = '6px';
    } else if (fluent2) {
      badge['style'].backgroundColor = '#fde300';
      badge['style'].color = '#000';
      badge['style'].paddingTop = '4px';
      badge['style'].marginTop = '6px';
    } else if (fluent) {
      badge['style'].backgroundColor = '#fde300';
      badge['style'].color = '#000';
      badge['style'].paddingTop = '2px';
      badge['style'].marginTop = '8px';
    } else if (material3) {
      badge['style'].backgroundColor = '#b3261e';
      badge['style'].color = '#fff';
      badge['style'].paddingTop = '3px';
    }

    badge.textContent = count.toString();
    badge['style'].display = count > 0 ? 'inline-block' : 'none';

    if (count === 0) {
      button.classList.add('e-overlay');
      button['style'].cursor = 'default';
      button['style'].pointerEvents = 'none';
      button['style'].boxShadow = '0 0 0 transparent';
    } else {
      button.classList.remove('e-overlay');
      button['style'].cursor = 'pointer';
      button['style'].pointerEvents = 'auto';
      button['style'].boxShadow = '';
    }
  }
}