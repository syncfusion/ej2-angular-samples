/**
 * Sample for Keyboard functions
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { BasicShapeModel, DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, UndoRedo, Node, DataBinding, Keys, KeyModifiers, DiagramContextMenu,
    DiagramTools, HierarchicalTree, CommandManagerModel, ConnectorModel, LayoutModel, SnapSettingsModel
} from '@syncfusion/ej2-diagrams';
import { SnapConstraints } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';
Diagram.Inject(UndoRedo, DiagramContextMenu, HierarchicalTree, DataBinding);

export interface DataInfo {
    [key: string]: string;
}

let shape: BasicShapeModel = { type: 'Basic', shape: 'Ellipse', cornerRadius: 10 };

@Component({
    selector: 'control-content',
    templateUrl: 'key-board-functions.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})

export class KeyBoardDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;

    public nodeDefaults(node: NodeModel): NodeModel {
        if (!node.children) {
            node.width = 70;
            node.height = 70;
            node.shape = shape;
        }
        return node;
    };
    public data: Object = {
        id: 'id', parentId: 'ancestor', dataManager: new DataManager((Data as any).keyBoardData),
        doBinding: (nodeModel: NodeModel, data: DataInfo) => {
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
        let node: Node = this.diagram.selectedItems.nodes[0] as Node;
        if (node) {
            let connectorId: string = isParent ? node.outEdges[0] : node.inEdges[0];
            let altNode: NodeModel[] = isParent ? this.getNode(connectorId, false) : this.getNode(connectorId, true);
            this.selectNode(altNode);
        }
    }
    //Navigate to left or right Sibling Node 
    private navigateToSiblings(isRightSibling: boolean): void {
        let child: Node = this.diagram.selectedItems.nodes[0] as Node;
        if (child) {
            let connectorId: string = child.inEdges[0];
            let altConnectorId: string = '';
            let parent: NodeModel[] = this.getNode(connectorId, true);
            if (parent && parent.length > 0) {
                for (let i: number = 0; i < (parent[0] as Node).outEdges.length; i++) {
                    if ((parent[0] as Node).outEdges[i] === connectorId) {
                        altConnectorId = isRightSibling ? (parent[0] as Node).outEdges[i + 1] : (parent[0] as Node).outEdges[i - 1];
                    }
                }
                let sibling: NodeModel[] = this.getNode(altConnectorId, false);
                this.selectNode(sibling);
            }
        }
    }
    //Get node elements
    private getNode(name: string, isParent: boolean): NodeModel[] {
        let node: NodeModel[] = [];
        let connector: ConnectorModel = this.diagram.getObject(name) as ConnectorModel;
        if (connector) {
            node.push(this.diagram.getObject(isParent ? (connector.sourceID) : (connector.targetID)) as NodeModel);
        }
        return node;
    }
    //draw selector.
    private selectNode(node: NodeModel[]): void {
        if (node && node.length > 0) {
            this.diagram.clearSelection();
            this.diagram.select(node);
        }
    }
}
