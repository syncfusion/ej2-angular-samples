import { Component, OnInit } from '@angular/core';
import { projectNewData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttevents',
    templateUrl: 'events.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, ButtonAllModule, SBDescriptionComponent]
})
export class GanttEventsComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public toolbar: string[];
    public editSettings: object;
    public labelSettings: object;
    public splitterSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
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
            child: 'subtasks'
        };
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' },
        ];
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search'];
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
        };
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.projectStartDate = new Date('03/24/2024');
        this.projectEndDate = new Date('07/06/2024');
    }
    created(): void {
        this.appendElement('Gantt <b>created</b> event called<hr>');
    }
    load(): void {
        this.appendElement('Gantt <b>load</b> event called<hr>');
    }
    dataBound(): void {
        this.appendElement('Gantt <b>dataBound</b> event called<hr>');
    }
    toolbarClick(): void {
        this.appendElement('Gantt <b>toolbarClick</b> event called<hr>');
    }
    beforeTooltipRender(): void {
        this.appendElement('Gantt <b>beforeTooltipRender</b> event called<hr>');
    }
    actionBegin(): void {
        this.appendElement('Gantt <b>actionBegin</b> event called<hr>');
    }
    actionComplete(): void {
        this.appendElement('Gantt <b>actionComplete</b> event called<hr>');
    }
    cellEdit(): void {
        this.appendElement('Gantt <b>cellEdit</b> event called<hr>');
    }
    endEdit(): void {
        this.appendElement('Gantt <b>endEdit</b> event called<hr>');
    }
    taskbarEditing(): void {
        this.appendElement('Gantt <b>taskbarEditing</b> event called<hr>');
    }
    taskbarEdited(): void {
        this.appendElement('Gantt <b>taskbarEdited</b> event called<hr>');
    }
    rowSelecting(): void {
        this.appendElement('Gantt <b>rowSelecting</b> event called<hr>');
    }
    rowSelected(): void {
        this.appendElement('Gantt <b>rowSelected</b> event called<hr>');
    }
    rowDeselecting(): void {
        this.appendElement('Gantt <b>rowDeselecting</b> event called<hr>');
    }
    rowDeselected(): void {
        this.appendElement('Gantt <b>rowDeselected</b> event called<hr>');
    }
    columnDragStart(): void {
        this.appendElement('Gantt <b>columnDragStart</b> event called<hr>');
    }
    columnDrag(): void {
        this.appendElement('Gantt <b>columnDrag</b> event called<hr>');
    }
    columnDrop(): void {
        this.appendElement('Gantt <b>columnDrop</b> event called<hr>');
    }
    expanding(): void {
        this.appendElement('Gantt <b>expanding</b> event called<hr>');
    }
    expanded(): void {
        this.appendElement('Gantt <b>expanded</b> event called<hr>');
    }
    collapsing(): void {
        this.appendElement('Gantt <b>collapsing</b> event called<hr>');
    }
    collapsed(): void {
        this.appendElement('Gantt <b>collapsed</b> event called<hr>');
    }
    columnMenuClick(): void {
        this.appendElement('Gantt <b>columnMenuClick</b> event called<hr>');
    }
    columnMenuOpen(): void {
        this.appendElement('Gantt <b>columnMenuOpen</b> event called<hr>');
    }
    contextMenuClick(): void {
        this.appendElement('Gantt <b>contextMenuClick</b> event called<hr>');
    }
    contextMenuOpen(): void {
        this.appendElement('Gantt <b>contextMenuOpen</b> event called<hr>');
    }
    resizeStart(): void {
        this.appendElement('Gantt <b>resizeStart</b> event called<hr>');
    }
    resizing(): void {
        this.appendElement('Gantt <b>resizing</b> event called<hr>');
    }
    resizeStop(): void {
        this.appendElement('Gantt <b>resizeStop</b> event called<hr>');
    }
    splitterResizeStart(): void {
        this.appendElement('Gantt <b>splitterResizeStart</b> event called<hr>');
    }
    splitterResizing(): void {
        this.appendElement('Gantt <b>splitterResizing</b> event called<hr>');
    }
    splitterResized(): void {
        this.appendElement('Gantt <b>splitterResized</b> event called<hr>');
    }
    recordDoubleClick(): void {
        this.appendElement('Gantt <b>recordDoubleClick</b> event called<hr>');
    }
    onTaskbarClick(): void {
        this.appendElement('Gantt <b>onTaskbarClick</b> event called<hr>');
    }
    appendElement(html: string) {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    public clearEvents() {
        document.getElementById('EventLog').innerHTML = '';
    }
}
