import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, Segments, Direction, PathAnnotationModel, OrthogonalSegmentModel, PointPortModel, ShapeAnnotationModel, SnapConstraints, ISelectionChangeEventArgs, Node, FlowShapeModel, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    NodeModel, DecoratorModel, DiagramTools, ConnectorModel, SnapSettingsModel
} from '@syncfusion/ej2-diagrams';
import { ChangeEventArgs } from "@syncfusion/ej2-angular-calendars";
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Sample for Fishbone publics
 */


@Component({
    selector: 'control-content',
    templateUrl: 'flow-execution.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DiagramModule, RadioButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class FlowExecutionDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public snapSettings = { constraints: SnapConstraints.None };

    //Initialize the connectors object with basic properties.
    public createConnector(
        name: string, source: string, target: string, content: string, type?: Segments,
        direction?: Direction, targePort?: string, length?: number): ConnectorModel {

        let connector: ConnectorModel = {};
        connector.id = name;
        connector.sourceID = source;
        connector.targetID = target;
        connector.style = { strokeWidth: 2 };
        let annotation: PathAnnotationModel = {};
        annotation.content = content;
        if (content) {
            annotation.style = { fill: 'white' };
        }
        connector.annotations = [annotation];
        connector.style.strokeColor = '#8D8D8D';
        connector.targetDecorator = {};
        connector.targetDecorator.style = {};
        connector.targetDecorator.style.strokeColor = '#8D8D8D';
        connector.targetDecorator.style.fill = '#8D8D8D';
        if (targePort) {
            connector.targetPortID = targePort;
        }
        let segment: OrthogonalSegmentModel = {};
        if (type) {
            connector.type = type;
            segment.direction = direction;
            segment.type = type;
            segment.length = length;
            connector.segments = [segment];
        }
        return connector;
    }
    
    //Initialize the node object with basic properties.
    public createNodes(
        name: string, offsetX: number, offsetY: number, shape: string, content: string,
        width: number, height: number, ports?: PointPortModel[]): NodeModel {
        let node: NodeModel = {};
        node.id = name;
        node.offsetX = offsetX;
        node.width = 150;
        node.height = 50;
        node.offsetY = offsetY;
        let annotations: ShapeAnnotationModel = {};
        annotations.content = content;
        node.annotations = [annotations];
        node.shape = { type: 'Flow', shape: shape } as FlowShapeModel;
        node.style = { fill: '#FBF6E1', strokeColor: '#E8DFB6', strokeWidth: 2 };
        if (ports) {
            node.ports = ports;
        }
        return node;
    }


    public port1: PointPortModel = { id: 'port1', offset: { x: 0.5, y: 1 } };
    public port: PointPortModel = { id: 'port', offset: { x: 1, y: 0.5 } };

    public nodes: NodeModel[] = [
        this.createNodes('node1', 100, 125, 'Terminator', 'Begin', 100, 35),
        this.createNodes('node2', 300, 125, 'Process', 'Specify collection', 120, 25, [this.port]),
        this.createNodes('node3', 500, 125, 'Decision', 'Particulars \n required?', 100, 50, [this.port1]),
        this.createNodes('node4', 730, 125, 'Process', 'Specify particulars', 90, 25),
        this.createNodes('node5', 500, 225, 'Process', 'Design collection', 100, 25, [this.port]),
        this.createNodes('node6', 500, 320, 'Process', 'Cluster of events', 100, 25),
        this.createNodes('node7', 500, 420, 'Process', 'Start the process', 100, 25),
        this.createNodes('node8', 730, 320, 'Process', 'Record and analyze \n results', 170, 25, [this.port]),
        this.createNodes('node9', 730, 420, 'Terminator', 'End ', 100, 35)
    ];
    public connectors: ConnectorModel[] = [
        this.createConnector('connector1', 'node1', 'node2', ''),
        this.createConnector('connector2', 'node2', 'node3', ''),
        this.createConnector('connector3', 'node3', 'node4', 'Yes'),
        this.createConnector('connector4', 'node3', 'node5', 'No'),
        this.createConnector('connector5', 'node5', 'node6', ''),
        this.createConnector('connector6', 'node6', 'node7', ''),
        this.createConnector('connector7', 'node8', 'node6', ''),
        this.createConnector('connector8', 'node7', 'node9', ''),
        this.createConnector('connector10', 'node4', 'node5', '', 'Orthogonal', 'Bottom', 'port', 220)
    ];

    public highLightedObjects: string[] = [];
    public currentButton: string = 'unhighlightAll';
    public buttonChange(args: ChangeEventArgs): void {
        this.currentButton = (args.event.srcElement as any).defaultValue;
        this.applyChanges((args.event.srcElement as any).defaultValue);
    }
    //Function to apply changes based on selection.
    public applyChanges(id: string): void {
        this.unhighlight();
        switch (id) {
            case 'linksInto':
                this.linkedIn();
                break;
            case 'linksOutOf':
                this.linksOut();
                break;
            case 'linksConnected':
                this.linksConnector();
                break;
            case 'nodesInto':
                this.nodesIn();
                break;
            case 'nodesOutOf':
                this.nodesOut();
                break;
            case 'nodesConnected':
                this.nodesConnect();
                break;
            case 'nodesReachable':
                this.nodeReachable();
                break;
        }
    }
    // Function to display outgoing connectors.
    public linkedIn(): void {
        if (this.diagram.selectedItems.nodes.length) {
            let node: string[] = (this.diagram.selectedItems.nodes[0] as Node).inEdges;
            for (let i: number = 0; i < node.length; i++) {
                let index: number = this.diagram.connectors.indexOf(this.diagram.nameTable[node[i]]);
                this.highLightedObjects.push(node[i]);
                let connector = this.diagram.connectors[index];
                connector.style.strokeColor = '#1413F8';
                connector.targetDecorator.style.strokeColor = '#1413F8';
                connector.targetDecorator.style.fill = '#1413F8';
                this.diagram.dataBind();
            }
        }
    }

    // Function to display outgoing connectors.
    public linksOut(): void {
        if (this.diagram.selectedItems.nodes.length) {
            let node: string[] = (this.diagram.selectedItems.nodes[0] as Node).outEdges;
            for (let i: number = 0; i < node.length; i++) {
                let index: number = this.diagram.connectors.indexOf(this.diagram.nameTable[node[i]]);
                this.highLightedObjects.push(node[i]);
                let connector = this.diagram.connectors[index];
                connector.style.strokeColor = '#1413F8';
                connector.targetDecorator.style.strokeColor = '#1413F8';
                connector.targetDecorator.style.fill = '#1413F8';
                this.diagram.dataBind();
            }
        }
    }
    // Function to display both the incoming and outgoing connectors.
    public linksConnector(): void {
        this.linksOut();
        this.linkedIn();
    }

    // Function to display incoming nodes.
    public nodesIn(): void {
        if (this.diagram.selectedItems.nodes.length) {
            let node: string[] = (this.diagram.selectedItems.nodes[0] as Node).inEdges;
            for (let i: number = 0; i < node.length; i++) {
                let nodeId: string = this.diagram.nameTable[node[i]].sourceID;
                this.highLightedObjects.push(nodeId);
                let index: number = this.diagram.nodes.indexOf(this.diagram.nameTable[nodeId]);
                this.diagram.nodes[index].style.strokeColor = '#1413F8';
                this.diagram.dataBind();
            }
        }
    }

    // Function to display the outgoing nodes.
    public nodesOut(): void {
        if (this.diagram.selectedItems.nodes.length) {
            let node: string[] = (this.diagram.selectedItems.nodes[0] as Node).outEdges;
            for (let i: number = 0; i < node.length; i++) {
                let nodeId: string = this.diagram.nameTable[node[i]].targetID;
                this.highLightedObjects.push(nodeId);
                let index: number = this.diagram.nodes.indexOf(this.diagram.nameTable[nodeId]);
                this.diagram.nodes[index].style.strokeColor = '#1413F8';
                this.diagram.dataBind();
            }
        }
    }

    // Function to display both the incoming and outgoing nodes.
    public nodesConnect(): void {
        this.nodesOut();
        this.nodesIn();
    }

    //Function to display the flow of execution.
    public nodeReachable(): void {
        if (this.diagram.selectedItems.nodes.length) {
            let connectors: string[] = (this.diagram.selectedItems.nodes[0] as Node).outEdges;
            let nodeList: string[] = this.foundNode(connectors, []);
            for (let i: number = 0; i < nodeList.length; i++) {
                let index: number = this.diagram.connectors.indexOf(this.diagram.nameTable[nodeList[i]]);
                this.highLightedObjects.push(nodeList[i]);
                let connector = this.diagram.connectors[index];
                connector.style.strokeColor = '#1413F8';
                connector.targetDecorator.style.strokeColor = '#1413F8';
                connector.targetDecorator.style.fill = '#1413F8';
                this.diagram.dataBind();
            }
        }
    }

    //Function to find the connected nodes.
    public foundNode(list: string[], nodeList: string[]): string[] {
        for (let i: number = 0; i < list.length; i++) {
            let connector: ConnectorModel = this.diagram.nameTable[list[i]];
            if (nodeList.indexOf(connector.id) > -1) {
                break;
            }
            if (!connector.annotations[0] || (connector.annotations[0] && connector.annotations[0].content !== 'No')) {
                nodeList.push(connector.id);
            }
            if (this.diagram.nameTable[connector.targetID].outEdges.length) {
                if (list.indexOf(connector.targetID) === -1) {
                    this.foundNode(this.diagram.nameTable[connector.targetID].outEdges, nodeList);
                }
            }
        }
        return nodeList;
    }

    //Function to unhighlight the highlighted objects.
    public unhighlight(): void {
        for (let i: number = this.highLightedObjects.length - 1; i >= 0; i--) {
            if (this.diagram.nameTable[this.highLightedObjects[i]] instanceof Node) {
                let index: number = this.diagram.nodes.indexOf(this.diagram.nameTable[this.highLightedObjects[i]]);
                this.diagram.nodes[index].style.strokeColor = '#E8DFB6';
                this.diagram.dataBind();
            } else {
                let index: number = this.diagram.connectors.indexOf(this.diagram.nameTable[this.highLightedObjects[i]]);
                let connector = this.diagram.connectors[index];
                connector.style.strokeColor = '#8D8D8D';
                connector.targetDecorator.style.strokeColor = '#8D8D8D';
                connector.targetDecorator.style.fill = '#8D8D8D';
                this.diagram.dataBind();
            }
        }
        this.highLightedObjects = [];
    }

    public selectionChange(arg: ISelectionChangeEventArgs): void {
        this.applyChanges(this.currentButton);
    };
    public created(): void {
        this.diagram.select([this.diagram.nodes[2]])
    }
}