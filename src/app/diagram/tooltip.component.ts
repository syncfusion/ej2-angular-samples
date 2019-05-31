
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, NodeModel, ConnectorModel } from '@syncfusion/ej2-angular-diagrams';
import { NodeConstraints, SnapConstraints, SnapSettingsModel } from '@syncfusion/ej2-diagrams';

/**
 * Sample for tooltip
 */

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})

export class TooltipDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public dropdownIndex: number = 0;

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public tooltip: any = {
        content: this.getcontent(), position: 'TopLeft', relativeMode: 'Object',
        animation: { open: { effect: 'FadeZoomIn', delay: 0 }, close: { effect: 'FadeZoomOut', delay: 0 } }
    };

    public nodes: NodeModel[] = [
            {
                id: 'node1', width: 60, height: 60, offsetX: 35, offsetY: 120,
                annotations: [{ content: 'Customer query', offset: { x: 0.5, y: 1 }, margin: { top: 15 } }],
                tooltip: { content: 'Queries from the customer' },
                shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
            },
            {
                id: 'node2', width: 75, height: 70, offsetX: 140, offsetY: 120,
                annotations: [{ content: 'Enough details?', offset: { x: 0.50, y: 0.50 } }],
                tooltip: { content: 'Whether the provided information is enough?' }, shape: { type: 'Bpmn', shape: 'Gateway' }
            },
            {
                id: 'node3', width: 60, height: 50, offsetX: 270, offsetY: 120,
                annotations: [{ content: 'Analyse', offset: { x: 0.50, y: 0.50 } }],
                tooltip: { content: 'Analysing the query' },
                shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } },
            },
            {
                id: 'node4', width: 75, height: 70, offsetX: 370, offsetY: 120, shape: {
                    type: 'Bpmn', shape: 'Gateway',
                    gateway: { type: 'Exclusive' }
                },
                tooltip: { content: 'proceed to validate?' },
            },
            {
                id: 'node5', width: 75, height: 70, offsetX: 570, offsetY: 120,
                annotations: [{ content: 'Validate', offset: { x: 0.50, y: 0.50 } }],
                tooltip: { content: 'Whether the reported/requested bug/feature is valid?' }, shape: { type: 'Bpmn', shape: 'Gateway' }
            },
            {
                id: 'node6', width: 60, height: 60, offsetX: 720, offsetY: 120,
                tooltip: { content: 'Send the invalid message to customer' },
                shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
            },
            {
                id: 'node7', width: 60, height: 50, offsetX: 140, offsetY: 280,
                annotations: [{ content: 'Request', offset: { x: 0.50, y: 0.50 }, margin: { top: 5 } }],
                tooltip: { content: 'Requesting for more information' },
                shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Send' } } }
            },
            {
                id: 'node8', width: 60, height: 60, offsetX: 370, offsetY: 280,
                tooltip: { content: 'Share the User Guide/Knowledge Base link' },
                shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
            },
            {
                id: 'node9', width: 70, height: 50, offsetX: 570, offsetY: 280,
                annotations: [{ content: 'Log bug/feature', offset: { x: 0.50, y: 0.50 } }], tooltip: { content: 'Log the bug/feature' },
                shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } }
            },
            {
                id: 'node10', width: 75, height: 55, offsetX: 390, offsetY: 430,
                annotations: [{ content: 'Implement', offset: { x: 0.50, y: 0.50 } }], tooltip: { content: 'Fix the bug/Add the feature' },
                shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess', subProcess: {
                            collapsed: false,
                            events: [{ event: 'Intermediate', trigger: 'Timer', offset: { x: 0.5, y: 1 }, width: 25, height: 25 }]
                        }
                    }
                }
            },
            {
                id: 'node12', width: 60, height: 60, offsetX: 265, offsetY: 430, tooltip: { content: 'Provide the solution' },
                shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
            },
            {
                id: 'node13', width: 60, height: 60, offsetX: 720, offsetY: 430, tooltip: { content: 'Share the task details' },
                shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
            },
            {
                id: 'node14', width: 60, height: 60, offsetX: 570, offsetY: 430, shape: {
                    type: 'Bpmn', shape: 'Gateway',
                    gateway: { type: 'Parallel' }
                },
                tooltip: { content: 'can log?' },
            },
    ];

    public connectors: ConnectorModel[] = [
        { id: 'connector1', sourceID: 'node1', targetID: 'node2' },
        { id: 'connector2', sourceID: 'node2', targetID: 'node3' },
        { id: 'connector3', sourceID: 'node3', targetID: 'node4' },
        {
            id: 'connector4', sourceID: 'node4', targetID: 'node5',
            annotations: [{ content: 'Feature/Bug', offset: 0.5, style: { fill: 'white', textWrapping: 'Wrap' } }]
        },
        {
            id: 'connector5', sourceID: 'node5', targetID: 'node6',
            annotations: [{ content: 'Invalid', offset: 0.5, style: { fill: 'white' } }]
        },
        { id: 'connector6', sourceID: 'node2', targetID: 'node7' },
        {
            id: 'connector7', sourceID: 'node4', targetID: 'node8',
            annotations: [{ content: 'How to?', offset: 0.5, style: { fill: 'white' } }]
        },
        { id: 'connector8', sourceID: 'node5', targetID: 'node9' },
        { id: 'connector9', sourceID: 'node14', targetID: 'node13' },
        {
            id: 'connector10', sourceID: 'node7', targetID: 'node3', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 100, direction: 'Right' }, { type: 'Orthogonal', length: 100, direction: 'Top' }]
        },
        { id: 'connector11', sourceID: 'node14', targetID: 'node10' },
        { id: 'connector12', sourceID: 'node10', targetID: 'node12' },
        { id: 'connector13', sourceID: 'node9', targetID: 'node14' },
    ];
    // FontType Collection
    public modevalue: { [key: string]: Object }[] = [
        { type: 'Object', text: 'Object' },
        { type: 'Mouse', text: 'Mouse' },
    ];

    // FontType Collection
    public PositionValue: { [key: string]: Object }[] = [
        { type: 'TopLeft', text: 'TopLeft' },
        { type: 'TopCenter', text: 'TopCenter' },
        { type: 'TopRight', text: 'TopRight' },
        { type: 'BottomLeft', text: 'BottomLeft' },
        { type: 'BottomCenter', text: 'BottomCenter' },
        { type: 'BottomRight', text: 'BottomRight' },
        { type: 'LeftTop', text: 'LeftTop' },
        { type: 'LeftCenter', text: 'LeftCenter' },
        { type: 'LeftBottom', text: 'LeftBottom' },
        { type: 'RightTop', text: 'RightTop' },
        { type: 'RightCenter', text: 'RightCenter' },
        { type: 'RightBottom', text: 'RightBottom' },
    ];

    //FontType Collection
    public EffectValue: { [key: string]: Object }[] = [
        { type: 'FadeIn', text: 'FadeIn' },
        { type: 'FadeOut', text: 'FadeOut' },
        { type: 'FadeZoomIn', text: 'FadeZoomIn' },
        { type: 'FadeZoomOut', text: 'FadeZoomOut' },
        { type: 'FlipXDownIn', text: 'FlipXDownIn' },
        { type: 'FlipXDownOut', text: 'FlipXDownOut' },
        { type: 'FlipXUpIn', text: 'FlipXUpIn' },
        { type: 'FlipXUpOut', text: 'FlipXUpOut' },
        { type: 'FlipYLeftIn', text: 'FlipYLeftIn' },
        { type: 'FlipYLeftOut', text: 'FlipYLeftOut' },
        { type: 'FlipYRightIn', text: 'FlipYRightIn' },
        { type: 'FlipYRightOut', text: 'FlipYRightOut' },
        { type: 'ZoomIn', text: 'ZoomIn' },
        { type: 'ZoomOut', text: 'ZoomOut' },
        { type: 'None', text: 'None' },
    ];

    public contentValue: { [key: string]: Object }[] = [
        { type: 'HTML Element', text: 'HTML Element' },
        { type: 'Text', text: 'Text' },
    ];

    public fields: Object = { value: 'type', text: 'text' };

    public getcontent(): HTMLElement {
        let tooltipContent: HTMLElement = document.createElement('div');
        tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;white-space: nowrap;"> <span style="margin: 10px;"> Tooltip !!! </span> </div>';
        return tooltipContent;
    }

    public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
        connector.type = 'Orthogonal';
        return connector;
    }
    public getNodeDefaults(obj: NodeModel): NodeModel {
        obj.offsetX += 0.5;
        obj.offsetY += 0.5;
        obj.constraints = NodeConstraints.Default | NodeConstraints.Tooltip;
        obj.style = { strokeWidth: 2 };
        return obj;
    }

    public relativeModeChange(args: any): void {
        if (args.value === 'Mouse') {
            this.diagram.tooltip.relativeMode = 'Mouse';
        } else {
            this.diagram.tooltip.relativeMode = 'Object';
        }
    }

    public positionChange(args: any): void {
        let nodes: NodeModel[] = this.diagram.nodes;
        for (let i: number = 0; i < nodes.length; i++) {
            if (nodes[i].tooltip) {
                nodes[i].tooltip.position = args.value;
                this.diagram.dataBind();
            }
        }
    }

    public effectChange(args: any): void {
        this.diagram.tooltip.animation.open.effect = args.value;
        this.diagram.tooltip.animation.close.effect = args.value;
    }

    public htmlChange(args: any): void {
        let tooltipContent: HTMLDivElement = document.createElement('div');
        let Description: any = args.value.toString();
        tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;corner-radius:2px;white-space: nowrap;"> <span style="margin: 10px;"> ' + Description + ' </span>';
        this.diagram.tooltip.content = tooltipContent;
        this.diagram.dataBind();
    }

    public textChange(args: any): void {
        this.diagram.tooltip.content = args.value.toString();
        this.diagram.dataBind();
    }

    public contentChange(args: any): void {
        let HtmlBlock: HTMLElement = document.getElementById('htmlContentDiv')
        let textBlock: HTMLElement = document.getElementById('textContentDiv')
        if (args.value === 'HTML Element') {
            textBlock.style.display = 'block';
            HtmlBlock.style.display = 'none';
        } else {
            HtmlBlock.style.display = 'block';
            textBlock.style.display = 'none';
        }
    }

    public animationChange(args: any): void {
        this.diagram.tooltip.animation.close.duration = args.value;
        this.diagram.tooltip.animation.open.duration = args.value;
    }
    public created(): void {
        this.diagram.fitToPage({ mode: 'Width' });
    }
}