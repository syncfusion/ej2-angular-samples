/**
 * Sample for Keyboard functions
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { BasicShapeModel, DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, UndoRedo, Node, DataBinding, Keys, KeyModifiers, DiagramContextMenu,
    DiagramTools, HierarchicalTree, CommandManagerModel, ConnectorModel, LayoutModel, SnapSettingsModel
} from '@syncfusion/ej2-diagrams';
import { SnapConstraints } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { keyBoardData } from './diagram-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo, DiagramContextMenu, HierarchicalTree, DataBinding);

export interface DataInfo {
    [key: string]: string;
}

let shape: BasicShapeModel = { type: 'Basic', shape: 'Ellipse', cornerRadius: 10 };

@Component({
    selector: 'control-content',
    templateUrl: 'key-board-functions.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})

export class KeyBoardDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    // Sets the default properties for nodes
    public nodeDefaults(node: NodeModel): NodeModel {
        if (!node.children) {
            node.width = 70;
            node.height = 70;
            node.shape = shape;
        }
        return node;
    };
    // Data binding settings for the diagram
    public data: Object = {
        id: 'id', parentId: 'ancestor', dataSource: new DataManager(keyBoardData),
        doBinding: (nodeModel: NodeModel, data: DataInfo) => {
            // Set annotations and styles for each node based on the data
            nodeModel.annotations = [{ content: data.id, style: { color: 'white' } }];
            nodeModel.style = { strokeColor: 'transparent', fill: data.fill };
        }
    };
    public commandManager: CommandManagerModel = this.getCommandManagerSettings();
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public layout: LayoutModel = { type: 'HierarchicalTree' };

    //Custom command for Diagraming elements.
    public getCommandManagerSettings(): CommandManagerModel {   
    let commandManager: CommandManagerModel = {
        commands: [{
            name: 'customGroup',
            canExecute: (): boolean => {
                if (this.diagram.selectedItems.nodes.length > 0 || this.diagram.selectedItems.connectors.length > 0) {
                    return true;
                }
                return false;
            },
            execute: (): void => {
                this.diagram.group();
            },
            gesture: {
                key: Keys.G,
                keyModifiers: KeyModifiers.Control
            }
        },
        {
            name: 'customUnGroup',
            canExecute: (): boolean => {
                if (this.diagram.selectedItems.nodes[0].children) {
                    return true;
                }
                return false;
            },
            execute: (): void => {
                this.diagram.unGroup();
            },
            gesture: {
                key: Keys.U,
                keyModifiers: KeyModifiers.Control
            }
        },
        {
            name: 'navigationDown',
            canExecute: (): boolean => {
                return true;
            },
            execute: (): void => {
                this.navigateLevels(true);
            },
            gesture: { key: Keys.Down },
        },
        {
            name: 'navigationUp',
            canExecute: (): boolean => {
                return true;
            },
            execute: (): void => {
                this.navigateLevels(false);
            },
            gesture: { key: Keys.Up },
        },
        {
            name: 'navigationLeft',
            canExecute: (): boolean => {
                return true;
            },
            execute: (): void => {
                this.navigateToSiblings(true);
            },
            gesture: { key: Keys.Right },
        },
        {
            name: 'navigationRight',
            canExecute: (): boolean => {
                return true;
            },
            execute: (): void => {
                this.navigateToSiblings(false);
            },
            gesture: { key: Keys.Left },
        }]
    };
    return commandManager;
}

    //Navigation for Child Node or parent Node
    private navigateLevels(isParent: boolean): void {
        let selectedNode: Node = this.diagram.selectedItems.nodes[0] as Node;
        if (selectedNode) {
            let connectorId: string = isParent ? selectedNode.outEdges[0] : selectedNode.inEdges[0];
            let altNode: NodeModel[] = isParent ? this.getNode(connectorId, false) : this.getNode(connectorId, true);
            this.selectNode(altNode);
        }
    }
    //Navigate to left or right Sibling Node 
    private navigateToSiblings(isRightSibling: boolean): void {
        let selectedNode: Node = this.diagram.selectedItems.nodes[0] as Node;
        if (selectedNode) {
            let connectorId: string = selectedNode.inEdges[0];
            let altConnectorId: string = '';
            let parentNode: NodeModel = this.getNode(connectorId, true)[0];
            if (parentNode) {
                for (let i: number = 0; i < (parentNode as Node).outEdges.length; i++) {
                    if ((parentNode as Node).outEdges[i] === connectorId) {
                        altConnectorId = isRightSibling ? (parentNode as Node).outEdges[i + 1] : (parentNode as Node).outEdges[i - 1];
                    }
                }
                let sibling: NodeModel[] = this.getNode(altConnectorId, false);
                this.selectNode(sibling);
            }
        }
    }
    // Get node elements by connector ID
    private getNode(name: string, isParent: boolean): NodeModel[] {
        let node: NodeModel[] = [];
        let connector: ConnectorModel = this.diagram.getObject(name) as ConnectorModel;
        if (connector) {
            node.push(this.diagram.getObject(isParent ? (connector.sourceID) : (connector.targetID)) as NodeModel);
        }
        return node;
    }
    // Select and highlight the specified node
    private selectNode(node: NodeModel[]): void {
        if (node && node.length > 0) {
            this.diagram.clearSelection();
            this.diagram.select(node);
        }
    }
}
