import { Component, ViewEncapsulation, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
    DiagramComponent, DiagramModule,
    Node, NodeConstraints, NodeModel, AnnotationConstraints, ConnectorConstraints,
    ConnectorModel, SnapConstraints, IClickEventArgs, IMouseEventArgs, SnapSettingsModel,
    DiagramConstraints
} from '@syncfusion/ej2-angular-diagrams';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Shortest path visualization
 */

@Component({
    selector: 'control-content',
    templateUrl: 'shortest-path.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SwitchModule, SBDescriptionComponent]
})
export class ShortestPathDiagramComponent implements OnInit, OnDestroy {
    @ViewChild('diagram')
    public diagram!: DiagramComponent;
    public constraints: DiagramConstraints = DiagramConstraints.Default &~ DiagramConstraints.UndoRedo;
    // Constants for colors and styles
    private readonly nodeHighlightFill = '#6495ED';
    private readonly nodeHighlightStroke = '#4472C4';
    private readonly nodeDefaultFill = 'white';
    private readonly nodeDefaultStroke = '#333333';
    private readonly nodeErrorFill = '#FF6565';
    private readonly nodeErrorStroke = '#EE3636';
    private readonly connectorHighlightStroke = '#4472C4';
    private readonly connectorDefaultStroke = '#333333';

    // Diagram configuration
    public diagramWidth: string = '100%';
    public diagramHeight: string = '700px';
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    private isDirectedGraph: boolean = true;
    private dashIntervals: Map<string, any> = new Map();
    private graph: Map<string, string[]> = new Map();
    private selectedNode: string = 'A';
    private highlightedNodes: NodeModel[] = [];
    private highlightedConnectors: ConnectorModel[] = [];
    private previousNode: NodeModel | null = null;


    ngOnInit(): void {
        this.buildGraph();
    }

    ngOnDestroy(): void {
        // Clean up intervals
        this.dashIntervals.forEach(interval => clearInterval(interval));
        this.dashIntervals.clear();
    }

    public onDiagramCreated(): void {
        this.diagram.fitToPage();
    }

    private createNode(id: string, x: number, y: number): NodeModel {
        const isSelected = id === 'A';
        return {
            id: id,
            offsetX: x,
            offsetY: y,
            width: 50,
            height: 50,
            constraints: (NodeConstraints.Default | NodeConstraints.Tooltip) & ~NodeConstraints.Select,
            tooltip: {
                openOn: 'Custom',
                relativeMode: 'Object'
            },
            shape: {
                type: 'Basic',
                shape: 'Ellipse'
            },
            style: isSelected ? {
                strokeColor: this.nodeHighlightStroke,
                strokeWidth: 3,
                fill: this.nodeHighlightFill
            } : {
                fill: this.nodeDefaultFill,
            },
            annotations: [{
                content: id,
                constraints: AnnotationConstraints.ReadOnly,
                style: {
                    color: 'black',
                    fontSize: 16
                }
            }]
        };
    }

    public createNodes: NodeModel[] = [
        this.createNode('A', 75, 75),
        this.createNode('B', 384, 300),
        this.createNode('C', 700, 200),
        this.createNode('D', 100, 300),
        this.createNode('E', 825, 20),
        this.createNode('F', 90, 440),
        this.createNode('G', 460, 660),
        this.createNode('H', 270, 530),
        this.createNode('I', 750, 350),
        this.createNode('J', 1000, 450),
        this.createNode('K', 750, 450),
        this.createNode('L', 929, 210),
        this.createNode('X', 420, 100),
        this.createNode('Y', 850, 620)
    ];

    private createConnector(sourceId: string, targetId: string): ConnectorModel {
        return {
            id: `${sourceId}${targetId}`,
            sourceID: sourceId,
            targetID: targetId,
            type: 'Straight',
            style: {
                strokeColor: this.connectorDefaultStroke,
                strokeWidth: 2,
                strokeDashArray: '5,5'
            },
            annotations: [{
                content: '',
                style: {
                    color: 'white',
                    fontSize: 12,
                    bold: true,
                    fill: 'transparent'
                },
                offset: 0.5,
                constraints: AnnotationConstraints.ReadOnly,
                alignment: 'Center',
                width: 20,
                height: 20
            }],
            constraints: ConnectorConstraints.ReadOnly,
            targetDecorator: {
                shape: 'Arrow'
            }
        };
    }

    public createConnectors: ConnectorModel[] = [
        this.createConnector('A', 'B'),
        this.createConnector('A', 'D'),
        this.createConnector('A', 'X'),
        this.createConnector('B', 'D'),
        this.createConnector('B', 'H'),
        this.createConnector('B', 'X'),
        this.createConnector('C', 'L'),
        this.createConnector('C', 'X'),
        this.createConnector('D', 'F'),
        this.createConnector('E', 'X'),
        this.createConnector('G', 'H'),
        this.createConnector('G', 'Y'),
        this.createConnector('H', 'F'),
        this.createConnector('I', 'J'),
        this.createConnector('I', 'K'),
        this.createConnector('I', 'L'),
        this.createConnector('J', 'L'),
        this.createConnector('K', 'Y'),
        this.createConnector('B', 'K'),
        this.createConnector('B', 'C'),
        this.createConnector('G', 'K'),
        this.createConnector('H', 'I')
    ];

    private buildGraph(): void {
        const nodeIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'X', 'Y'];

        // Initialize graph
        nodeIds.forEach(nodeId => {
            this.graph.set(nodeId, []);
        });

        const edges = [
            { from: 'A', to: 'B' }, { from: 'A', to: 'D' }, { from: 'A', to: 'X' },
            { from: 'B', to: 'D' }, { from: 'B', to: 'H' }, { from: 'B', to: 'X' },
            { from: 'B', to: 'C' }, { from: 'B', to: 'K' }, { from: 'C', to: 'L' },
            { from: 'C', to: 'X' }, { from: 'D', to: 'F' }, { from: 'E', to: 'X' },
            { from: 'F', to: 'H' }, { from: 'G', to: 'H' }, { from: 'G', to: 'Y' },
            { from: 'G', to: 'K' }, { from: 'H', to: 'I' }, { from: 'I', to: 'J' },
            { from: 'I', to: 'K' }, { from: 'I', to: 'L' }, { from: 'J', to: 'L' },
            { from: 'K', to: 'Y' }
        ];

        // Build bidirectional adjacency list
        edges.forEach(edge => {
            this.graph.get(edge.from)?.push(edge.to);
            this.graph.get(edge.to)?.push(edge.from);
        });
    }

    public onGraphTypeChanged(args: ChangeEventArgs): void {
        this.isDirectedGraph = args.checked as boolean;

        this.diagram.connectors.forEach(connector => {
            // Update stroke style & decorator
            if (this.isDirectedGraph) {
                connector.targetDecorator!.shape = 'Arrow';
                connector.style!.strokeWidth = 2;
                connector.style!.strokeDashArray = '5,5';
                connector.style!.strokeColor = this.connectorDefaultStroke;
            }
            else {
                connector.targetDecorator!.shape = 'None';
                connector.style!.strokeColor = this.connectorDefaultStroke;
                connector.style!.strokeDashArray = '';
                connector.style!.strokeWidth = 2;
                // Stop animation for undirected graph
                this.removeConnectorDash(connector.id + '_path');
            }
        });

        this.diagram.dataBind();
    }

    public onMouseEnter(args: IMouseEventArgs): void {
        if (args.actualObject && args.actualObject instanceof Node) {
            const hoverNode = args.actualObject as NodeModel;
            this.previousNode = hoverNode;

            if (hoverNode.id !== this.selectedNode) {
                this.removeStepNumbers();
                this.resetStyles();
                const { path, distance } = this.findShortestPath(this.selectedNode, hoverNode.id!);

                if (path.length > 0) {
                    const pathString = path.map(p => this.getNodeLabel(p)).join(" → ");
                    // Update tooltip
                    hoverNode.tooltip!.content = pathString;
                    this.diagram.showTooltip(hoverNode);
                    this.highlightNodes(path);
                    this.addStepNumbersToConnectors(path);
                    this.highlightPath(path);
                }
                else {
                    hoverNode.tooltip!.content = 'No path found';
                    this.diagram.showTooltip(hoverNode);
                    // Show error state
                    hoverNode.style!.fill = this.nodeErrorFill;
                    hoverNode.style!.strokeColor = this.nodeErrorStroke;
                    if (!this.highlightedNodes.some((node: NodeModel) => node.id === hoverNode.id)) {
                        this.highlightedNodes.push(hoverNode);
                    }
                    const rootNode = this.diagram.getObject(this.selectedNode) as NodeModel;
                    if (rootNode) {
                        rootNode.style!.fill = this.nodeErrorFill;
                        rootNode.style!.strokeColor = this.nodeErrorStroke;
                    }
                }
                this.diagram.dataBind();
            }
        }
    }

    public onMouseLeave(args: IMouseEventArgs): void {
        if (this.previousNode) {
            this.diagram.hideTooltip(this.previousNode);

            const selectedNodeObj = this.diagram.getObject(this.selectedNode) as NodeModel;
            if (selectedNodeObj) {
                selectedNodeObj.style!.strokeColor = this.nodeHighlightStroke;
                selectedNodeObj.style!.fill = this.nodeHighlightFill;
                selectedNodeObj.style!.strokeWidth = 4;
            }

            this.resetStyles();
            this.removeStepNumbers();
            this.diagram.dataBind();
        }
    }

    public onNodeClicked(args: IClickEventArgs): void {
        if (args.element && args.element instanceof Node) {
            const clickedNode: NodeModel = args.element as any;

            this.previousSelectedNodeUpdated();
            this.selectedNode = clickedNode.id!;

            clickedNode.style!.strokeColor = this.nodeHighlightStroke;
            clickedNode.style!.strokeWidth = 3;

            this.resetStyles();
            this.removeStepNumbers();
            this.diagram.dataBind();
        }
    }

    private previousSelectedNodeUpdated(): void {
        const previousSelectedNode = this.diagram.nodes.find((node: NodeModel) => node.id === this.selectedNode);
        if (previousSelectedNode) {
            previousSelectedNode.style!.strokeColor = this.nodeDefaultStroke;
            previousSelectedNode.style!.strokeWidth = 2;
            previousSelectedNode.style!.fill = this.nodeDefaultFill;
        }
    }

    private resetStyles(): void {
        // Reset highlighted connectors
        this.highlightedConnectors.forEach(connector => {
            connector.style!.strokeColor = this.connectorDefaultStroke;
            connector.style!.strokeWidth = 2;
            if (this.isDirectedGraph) {
                connector.style!.strokeDashArray = '5,5';
                this.removeMovingDash(connector.id + '_path');
            }
        });
        this.highlightedConnectors = [];

        // Reset highlighted nodes
        this.highlightedNodes.forEach(node => {
            if (node.id !== this.selectedNode) {
                node.style!.fill = this.nodeDefaultFill;
                node.style!.strokeColor = this.nodeDefaultStroke;
                node.style!.strokeWidth = 2;
            }
        });
        this.highlightedNodes = [];
    }

    private getNeighbors(nodeId: string, directed: boolean): string[] {
        if (!directed) {
            // For undirected graph, return all connected nodes
            return this.graph.get(nodeId) || [];
        } else {
            // For directed graph, only return nodes that this node points to
            const neighbors: string[] = [];
            const outgoingConnectors = this.diagram.connectors.filter((connector: ConnectorModel) => connector.sourceID === nodeId);
            outgoingConnectors.forEach(connector => {
                if (connector.targetID) {
                    neighbors.push(connector.targetID);
                }
            });
            return neighbors;
        }
    }

    private findShortestPath(start: string, end: string): { path: string[], distance: number } {
        if (!this.graph.has(start) || !this.graph.has(end)) {
            return { path: [], distance: 0 };
        }

        if (start === end) {
            return { path: [start], distance: 0 };
        }

        const queue: string[] = [start];
        const visited = new Set<string>([start]);
        const previous = new Map<string, string>();
        const distances = new Map<string, number>();
        distances.set(start, 0);

        while (queue.length > 0) {
            const current = queue.shift()!;
            const neighbors = this.getNeighbors(current, this.isDirectedGraph);

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    previous.set(neighbor, current);
                    distances.set(neighbor, distances.get(current)! + 1);
                    queue.push(neighbor);

                    if (neighbor === end) {
                        break;
                    }
                }
            }

            if (visited.has(end)) {
                break;
            }
        }

        const path: string[] = [];
        if (visited.has(end)) {
            let currentNode: string | undefined = end;
            while (currentNode !== undefined) {
                path.unshift(currentNode);
                currentNode = previous.get(currentNode);
            }
        }

        return { path, distance: path.length > 0 ? path.length - 1 : 0 };
    }

    private highlightNodes(path: string[]): void {
        path.forEach(nodeId => {
            const node = this.diagram.getObject(nodeId) as NodeModel;
            if (node) {
                node.style!.fill = this.nodeHighlightFill;
                node.style!.strokeColor = this.nodeHighlightStroke;
                node.style!.strokeWidth = 3;
                this.highlightedNodes.push(node);
            }
        });
    }

    private findConnector(sourceId: string, targetId: string): ConnectorModel | undefined {
        return this.diagram.connectors.find((connector: ConnectorModel) =>
            (connector.sourceID === sourceId && connector.targetID === targetId) ||
            (!this.isDirectedGraph && connector.sourceID === targetId && connector.targetID === sourceId)
        );
    }

    private highlightPath(path: string[]): void {
        for (let i = 0; i < path.length - 1; i++) {
            const connector = this.findConnector(path[i], path[i + 1]);
            if (connector) {
                connector.style!.strokeColor = this.connectorHighlightStroke;
                connector.style!.strokeWidth = 4;
                this.highlightedConnectors.push(connector);

                if (this.isDirectedGraph) {
                    connector.style!.strokeDashArray = '8,4';
                    this.applyMovingDash(connector.id + '_path');
                }
            }
        }
    }

    private addStepNumbersToConnectors(path: string[]): void {
        for (let i = 0; i < path.length - 1; i++) {
            const connector = this.findConnector(path[i], path[i + 1]);
            if (connector && connector.annotations && connector.annotations.length > 0) {
                connector.annotations[0].content = (i + 1).toString();
                connector.annotations[0].style!.fill = this.nodeHighlightStroke;
            }
        }
    }

    private removeStepNumbers(): void {
        this.diagram.connectors.forEach(connector => {
            if (connector.annotations && connector.annotations.length > 0) {
                connector.annotations[0].content = '';
                connector.annotations[0].style!.fill = 'transparent';
            }
        });
    }

    private getNodeLabel(nodeId: string): string {
        const node = this.diagram.nodes.find(n => n.id === nodeId);
        return node?.annotations?.[0]?.content ?? nodeId;
    }

    private applyMovingDash(pathId: string): void {
        // Wait for the path to exist in the DOM
        const applyAnimationInterval: any = setInterval(() => {
            const element = document.getElementById(pathId);
            if (element) {
                let offset = 0;
                // Store the interval reference for this pathId
                const interval = setInterval(() => {
                    offset -= 1;
                    element.setAttribute('stroke-dashoffset', offset.toString());
                }, 50);
                this.dashIntervals.set(pathId, interval);
                clearInterval(applyAnimationInterval);
            }
        }, 10);
    }

    private removeMovingDash(pathId: string): void {
        // Wait for the path to exist in the DOM for cleanup
        const removeAnimationInterval: any = setInterval(() => {
            const element = document.getElementById(pathId);
            if (element) {
                // Clear dash animation interval if it exists
                const interval = this.dashIntervals.get(pathId);
                if (interval) {
                    clearInterval(interval);
                    this.dashIntervals.delete(pathId);
                }
                element.removeAttribute('stroke-dashoffset');
                clearInterval(removeAnimationInterval);
            }
        }, 10);
    }

    private removeConnectorDash(pathId: string): void {
        const element = document.querySelector(`[id='${pathId}']`) as SVGPathElement;
        if (element) {
            const interval = this.dashIntervals.get(pathId);
            if (interval) {
                clearInterval(interval);
                this.dashIntervals.delete(pathId);
            }
            element.removeAttribute('stroke-dashoffset');
        }
    }
}
