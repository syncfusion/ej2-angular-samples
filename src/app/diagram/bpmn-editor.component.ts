/**
 * BPMN Editor sample
 */

// Importing needed dependencies for diagram
import { Component, ViewEncapsulation, ViewChild ,Inject} from '@angular/core';
import { DiagramComponent, MarginModel, Diagram, NodeModel, BpmnDiagrams, SnapSettingsModel,
    BpmnLoops, SnapConstraints, SymbolPalette, BpmnShape, BpmnDataObjects, BpmnGateways, BpmnTasks,
    BpmnTriggers, BpmnBoundary, NodeConstraints, BpmnShapeModel, ConnectorModel, BpmnGatewayModel,
    ContextMenuSettingsModel, IDragEnterEventArgs, DiagramBeforeMenuOpenEventArgs, BpmnEvents,
    PaletteModel, SymbolPaletteModule, DiagramModule, Segments} from '@syncfusion/ej2-angular-diagrams';
import { MenuEventArgs, ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from './script/diagram-common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
SymbolPalette.Inject(BpmnDiagrams);
Diagram.Inject(BpmnDiagrams);

/**
 * Component for displaying a BPMN Editor  sample.
 * Manages the presentation and behavior of the diagram using Syncfusion's Angular Diagram component.
 */
@Component({
    selector: 'control-content', // Angular component selector
    templateUrl: 'bpmn-editor.html', // HTML template file for the component
    styleUrls: ['diagram-common.style.css'],  // CSS styles specific to the component
    encapsulation: ViewEncapsulation.None, // No view encapsulation
    standalone: true,  // Indicates it's a standalone component
    imports: [SBActionDescriptionComponent, SymbolPaletteModule, DiagramModule, SBDescriptionComponent]   // Importing necessary Angular modules and components
})

/**
 * Represents a diagram component of BPMN Editor .
 */
export class BPMNShapesDiagramComponent {
  // Reference to the diagram component
  @ViewChild('diagram')
    public diagram: DiagramComponent;
    public expandMode: ExpandMode = 'Multiple';
    // Constructor to inject source files
    constructor(@Inject('sourceFiles') private sourceFiles: any) {​​​​​​​
        sourceFiles.files = ['diagram-common.style.css'];
    }​​​​​​​
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };


    // Function to initialize a node
    private createNode(id: string, width: number, height: number, offsetX: number, offsetY: number,
        shape: any, annotations: any[] = [], margin: any = {}, style: any = {}, constraints: any = NodeConstraints.Default): NodeModel {
        return {
            id: id,
            width: width,
            height: height,
            offsetX: offsetX,
            offsetY: offsetY,
            shape: shape,
            annotations,
            margin: margin,
            style: style,
            constraints: constraints
        }
    };
    
  //Initializes the nodes for the diagram.
  public nodes: NodeModel[] = [    
  
    this.createNode('start', 40, 40, 35, 180, { type: 'Bpmn', shape: 'Event', event: { event: 'Start' } }),
  
    this.createNode('subProcess', 520, 250, 355, 180, { shape: 'Activity', type: 'Bpmn', activity: { activity: 'SubProcess',
    subProcess: { type: 'Transaction', collapsed: false, processes: ['processesStart', 'service', 'compensation', 
    'error','processesTask', 'processesEnd', 'user', 'subProcessesEnd']}}},[],{},{},
    NodeConstraints.Default | NodeConstraints.AllowDrop,
  ),
    
    this.createNode('hazardEnd', 40, 40, 305, 370, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }, [
      { id: 'label2', content: 'Hazard', verticalAlignment: 'Top', style: { fill: 'white', color: 'black' }, margin: { top: 20 } }
    ]),
    
    this.createNode('cancelledEnd', 40, 40, 545, 370, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }, [
      { id: 'cancelledEndLabel2', content: 'Cancelled', verticalAlignment: 'Top', style: { fill: 'white', color: 'black' }, margin: { top: 20 } }
    ]),
    
    this.createNode('end', 40, 40, 665, 180, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }),
    
    this.createNode('processesStart', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'Start' } }, [], { left: 40, top: 80 }),
    
    this.createNode('service', 95, 70, 0, 0, {
      type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Service', loop: 'ParallelMultiInstance' } } },
      [{ id: 'serviceLabel2', content: 'Book hotel', style: { color: 'white' }, offset: { x: 0.5, y: 0.5 } }],
      { left: 110, top: 20 }, { fill: '#6FAAB0' }
    ),
    
    this.createNode('compensation', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'Intermediate', trigger: 'Compensation' } }, [], { left: 170, top: 100 }),
    
    this.createNode('processesTask', 95, 70, 0, 0, {
      type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Service' } } }, 
      [{ id: 'serviceLabel2', content: 'Charge credit card', style: { color: 'white' }, offset: { x: 0.5, y: 0.6 } } ],
      { left: 290, top: 20 }, { fill: '#F6B53F' }
    ),
    
    this.createNode('error', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'Intermediate', trigger: 'Error' } }, [], { left: 350, top: 100 }),
    
    this.createNode('processesEnd', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } },[], { left: 440, top: 80 }),
    
    this.createNode('user', 90, 80, 0, 0, {
      type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'User', compensation: true } } }, 
      [ { id: 'serviceLabel2', content: 'Cancel hotel reservation', style: { color: 'white' }, offset: { x: 0.5, y: 0.6 } } ], 
      { left: 30, top: 160 }, { fill: '#E94649' }
    ),
    
    this.createNode('subProcessesEnd', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }, [], { left: 440, top: 210 }),
  ];


    // Function to create a connector
    private createConnector(id: string, sourceID: string, targetID: string, sourcePortID = " ", targetPortID = "", type: Segments = "Orthogonal",
        segments: any[] = [], annotations: any[] = [], shape: any = {}, style: any = {}): ConnectorModel {
        return {
            id: id,
            sourceID: sourceID,
            targetID: targetID,
            sourcePortID: sourcePortID,
            targetPortID: targetPortID,
            type: type,
            segments: segments,
            annotations: annotations,
            shape: shape,
            style: style
        }
    };
    
    //Initializes the connectors for the diagram.
    public connectors: ConnectorModel[] = [
    this.createConnector('connector1', 'start', 'subProcess'),
    this.createConnector('connector2', 'subProcess', 'end', 'success'),
    this.createConnector('connector3', 'subProcess', 'hazardEnd', 'failure',"", 'Orthogonal', 
      [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
      [{ id: 'connector3Label2', content: 'Booking system failure', offset: 0.50, style: { fill: 'white' }}]
    ),
    this.createConnector('connector4', 'subProcess', 'cancelledEnd', 'cancel',"", 'Orthogonal', 
      [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }]
    ),
    this.createConnector('connector5', 'processesStart', 'service', "", "", 'Orthogonal'),
    this.createConnector('connector6', 'service', 'processesTask'),
    this.createConnector('connector7', 'processesTask', 'processesEnd', "", "", 'Orthogonal'),
    this.createConnector('connector8', 'compensation', 'user', "", "", 'Orthogonal', 
      [{ type: 'Orthogonal', length: 30, direction: 'Bottom' },{ type: 'Orthogonal', length: 80, direction: 'Left' }],
      [],{ type: 'Bpmn', flow: 'Association', association: 'Directional'},{ strokeDashArray: '2,2'}
    ),
    this.createConnector('connector9', 'error', 'subProcessesEnd', null, null, 'Orthogonal', 
      [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
      [{ id: 'connector9Label2', content: 'Cannot charge card', offset: 0.5,
        style: { fill: 'white', color: 'black' } } ]
    )
  ];

    //Initializes the bpmn shapes for the symbol pallete.
    public bpmnShapes: NodeModel[] = [
        {
            id: 'Start', width: 35, height: 35, shape: {
                type: 'Bpmn', shape: 'Event',
                event: { event: 'Start' },
            },
        },
        {
            id: 'NonInterruptingIntermediate', width: 35, height: 35, shape: {
                type: 'Bpmn', shape: 'Event',
                event: { event: 'NonInterruptingIntermediate' }
            },
        },
        {
            id: 'End', width: 35, height: 35, offsetX: 665, offsetY: 230, shape: {
                type: 'Bpmn', shape: 'Event',
                event: { event: 'End' }
            },
        },
        {
            id: 'Task', width: 35, height: 35, offsetX: 700, offsetY: 700,
            shape: {
                type: 'Bpmn', shape: 'Activity', activity: {
                    activity: 'Task',
                },
            }
        },
        {
            id: 'Transaction', width: 35, height: 35, offsetX: 300, offsetY: 100,
            constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
            shape: {
                type: 'Bpmn', shape: 'Activity',
                activity: {
                    activity: 'SubProcess', subProcess: {
                        type: 'Transaction', transaction: {
                            cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                        }
                    }
                }
            }
        }, {
            id: 'Task_Service', width: 35, height: 35, offsetX: 700, offsetY: 700,
            shape: {
                type: 'Bpmn', shape: 'Activity', activity: {
                    activity: 'Task', task: { type: 'Service' }
                },
            }
        },
        {
            id: 'Gateway', width: 35, height: 35, offsetX: 100, offsetY: 100,
            shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } as BpmnGatewayModel }
        },
        {
            id: 'DataObject', width: 35, height: 35, offsetX: 500, offsetY: 100,
            shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } }
        },
        {
            id: 'subProcess', width: 520, height: 250, offsetX: 355, offsetY: 230,
            constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
            shape: {
                shape: 'Activity', type: 'Bpmn',
                activity: {
                    activity: 'SubProcess', subProcess: {
                        type: 'Transaction', collapsed: false,
                        processes: [], transaction: {
                            cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                        }
                    }
                }
            },
        },
    ];

    
    //Initializes the context menu for shapes.
    public contextMenu: ContextMenuSettingsModel = {
    show: true, items: [
        {
            text: 'Ad-Hoc', id: 'Adhoc',
            items: [{ text: 'None', iconCss: 'e-adhocs e-bpmn-event e-bpmn-icons e-None', id: 'AdhocNone' },
            { iconCss: 'e-adhocs e-bpmn-icons e-adhoc', text: 'Ad-Hoc', id: 'AdhocAdhoc' }]
        }, {
            text: 'Loop', id: 'Loop',
            items: [{ text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
            { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
            { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
            { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
        }, {
            text: 'Compensation', id: 'taskCompensation',
            items: [{ text: 'None', iconCss: 'e-compensation e-bpmn-icons e-None', id: 'CompensationNone' },
            { iconCss: 'e-compensation e-bpmn-icons e-Compensation', text: 'Compensation', id: 'CompensationCompensation' }]
        }, {
            text: 'Activity-Type', id: 'Activity-Type',
            items: [{ text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'CollapsedSubProcess' },
            { iconCss: 'e-bpmn-icons e-Task', text: 'Expanded sub-process', id: 'ExpandedSubProcess' }]
        }, {
            text: 'Boundry', id: 'Boundry',
            items: [{ text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
            { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
            { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' }]
        }, {
            text: 'Data Object', id: 'DataObject',
            items: [{ text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
            { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
            { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }]
        }, {
            text: 'Collection', id: 'collection',
            items: [{ text: 'None', iconCss: 'e-collection e-bpmn-icons e-None', id: 'collectionNone' },
            { text: 'Collection', iconCss: 'e-collection e-bpmn-icons e-ParallelMI', id: 'Collectioncollection' }]
        }, {
            text: 'Call', id: 'DeftCall',
            items: [{ text: 'None', iconCss: 'e-call e-bpmn-icons e-None', id: 'CallNone' },
            { text: 'Call', iconCss: 'e-call e-bpmn-icons e-CallActivity', id: 'CallCall' }]
        }, {
            text: 'Trigger Result', id: 'TriggerResult',
            items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
            { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
            { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
            { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
            { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
            { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
            { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
            { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
            { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
            { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
            { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
            { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
            { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
            ]
        },
        {
            text: 'Event Type', id: 'EventType',
            items: [{ text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart', },
            { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
            { text: 'NonInterruptingStart', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
            { text: 'ThrowingIntermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-ThrowingIntermediate' },
            {
                text: 'NonInterruptingIntermediate', id: 'NonInterruptingIntermediate',
                iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate'
            },
            { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }]
        }, {
            text: 'Task Type', id: 'TaskType',
            items: [
                { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
                { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
                { text: 'BusinessRule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
                { text: 'InstantiatingReceive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
                { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
                { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
                { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-OutMessage' },
                { text: 'User', id: 'User', iconCss: 'e-task e-bpmn-icons e-UserCall' },
            ]
        }, {
            text: 'GateWay', id: 'GateWay',
            iconCss: 'e-bpmn-icons e-Gateway', items: [
                { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None' },
                { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
                { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
                { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
                { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
                { text: 'EventBased', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
                { text: 'ExclusiveEventBased', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
                { text: 'ParallelEventBased', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
            ]
        },
    ],
    showCustomMenuOnly: true,
    };


    public diagramCreate(args: Object): void {
        this.diagram.fitToPage();
        paletteIconClick();
    };
    public symbolMargin: MarginModel = {
        left: 15, right: 15, top: 15, bottom: 15
    };


    // Define the function getConnectors
    public getConnectors(): ConnectorModel[] {

        //Initializes the Connector shapes for the symbol pallete.
        let connectorSymbols: ConnectorModel[] = [
            {
                id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} }, style: { strokeWidth: 2, strokeColor: '#757575' }
            },
            {
                id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} }, style: { strokeWidth: 2, strokeDashArray: '4 4', strokeColor: '#757575' }
            },
            {
                id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} }, style: { strokeWidth: 2, strokeColor: '#757575' }
            },
            {
                id: 'link4', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, type: 'Orthogonal',
                targetDecorator: { style: {strokeColor: '#757575', fill: '#757575'} },
                shape: {
                    type: 'Bpmn',
                    flow: 'Association',
                    association: 'Directional'
                }, style: {
                    strokeDashArray: '2,2', strokeColor: '#757575'
                },
            },
        ];
        return connectorSymbols;
    }

    //function context menu click
    public contextMenuClick(args: MenuEventArgs): void {
        if (this.diagram.selectedItems.nodes.length > 0) {
            let bpmnShape: BpmnShapeModel = this.diagram.selectedItems.nodes[0].shape as BpmnShapeModel;
            if (args.item.iconCss.indexOf('e-adhocs') > -1) {
                bpmnShape.activity.subProcess.adhoc = args.item.id === 'AdhocNone' ? false : true;
            }
            if (args.item.iconCss.indexOf('e-event') > -1) {
                bpmnShape.event.event = (args.item.id as BpmnEvents);
            }
            if (args.item.iconCss.indexOf('e-trigger') > -1) {
                bpmnShape.event.trigger = (args.item.text as BpmnTriggers);
            }
            if (args.item.iconCss.indexOf('e-loop') > -1) {
                let loop: string = (args.item.id === 'LoopNone' as BpmnLoops) ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.loop = loop as BpmnLoops;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.loop = loop as BpmnLoops;
                }
            }
            if (args.item.iconCss.indexOf('e-compensation') > -1) {
                let compensation: boolean = (args.item.id === 'CompensationNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.compensation = compensation;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.compensation = compensation;
                }
            }
            if (args.item.iconCss.indexOf('e-call') > -1) {
                let compensation: boolean = (args.item.id === 'CallNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.call = compensation;
                }
            }
            if (args.item.id === 'CollapsedSubProcess' || args.item.id === 'ExpandedSubProcess') {
                if (args.item.id === 'ExpandedSubProcess') {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = false;
                } else {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = true;
                }
            }
            if (args.item.iconCss.indexOf('e-boundry') > -1) {
                let call: string = args.item.id;
                if (args.item.id !== 'Default') {
                    call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
                }
                bpmnShape.activity.subProcess.boundary = call as BpmnBoundary;
            }
            if (args.item.iconCss.indexOf('e-data') > -1) {
                let call: string = args.item.id === 'DataObjectNone' ? 'None' : args.item.id;
                bpmnShape.dataObject.type = call as BpmnDataObjects;
            }
            if (args.item.iconCss.indexOf('e-collection') > -1) {
                let call: boolean = (args.item.id === 'Collectioncollection') ? true : false;
                bpmnShape.dataObject.collection = call;
            }
            if (args.item.iconCss.indexOf('e-task') > -1) {
                let task: string = args.item.id === 'TaskNone' ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.type = task as BpmnTasks;
                }
            }
            if (args.item.iconCss.indexOf('e-gate') > -1) {
                let task: string = args.item.id.replace('Gateway', '');
                if (bpmnShape.shape === 'Gateway') {
                    bpmnShape.gateway.type = task as BpmnGateways;
                }
            }
            this.diagram.dataBind();
        }
    }

    // Define a function to handle opening the context menu
    public contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs) {
        let hiddenId: string[] = [];
        if (args.element.className !== 'e-menu-parent e-ul ') {
            hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundry', 'DataObject',
                'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay'];
        }
        if (this.diagram.selectedItems.nodes.length) {
            for (let item of args.items) {
                let bpmnShape: BpmnShapeModel = this.diagram.selectedItems.nodes[0].shape as BpmnShapeModel;
                if (bpmnShape.shape !== 'DataObject' && bpmnShape.shape !== 'Gateway') {
                    if (item.text === 'Ad-Hoc') {
                        if (bpmnShape.activity.activity === 'SubProcess') {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Loop' || item.text === 'Compensation' || item.text === 'Activity-Type') {
                        if (bpmnShape.shape === 'Activity') {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Boundry') {
                        if (bpmnShape.activity.activity === 'SubProcess') {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                }
                if (item.text === 'Data Object') {
                    if (bpmnShape.shape === 'DataObject') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Collection') {
                    if (bpmnShape.shape === 'DataObject') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Call') {
                    if (bpmnShape.shape === 'Activity' && bpmnShape.activity.activity === 'Task') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Trigger Result') {
                    if ((bpmnShape.shape === 'Event')) {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Event Type') {
                    if ((bpmnShape.shape === 'Event')) {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Task Type') {
                    if ((bpmnShape.shape === 'Activity')
                        && (bpmnShape.activity.activity === 'Task')) {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'GateWay') {
                    if ((bpmnShape.shape === 'Gateway')) {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (args.parentItem && args.parentItem.id === 'TriggerResult' && bpmnShape.shape === 'Event') {

                    if (item.text !== 'None' && (item.text === bpmnShape.event.event || item.text === bpmnShape.event.trigger)) {
                        hiddenId.push(item.id);
                    }
                    if (bpmnShape.event.event === 'Start') {
                        if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Link') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'NonInterruptingStart' || item.text === 'Link') {
                        if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
                            item.text === 'Error' || item.text === 'None') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'Intermediate') {
                        if (item.text === 'Terminate') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'NonInterruptingIntermediate') {
                        if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
                            item.text === 'Error' || item.text === 'None' || item.text === 'Link') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'ThrowingIntermediate') {
                        if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Timer' || item.text === 'Error' ||
                            item.text === 'None' || item.text === 'Pareller' || item.text === 'Conditional') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'End') {
                        if (item.text === 'Parallel' || item.text === 'Timer' || item.text === 'Conditional' || item.text === 'Link') {
                            hiddenId.push(item.id);
                        }
                    }
                }
                if (args.parentItem && args.parentItem.id === 'EventType' && bpmnShape.shape === 'Event') {
                    if (item.text === bpmnShape.event.event) {
                        hiddenId.push(item.id);
                    }
                }
            }
        }
        args.hiddenItems = hiddenId;
    }

    // Function to handle drag enter from palette to diagram
    public dragEnter(args: IDragEnterEventArgs) {
        let node: NodeModel = args.element as NodeModel;
        if (node instanceof Node) {
            if (!(node.shape as BpmnShape).activity.subProcess.collapsed) {
                (node.shape as BpmnShape).activity.subProcess.transaction.cancel.visible = true;
                (node.shape as BpmnShape).activity.subProcess.transaction.failure.visible = true;
                (node.shape as BpmnShape).activity.subProcess.transaction.success.visible = true;
            } else {
                let nodeWidth: number = node.width;
                let nodeHeight: number = node.height;
                let ratio: number = 100 / node.width;
                node.width = 100;
                node.height *= ratio;
                node.offsetX += (node.width - nodeWidth) / 2;
                node.offsetY += (node.height - nodeHeight) / 2;
            }
        }
    }
    public getSymbolDefaults(symbol: NodeModel): void {
        symbol.style.strokeColor = '#757575';
      }

    public palette: PaletteModel[] = [
        { id: 'Bpmn', expanded: true, symbols: this.bpmnShapes, iconCss: 'shapes', title: 'BPMN Shapes' },
        { id: 'Connector', expanded: true, symbols: this.getConnectors(), iconCss: 'shapes', title: 'Connectors' },
    ];
}

