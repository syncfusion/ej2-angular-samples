/**
 * Diagram Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { NumericTextBoxModule, ColorPickerModule, UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';

import { DiagramAllModule, SymbolPaletteAllModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';

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
import { SymmetricLayoutDiagramComponent } from './symmetric-layout.component';
import { ComplexHierarchicalTreeDiagramComponent } from './complex-hierarchical-tree.component';

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


export const diagramAppRoutes: Object[] = [
    {
        path: ':theme/diagram/default-functionalities', component: FlowDiagramComponent,
        name: 'Default Functionalities', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/diagram/shapes', component: ShapesDiagramComponent,
        name: 'Shapes',
        category: 'Getting Started', order: '01',
        description: 'This sample illustrates basic built-in shapes, such as basic shapes, flow shapes, and BPMN shapes.'
    },
    {
        path: ':theme/diagram/nodes', component: NodeDiagramComponent,
        name: 'Nodes', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the different stages of a software development life cycle using a circular flow diagram. ' +
        'Customizing the appearance of the nodes is illustrated in this example.'
    },
    {
        path: ':theme/diagram/connectors', component: ConnectorDiagramComponent,
        name: 'Connectors', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the data flow in a marketing process using predefined shapes and connectors. ' +
        'Different types of connectors and decorators are used to customize the appearance, path, and direction of the data flow.'
    },
    {
        path: ':theme/diagram/annotations', component: AnnotationDiagramComponent,
        name: 'Annotations', category: 'Getting Started', order: '01',
        description: 'This sample illustrates the competitive environment of a business through five forces chart. ' +
        'The elements of the five force chart is described using nodes and annotations. Customizing the position and appearance ' +
        'of the annotation is illustrated in this example.'
    },
    {
        path: ':theme/diagram/ports', component: PortDiagramComponent,
        name: 'Ports', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the process flow of publishing a book using connection points. ' +
        'Connection points are static points over the shapes that allow creating connections to the shapes. ' +
        'Customizing the size and appearance of the connection points is illustrated in this example.'
    },
    {
        path: ':theme/diagram/swimlane', component: SwimLaneDiagramComponent,
        name: 'Swimlane', category: 'Getting Started', order: '01', type: 'new',
        description: 'This sample visualizes the swimlane structure with diagram elements inside it.'
    },
    {
        path: ':theme/diagram/diagram-events', component: EventsDiagramComponent, type: 'new',
        name: 'Events', category: 'Getting Started', order: '01',
        description: 'This sample visualize the event feature of diagram'
    },
    {
        path: ':theme/diagram/tooltip', component: TooltipDiagramComponent, type: 'new',
        name: 'Tooltip', category: 'Getting Started', order: '01',
        description: 'This sample visualize the tooltip feature of diagram'
    },
    {
        path: ':theme/diagram/history-manager', component: HistoryManagerDiagramComponent, type: 'new',
        name: 'History Manager', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the hotel booking reservation system and its built with readymade BPMN shapes.'
    },
    {
        path: ':theme/diagram/flow-execution', component: FlowExecutionDiagramComponent, type: 'new',
        name: 'Flow Execution', category: 'Getting Started', order: '01',
        description: 'This sample visualizes the hotel booking reservation system and its built with readymade BPMN shapes.'
    },
    {
        path: ':theme/diagram/custom-shapes', component: ComplexShapesDiagramComponent,
        name: 'Complex Shapes',
        category: 'Getting Started', order: '01',
        description: 'This sample demonstrates how to host a HTML element inside a node. In this example, ' +
        'a Gauge control is hosted inside a HTML Node.'
    },
    {
        path: ':theme/diagram/bpmn-editor', component: BPMNShapesDiagramComponent,
        name: 'BPMN Editor', category: 'Use Case Diagram', order: '02',
        description: 'This sample visualizes the hotel booking reservation system and its built with readymade BPMN shapes.'
    },
    {
        path: ':theme/diagram/logic-circuit', component: LogicCircuitComponent,
        name: 'Logic Circuit Diagram',
        category: 'Use Case Diagram', order: '02',
        description: 'This sample visually represents a simple fishbone diagram (Ishikawa).'
        + ' Diagram nodes and annotations are used to define fishbone diagrams. Read-only mode is enabled here.',
    },
    {
        path: ':theme/diagram/uml-activity', component: UmlActivityComponent,
        name: 'UML Activity Diagram', category: 'Use Case Diagram', order: '02',
        description: 'This sample visually represents the hotel booking reservation system.'
        + 'It is built with readymade BPMN shapes.',
    },
    {
        path: ':theme/diagram/network-diagram', component: NetworkShapesDiagramComponent,
        name: 'Network Diagram', category: 'Use Case Diagram', order: '02',
        description: 'This sample visualizes graphical layout of a network diagram using diagram `Native (SVG)` shapes.',
    },
    {
        path: ':theme/diagram/uml-Class-diagram', component: UmlClassDiagramComponent,
        name: 'UML Class Diagram', category: 'Use Case Diagram', order: '02',
        description: 'This sample visualizes the class shapes in diagram.'
    },
    {
        path: ':theme/diagram/hierarchical-tree', component: HierarchyDiagramComponent,
        name: 'Hierarchical Tree',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample illustrates a simple hierarchical tree that is built from an external data source. ' +
        'Hierarchical tree layout algorithm is used to build hierarchical trees. Customizing the spacing between objects ' +
        'and orientation of the trees is illustrated in this example.'
    },
    {
        path: ':theme/diagram/organization-chart', component: OrganizationalChartDiagramComponent,
        name: 'Organizational Chart',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample illustrates a simple business management structure that is built ' +
        'from an external data source. Hierarchical tree layout algorithm is used to build organizational charts. ' +
        'Customizing the orientation and structure of the organizational chart is illustrated in this example.'
    },
    {
        path: ':theme/diagram/radial-tree', component: RadialTreeDiagramComponent,
        name: 'Radial Tree',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample demonstrates a huge organizational structure using a compact ' +
        'layout model. Radial tree layout algorithm is used to build such a layout.'
    },
    {
        path: ':theme/diagram/mind-map', component: MindMapDiagramComponent,
        name: 'Mind Map',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample demonstrates the concept of creativity using mind map layout ' +
        'algorithm. User handles are used to extend the mind map interactively.'
    },
    {
        path: ':theme/diagram/symmetric-layout', component: SymmetricLayoutDiagramComponent,
        name: 'Symmetric Layout',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample visualizes a simple network template using symmetrical layout algorithm.'
    },
    {
        path: ':theme/diagram/complex-hierarchical-tree', component: ComplexHierarchicalTreeDiagramComponent,
        name: 'Complex Hierarchical Tree',
        category: 'Automatic Layouts', order: '03',
        description: 'This sample demonstrates a complex hierarchical template that is built from an external data ' +
        'source using complex hierarchical tree algorithm.'
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
        description: 'This sample visualizes a project development process using Program Evaluation Review Technique (PERT). ' +
        'Complex hierarchical tree layout algorithm is used to automatically arrange the nodes.'
    },
    {
        path: ':theme/diagram/drawing-tool', component: DrawingToolDiagramComponent,
        name: 'Drawing Tools',
        category: 'User Interaction', order: '04',
        description: 'This sample visualizes how to build a diagram interactively using drawing tools. ' +
        'Continuous draw option, snapping, and undo/redo support are enabled to easily draw diagrams. Rulers, ' +
        'gridlines, and snapping options are enabled to easily align objects.'
    },
    {
        path: ':theme/diagram/key-board-functions', component: KeyBoardDiagramComponent,
        name: 'Keyboard Interaction',
        category: 'User Interaction', order: '04',
        description: 'This sample illustrates interaction with diagram control using shortcut keys. ' +
        'Command Manager support is used to manage keyboard interactions.'
    },
    {
        path: ':theme/diagram/quick-commands', component: UserHandlediagramComponent,
        name: 'User Handles',
        category: 'User Interaction', order: '04',
        description: 'This sample visualizes a simple flow diagram along with options to ' +
        'execute the frequently used commands using user handles.'
    },
    {
        path: ':theme/diagram/symbol-palette', component: SymbolPaletteDiagramComponent,
        name: 'Symbol Palette',
        category: 'User Interaction', order: '04',
        description: 'This example illustrates predefining shapes in a palette that can be easily ' +
        'dragged and dropped into the drawing area. Customizable options of the symbol palette are also illustrated in this example.'
    },
    {
        path: ':theme/diagram/overview', component: OverviewDiagramComponent,
        name: 'Overview Panel',
        category: 'User Interaction', order: '04',
        description: 'This sample visualizes an organizational structure along with an overview for ' +
        'easily navigating the large organizational structure using Overview Panel.'
    },
    {
        path: ':theme/diagram/serialization', component: SerializationDiagramComponent,
        name: 'Serialization',
        category: 'Print and Export', order: '05',
        description: 'This sample visualizes building diagrams interactively and editing the saved diagrams. ' +
        'Symbol Palette is used to easily build diagrams.'
    },
    {
        path: ':theme/diagram/print-export', component: PrintExportDiagramComponent,
        name: 'Print and Export',
        category: 'Print and Export', order: '05',
        description: 'This sample demonstrates printing and exporting the diagram as images.',
    },
    {
        path: ':theme/diagram/local-data', component: LocalDataDiagramComponent,
        name: 'Local Data',
        category: 'Data Binding', order: '06',
        description: 'This sample visualizes the classifications of species using hierarchical tree layout algorithm. ' +
        'Data Manager support is used to bind data with the diagram.'
    },
    {
        path: ':theme/diagram/remote-data', component: RemoteDataDiagramComponent,
        name: 'Remote Data',
        category: 'Data Binding', order: '06',
        description: 'This sample demonstrates binding remote data with the diagram using the Data Manager support.'
    },
    {
        path: ':theme/diagram/crud', component: CRUDDiagramComponent,
        name: 'CRUD',
        category: 'Data Binding', order: '06',
        description: 'This sample visualizes diagram elements created from database with diagram CRUD. Users can read, update, and delete database entities as diagram elements.'
    },
    {
        path: ':theme/diagram/venn-diagram', component: VennDiagramComponent,
        name: 'Venn Diagram',
        category: 'Static Diagram', order: '07',
        description: 'This sample visually represents the hotel booking reservation system. It is built with readymade BPMN shapes.',
    },
    {
        path: ':theme/diagram/fishbone-diagram', component: FishboneDiagramComponent,
        name: 'Fishbone Diagram',
        description: 'This sample visually represents a simple fishbone diagram (Ishikawa). Diagram nodes and ' +
        'annotations are used to define fishbone diagrams. Read-only mode is enabled here.',
        category: 'Static Diagram', order: '07'
    }
];

export const diagramRouter: ModuleWithProviders = RouterModule.forChild(diagramAppRoutes);
let declarations: Type<Object>[] = [FlowDiagramComponent, ShapesDiagramComponent, NodeDiagramComponent,
    ConnectorDiagramComponent, AnnotationDiagramComponent, PortDiagramComponent, HistoryManagerDiagramComponent,
    ComplexShapesDiagramComponent, DrawingToolDiagramComponent, KeyBoardDiagramComponent,
    UserHandlediagramComponent, SymbolPaletteDiagramComponent, OverviewDiagramComponent,
    SerializationDiagramComponent, PrintExportDiagramComponent, FlowExecutionDiagramComponent,
    HierarchyDiagramComponent, OrganizationalChartDiagramComponent, RadialTreeDiagramComponent,
    MindMapDiagramComponent, SymmetricLayoutDiagramComponent, ComplexHierarchicalTreeDiagramComponent,
    LocalDataDiagramComponent, RemoteDataDiagramComponent, VennDiagramComponent, RTLTreeDiagramComponent,
    PertChartDiagramComponent, BPMNShapesDiagramComponent, FishboneDiagramComponent, LogicCircuitComponent,
    UmlActivityComponent, NetworkShapesDiagramComponent, CRUDDiagramComponent, UmlClassDiagramComponent, SwimLaneDiagramComponent,
    TooltipDiagramComponent, EventsDiagramComponent

];
@NgModule({
    imports: [diagramRouter, DiagramAllModule, SymbolPaletteAllModule, OverviewAllModule, ButtonModule,
        ColorPickerModule, CheckBoxModule, ToolbarModule, DropDownButtonModule, UploaderModule, DropDownListAllModule, ListViewAllModule,
        DialogAllModule, TextBoxModule, RadioButtonModule,
        MultiSelectModule, NumericTextBoxModule, SharedModule],
    exports: [],
    declarations: declarations,
    providers: [DiagramAllModule]
})
export class DiagramSampleModule {

}
