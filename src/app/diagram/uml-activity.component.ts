/**
* UML Activity sample
*/

// Importing needed dependencies for diagram
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { DiagramComponent, OrthogonalSegmentModel, PaletteModel, PortVisibility,
    SnapConstraints, SnapSettingsModel, UmlActivityShapeModel, UmlActivityFlows,
    Diagram, NodeModel, UndoRedo, ConnectorModel, DiagramContextMenu, StrokeStyleModel,
    DecoratorModel, PointModel, SymbolInfo, PointPortModel, SymbolPaletteModule,
    DiagramModule, UmlActivityShapes, Direction } from '@syncfusion/ej2-angular-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { MarginModel } from '@syncfusion/ej2-lineargauge';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo, DiagramContextMenu);

/**
 * Component for displaying a Symmetric Layout sample.
 * Manages the presentation and behavior of the diagram using Syncfusion's Angular Diagram component.
 */
@Component({
    selector: 'control-content', // Angular component selector
    templateUrl: 'uml-activity.html', // HTML template file for the component
    styleUrls: ['diagram-common.style.css'], // CSS styles specific to the component
    encapsulation: ViewEncapsulation.None,  // No view encapsulation
    standalone: true,  // Indicates it's a standalone component
    imports: [SBActionDescriptionComponent, SymbolPaletteModule, DiagramModule, SBDescriptionComponent] // Importing necessary Angular modules and components
})
/**
 * Represents a diagram component with UML Activity
 */
export class UmlActivityComponent {
    // Reference to the diagram component
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    // Constructor to inject source files
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['diagram-common.style.css'];
    }

    // Function to create Node shapes for UML Activity
    private createUmlNodeShape(shape: UmlActivityShapes): UmlActivityShapeModel {
        return { type: 'UmlActivity', shape: shape };
    }

    // Initializing UML Activity shapes
    public initialNode = this.createUmlNodeShape('InitialNode');
    public action = this.createUmlNodeShape('Action');
    public forkNode = this.createUmlNodeShape('ForkNode');
    public decision = this.createUmlNodeShape('Decision');
    public mergeNode = this.createUmlNodeShape('MergeNode');
    public joinNode = this.createUmlNodeShape('JoinNode');
    public finalNode = this.createUmlNodeShape('FinalNode');

    public objectFlow: UmlActivityFlows = 'Object';

    // Function to create Segment models
    private createSegments(segments: { length: number, direction: Direction }[]): OrthogonalSegmentModel[] {
        return segments.map(segment => ({ type: 'Orthogonal', length: segment.length, direction: segment.direction }));
    }
    // Initializing Segment models
    public segments1 = this.createSegments([{ length: 20, direction: 'Bottom' }, { length: 50, direction: 'Left' }]);
    public segments2 = this.createSegments([{ length: 20, direction: 'Bottom' }, { length: 50, direction: 'Right' }]);
    public segments3 = this.createSegments([{ length: 50, direction: 'Bottom' }]);
    public segments4 = this.createSegments([{ length: 265, direction: 'Bottom' }, { length: 50, direction: 'Left' }]);

    // Snap settings
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    // Expand mode
    public expandMode: ExpandMode = 'Multiple';
    public diagramCreate(args: Object): void {
        // Function to add mobile events
        this.addEvents();
    };

    // Symbol margin
    public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };

    // Initializes the uml activity symbols to the UML Shapes in the symbol palette

    // Function to create Segment models
    private createUmlActivityShape = (id: string, shape: UmlActivityShapes): NodeModel => ({
        id: id,
        shape: { type: 'UmlActivity', shape: shape }
    });

    // Initialize UML activity shapes
    public umlActivityShapes: NodeModel[] = [
        this.createUmlActivityShape('Action', 'Action'),
        this.createUmlActivityShape('Decision', 'Decision'),
        this.createUmlActivityShape('MergeNode', 'MergeNode'),
        this.createUmlActivityShape('InitialNode', 'InitialNode'),
        this.createUmlActivityShape('FinalNode', 'FinalNode'),
        this.createUmlActivityShape('ForkNode', 'ForkNode'),
        this.createUmlActivityShape('JoinNode', 'JoinNode'),
        this.createUmlActivityShape('TimeEvent', 'TimeEvent'),
        this.createUmlActivityShape('AcceptingEvent', 'AcceptingEvent'),
        this.createUmlActivityShape('SendSignal', 'SendSignal'),
        this.createUmlActivityShape('ReceiveSignal', 'ReceiveSignal'),
        this.createUmlActivityShape('StructuredNode', 'StructuredNode'),
        this.createUmlActivityShape('Note', 'Note')
    ];
    //Initialize the flowshapes for the symbol palatte
    public palettes: PaletteModel[] = [
        { id: 'umlActivity', expanded: true, symbols: this.umlActivityShapes, title: 'UML Shapes' },
        { id: 'Connector', expanded: true, symbols: this.getConnectors(), title: 'Connectors' },
    ];
    // Getting symbol info
    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
        return { fit: true };
    }
    // Getting connector style
    public getConnectorStyle(dashArrayed?: boolean): StrokeStyleModel {
        return {
            strokeWidth: 2,
            strokeColor: '#757575',
            strokeDashArray: dashArrayed ? '4 4' : ''
        };
    }

    // create and add ports for node.
    public setPaletteNodeDefaults(symbol: NodeModel): NodeModel {
        if (symbol.id === 'JoinNode') {
            symbol.width = 20; symbol.height = 50;
        } else if (symbol.id === 'ForkNode') {
            symbol.width = 50; symbol.height = 20;
        } else if (symbol.id === 'Decision' || symbol.id === 'MergeNode') {
            symbol.width = 50; symbol.height = 40;
        } else {
            symbol.width = 50; symbol.height = 50;
        }
        if (symbol.id === 'InitialNode' || symbol.id === 'FinalNode' || symbol.id === 'JoinNode' || symbol.id === 'ForkNode') {
            symbol.style.fill = '#757575';
        }
        symbol.style.strokeColor = '#757575';
        return symbol;
    }

    // initializes connector symbols to the connector palette in the symbol palette
    private getConnectors(): ConnectorModel[] {
        let sourcePoint: PointModel = { x: 0, y: 0 };
        let targetPoint: PointModel = { x: 40, y: 40 };
        let targetDecorator: DecoratorModel = { shape: 'Arrow', style: { fill: '#757575', strokeColor: '#757575' } }
        let connectorSymbols: ConnectorModel[] = [
            {
                id: 'Link2', sourcePoint: sourcePoint, targetPoint: targetPoint,
                type: 'Orthogonal', style: this.getConnectorStyle(true), targetDecorator: targetDecorator,
            },
            {
                id: 'Link1', sourcePoint: sourcePoint, targetPoint: targetPoint,
                type: 'Orthogonal', style: this.getConnectorStyle(), targetDecorator: targetDecorator,
            },
            {
                id: 'Link3', sourcePoint: sourcePoint, targetPoint: targetPoint,
                type: 'Straight', style: this.getConnectorStyle(), targetDecorator: targetDecorator,
            }
        ];
        return connectorSymbols;
    }

    // Function to add mobile events
    private addEvents(): void {
        let isMobile: boolean = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            let paletteIcon: HTMLElement = document.getElementById('palette-icon') as HTMLElement;
            if (paletteIcon) {
                paletteIcon.addEventListener('click', this.openPalette, false);
            }
        }
    }
    // Function to open palette
    private openPalette(): void {
        let paletteSpace: HTMLElement = document.getElementById('palette-space') as HTMLElement;
        let isMobile: boolean = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
                // Open palette
                paletteSpace.classList.add('sb-mobile-palette-open');
            } else {
                // Close palette
                paletteSpace.classList.remove('sb-mobile-palette-open');
            }
        }
    }

    //Sets the default values of connector
    public getConnectorDefaults(connector: ConnectorModel): void {
        if (connector.id.indexOf('connector') !== -1) {
            connector.type = 'Orthogonal'; connector.cornerRadius = 10;
            connector.targetDecorator = { shape: 'OpenArrow', style: { strokeColor: '#444', fill: '#444' } };
        }
    }
    //Sets the default values of node
    public getNodeDefaults(node: NodeModel): NodeModel {
        node.ports = getNodePorts(node);
        if (node.ports) {
            for (let i: number = 0; i < node.ports.length; i++) {
                node.ports[i].visibility = PortVisibility.Hidden;
            }
        }
        if (node.id === 'Start' || node.id === 'ForkNode' || node.id === 'JoinNode' || node.id === 'FinalNode') {
            node.style.fill = '#444';
        }
        node.style.strokeColor = '#444';
        return node;
    }
}

// Getting node ports based on the type of node
function getNodePorts(node: NodeModel): PointPortModel[] {
    if (node.id === 'ForkNode' || node.id === 'JoinNode') {
        return [
            { id: 'port1', offset: { x: 0.2, y: 1 } },
            { id: 'port2', offset: { x: 0.8, y: 1 } },
            { id: 'port3', offset: { x: 0.2, y: 0 } },
            { id: 'port4', offset: { x: 0.8, y: 0 } },
        ];
    } else {
        return[
            { id: 'portLeft', offset: { x: 0, y: 0.5 } },
            { id: 'portRight', offset: { x: 1, y: 0.5 } },
            { id: 'portBottom', offset: { x: 0.5, y: 1 } },
            { id: 'portTop', offset: { x: 0.5, y: 0 } },
        ];
    }
}
