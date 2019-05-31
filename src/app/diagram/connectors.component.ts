import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    DiagramComponent, NodeModel, HierarchicalTree, ConnectorModel, StackPanel, TextElement, Segments,
    ConnectorConstraints, NodeConstraints, PointPortModel, PortVisibility, BasicShapeModel, LayoutModel
} from '@syncfusion/ej2-angular-diagrams';
import { Diagram, SnapConstraints, SnapSettingsModel, randomId } from '@syncfusion/ej2-diagrams';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
Diagram.Inject(HierarchicalTree);


/**
 * Sample for Connectors
 */

@Component({
    selector: 'control-content',
    templateUrl: 'connectors.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})

export class ConnectorDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;

    public layout: LayoutModel = {
        type: 'HierarchicalTree', orientation: 'LeftToRight',
        verticalSpacing: 75, margin: { left: 90, right: 0, top: 0, bottom: 0 }
    }

    public shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle', cornerRadius: 10 };
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public getNodeDefaults: Function = this.nodeDefaults.bind(this);
    public getConnectorDefaults: Function = this.connectorDefaults.bind(this);

    public setNodeTemplate: Function = this.nodeTemplate.bind(this);

    ngOnInit(): void {
        document.getElementById('appearance').onclick = this.documentClick.bind(this);
    }

    private nodeDefaults(node: NodeModel, diagram: Diagram): NodeModel {
        let obj: NodeModel = {};
        if (node.id !== 'node1') {
            //Set ports
            obj.ports = this.getPorts(node);
        }
        if (node.id !== 'node6') {
            obj.width = 80;
            obj.style = { strokeWidth: 2, strokeColor: '#6F409F' };
            obj.height = 35;
        }
        return obj;
    };

    private connectorDefaults(obj: ConnectorModel): void {
        obj.type = 'Bezier';
        obj.style.strokeColor = '#6f409f';
        obj.style.strokeWidth = 2;
        obj.targetDecorator = { style: { strokeColor: '#6f409f', fill: '#6f409f' } };
    };

    private nodeTemplate(node: NodeModel): StackPanel {
        if (node.id === 'node6') {
            let canvas: StackPanel = new StackPanel();
            canvas.id = randomId();
            canvas.children = [
                this.getTextElement('Events', '#a6a1e0'),
                this.getTextElement('Emails', '#db8ec9'),
                this.getTextElement('Calls', '#db8ec9'),
                this.getTextElement('Smart Contents', '#db8ec9')
            ];
            canvas.style.strokeWidth = 0;
            canvas.style.fill = '#e6e0eb';
            return canvas;
        }
        return null;
    };

    private getPorts(obj: NodeModel): PointPortModel[] {
        if (obj.id === 'node2') {
            let node2Ports: PointPortModel[] = [
                { id: 'port1', offset: { x: 1, y: 0.25 }, visibility: PortVisibility.Hidden },
                { id: 'port2', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
                { id: 'port3', offset: { x: 1, y: 0.75 }, visibility: PortVisibility.Hidden }
            ];
            return node2Ports;
        } else if (obj.id === 'node6') {
            let node6Ports: PointPortModel[] = [
                { id: 'port4', offset: { x: 0, y: 0.46 }, visibility: PortVisibility.Hidden },
                { id: 'port5', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
                { id: 'port6', offset: { x: 0, y: 0.54 }, visibility: PortVisibility.Hidden }
            ];
            return node6Ports;
        } else {
            let ports: PointPortModel[] = [
                { id: 'portIn', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
                { id: 'portOut', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
            ];
            return ports;
        }
    }

    private getTextElement(text: string, color: string): TextElement {
        let textElement: TextElement = new TextElement();
        textElement.id = randomId();
        textElement.width = 80;
        textElement.height = 35;
        textElement.content = text;
        textElement.style.fill = '#6f409f';
        textElement.style.color = 'white';
        textElement.style.strokeColor = '#6f409f';
        textElement.cornerRadius = 5;
        textElement.margin = { top: 10, bottom: 10, left: 10, right: 10 };
        textElement.relativeMode = 'Object';
        return textElement;
    }

    public onChangeLock(args: CheckBoxChangeEventArgs): void {
        for (let i: number = 0; i < this.diagram.nodes.length; i++) {
            let node: NodeModel = this.diagram.nodes[i];
            if (args.checked) {
                node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
            } else {
                node.constraints = NodeConstraints.Default & ~(NodeConstraints.ReadOnly);
            }
            this.diagram.dataBind();
        }
        for (let i: number = 0; i < this.diagram.connectors.length; i++) {
            let connector: ConnectorModel = this.diagram.connectors[i];
            if (args.checked) {
                connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
            } else {
                connector.constraints = ConnectorConstraints.Default & ~(ConnectorConstraints.ReadOnly);
            }
            this.diagram.dataBind();
        }
    }
    private documentClick(args: MouseEvent): void {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style') {
            switch (target.id) {
                case 'straightConnector':
                    this.applyConnectorStyle(false, false, false, 'Straight', 1);
                    break;
                case 'orthogonalConnector':
                    this.applyConnectorStyle(false, false, false, 'Orthogonal', 1);
                    break;
                case 'bezierConnector':
                    this.applyConnectorStyle(false, false, false, 'Bezier', 1);
                    break;
                case 'straightConnectorWithStroke':
                    this.applyConnectorStyle(false, false, false, 'Straight');
                    break;
                case 'orthogonalConnectorWithStroke':
                    this.applyConnectorStyle(false, false, false, 'Orthogonal');
                    break;
                case 'bezierConnectorWithStroke':
                    this.applyConnectorStyle(false, false, false, 'Bezier');
                    break;
                case 'straightConnectorWithDasharray':
                    this.applyConnectorStyle(true, false, false, 'Straight');
                    break;
                case 'orthogonalConnectorWithDasharray':
                    this.applyConnectorStyle(true, false, false, 'Orthogonal');
                    break;
                case 'bezierConnectorWithDasharray':
                    this.applyConnectorStyle(true, false, false, 'Bezier');
                    break;
                case 'cornerRadious':
                    this.applyConnectorStyle(false, false, true, 'Orthogonal');
                    break;
                case 'sourceDecorator':
                    this.applyConnectorStyle(false, true, false, 'Straight');
                    break;
                case 'sourceDecoratorWithDasharray':
                    this.applyConnectorStyle(true, true, false, 'Straight');
                    break;
            }
            // custom code start
            target.classList.add('e-selected-style');
            // custom code end
        }
    };
    private applyConnectorStyle(dashedLine: boolean, sourceDec: boolean, isRounded: boolean, type: Segments, strokeWidth?: number): void {
        for (let i: number = 0; i < this.diagram.connectors.length; i++) {
            this.diagram.connectors[i].style.strokeWidth = strokeWidth ? strokeWidth : 2;
            this.diagram.connectors[i].type = type;
            this.diagram.connectors[i].cornerRadius = isRounded ? 5 : 0;
            this.diagram.connectors[i].style.strokeDashArray = dashedLine ? '5,5' : '';
            if (sourceDec) {
                this.diagram.connectors[i].sourceDecorator = {
                    style: {
                        strokeColor: '#6f409f',
                        fill: '#6f409f', strokeWidth: 2
                    }, shape: 'Circle'
                };
            } else {
                this.diagram.connectors[i].sourceDecorator = { shape: 'None' };
            }
            this.diagram.connectors[i].targetDecorator = {
                style: {
                    strokeColor: '#6f409f',
                    fill: '#6f409f', strokeWidth: 2
                }, shape: 'Arrow'
            };
            this.diagram.dataBind();
        }
    }
}