import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    DiagramComponent, OrthogonalSegmentModel, PaletteModel, PortVisibility,
    SnapConstraints, SnapSettingsModel, UmlActivityShapeModel, UmlActivityFlows,
    Diagram, NodeModel, UndoRedo, ConnectorModel, DiagramContextMenu,
    StrokeStyleModel, DecoratorModel, PointModel, SymbolInfo, PointPortModel
} from '@syncfusion/ej2-angular-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { MarginModel } from '@syncfusion/ej2-lineargauge';
Diagram.Inject(UndoRedo, DiagramContextMenu);

/**
 * Default FlowShape sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'uml-activity.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class UmlActivityComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public initialNode: UmlActivityShapeModel = { type: 'UmlActivity', shape: 'InitialNode' };
    public action: UmlActivityShapeModel = { type: 'UmlActivity', shape: 'Action' };
    public forkNode: UmlActivityShapeModel = { type: 'UmlActivity', shape: 'ForkNode' };
    public decision: UmlActivityShapeModel = { type: 'UmlActivity', shape: 'Decision' };
    public mergeNode: UmlActivityShapeModel = { type: 'UmlActivity', shape: 'MergeNode' };
    public joinNode: UmlActivityShapeModel = { type: 'UmlActivity', shape: 'JoinNode' };
    public finalNode: UmlActivityShapeModel = { type: 'UmlActivity', shape: 'FinalNode' };
    public objectFlow: UmlActivityFlows = 'Object';
    public segments1: OrthogonalSegmentModel = [{
        type: 'Orthogonal', length: 20, direction: 'Bottom' },
        { type: 'Orthogonal', length: 50, direction: 'Left' }
    ];
    public segments2: OrthogonalSegmentModel = [
        { type: 'Orthogonal', length: 20, direction: 'Bottom' },
        { type: 'Orthogonal', length: 50, direction: 'Right' }
    ];
    public segments3: OrthogonalSegmentModel = [
        { type: 'Orthogonal', length: 50, direction: 'Bottom' }
    ];
    public segments4: OrthogonalSegmentModel = [
        { type: 'Orthogonal', length: 265, direction: 'Bottom' },
        { type: 'Orthogonal', length: 50, direction: 'Left' }
    ];

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public expandMode: ExpandMode = 'Multiple';
    public diagramCreate(args: Object): void {
        this.addEvents();
    };
    public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };


    public umlActivityShapes: NodeModel[] = [
        { id: 'Action', shape: { type: 'UmlActivity', shape: 'Action' } },
        { id: 'Decision', shape: { type: 'UmlActivity', shape: 'Decision' } },
        { id: 'MergeNode', shape: { type: 'UmlActivity', shape: 'MergeNode' } },
        { id: 'InitialNode', shape: { type: 'UmlActivity', shape: 'InitialNode' } },
        { id: 'FinalNode', shape: { type: 'UmlActivity', shape: 'FinalNode' } },
        { id: 'ForkNode', shape: { type: 'UmlActivity', shape: 'ForkNode' } },
        { id: 'JoinNode', shape: { type: 'UmlActivity', shape: 'JoinNode' } },
        { id: 'TimeEvent', shape: { type: 'UmlActivity', shape: 'TimeEvent' } },
        { id: 'AcceptingEvent', shape: { type: 'UmlActivity', shape: 'AcceptingEvent' } },
        { id: 'SendSignal', shape: { type: 'UmlActivity', shape: 'SendSignal' } },
        { id: 'ReceiveSignal', shape: { type: 'UmlActivity', shape: 'ReceiveSignal' } },
        { id: 'StructuredNode', shape: { type: 'UmlActivity', shape: 'StructuredNode' } },
        { id: 'Note', shape: { type: 'UmlActivity', shape: 'Note' } }
    ];
    //Initialize the flowshapes for the symbol palatte
    public palettes: PaletteModel[] = [
        { id: 'umlActivity', expanded: true, symbols: this.umlActivityShapes, title: 'UML Shapes' },
        { id: 'Connector', expanded: true, symbols: this.getConnectors(), title: 'Connectors' },
    ];
    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
        return { fit: true };
    }
    public getConnectorStyle(dashArrayed?: boolean) {
        let style: StrokeStyleModel = {};
        if (dashArrayed) {
            style = { strokeWidth: 2, strokeColor: '#444', strokeDashArray: '4 4', };
        } else {
            style = { strokeWidth: 2, strokeColor: '#444' };
        }
        return style;
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
            symbol.style.fill = '#444';
        }
        symbol.style.strokeColor = '#444';
        return symbol;
    }

    // initializes connector symbols to the connector palette in the symbol palette
    private getConnectors(): ConnectorModel[] {
        let sourcePoint: PointModel = { x: 0, y: 0 };
        let targetPoint: PointModel = { x: 40, y: 40 };
        let targetDecorator: DecoratorModel = { shape: 'Arrow', style: { fill: '#444', strokeColor: '#444' } }
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

    private addEvents(): void {
        let isMobile: boolean = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            let paletteIcon: HTMLElement = document.getElementById('palette-icon') as HTMLElement;
            if (paletteIcon) {
                paletteIcon.addEventListener('click', this.openPalette, false);
            }
        }
    }
    // custom code start
    private openPalette(): void {
        let paletteSpace: HTMLElement = document.getElementById('palette-space') as HTMLElement;
        let isMobile: boolean = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
                paletteSpace.classList.add('sb-mobile-palette-open');
            } else {
                paletteSpace.classList.remove('sb-mobile-palette-open');
            }
        }
    }
    // custom code end
    //Sets the default values of connector
    public getConnectorDefaults (obj: ConnectorModel): void  {
        if (obj.id.indexOf('connector') !== -1) {
            obj.type = 'Orthogonal'; obj.cornerRadius = 10;
            obj.targetDecorator = { shape: 'OpenArrow', style: { strokeColor: '#444', fill: '#444' } };
        }
    }
    //Sets the default values of node
    public getNodeDefaults (obj: NodeModel): NodeModel  {
        obj.ports = getNodePorts(obj);
        if (obj.ports) {
            for (let i: number = 0; i < obj.ports.length; i++) {
                obj.ports[i].visibility = PortVisibility.Hidden;
            }
        }
        if (obj.id === 'Start' || obj.id === 'node2' || obj.id === 'node9' || obj.id === 'node11') {
            obj.style.fill = '#444';
        }
        obj.style.strokeColor = '#444';
        return obj;
    }
}

function  getNodePorts(obj: NodeModel): PointPortModel[] {
    if (obj.id === 'node2' || obj.id === 'node9') {
        let node2Ports: PointPortModel[] = [
            { id: 'port1', offset: { x: 0.2, y: 1 } },
            { id: 'port2', offset: { x: 0.8, y: 1 } },
            { id: 'port3', offset: { x: 0.2, y: 0 } },
            { id: 'port4', offset: { x: 0.8, y: 0 } },
        ];
        return node2Ports;
    } else {
        let ports: PointPortModel[] = [
            { id: 'portLeft', offset: { x: 0, y: 0.5 } },
            { id: 'portRight', offset: { x: 1, y: 0.5 } },
            { id: 'portBottom', offset: { x: 0.5, y: 1 } },
            { id: 'portTop', offset: { x: 0.5, y: 0 } },
        ];
        return ports;
    }
}
