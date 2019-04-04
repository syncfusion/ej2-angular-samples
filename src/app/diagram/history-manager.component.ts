import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import {
    NodeModel,
    DecoratorModel,
    DiagramTools,
    ConnectorModel,
    SnapConstraints,
    HistoryEntry
} from '@syncfusion/ej2-diagrams';
import {
    DropDownList
} from '@syncfusion/ej2-dropdowns';

/**
 * Sample for history manager
 */


@Component({
    selector: 'control-content',
    templateUrl: 'history-manager.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class HistoryManagerDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public tool = DiagramTools.ZoomPan;
    public snapSettings = { constraints: SnapConstraints.None };

    public nodes: NodeModel[] = [
        {
            id: 'node1', offsetX: 400, offsetY: 30, style: { fill: '#FFB2B2', strokeColor: '#FFB2B2' }, width: 70, height: 40,
            shape: { type: 'Flow', shape: 'Terminator' },
            annotations: [{ id: 'label1', content: 'Start' }],
        },
        {
            id: 'node2', offsetX: 400, offsetY: 100, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ id: 'label1', content: 'Design' }],
            ports: [{ id: 'designPort', offset: { x: 0, y: 0.5 } }]
        },
        {
            id: 'node3', offsetX: 400, offsetY: 180, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
            annotations: [{ id: 'label1', content: 'Coding' }],
            shape: { type: 'Flow', shape: 'Process' }, ports: [{ id: 'codingPort', offset: { x: 0, y: 0.5 } }]
        },
        {
            id: 'node4', offsetX: 400, offsetY: 260, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
            annotations: [{ id: 'label1', content: 'Testing' }], shape: { type: 'Flow', shape: 'Process' }
        },
        {
            id: 'node5', offsetX: 400, offsetY: 340, style: { fill: '#A2D8B0', strokeColor: '#A2D8B0' }, width: 80, height: 60,
            annotations: [{ id: 'label1', content: 'Errors?' }], shape: { type: 'Flow', shape: 'Decision' }
        },
        {
            id: 'node6', offsetX: 400, offsetY: 430, style: { fill: '#FFB2B2', strokeColor: '#FFB2B2' }, width: 70, height: 40,
            annotations: [{ id: 'label1', content: 'End' }], shape: { type: 'Flow', shape: 'Terminator' }
        },
        {
            id: 'node7', width: 100, offsetX: 220, offsetY: 180, style: { fill: '#A2D8B0', strokeColor: '#A2D8B0' }, height: 60,
            annotations: [{ id: 'label1', content: 'Design Error?' }], shape: { type: 'Flow', shape: 'Decision' },
            ports: [
                { id: 'porterror', offset: { x: 0.5, y: 0 } },
                { id: 'portcoding', offset: { x: 1, y: 0.5 } },
                { id: 'portdesign', offset: { x: 0.5, y: 1 } }
            ]
        }
    ];

    public connectors: ConnectorModel[] = [
        { id: 'connector1', sourceID: 'node1', targetID: 'node2' },
        { id: 'connector2', sourceID: 'node2', targetID: 'node3' },
        { id: 'connector3', sourceID: 'node3', targetID: 'node4' },
        { id: 'connector4', sourceID: 'node4', targetID: 'node5' },
        {
            id: 'connector5', sourceID: 'node5', targetID: 'node6',
            annotations: [{ content: 'No', style: { fill: 'white' } }]
        },
        {
            id: 'connector6', sourceID: 'node5', targetID: 'node7', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 150, direction: 'Left' }],
            annotations: [{ content: 'Yes', style: { fill: 'white' } }]
        },
        {
            id: 'connector7', sourceID: 'node7', targetID: 'node3', sourcePortID: 'portcoding',
            targetPortID: 'codingPort', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 10, direction: 'left' }],
            annotations: [{ content: 'No', style: { fill: 'white' } }]
        },
        {
            id: 'connector8', sourceID: 'node7', targetID: 'node2', sourcePortID: 'porterror',
            targetPortID: 'designPort', type: 'Orthogonal',
            annotations: [{ content: 'Yes', style: { fill: 'white' } }]
        }
    ];
    //initialization of the Diagram.

    public getNodeDefaults(obj: NodeModel): NodeModel {
        obj.annotations[0].style.color = '#111111';
        return obj;
    }
    public getValue(): void {
        let undoStack: HistoryEntry[] = this.diagram.historyManager.undoStack;
        let redoStack: HistoryEntry[] = this.diagram.historyManager.redoStack;
        let undo: {}[] = [];
        for (let i: number = 0; i < undoStack.length; i++) {
            undo.push({ 'text': undoStack[i].type, 'value': undoStack[i].type });
        }

        let redo: {}[] = [];
        for (let i: number = 0; i < redoStack.length; i++) {
            redo.push({ 'text': redoStack[i].type, 'value': redoStack[i].type });
        }
        let undoButton = (document.getElementById('undo') as any).ej2_instances[0];
        let redoButton = (document.getElementById('redo') as any).ej2_instances[0];

        undoButton.disabled = undo.length ? false : true;
        redoButton.disabled = redo.length ? false : true;
        let itemsCount: number = this.diagram.historyManager.stackLimit ? this.diagram.historyManager.stackLimit : 0;
        let undoList: DropDownList = (document.getElementById('undoList') as any).ej2_instances[0];
        undoList.dataSource = undo;
        undoList.fields = { text: 'text', value: 'text' };
        undoList.index = 0;
        undoList.dataBind();

        let redoList: DropDownList = (document.getElementById('redoList') as any).ej2_instances[0];
        redoList.dataSource = redo;
        redoList.fields = { text: 'text', value: 'text' };
        redoList.index = 0;
        redoList.dataBind();
    }

    public stackLimit(args): void {
        this.diagram.setStackLimit(args.value);

    }

    public redoButton(): void {
        this.diagram.redo();
    };

    public undoButton(): void {
        this.diagram.undo();
    };

    public clearHistory(): void {
        this.diagram.clearHistory();
        this.getValue();
    };

    public startGroupAction(): void {
        let startGroupAction = (document.getElementById('startGroupAction') as any).ej2_instances[0];
        if (startGroupAction.element.classList.contains('e-active')) {
            startGroupAction.content = 'End Group Action';
            this.diagram.startGroupAction();
        } else {
            this.diagram.endGroupAction();
            startGroupAction.content = 'Start Group Action';
        }
        this.diagram.dataBind();
    };
    public endGroupAction(): void {
        this.diagram.endGroupAction();
    };
    public historyChange(): void {
        this.getValue();
    };
    public created(): void {
        this.diagram.fitToPage({ mode: 'Height' });
    }
}