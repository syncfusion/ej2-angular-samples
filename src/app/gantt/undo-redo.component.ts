import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GanttModule, GanttComponent, UndoRedoService, EditService, ResizeService, ToolbarService, SelectionService, FilterService, ReorderService, SortService, ColumnMenuService, DayMarkersService, ContextMenuService } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { projectNewData } from './data';

@Component({
  selector: 'ej2-ganttundoredo',
  templateUrl: 'undo-redo.html',
  styleUrls:['undo-redo.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [UndoRedoService, EditService, ResizeService, ToolbarService, SelectionService, FilterService, ReorderService, SortService, ColumnMenuService, DayMarkersService, ContextMenuService],
  imports: [SBActionDescriptionComponent, GanttModule, SBDescriptionComponent]
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
      parentID: 'ParentID'
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
      { field: 'TaskName', headerText: 'Name', width: 280 },
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

  public toolbarClick(args: { item: { id: string } }): void {
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
  public resizeStop(): void {
    this.updateBadges();
  }



  private updateBadges(): void {
    const undoBtn = document.querySelector('[aria-label="Undo"]') as HTMLElement | null;
    const redoBtn = document.querySelector('[aria-label="Redo"]') as HTMLElement | null;

    if (undoBtn) {
      undoBtn.style.position = 'relative';
      undoBtn.style.overflow = 'visible';
      undoBtn.classList.add('e-overlay');
    }

    if (redoBtn) {
      redoBtn.style.position = 'relative';
      redoBtn.style.overflow = 'visible';
      redoBtn.classList.add('e-overlay');
    }

    const undoCount = this.ganttObj.getUndoActions().length;
    const redoCount = this.ganttObj.getRedoActions().length;

    this.setBadge(undoBtn, undoCount, 'Undo');
    this.setBadge(redoBtn, redoCount, 'Redo');
  }

  private setBadge(button: HTMLElement | null, count: number, type: string): void {
    if (!button) return;

    let badge = button.querySelector('.e-badge.e-badge-danger.e-badge-notification.e-badge-overlap.e-badge-circle') as HTMLElement | null;
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'e-badge e-badge-danger e-badge-notification e-badge-overlap e-badge-circle';
      button.appendChild(badge);
    }

    const themeStyles = this.getThemeStyles();
    if (themeStyles) {
      badge.style.backgroundColor = themeStyles.backgroundColor;
      badge.style.color = themeStyles.color;
      badge.style.marginTop = themeStyles.marginTop;
      badge.style.paddingTop = themeStyles.paddingTop;
    }

    badge.textContent = count.toString();
    badge.style.display = count > 0 ? 'inline-block' : 'none';

    if (count === 0) {
      button.classList.add('e-overlay');
      button.style.cursor = 'default';
      button.style.pointerEvents = 'none';
      button.style.boxShadow = '0 0 0 transparent';
    } else {
      button.classList.remove('e-overlay');
      button.style.cursor = 'pointer';
      button.style.pointerEvents = 'auto';
      button.style.boxShadow = '';
    }
  }

  private getThemeStyles(): { backgroundColor: string; color: string; marginTop: string; paddingTop: string } | null {
    const bodyClasses = document.body.classList;

    if (bodyClasses.contains('tailwind3') || bodyClasses.contains('tailwind3-dark')) {
      return { backgroundColor: '#c2410c', color: '#fff', marginTop: '3px', paddingTop: '2px' };
    } else if (bodyClasses.contains('bootstrap5.3') || bodyClasses.contains('bootstrap5.3-dark')) {
      return { backgroundColor: '#ffc107', color: '#000', marginTop: '6px', paddingTop: '3px' };
    } else if (bodyClasses.contains('fluent2') || bodyClasses.contains('fluent2-dark')) {
      return { backgroundColor: '#fde300', color: '#000', marginTop: '6px', paddingTop: '4px' };
    } else if (bodyClasses.contains('fluent') || bodyClasses.contains('fluent-dark')) {
      return { backgroundColor: '#fde300', color: '#000', marginTop: '8px', paddingTop: '2px' };
    } else if (bodyClasses.contains('material3') || bodyClasses.contains('material3-dark')) {
      return { backgroundColor: '#b3261e', color: '#fff', marginTop: '3px', paddingTop: '3px' };
    }

    return null;
  }
}