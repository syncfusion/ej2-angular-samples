/**
 * Diagram Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { NumericTextBoxModule, ColorPickerModule, UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ComboBoxAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TreeViewModule  } from '@syncfusion/ej2-angular-navigations';
import { DiagramAllModule, SymbolPaletteAllModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';
import { AccumulationAnnotationService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { FlowDiagramComponent } from './default-functionalities.component';
import { NodeDiagramComponent } from './nodes.component';
import { ConnectorDiagramComponent } from './connectors.component';
import { ShapesDiagramComponent } from './shapes.component';
import { AnnotationDiagramComponent } from './annotations.component';
import { PortDiagramComponent } from './ports.component';
import { SwimLaneDiagramComponent } from './swimlane.component';
import { ComplexShapesDiagramComponent } from './custom-shapes.component';
import { FishboneDiagramComponent } from './fishbone-diagram.component';

import { DrawingToolDiagramComponent } from './drawing-tool.component';
import { KeyBoardDiagramComponent } from './key-board-functions.component';
import { UserHandlediagramComponent } from './quick-commands.component';
import { SymbolPaletteDiagramComponent } from './symbol-palette.component';
import { OverviewDiagramComponent } from './overview.component';
import { BPMNShapesDiagramComponent } from './bpmn-editor.component';
import { SerializationDiagramComponent } from './serialization.component';
import { PrintExportDiagramComponent } from './print-export.component';

import { HierarchyDiagramComponent } from './hierarchical-tree.component';
import { OrganizationalChartDiagramComponent } from './organization-chart.component';
import { RadialTreeDiagramComponent } from './radial-tree.component';
import { MindMapDiagramComponent } from './mind-map.component';
import { FlowchartLayoutDiagramComponent } from './flowchart-layout.component';
import { SymmetricLayoutDiagramComponent } from './symmetric-layout.component';
import { ComplexHierarchicalTreeDiagramComponent } from './complex-hierarchical-tree.component';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { LocalDataDiagramComponent } from './local-data.component';
import { RemoteDataDiagramComponent } from './remote-data.component';

import { VennDiagramComponent } from './venn-diagram.component';
import { RTLTreeDiagramComponent } from './right-to-left-tree.component';
import { PertChartDiagramComponent } from './pert-chart.component';
import { LogicCircuitComponent } from './logic-circuit.component';
import { UmlActivityComponent } from './uml-activity.component';
import { NetworkShapesDiagramComponent } from './network-diagram.component';
import { CRUDDiagramComponent } from './crud.component';
import { UmlClassDiagramComponent } from './uml-Class-diagram.component';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { FlowExecutionDiagramComponent } from 'src/app/diagram/flow-execution.component';
import { HistoryManagerDiagramComponent } from 'src/app/diagram/history-manager.component';
import { EventsDiagramComponent } from './diagram-events.component';
import { TooltipDiagramComponent } from './tooltip.component';
import { LineRoutingComponent } from './line-routing.component';
import { VirtualizationComponent } from './virtualization.component';
import { GroupingAndOrderingComponent } from './grouping-and-ordering.component';
import { CommandComponent } from './commands.component';
import { ConstraintComponent } from './constraints.component';
import { UmlSequenceComponent } from './uml-sequence-diagram.component';
import { HierarchicalLayoutWithMultipleRootComponent } from './hierarchicallayout-with-multipleroots.component';
import { ZoomingAndPanning } from './zooming-and-panning.component';
import { SnappingComponent } from './snapping.component';
import { ScrollingComponent } from './scrolling.component';
import { DataBindingWithTreeviewComponent } from './data-binding-with-treeview.component';
import { WorkFlowDiagramComponent } from './workflow-editor.component';
import { AvoidOverlapDiagramComponent } from './avoid-connector-overlap.component';

export const diagramAppRoutes: Object[] = [
    {
        path: ':theme/diagram/default-functionalities', component: FlowDiagramComponent,
        name: 'Flow Chart', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/diagram/nodes', component: NodeDiagramComponent,
        name: 'Nodes', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the different stages of a software development life cycle using a circular flow diagram. Customizing the appearance of the nodes is illustrated in this example.'
    },
    {
        path: ':theme/diagram/shapes', component: ShapesDiagramComponent,
        name: 'Shapes',
        category: 'Getting Started', order: '01',
        description: 'This sample illustrates basic built-in shapes, such as basic shapes, flow shapes, and BPMN shapes.'
    },
    {
        path: ':theme/diagram/custom-shapes', component: ComplexShapesDiagramComponent,
        name: 'HTML Shapes',
        category: 'Getting Started', order: '01',
        description: 'This sample demonstrates how to host a HTML element inside a node. In this example, a Gauge control is hosted inside a HTML Node.'
    },
    {
        path: ':theme/diagram/connectors', component: ConnectorDiagramComponent,
        name: 'Connectors', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the data flow in a marketing process using predefined shapes and connectors. Different types of connectors and decorators are used to customize the appearance, path, and direction of the data flow.'
    },
    {
        path: ':theme/diagram/line-routing', component: LineRoutingComponent,
        name: 'Line Routing',
        category: 'Getting Started', order: '01',
        description: 'This sample visualizes the connectors that are automatically re-routing or moving away if any shape found on the connectors path'
    },    
    {
        path: ':theme/diagram/avoid-connector-overlap', component: AvoidOverlapDiagramComponent,
        name: 'Avoid Connector Overlap', type:'new',
        category: 'Getting Started', order: '01',
        description: 'This sample visualizes the connectors that automatically adjust to minimize visual overlap, ensuring clear and distinct representations of connections within the diagram.',
    },
    {
        path: ':theme/diagram/annotations', component: AnnotationDiagramComponent,
        name: 'Annotations', category: 'Getting Started', order: '01',
        description: 'This sample illustrates the competitive environment of a business through five forces chart. The elements of the five force chart is described using nodes and annotations. Customizing the position and appearance of the annotation is illustrated in this example.'
    },
    {
        path: ':theme/diagram/ports', component: PortDiagramComponent,
        name: 'Ports', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the process flow of publishing a book using connection points. Connection points are static points over the shapes that allow creating connections to the shapes. Customizing the size and appearance of the connection points is illustrated in this example.'
    },
    {
        path: ':theme/diagram/swimlane', component: SwimLaneDiagramComponent,
        name: 'Swimlane', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the swimlane structure with diagram elements inside it.'
    },
    {
        path: ':theme/diagram/grouping-and-ordering', component: GroupingAndOrderingComponent,
        name: 'Grouping and Ordering', category: 'Getting Started', order: '01',
        description: 'This sample illustrates how to group, ungroup, and order commands with the diagram.',
        
    },
    {
        path: ':theme/diagram/diagram-events', component: EventsDiagramComponent,
        name: 'Events', category: 'Getting Started', order: '01',
        description: 'This sample visualize the event feature of diagram'
    },
    {
        path: ':theme/diagram/history-manager', component: HistoryManagerDiagramComponent,
        name: 'History Manager', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the hotel booking reservation system and its built with readymade BPMN shapes.'
    },
    {
        path: ':theme/diagram/commands', component: CommandComponent,
        name: 'Commands', category: 'Getting Started', order: '01',
        description: 'This example illustrates the various commands supported in the diagram control.',
        
    },
    {
        path: ':theme/diagram/constraints', component: ConstraintComponent,
        name: 'Constraints', category: 'Getting Started', order: '01',
        description: 'This sample illustrates how node constraints are used to restrict end-users from performing certain operations on nodes and connector constraints are used to restrict end-users from performing certain operation on connectors.',
        

    },
    {
        path: ':theme/diagram/tooltip', component: TooltipDiagramComponent,
        name: 'Tooltip', category: 'Getting Started', order: '01',
        description: 'This sample visualize the tooltip feature of diagram',
    },
    {
        path: ':theme/diagram/symbol-palette', component: SymbolPaletteDiagramComponent,
        name: 'Symbol Palette',
        category: 'Getting Started', order: '01',
        description: 'This example illustrates predefining shapes in a palette that can be easily dragged and dropped into the drawing area. Customizable options of the symbol palette are also illustrated in this example.'
    },

    {
        path: ':theme/diagram/zooming-and-panning', component: ZoomingAndPanning,
        name: 'Zooming and Panning',
        category: 'Interactive Features', order: '02',
        description: 'This sample shows how diagram objects snap to the nearest intersection of gridlines or objects while being dragged or resized.',
        
    },
    {
        path: ':theme/diagram/snapping', component: SnappingComponent,
        name: 'Snapping',
        category: 'Interactive Features', order: '02',
        description: 'This sample illustrates how to zoom and pan in the diagram.',
        
    },
    {
        path: ':theme/diagram/scrolling', component: ScrollingComponent,
        name: 'Scrolling',
        category: 'Interactive Features', order: '02',
        description: 'This example illustrates how to scroll a diagram using vertical and horizontal scrollbars. The scroll limit property helps limit the scrolling area.',
        
    },
    {
        path: ':theme/diagram/drawing-tool', component: DrawingToolDiagramComponent,
        name: 'Drawing Tools',
        category: 'Interactive Features', order: '02',
        description: 'This sample visualizes how to build a diagram interactively using drawing tools. Continuous draw option, snapping, and undo/redo support are enabled to easily draw diagrams. Rulers, gridlines, and snapping options are enabled to easily align objects.'
    },
    {
        path: ':theme/diagram/key-board-functions', component: KeyBoardDiagramComponent,
        name: 'Keyboard Interaction',
        category: 'Interactive Features', order: '02',
        description: 'This sample illustrates interaction with diagram control using shortcut keys. Command Manager support is used to manage keyboard interactions.'
    },
    {
        path: ':theme/diagram/quick-commands', component: UserHandlediagramComponent,
        name: 'User Handles',
        category: 'Interactive Features', order: '02',
        description: 'This sample visualizes a simple flow diagram along with options to execute the frequently used commands using user handles.'
    },
    {
        path: ':theme/diagram/overview', component: OverviewDiagramComponent,
        name: 'Overview Panel',
        category: 'Interactive Features', order: '02',
        description: 'This sample visualizes an organizational structure along with an overview for easily navigating the large organizational structure using Overview Panel.'
    },
    {
        path: ':theme/diagram/organization-chart', component: OrganizationalChartDiagramComponent,
        name: 'Organizational Chart',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample illustrates a simple business management structure that is built from an external data source. Hierarchical tree layout algorithm is used to build organizational charts. Customizing the orientation and structure of the organizational chart is illustrated in this example.'
    },
    {
        path: ':theme/diagram/flowchart-layout', component: FlowchartLayoutDiagramComponent,
        name: 'Flowchart Layout',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample illustrates the flowchart layout algorithm that is used to automatically arrange the flow shapes.'
    },
    {
        path: ':theme/diagram/mind-map', component: MindMapDiagramComponent,
        name: 'Mind Map',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample demonstrates the concept of creativity using mind map layout algorithm. User handles are used to extend the mind map interactively.'
    },
    {
        path: ':theme/diagram/hierarchical-tree', component: HierarchyDiagramComponent,
        name: 'Hierarchical Tree',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample illustrates a simple hierarchical tree that is built from an external data source. Hierarchical tree layout algorithm is used to build hierarchical trees. Customizing the spacing between objects and orientation of the trees is illustrated in this example.'
    },
    {
        path: ':theme/diagram/complex-hierarchical-tree', component: ComplexHierarchicalTreeDiagramComponent,
        name: 'Complex Hierarchical Tree',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample demonstrates a complex hierarchical template that is built from an external data source using complex hierarchical tree algorithm.'
    },
    {
        path: ':theme/diagram/radial-tree', component: RadialTreeDiagramComponent,
        name: 'Radial Tree',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample demonstrates a huge organizational structure using a compact layout model. Radial tree layout algorithm is used to build such a layout.'
    },
   
    {
        path: ':theme/diagram/symmetric-layout', component: SymmetricLayoutDiagramComponent,
        name: 'Symmetric Layout',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample visualizes a simple network template using symmetrical layout algorithm.'
    },
    {
        path: ':theme/diagram/right-to-left-tree', component: RTLTreeDiagramComponent,
        name: 'RTL Tree',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample visualizes the concept of Artificical Intelligence using hierarchical tree layout algorithm'
    },
    {
        path: ':theme/diagram/pert-chart', component: PertChartDiagramComponent,
        name: 'PERT chart',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample visualizes a project development process using Program Evaluation Review Technique (PERT). Complex hierarchical tree layout algorithm is used to automatically arrange the nodes.'
    },
    {
        path: ':theme/diagram/hierarchicallayout-with-multipleroots', component: HierarchicalLayoutWithMultipleRootComponent,
        name: 'Hierarchical Layout with multiple roots',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample illustrates the structure of an Electricity Sector using complex hierarchical layout with multiple roots.',
        
    },
    {
        path: ':theme/diagram/local-data', component: LocalDataDiagramComponent,
        name: 'Local Data',
        category: 'Data Binding', order: '04',
        description: 'This sample visualizes the classifications of species using hierarchical tree layout algorithm. Data Manager support is used to bind data with the diagram.'
    },
    {
        path: ':theme/diagram/remote-data', component: RemoteDataDiagramComponent,
        name: 'Remote Data',
        category: 'Data Binding', order: '04',
        description: 'This sample demonstrates binding remote data with the diagram using the Data Manager support.'
    },
    {
        path: ':theme/diagram/virtualization', component: VirtualizationComponent,
        name: 'Virtualization',
        category: 'Performance', order: '05',
        description: 'This sample demonstrates the default UI virtualization functionality. Scroll the diagram for UI virtualization.'
    },
    {
        path: ':theme/diagram/serialization', component: SerializationDiagramComponent,
        name: 'Serialization',
        category: 'Save and Restore', order: '06',
        description: 'This sample visualizes building diagrams interactively and editing the saved diagrams. Symbol Palette is used to easily build diagrams.'
    },
    {
        path: ':theme/diagram/print-export', component: PrintExportDiagramComponent,
        name: 'Export and Print',
        category: 'Export and Print', order: '07',
        description: 'This sample demonstrates printing and exporting the diagram as images.',
    },
    {
        path: ':theme/diagram/bpmn-editor', component: BPMNShapesDiagramComponent,
        name: 'BPMN Editor', category: 'Use Case Diagram', order: '08',
        description: 'This sample visualizes the hotel booking reservation system and its built with readymade BPMN shapes.'
    },
    {
        path: ':theme/diagram/logic-circuit', component: LogicCircuitComponent,
        name: 'Logic Circuit Diagram',
        category: 'Use Case Diagram', order: '08',
        description: 'This sample visually represents a simple fishbone diagram (Ishikawa). Diagram nodes and annotations are used to define fishbone diagrams. Read-only mode is enabled here.',
    },
    {
        path: ':theme/diagram/uml-activity', component: UmlActivityComponent,
        name: 'UML Activity Diagram', category: 'Use Case Diagram', order: '08',
        description: 'This sample visually represents the hotel booking reservation system. It is built with readymade BPMN shapes.',
    },
    {
        path: ':theme/diagram/uml-sequence-diagram', component: UmlSequenceComponent,
        name: 'UML Sequence Diagram', category: 'Use Case Diagram', order: '08',
        description: 'This sample illustrates an employees leave request sequence using a UML sequence diagram. The shapes for the sequence were designed with the port feature for Diagrams nodes.',
        
    },
    {
        path: ':theme/diagram/uml-Class-diagram', component: UmlClassDiagramComponent,
        name: 'UML Class Diagram', category: 'Use Case Diagram', order: '08',
        description: 'This sample visualizes the class shapes in diagram.',
    },
    {
        path: ':theme/diagram/venn-diagram', component: VennDiagramComponent,
        name: 'Venn Diagram',
        category: 'Real-time Diagrams', order: '09',
        description: 'This sample visually represents the hotel booking reservation system. It is built with readymade BPMN shapes.',
    },
    {
        path: ':theme/diagram/network-diagram', component: NetworkShapesDiagramComponent,
        name: 'Network Diagram', category: 'Use Case Diagram', order: '09',
        description: 'This sample visualizes graphical layout of a network diagram using diagram `Native (SVG)` shapes.',
    },
    {
        path: ':theme/diagram/fishbone-diagram', component: FishboneDiagramComponent,
        name: 'Fishbone Diagram',
        description: 'This sample visually represents a simple fishbone diagram (Ishikawa). Diagram nodes and annotations are used to define fishbone diagrams. Read-only mode is enabled here.',
        category: 'Real-time Diagrams', order: '09'
    },
    {
        path: ':theme/diagram/workflow-editor', component: WorkFlowDiagramComponent,
        name: 'Workflow Diagram', category: 'Real-time Diagrams', order: '09',
        description: 'This sample visualizes the Travel booking reservation system and its built with readymade BPMN shapes.'
    },
    {
        path: ':theme/diagram/data-binding-with-treeview', component: DataBindingWithTreeviewComponent,
        name: 'Data Binding with TreeView',
        description: 'This example illustrates how to create a tree view and a diagram with a datasource. It provides support for selecting, adding, deleting, dragging and dropping, and editing annotations of the nodes during runtime. These actions will be reflected in the corresponding nodes of the tree view component.',
        category: 'Real-time Diagrams', order: '09', 
    },
    {
        path: ':theme/diagram/flow-execution', component: FlowExecutionDiagramComponent,
        name: 'Flow Execution', category: 'Real-time Diagrams', order: '09',
        description: 'This sample visualizes the hotel booking reservation system and its built with readymade BPMN shapes.'
    },
    
   
   
   
   
    
   
   
   

    
    
    
    
   
    
   
];

export const DiagramSampleModule: ModuleWithProviders<any> = RouterModule.forChild(diagramAppRoutes);

    // {
    //     path: ':theme/diagram/crud', component: CRUDDiagramComponent,
    //     name: 'CRUD',
    //     category: 'Data Binding', order: '06',
    //     description: 'This sample visualizes diagram elements created from database with diagram CRUD. Users can read, update, and delete database entities as diagram elements.'
    // },
