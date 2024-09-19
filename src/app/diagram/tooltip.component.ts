
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, NodeModel, ConnectorModel, DiagramModule, Diagram, BpmnDiagrams } from '@syncfusion/ej2-angular-diagrams';
import { NodeConstraints, SnapConstraints, SnapSettingsModel } from '@syncfusion/ej2-diagrams';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
import { TooltipModel } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(BpmnDiagrams);

/**
 * Sample for tooltip
 */

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, DropDownListModule, NumericTextBoxModule, CheckBoxModule, SBDescriptionComponent]
})

export class TooltipDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public dropdownIndex: number = 0;

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public tooltip: any = {
        content: this.getContent(), position: 'TopLeft', relativeMode: 'Object',
        animation: { open: { effect: 'FadeZoomIn', delay: 0 }, close: { effect: 'FadeZoomOut', delay: 0 } }
    };
    //Initializes diagram nodes
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
    //Initializes diagram connectors
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
    //Collection of relative modes for tooltip
    public modeValue: { [key: string]: Object }[] = [
        { type: 'Object', text: 'Object' },
        { type: 'Mouse', text: 'Mouse' },
    ];

    //Collection of positions for tooltip
    public PositionValue: { [key: string]: Object }[] = [
        { type: 'TopLeft', text: 'Top Left' },
        { type: 'TopCenter', text: 'Top Center' },
        { type: 'TopRight', text: 'Top Right' },
        { type: 'BottomLeft', text: 'Bottom Left' },
        { type: 'BottomCenter', text: 'Bottom Center' },
        { type: 'BottomRight', text: 'Bottom Right' },
        { type: 'LeftTop', text: 'Left Top' },
        { type: 'LeftCenter', text: 'Left Center' },
        { type: 'LeftBottom', text: 'Left Bottom' },
        { type: 'RightTop', text: 'Right Top' },
        { type: 'RightCenter', text: 'Right Center' },
        { type: 'RightBottom', text: 'Right Bottom' },
    ];

    //Collection of effects for tooltip
    public EffectValue: { [key: string]: Object }[] = [
        { type: 'FadeIn', text: 'Fade In' },
        { type: 'FadeOut', text: 'Fade Out' },
        { type: 'FadeZoomIn', text: 'Fade Zoom In' },
        { type: 'FadeZoomOut', text: 'Fade Zoom Out' },
        { type: 'FlipXDownIn', text: 'FlipX Down In' },
        { type: 'FlipXDownOut', text: 'FlipX Down Out' },
        { type: 'FlipXUpIn', text: 'FlipX Up In' },
        { type: 'FlipXUpOut', text: 'FlipX Up Out' },
        { type: 'FlipYLeftIn', text: 'FlipY Left In' },
        { type: 'FlipYLeftOut', text: 'FlipY Left Out' },
        { type: 'FlipYRightIn', text: 'FlipY Right In' },
        { type: 'FlipYRightOut', text: 'FlipY Right Out' },
        { type: 'ZoomIn', text: 'Zoom In' },
        { type: 'ZoomOut', text: 'Zoom Out' },
        { type: 'None', text: 'None' },
    ];

    public fields: Object = { value: 'type', text: 'text' };

    //set content for diagram tooltip
    public getContent(): HTMLElement {
        let tooltipContent: HTMLElement = document.createElement('div');
        tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;white-space: nowrap;"> <span style="margin: 10px;"> Tooltip !!! </span> </div>';
        return tooltipContent;
    }

    //set default value for connectors.
    public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
        connector.type = 'Orthogonal';
        return connector;
    }
    //set default value for Nodes.
    public getNodeDefaults(obj: NodeModel): NodeModel {
        obj.offsetX += 0.5;
        obj.offsetY += 0.5;
        obj.constraints = NodeConstraints.Default | NodeConstraints.Tooltip;
        obj.style = { strokeWidth: 2 };
        return obj;
    }

    //Change relative mode for tooltip
    public relativeModeChange(args: any): void {
        if (args.value === 'Mouse') {
            this.diagram.tooltip.relativeMode = 'Mouse';
        } else {
            this.diagram.tooltip.relativeMode = 'Object';
        }
    }

    //Change position for tooltip
    public positionChange(args: any): void {
        let nodes: NodeModel[] = this.diagram.nodes;
        for (let i: number = 0; i < nodes.length; i++) {
            if (nodes[i].tooltip) {
                nodes[i].tooltip.position = args.value;
                this.diagram.dataBind();
            }
        }
    }

    //Change effect for tooltip
    public effectChange(args: any): void {
        this.diagram.tooltip.animation.open.effect = args.value;
        this.diagram.tooltip.animation.close.effect = args.value;
    }

    //Change animation for tooltip
    public animationChange(args: any): void {
        this.diagram.tooltip.animation.close.duration = args.value;
        this.diagram.tooltip.animation.open.duration = args.value;
    }
    public created(): void {
        this.diagram.fitToPage({ mode: 'Width' });
    }
    //Enable or disable the sticky mode
    public isStickyChange(args: CheckBoxChangeEventArgs): void {
        for (let i: number = 0; i < this.diagram.nodes.length; i++) {
            let node: NodeModel = this.diagram.nodes[i];
            if (args.checked) {
                (this.diagram.tooltipObject as TooltipModel).isSticky = true;
                (node.tooltip as TooltipModel).isSticky = true;
            } else {
                (this.diagram.tooltipObject as TooltipModel).isSticky = false;
                (node.tooltip as TooltipModel).isSticky = false;
            }
            this.diagram.dataBind();
        }
    }
}