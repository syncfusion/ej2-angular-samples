import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  DiagramComponent, Diagram, ConnectorModel, Connector, Node, HierarchicalTree,
  DataBinding, PointPortModel, randomId, SnapSettingsModel, PortVisibility, MindMap,
  UserHandleModel, SelectorConstraints, ToolBase, MouseEventArgs, SnapConstraints, NodeModel,
  ISelectionChangeEventArgs, DiagramTools, NodeConstraints, SelectorModel, MarginModel,
  VerticalAlignment, HorizontalAlignment, Side, TextModel, ConnectorConstraints, PointPort
} from '@syncfusion/ej2-angular-diagrams';

import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';
Diagram.Inject(DataBinding, MindMap, HierarchicalTree);

/**
 * Sample for Mind Map Tree
 */
@Component({
  selector: 'control-content',
  templateUrl: 'mind-map.html',
  styleUrls: ['diagram-style.css'],
  encapsulation: ViewEncapsulation.None
})
export class MindMapDiagramComponent {
  @ViewChild('diagram') public diagram: DiagramComponent;
  public tool: DiagramTools = DiagramTools.SingleSelect |
    DiagramTools.MultipleSelect;

  public items: DataManager = new DataManager((Data as any).mindMap);
  public data: Object = { id: 'id', parentId: 'parentId', dataManager: this.items, root: '1' };
  public layout: Object = {
    type: 'MindMap', horizontalSpacing: 50,
    getBranch: (node: NodeModel, nodes: NodeModel[]) => {
      return ((node as Node).data as EmployeeInfo).branch;
    }
  };

  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
  public create(args: Object): void {
    this.diagram.fitToPage();
  }

  public getNodeDefaults: Function = this.nodeDefaults.bind(this);
  public getConnDefaults: Function = this.getConnectorDefaults.bind(this);
  public getCustomTool: Function = this.getTool.bind(this);
  //Tool for Userhandles.
  public getTool(action: string): ToolBase {
    let tool: ToolBase;
    if (action === 'leftHandle') {
      let leftTool: LeftExtendTool = new LeftExtendTool(this.diagram.commandHandler);
      leftTool.diagram = this.diagram;
      return leftTool;
    } else if (action === 'rightHandle') {
      let rightTool: RightExtendTool = new RightExtendTool(this.diagram.commandHandler);
      rightTool.diagram = this.diagram;
      return rightTool;
    } else if (action === 'delete') {
      let deleteTool: DeleteClick = new DeleteClick(this.diagram.commandHandler);
      deleteTool.diagram = this.diagram;
      return deleteTool;
    }
    return tool;
  }

  private nodeDefaults(obj: NodeModel): NodeModel {
    obj.constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
    let empInfo: EmployeeInfo = obj.data as EmployeeInfo;
    if (empInfo.branch === 'Root' || empInfo.branch === 'Left' || empInfo.branch === 'Right') {
      obj.shape = { type: 'Basic', shape: 'Ellipse' };
      obj.borderColor = 'black';
      obj.style = { fill: empInfo.branch === 'Root' ? '#E74C3C' : '#F39C12', strokeColor: 'none', strokeWidth: 2 };
      obj.annotations = [
        { content: empInfo.Label, margin: { left: 10, right: 10, top: 10, bottom: 10 }, style: { color: 'white' } }
      ];
    } else {
      let color: string = empInfo.branch === 'subRight' ? '#8E44AD' : '#3498DB';
      obj.shape = { type: 'Basic', shape: 'Rectangle' };
      obj.style = { fill: color, strokeWidth: 0 };
      obj.minWidth = 100;
      obj.height = 4;
      obj.annotations = [{ content: empInfo.Label, offset: { x: 0.5, y: 0 }, verticalAlignment: 'Bottom' }];
      (obj.shape as TextModel).margin = { left: 0, right: 0, top: 0, bottom: 0 };
    }
    let port: PointPortModel[] = this.getPort();
    for (let i: number = 0; i < port.length; i++) {
      obj.ports.push(new PointPort(obj, 'ports', port[i], true));
    }
    return obj;
  }

  //sets connector default value
  private getConnectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
    let sourceNode: Node = diagram.getObject(connector.sourceID) as Node;
    let targetNode: Node = diagram.getObject(connector.targetID) as Node;
    let empInfo: EmployeeInfo = targetNode.data as EmployeeInfo;
    connector.type = 'Bezier';
    connector.targetDecorator = { shape: 'None' };
    connector.constraints &= ~ConnectorConstraints.Select;
    if (empInfo.branch === 'Right' || empInfo.branch === 'subRight') {
      connector.sourcePortID = sourceNode.ports[0].id;
      connector.targetPortID = targetNode.ports[1].id;
      connector.style = { strokeWidth: 5, strokeColor: '#8E44AD' };
    } else if (empInfo.branch === 'Left' || empInfo.branch === 'subLeft') {
      connector.sourcePortID = sourceNode.ports[1].id;
      connector.targetPortID = targetNode.ports[0].id;
      connector.style = { strokeWidth: 5, strokeColor: '#3498DB' };
    }
    return connector;
  }

  public handle: UserHandleModel[] = [
    {
      name: 'leftHandle', visible: true, backgroundColor: 'black', offset: 1, side: 'Left', pathColor: 'white',
      pathData: 'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z',
      margin: { top: 0, bottom: 0, left: 0, right: 10 }, horizontalAlignment: 'Left', verticalAlignment: 'Top'
    },
    {
      name: 'delete', side: 'Top', horizontalAlignment: 'Center', verticalAlignment: 'Center',
      pathData:
        'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76' +
        '96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04' +
        '91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z',
      margin: { top: 0, bottom: 10, left: 0, right: 0 }, offset: 0.5, pathColor: 'white'
    },
    {
      name: 'rightHandle', offset: 1, horizontalAlignment: 'Right', verticalAlignment: 'Top', pathColor: 'white',
      pathData: 'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z',
      side: 'Right', backgroundColor: 'black', margin: { top: 0, bottom: 0, left: 10, right: 0 }
    }
  ];

  public selectedItems: SelectorModel = { constraints: SelectorConstraints.UserHandle, userHandles: this.handle };
  public selectionChange(arg: ISelectionChangeEventArgs): void {
    if (arg.state === 'Changing') {
      if (arg.newValue[0] instanceof Node) {
        let empInfo: EmployeeInfo = ((arg.newValue[0] as Node).data as EmployeeInfo);
        for (let handle of this.diagram.selectedItems.userHandles) {
          handle.visible = true;
        }
        if (empInfo.branch === 'Left' || empInfo.branch === 'subLeft') {
          this.hideUserHandle('leftHandle');
          this.changeUserHandlePosition('leftHandle');
        } else if (empInfo.branch === 'Right' || empInfo.branch === 'subRight') {
          this.hideUserHandle('rightHandle');
          this.changeUserHandlePosition('rightHandle');
        } else if (empInfo.branch === 'Root') {
          this.hideUserHandle('delete');
        }
      } else {
        this.hideUserHandle('leftHandle');
        this.hideUserHandle('rightHandle');
        this.hideUserHandle('delete');
      }
    }
  }

  //hide the require userhandle.
  public hideUserHandle(name: string): void {
    for (let handle of this.diagram.selectedItems.userHandles) {
      if (handle.name === name) {
        handle.visible = false;
      }
    }
  }

  //Change the Position of the UserHandle.
  private changeUserHandlePosition(change: string): void {
    for (let handle of this.diagram.selectedItems.userHandles) {
      if (handle.name === 'delete' && change === 'leftHandle') {
        this.applyHandle(handle, 'Left', 1, { top: 0, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');
      } else if (handle.name === 'delete' && change === 'rightHandle') {
        this.applyHandle(handle, 'Right', 1, { top: 0, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
      }
    }
  }
  //set the value for UserHandle element.
  private applyHandle(
    handle: UserHandleModel, side: Side, offset: number, margin: MarginModel,
    halignment: HorizontalAlignment, valignment: VerticalAlignment): void {
    handle.side = side;
    handle.offset = offset;
    handle.margin = margin;
    handle.horizontalAlignment = halignment;
    handle.verticalAlignment = valignment;
  }

  private getPort(): PointPortModel[] {
    let port: PointPortModel[] = [
      { id: 'port1', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden, style: { fill: 'black' } },
      { id: 'port2', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden, style: { fill: 'black' } }
    ];
    return port;
  }
}

function addNode(): NodeModel {
  let obj: NodeModel = {};
  obj.id = randomId();
  obj.data = {};
  (obj.data as EmployeeInfo).Label = 'Node';
  return obj;
}

function addConnector(source: NodeModel, target: NodeModel): ConnectorModel {
  let connector: ConnectorModel = {};
  connector.id = randomId();
  connector.sourceID = source.id;
  connector.targetID = target.id;
  return connector;
}

class LeftExtendTool extends ToolBase {
  public diagram: Diagram = null;
  //mouseDown event
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  //mouseUp event
  public mouseUp(args: MouseEventArgs): void {
    if (this.inAction) {
      let selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          let node: NodeModel = addNode();
          let empInfo: EmployeeInfo = (selectedObject[0].data as EmployeeInfo);
          if (empInfo.branch === 'Root') {
            (node.data as EmployeeInfo).branch = 'Right';
          } else if (empInfo.branch === 'Right' || empInfo.branch === 'subRight') {
            (node.data as EmployeeInfo).branch = 'subRight';
          }
          let connector: ConnectorModel = addConnector(selectedObject[0], node);
          this.diagram.clearSelection();
          let nd: Node = this.diagram.add(node) as Node;
          this.diagram.add(connector);
          this.diagram.doLayout();
          this.diagram.bringIntoView(nd.wrapper.bounds);
          this.diagram.startTextEdit(nd);
        }
      }
    }
  }
}

class RightExtendTool extends ToolBase {
  public diagram: Diagram = null;
  //mouseDown event
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  //mouseUp event
  public mouseUp(args: MouseEventArgs): void {
    if (this.inAction) {
      let selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          let node: NodeModel = addNode();
          let empInfo: EmployeeInfo = (selectedObject[0].data as EmployeeInfo);
          if (empInfo.branch === 'Root') {
            (node.data as EmployeeInfo).branch = 'Left';
          } else if (empInfo.branch === 'Left' || empInfo.branch === 'subLeft') {
            (node.data as EmployeeInfo).branch = 'subLeft';
          }
          let connector: ConnectorModel = addConnector(selectedObject[0], node);
          this.diagram.clearSelection();
          let nd: Node = this.diagram.add(node) as Node;
          this.diagram.add(connector);
          this.diagram.doLayout();
          this.diagram.bringIntoView(nd.wrapper.bounds);
          this.diagram.startTextEdit(nd);
        }
      }
    }
  }
}

class DeleteClick extends ToolBase {
  public diagram: Diagram = null;
  //mouseDown event
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  //mouseup event
  public mouseUp(args: MouseEventArgs): void {
    if (this.inAction) {
      let selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          let node: Node = selectedObject[0] as Node;
          this.removeSubChild(node);
        }
        this.diagram.doLayout();
      }
    }
  }
  //Remove the subchild Elements
  private removeSubChild(node: Node): void {
    for (let i: number = node.outEdges.length - 1; i >= 0; i--) {
      let connector: Connector = this.diagram.getObject(node.outEdges[i]) as Connector;
      let childNode: Node = this.diagram.getObject(connector.targetID) as Node;
      if (childNode.outEdges.length > 0) {
        this.removeSubChild(childNode);
      } else {
        this.diagram.remove(childNode);
      }
    }
    this.diagram.remove(node);
  }
}

export interface EmployeeInfo {
  branch: string;
  color: string;
  Left: string;
  Right: string;
  Root: string;
  Label: string;
}
