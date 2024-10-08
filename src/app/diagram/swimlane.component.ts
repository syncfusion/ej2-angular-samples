import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, NodeModel, ConnectorModel, PaletteModel, SnapSettingsModel, SnapConstraints, SymbolPaletteComponent, PointPortModel, PortVisibility, PortConstraints, ContextMenuSettingsModel, IDragEnterEventArgs, DiagramBeforeMenuOpenEventArgs, SwimLaneModel, Node, SymbolInfo, LaneModel, randomId, cloneObject, ShapeStyleModel, HeaderModel, SymbolPaletteModule, DiagramModule,SelectorModel, SelectorConstraints } from '@syncfusion/ej2-angular-diagrams';
import { MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


let pathData: string = 'M 120 24.9999 C 120 38.8072 109.642 50 96.8653 50 L 23.135' +
    ' 50 C 10.3578 50 0 38.8072 0 24.9999 L 0 24.9999 C' +
    '0 11.1928 10.3578 0 23.135 0 L 96.8653 0 C 109.642 0 120 11.1928 120 24.9999 Z';

/**
 * Sample for swimlane
 */
@Component({
    selector: 'control-content',
    templateUrl: 'swimlane.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SymbolPaletteModule, DiagramModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class SwimLaneDiagramComponent {
    //Create and add ports for node.
    public port: PointPortModel[] = [
        { id:'Port1', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Default | PortConstraints.Draw },
        { id:'Port2',offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Default | PortConstraints.Draw },
        { id:'Port3',offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Default | PortConstraints.Draw },
        { id:'Port4',offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Default | PortConstraints.Draw }
    ];

    // Initializes the nodes for the diagram.
    public nodes: NodeModel[] = [
        {
            id: 'swimlane',
            shape: {
                type: 'SwimLane',
                orientation: 'Horizontal',
                header: {
                    annotation: { content: 'SALES PROCESS FLOW CHART', style: { fill: 'transparent' } },
                    height: 50, style: { fontSize: 11 },
                },
                lanes: [
                    {
                        id: 'stackCanvas1',
                        header: {
                            annotation: { content: 'Consumer' }, width: 50,
                            style: { fontSize: 11 }
                        },
                        height: 100,
                        children: [
                            {
                                id: 'node1',
                                annotations: [
                                    {
                                        content: 'Consumer learns \n of product',
                                        style: { fontSize: 11 }
                                    }
                                ],
                                margin: { left: 60, top: 30 },
                                height: 40, width: 100, ports: this.port
                            },
                            {
                                id: 'node2',
                                shape: { type: 'Flow', shape: 'Decision' },
                                annotations: [
                                    {
                                        content: 'Does \nConsumer want \nthe product',
                                        style: { fontSize: 11 }
                                    }
                                ],
                                margin: { left: 200, top: 20 },
                                height: 60, width: 120, ports: this.port
                            },
                            {
                                id: 'node3',
                                annotations: [
                                    {
                                        content: 'No sales lead',
                                        style: { fontSize: 11 }
                                    }
                                ],
                                margin: { left: 370, top: 30 }, shape: { type: 'Path', data: pathData },
                                height: 40, width: 100, ports: this.port
                            },
                            {
                                id: 'node4',
                                annotations: [
                                    {
                                        content: 'Sell to consumer',
                                        style: { fontSize: 11 }
                                    }
                                ],
                                margin: { left: 510, top: 30 },
                                height: 40, width: 100, ports: this.port
                            },
                        ],
                    },
                    {
                        id: 'stackCanvas2',
                        header: {
                            annotation: { content: 'Marketing' }, width: 50,
                            style: { fontSize: 11 }
                        },
                        height: 100,
                        children: [
                            {
                                id: 'node5',
                                annotations: [{ content: 'Create marketing campaigns' }],
                                margin: { left: 60, top: 20 },
                                height: 40, width: 100, ports: this.port
                            },
                            {
                                id: 'node6',
                                annotations: [{ content: 'Marketing finds sales leads' }],
                                margin: { left: 210, top: 20 },
                                height: 40, width: 100, ports: this.port
                            }
                        ],
                    },
                    {
                        id: 'stackCanvas3',
                        header: {
                            annotation: { content: 'Sales' }, width: 50,
                            style: { fontSize: 11 }
                        },
                        height: 100,
                        children: [
                            {
                                id: 'node7',
                                annotations: [{ content: 'Sales receives lead' }],
                                margin: { left: 210, top: 30 },
                                height: 40, width: 100, ports: this.port
                            }
                        ],
                    },
                    {
                        id: 'stackCanvas4',
                        header: {
                            annotation: { content: 'Success' }, width: 50,
                            style: { fontSize: 11 }
                        },
                        height: 100,
                        children: [
                            {
                                id: 'node8',
                                annotations: [{ content: 'Success helps \n retain consumer \n as a customer' }],
                                margin: { left: 510, top: 20 },
                                height: 50, width: 100, ports: this.port
                            }
                        ],
                    },
                ],
                phases: [
                    {
                        id: 'phase1', offset: 170,
                        header: { annotation: { content: 'Phase' } }
                    },
                ],
                phaseSize: 20,
            },
            offsetX: 390, offsetY: 320,
            height: 100,
            width: 650
        },
    ];

    // Initializes the connectors for the diagram.
    public connectors: ConnectorModel[] = [
        {
            id: 'connector1', sourceID: 'node1',
            targetID: 'node2'
        },
        {
            id: 'connector2', sourceID: 'node2',
            targetID: 'node3', annotations: [{content:'No', style: {fill: 'white'}}]
        },
        {
            id: 'connector3', sourceID: 'node4',
            targetID: 'node8'
        },
        {
            id: 'connector4', sourceID: 'node2',
            targetID: 'node6', annotations: [{content:'Yes', style: {fill: 'white'}}]
        },
        {
            id: 'connector5', sourceID: 'node5',
            targetID: 'node1'
        },
        {
            id: 'connector6', sourceID: 'node6',
            targetID: 'node7'
        },
        {
            id: 'connector7', sourceID: 'node4',
            targetID: 'node7', sourcePortID: 'Port1', targetPortID: 'Port3'
        },
    ];

    // SymbolPalette Properties
    public expandMode: ExpandMode = 'Multiple';
    public palettes: PaletteModel[] = [
        {
            id: 'flow', expanded: true, title: 'Flow Shapes', symbols: [
                {
                    id: 'Terminator', addInfo: { tooltip: 'Terminator' }, width: 50, height: 60, shape: { type: 'Flow', shape: 'Terminator' },ports: this.port
                },
                {
                    id: 'Process',  addInfo: { tooltip: 'Process' }, width: 50, height: 60, shape: { type: 'Flow', shape: 'Process' }, ports: this.port
                },
                {
                    id: 'Decision', addInfo: { tooltip: 'Decision' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Decision' }, ports: this.port
                },
                {
                    id: 'Document', addInfo: { tooltip: 'Document' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Document' },  ports: this.port
                },
                {
                    id: 'Predefinedprocess', addInfo: { tooltip: 'Predefined process' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'PreDefinedProcess' }, ports: this.port
                },
                {
                    id: 'Data', addInfo: { tooltip: 'Data' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Data' }, ports: this.port
                },
            ]
        },
        {
            id: 'swimlaneShapes', expanded: true,
            title: 'Swimlane Shapes',
            symbols: [
                {
                    id: 'Horizontalswimlane', addInfo: { tooltip: 'Horizontal swimlane' },
                    shape: {
                        type: 'SwimLane', lanes: [
                            {
                                id: 'lane1',
                                height: 60, width: 150,
                                header: { width: 50, height: 50, style: {fontSize: 11 } },
                            }
                        ],
                        orientation: 'Horizontal', isLane: true
                    },
                    height: 60,
                    width: 140,
                    offsetX: 70,
                    offsetY: 30,
                }, {
                    id: 'Verticalswimlane', addInfo: { tooltip: 'Vertical swimlane' },
                    shape: {
                        type: 'SwimLane',
                        lanes: [
                            {
                                id: 'lane1',
                                 height: 150, width: 60,
                                header: { width: 50, height: 50, style: {  fontSize: 11 } },
                            }
                        ],
                        orientation: 'Vertical', isLane: true
                    },
                    height: 140,
                    width: 60,
                    offsetX: 70,
                    offsetY: 30,
                }, {
                    id: 'Verticalphase', addInfo: { tooltip: 'Vertical phase' },
                    shape: {
                        type: 'SwimLane',
                        phases: [{ style: { strokeDashArray: '3,3'}, }],
                        annotations: [{ text: '' }],
                        orientation: 'Vertical', isPhase: true
                    },
                    height: 60,
                    width: 140,
                }, {
                    id: 'Horizontalphase', addInfo: { tooltip: 'Horizontal phase' },
                    shape: {
                        type: 'SwimLane',
                        phases: [{ style: {strokeDashArray: '3,3'} }],
                        annotations: [{ text: '' }],
                        orientation: 'Horizontal', isPhase: true
                    },
                    height: 60,
                    width: 140,
                }
            ]
        },
        {
            id: 'connectors', expanded: true, symbols: [
                {
                    id: 'orthogonal', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                    
                },
                {
                    id: 'orthogonaldashed', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                     style: { strokeDashArray: '4 4' }
                },
                {
                    id: 'straight', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
                  
                },
                {
                    id: 'straightdashed', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
                  style: {strokeDashArray: '4 4'}
                }
            ], title: 'Connectors'
        }
    ];

    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public palete: SymbolPaletteComponent;
    public selectedItems: SelectorModel;
    //Disable the rotate constrains for selected nodes
    ngOnInit(): void {
        this.selectedItems = { constraints: SelectorConstraints.All & ~SelectorConstraints.Rotate };
    }
    public snapSettings: SnapSettingsModel = {
        constraints: SnapConstraints.All & ~SnapConstraints.ShowLines
    }
    public created(): void {
        this.diagram.fitToPage();
    }
    //Define custom menu items
    public contextMenuSettings: ContextMenuSettingsModel = {
        show: true, items: [
            {
                text: 'Clone', id: 'Clone', target: '.e-diagramcontent', iconCss: 'e-icons e-copy'
            },
            {
                text: 'Cut', id: 'Cut', target: '.e-diagramcontent', iconCss: 'e-icons e-cut'
            },
            {
                text: 'Paste', id: 'Paste', target: '.e-diagramcontent', iconCss: 'e-icons e-paste'
            },
            {
                text: 'InsertLaneBefore', id: 'InsertLaneBefore', target: '.e-diagramcontent',
            },
            {
                text: 'InsertLaneAfter', id: 'InsertLaneAfter', target: '.e-diagramcontent',
            }],
        showCustomMenuOnly: true,
    };
    //Set the default values of a Connector.
    public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
        if ((connector.id.indexOf("straight") !== -1) || (connector.id.indexOf("straightdashed") !== -1)) {
            connector.type = 'Straight';
        }
        else {
            connector.type = 'Orthogonal';
        }
        var color = '#717171';
        //set styles for connector
        connector.targetDecorator.style.strokeColor = color;
        connector.targetDecorator.style.fill = color;
        connector.style.strokeColor = color;
        connector.style.strokeWidth = 1;
        return connector;
    }    
    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
       return { tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
    }
     //Set the default values of a node.
    public getNodeDefaults(node: NodeModel) {
        node.style.strokeColor = '#717171';
        node.style.strokeWidth = 1;
        return node;
    }
   //Set the node style for the DragEnter element.
    public dragEnter(arg: IDragEnterEventArgs): void {
        if (arg.element instanceof Node) {
            let shape: SwimLaneModel = arg.element.shape as SwimLaneModel;
            if (shape.isLane) {
                if (shape.orientation === 'Horizontal') {
                    shape.lanes[0].height = 100;
                    shape.lanes[0].width = 500;
                } else if (shape.orientation === 'Vertical') {
                    shape.lanes[0].height = 500;
                    shape.lanes[0].width = 100;
                }
            }
        }
    }
    //Open the context menu 
    public contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
        for (let item of args.items) {
            if ((this.diagram.selectedItems.connectors.length + this.diagram.selectedItems.nodes.length) > 0) {
                if (item.id === 'InsertLaneBefore' || item.id === 'InsertLaneAfter') {
                    if (this.diagram.selectedItems.connectors.length || (this.diagram.selectedItems.nodes.length && !(this.diagram.selectedItems.nodes[0] as Node).isLane)) {
                        args.hiddenItems.push(item.text);
                    }
                }
            } else {
                args.hiddenItems.push(item.text);
            }
        }
    }
 //Handle click event for menu items.
    public contextMenuClick(args: MenuEventArgs): void {
        if (args.item.id === 'InsertLaneBefore' || args.item.id === 'InsertLaneAfter') {
            if (this.diagram.selectedItems.nodes.length > 0 && (this.diagram.selectedItems.nodes[0] as Node).isLane) {
                let index: number;
                let node: Node = this.diagram.selectedItems.nodes[0] as Node;
                let swimlane: NodeModel = this.diagram.getObject((this.diagram.selectedItems.nodes[0] as Node).parentId);
                let shape: SwimLaneModel = swimlane.shape as SwimLaneModel;
                let existingLane: LaneModel = cloneObject(shape.lanes[0]);

                let newLane: LaneModel = {
                    id: randomId(),
                    header: {
                        width: existingLane.header.width, height: existingLane.header.height,
                        style: existingLane.header.style as ShapeStyleModel
                    } as HeaderModel,
                    style: existingLane.style as ShapeStyleModel,
                    height: existingLane.height, width: existingLane.width,
                } as LaneModel;

                if (shape.orientation === 'Horizontal') {
                    let exclude = 0;
                    exclude += (shape.header) ? 1 : 0;
                    exclude += (shape.phases.length) ? 1 : 0;
                    index = node.rowIndex - exclude;
                    newLane.header.width = existingLane.header.width;
                    newLane.header.height = existingLane.height;
                } else {
                    index = node.columnIndex - (shape.phases.length) ? 1 : 0;
                    newLane.header.width = existingLane.width;
                    newLane.header.height = existingLane.header.height;
                }
                if (args.item.id === 'InsertLaneBefore') {
                    this.diagram.addLanes(swimlane, [newLane], index);
                } else {
                    this.diagram.addLanes(swimlane, [newLane], index + 1);
                }
                this.diagram.clearSelection();
            }
        } else if (args.item.id === 'Cut') {
            this.diagram.cut();
        } else if (args.item.id === 'Clone') {
            this.diagram.copy();
        }else if (args.item.id === 'Paste') {
            this.diagram.paste();
        }
    }
}
