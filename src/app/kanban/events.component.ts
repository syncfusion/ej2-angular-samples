import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import {
    KanbanComponent, CardSettingsModel, SwimlaneSettingsModel, CardRenderedEventArgs, CardClickEventArgs, KanbanModule
} from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'events.html',
    styleUrls: ['events.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, ButtonModule]
})
export class EventsComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['events.style.css'];
    }

    onClear(): void {
        document.getElementById('EventLog').innerHTML = '';
    }

    OnCreate(): void {
        this.appendElement('Kanban <b>Load</b> event called<hr>');
    }

    OnActionBegin(): void {
        this.appendElement('Kanban <b>Action Begin</b> event called<hr>');
    }

    OnActionComplete(): void {
        this.appendElement('Kanban <b>Action Complete</b> event called<hr>');
    }

    OnActionFailure(): void {
        this.appendElement('Kanban <b>Action Failure</b> event called<hr>');
    }

    OnDataBinding(): void {
        this.appendElement('Kanban <b>Data Binding</b> event called<hr>');
    }

    OnDataBound(): void {
        this.appendElement('Kanban <b>Data Bound</b> event called<hr>');
    }

    OnCardRendered(args: CardRenderedEventArgs): void {
        this.appendElement('Kanban - ' + (args.data as { [key: string]: Object }).Id + ' - <b>Card Rendered</b> event called<hr>');
    }

    OnQueryCellInfo(): void {
        this.appendElement('Kanban <b>Query Cell Info</b> event called<hr>');
    }

    OnCardClick(args: CardClickEventArgs): void {
        this.appendElement('Kanban - ' + (args.data as { [key: string]: Object }).Id + ' - <b>Card Click</b> event called<hr>');
    }

    OnCardDoubleClick(args: CardClickEventArgs): void {
        this.appendElement('Kanban - ' + (args.data as { [key: string]: Object }).Id + ' - <b>Card Double Click</b> event called<hr>');
    }

    OnDragStart(): void {
        this.appendElement('Kanban <b>Drag Start</b> event called<hr>');
    }

    OnDrag(): void {
        this.appendElement('Kanban <b>Drag</b> event called<hr>');
    }

    OnDragStop(): void {
        this.appendElement('Kanban <b>Drag Stop</b> event called<hr>');
    }

    public appendElement(html: string): void {
        const span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        const log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }

}
