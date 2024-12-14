import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    NodeModel,
    DiagramTools,
    ConnectorModel,
    SnapConstraints,
    HistoryEntry,
    FlowShapes,
    UndoRedo,
    Diagram,
} from '@syncfusion/ej2-diagrams';
import {
    DropDownList
} from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
Diagram.Inject(UndoRedo);
/**
 * Sample for history manager
 */


@Component({
    selector: 'control-content',
    templateUrl: 'history-manager.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DiagramModule, ButtonModule, ListViewModule, NumericTextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HistoryManagerDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public tool = DiagramTools.ZoomPan;
    public snapSettings = { constraints: SnapConstraints.None };
    public created(): void {
        this.diagram.fitToPage();
    }

    // Helper function to create a NodeModel with default parameters
    private createNode(
        id: string,
        offsetX: number,
        offsetY: number,
        fill: string,
        strokeColor: string,
        shape: FlowShapes,
        content: string,
        width: number = 70,
        height: number = 40,
        ports: any[] = []): NodeModel {
        return {
            id,
            offsetX,
            offsetY,
            style: { fill, strokeColor },
            width,
            height,
            shape: { type: 'Flow', shape: shape },
            annotations: [{ content }],
            ports
        };
    }

    // Initialize Diagram Nodes using the createNode function
    public nodes: NodeModel[] = [
        this.createNode('node1', 400, 30, '#FFB2B2', '#FFB2B2', 'Terminator', 'Start'),
        this.createNode('node2', 400, 100, '#DCDCDC', '#DCDCDC', 'Process', 'Design', undefined, undefined, [{ id: 'designPort', offset: { x: 0, y: 0.5 } }]),
        this.createNode('node3', 400, 180, '#DCDCDC', '#DCDCDC', 'Process', 'Coding', undefined, undefined, [{ id: 'codingPort', offset: { x: 0, y: 0.5 } }]),
        this.createNode('node4', 400, 260, '#DCDCDC', '#DCDCDC', 'Process', 'Testing'),
        this.createNode('node5', 400, 340, '#A2D8B0', '#A2D8B0', 'Decision', 'Errors?', 80, 60),
        this.createNode('node6', 400, 430, '#FFB2B2', '#FFB2B2', 'Terminator', 'End'),
        this.createNode('node7', 220, 180, '#A2D8B0', '#A2D8B0', 'Decision', 'Design Error?', 100, 60, [
            { id: 'porterror', offset: { x: 0.5, y: 0 } },
            { id: 'portcoding', offset: { x: 1, y: 0.5 } },
            { id: 'portdesign', offset: { x: 0.5, y: 1 } }
        ])
    ];

    // Helper function to create a ConnectorModel with default parameters
    private createConnector(
        id: string,
        sourceID: string,
        targetID: string,
        annotations: any[],
        segments: any[] = [],
        sourcePortID: string = '',
        targetPortID: string = ''): ConnectorModel {
        return {
            id,
            sourceID,
            targetID,
            annotations,
            type: 'Orthogonal',
            segments,
            sourcePortID,
            targetPortID
        };
    }

    // Common labels for connectors
    public noLabel = [{ content: 'No', style: { fill: 'white' } }];
    public yesLabel = [{ content: 'Yes', style: { fill: 'white' } }];

    // Initialize Diagram Connectors using the createConnector function
    public connectors: ConnectorModel[] = [
        this.createConnector('connector1', 'node1', 'node2', []),
        this.createConnector('connector2', 'node2', 'node3', []),
        this.createConnector('connector3', 'node3', 'node4', []),
        this.createConnector('connector4', 'node4', 'node5', []),
        this.createConnector('connector5', 'node5', 'node6', this.noLabel),
        this.createConnector('connector6', 'node5', 'node7', this.yesLabel, [{ type: 'Orthogonal', length: 150, direction: 'Left' }]),
        this.createConnector('connector7', 'node7', 'node3', this.noLabel, [{ type: 'Orthogonal', length: 10, direction: 'Left' }], 'portcoding', 'codingPort'),
        this.createConnector('connector8', 'node7', 'node2', this.yesLabel, [], 'porterror', 'designPort')
    ];
    // Gets default properties for a node
    public getNodeDefaults(obj: NodeModel): NodeModel {
        obj.annotations[0].style.color = '#111111';
        return obj;
    }
    // Retrieves undo and redo stacks and updates UI
    public updateHistoryLists(): void {
        const { undoStack, redoStack } = this.diagram.historyManager;

        const undo = this.mapHistoryEntriesToDataSource(undoStack);
        const redo = this.mapHistoryEntriesToDataSource(redoStack);

        this.updateButtonState('undo', undo.length > 0);
        this.updateButtonState('redo', redo.length > 0);

        this.updateDropDownList('undoList', undo);
        this.updateDropDownList('redoList', redo);
    }

    private mapHistoryEntriesToDataSource(entries: HistoryEntry[]): { text: string, value: string }[] {
        return entries.map(entry => ({ text: entry.type, value: entry.type }));
    }

    private updateButtonState(id: string, isEnabled: boolean): void {
        const button = (document.getElementById(id) as any)?.ej2_instances[0];
        if (button) {
            button.disabled = !isEnabled;
        }
    }

    private updateDropDownList(id: string, dataSource: { text: string, value: string }[]): void {
        const list = (document.getElementById(id) as any)?.ej2_instances[0] as DropDownList;
        if (list) {
            list.dataSource = dataSource;
            list.fields = { text: 'text', value: 'value' };
            list.index = 0;
            list.dataBind();
        }
    }
    // Sets stack limit for diagram history
    public stackLimit(args): void {
        this.diagram.setStackLimit(args.value);

    }
    // Redoes the last action
    public redoButton(): void {
        this.diagram.redo();
    };
    // Undo the last action
    public undoButton(): void {
        this.diagram.undo();
    };
    // Clears the entire history
    public clearHistory(): void {
        this.diagram.clearHistory();
        this.updateHistoryLists();
    };
    // Toggle between starting and ending a group action
    public startGroupAction(): void {
        let startGroupAction = (document.getElementById('startGroupAction') as any).ej2_instances[0];
        if (startGroupAction.element.textContent === 'Start Group Action') {
            startGroupAction.content = 'End Group Action';
            this.diagram.startGroupAction();
        } else {
            this.diagram.endGroupAction();
            startGroupAction.content = 'Start Group Action';
        }
        this.diagram.dataBind();
    };
    // Ends a group action
    public endGroupAction(): void {
        this.diagram.endGroupAction();
    };

    // Handles history change events
    public historyChange(): void {
        this.updateHistoryLists();
    };
}