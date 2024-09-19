import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    Diagram, NodeModel, BpmnDiagrams, SnapSettingsModel, SnapConstraints, NodeConstraints,
    FlowShapes, FlowShapeModel, TextModel
} from '@syncfusion/ej2-diagrams';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

Diagram.Inject(BpmnDiagrams);

@Component({
    selector: 'control-content',
    templateUrl: 'shapes.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})

export class ShapesDiagramComponent {

    @ViewChild('diagram')
    public diagram: DiagramComponent;

    //Function to get basicshapes.
    public getBasicShape(shapeType: string, annotations: { content: string }[]): any {
        return {
            shape: {
                type: 'Basic',
                shape: shapeType
            },
            annotations
        };
    }
    //Function to get flowshapes.
    public createFlowShape(shapeType: any, content: string): NodeModel {
        let flowshape: NodeModel = {
            shape: { type: 'Flow', shape: shapeType },
            annotations: [{ content: content }]
        };
        return flowshape;
    }
    // Function to create BPMN shape
    public getBpmnShape(shapeType: string, annotations: { content: string }[], event?: { event: string, trigger: string }): any {
        const shape: any = {
            type: 'Bpmn',
            shape: shapeType
        };
        if (event) {
            shape.event = event;
        }
        return {
            shape,
            annotations
        };
    }

    // Define basic shape models
    private basicShapeModel: any[] = [
        {
            shape: { type: 'Text', content: 'Basic Shapes' },
            constraints: NodeConstraints.PointerEvents,
            style: { fontSize: 16, fill: 'None', fontFamily: 'sans-serif', bold: true, strokeWidth: 0 },
        },
        this.getBasicShape('Rectangle', [{ content: 'Rectangle' }]),
        this.getBasicShape('Ellipse', [{ content: 'Ellipse' }]),
        this.getBasicShape('Triangle', [{ content: 'Triangle' }]),
        this.getBasicShape('Plus', [{ content: 'Plus' }]),
        this.getBasicShape('Star', [{ content: 'Star' }]),
        this.getBasicShape('Pentagon', [{ content: 'Pentagon' }]),
        this.getBasicShape('Heptagon', [{ content: 'Heptagon' }]),
        this.getBasicShape('Octagon', [{ content: 'Octagon' }]),
        this.getBasicShape('Trapezoid', [{ content: 'Trapezoid' }]),
        this.getBasicShape('Decagon', [{ content: 'Decagon' }]),
        this.getBasicShape('RightTriangle', [{ content: 'Right Triangle' }]),
        this.getBasicShape('Parallelogram', [{ content: 'Parallelogram' }])
    ];

    //Initialize the flowshapes for the symbol palatte
    private flowShapeModel: NodeModel[] = [
        {
            shape: { type: 'Text', content: 'Flow Shapes' }, constraints: NodeConstraints.PointerEvents,
            style: { fontSize: 16, fill: 'None', fontFamily: 'sans-serif', bold: true, strokeWidth: 0 }
        },
        this.createFlowShape('Terminator', 'Terminator'),
        this.createFlowShape('Process', 'Process'),
        this.createFlowShape('Decision', 'Decision'),
        this.createFlowShape('Document', 'Document'),
        this.createFlowShape('PreDefinedProcess', 'Predefined Process'),
        this.createFlowShape('PaperTap', 'Paper Tape'),
        this.createFlowShape('DirectData', 'Direct Data'),
        this.createFlowShape('SequentialData', 'Direct Data'),
        this.createFlowShape('Sort', 'Sort'),
        this.createFlowShape('MultiDocument', 'Multi-Document'),
        this.createFlowShape('Collate', 'Collate'),
        this.createFlowShape('SummingJunction', 'Summing Junction'),
        this.createFlowShape('Or', 'Or'),
        this.createFlowShape('InternalStorage', 'Internal Storage'),
        this.createFlowShape('Extract', 'Extract'),
        this.createFlowShape('ManualOperation', 'Manual Operation'),
        this.createFlowShape('Merge', 'Merge'),
        this.createFlowShape('OffPageReference', 'Off-Page Reference'),
        this.createFlowShape('SequentialAccessStorage', 'Sequential Access Storage'),
        this.createFlowShape('Data', 'Data'),
        this.createFlowShape('Card', 'Card')
    ];

    // Define BPMN shape models
    private bpmnShapeModel: any[] = [
        {
            shape: { type: 'Text', content: 'BPMN Shapes' },
            constraints: NodeConstraints.PointerEvents,
            style: { fontSize: 16, fill: 'none', fontFamily: 'sans-serif', bold: true, strokeWidth: 0 },
        },
        this.getBpmnShape('Event', [{ content: 'Start Event' }], { event: 'Start', trigger: 'None' }),
        this.getBpmnShape('Event', [{ content: 'Intermediate Event' }], { event: 'Intermediate', trigger: 'None' }),
        this.getBpmnShape('Event', [{ content: 'End Event' }], { event: 'End', trigger: 'None' }),
        this.getBpmnShape('Gateway', [{ content: 'Gateway' }]),
        {
            shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } },
            annotations: [{ content: 'Task' }]
        },
        {
            shape: {
                type: 'Bpmn', shape: 'Activity', activity: {
                    activity: 'SubProcess',
                    subProcess: {
                        type: 'Transaction', transaction: {
                            success: { visible: false }, failure: { visible: false }, cancel: { visible: false }
                        }
                    }
                }
            },
            annotations: [{ content: 'Transaction' }]
        },
        this.getBpmnShape('Message', [{ content: 'Message' }]),
        this.getBpmnShape('DataObject', [{ content: 'Data Object' }]),
        this.getBpmnShape('DataSource', [{ content: 'Data Source' }]),
        this.getBpmnShape('Group', [{ content: 'Group' }]),
        this.getBpmnShape('TextAnnotation', [{ content: 'Text Annotation' }])
    ];

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public nodes: NodeModel[] = this.getNodes();

    //To get default node details
    private getNodes(): NodeModel[] {
        let nodes1: NodeModel[] = this.basicShapeModel.concat(this.flowShapeModel).concat(this.bpmnShapeModel);
        let offsetx: number = 60;
        let offsety: number = 50;
        let count: number = 1;
        for (let i: number = 0; i < nodes1.length; i++) {
            let node: NodeModel = nodes1[i];
            node.width = 40;
            node.height = 40;
            node.offsetX = offsetx;
            node.offsetY = offsety;
            if (node.shape.type === 'Flow') {
                let shapeType: FlowShapes = (node.shape as FlowShapeModel).shape;
                if (shapeType === 'Process' || shapeType === 'Terminator') {
                    node.height = 20;
                } else if (shapeType === 'Decision') {
                    node.height = 35;
                } else if (shapeType === 'Document' || shapeType === 'DirectData' ||
                    shapeType === 'MultiDocument' || shapeType === 'PreDefinedProcess') {
                    node.height = 30;
                }
            }

            if (!(node.shape.type === 'Text')) {
                let lable = node.annotations[0];
                lable.verticalAlignment = 'Top';
                lable.offset = { y: 1 };
                lable.margin = { top: 10 };

                offsetx += 90;
                if (count % 10 === 0) {
                    offsety = offsety + 100;
                    offsetx = 60;
                }
                count++;
            }
            if (node.shape.type === 'Text') {
                offsetx = 60;
                offsety += 50;
                count = 1;
                node.width = 150;
                node.height = 50;
                node.offsetX = 90;
                if (!((node.shape as TextModel).content === 'Basic Shapes')) {
                    node.offsetX = 90;
                    node.offsetY = offsety + 50;
                    offsety = offsety + 100;
                }
            }
        }
        return nodes1;
    }

    public diagramCreate(args: Object): void {
        this.diagram.fitToPage({ mode: 'Height' });
    }
}
