import { Component, Inject, ViewChild } from '@angular/core';
import {
  DiagramComponent, DiagramModule, NodeModel, ConnectorModel, SymbolPaletteModule, GridlinesModel, IScrollChangeEventArgs, IDragEnterEventArgs, UserHandleModel, Side, MarginModel, HorizontalAlignment, VerticalAlignment,
  PortVisibility, FileFormats, Connector, IExportOptions, Node, DiagramTools, DataBindingService, PrintAndExportService, FlowchartLayoutService, MindMapService, UndoRedoService, SelectorConstraints
} from '@syncfusion/ej2-angular-diagrams';
import { ToolbarModule, ClickEventArgs, MenuComponent, MenuModule, ToolbarComponent } from '@syncfusion/ej2-angular-navigations';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent, ButtonModule, FabModule } from '@syncfusion/ej2-angular-buttons';
import { UploaderModule, InputEventArgs } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownButtonComponent, DropDownButtonModule, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { data, menuItems, zoomMenuItems } from './mindmap-datasource';
import { convertTextToMindMap } from './ai-mindmap';
import { getConnectorDefaults } from './utilitymethods';
import { NodeConstraints, randomId, SnapConstraints } from "@syncfusion/ej2-angular-diagrams";
import { BasicShapeModel, ISelectionChangeEventArgs, PointPort, UserHandleEventsArgs } from "@syncfusion/ej2-angular-diagrams";

export interface MindMapData {
  id: string;
  parentId: string;
  Label: string;
  branch: string;
  fill: string;
  strokeColor: string;
  orientation: string;
  level: number;
}

export function getPort() {
  var port =
    [{
      id: 'leftPort', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden,
      style: { fill: 'black' }
    },
    {
      id: 'rightPort', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden,
      style: { fill: 'black' }
    },
    {
      id: 'topPort', offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Hidden,
      style: { fill: 'black' }
    },
    {
      id: 'bottomPort', offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Hidden,
      style: { fill: 'black' }
    }
    ];
  return port;
}

@Component({
  selector: 'app-smart-mindmap',
  standalone: true,
  imports: [DiagramModule, SymbolPaletteModule, ToolbarModule, ButtonModule, FabModule, UploaderModule, MenuModule, DialogModule, DropDownButtonModule, TextBoxModule],
  providers: [DataBindingService, PrintAndExportService, FlowchartLayoutService, MindMapService, UndoRedoService],
  templateUrl: './smart-mindmap.component.html',
  styleUrl: './smart-mindmap.component.css'
})
export class SmartMindmapComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-smart-mindmap.component.html',
      'smart-mindmap.component.css',
      'ai-mindmap.ts'
    ];
  }
  @ViewChild('diagram', { static: true }) public diagram!: DiagramComponent;
  @ViewChild('dialog', { static: true }) public dialog!: DialogComponent;
  @ViewChild('msgBtn1', { static: true }) public msgBtn1!: ButtonComponent;
  @ViewChild('msgBtn2', { static: true }) public msgBtn2!: ButtonComponent;
  @ViewChild('msgBtn3', { static: true }) public msgBtn3!: ButtonComponent;
  @ViewChild('textBox', { static: true }) public textBox!: TextBoxComponent;
  @ViewChild('sendButton', { static: true }) public sendButton!: ButtonComponent;
  @ViewChild('toolbarObj', { static: true }) public toolbarObj!: ToolbarComponent;
  @ViewChild('menu', { static: true }) public menu!: MenuComponent;
  public asyncSettings: Object = {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  };
  public zoomMenuItems: any = zoomMenuItems;
  public gridlines: GridlinesModel = {
    lineColor: '#e0e0e0',
    lineIntervals: [
      1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
    ]
  };
  public zoomContent: any;
  public diagramTools: any = DiagramTools;
  public diagramToolDefaults: any = DiagramTools.Default;
  public items = new DataManager(data, new Query().take(7));
  public leftarrow = 'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z';
  public rightarrow = 'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z';
  public devareicon = 'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76' +
    '96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04' +
    '91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z';
  public leftuserhandle = this.setUserHandle('leftHandle', this.leftarrow, 'Left', 0.5, { top: 10, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');
  public rightuserhandle = this.setUserHandle('rightHandle', this.rightarrow, 'Right', 0.5, { top: 10, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
  public devareuserhandle = this.setUserHandle('devare', this.devareicon, 'Top', 0.5, { top: 0, bottom: 0, left: 0, right: 0 }, 'Center', 'Center');
  public handle: UserHandleModel[] = [this.leftuserhandle, this.rightuserhandle, this.devareuserhandle];
  public selectedItems: any = { constraints: SelectorConstraints.UserHandle, userHandles: this.handle };
  public menuItems = menuItems;
  public getConnectorDefaults = getConnectorDefaults;


  ngOnInit(): void {
    if (this.diagram) {
      document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && document.activeElement === (this.textBox as any).element.nativeElement) {
          if ((this.textBox as any).value !== '') {
            (this.dialog as any).hide();
            convertTextToMindMap((this.textBox as any).value, this.diagram);
          }
        }
      });
      if (this.diagram.scrollSettings.currentZoom)
        this.zoomContent = Math.round(this.diagram.scrollSettings.currentZoom * 100) + ' %'
    }
  }

  public getBranch(node: Node) {
    if (node.addInfo) {
      var addInfo = node.addInfo;
      return (addInfo as any).orientation.toString();
    }
    return 'Left';
  }

  dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj instanceof Node) {
      let oWidth: number = obj.width;
      let oHeight: number = obj.height;
      let ratio: number = 100 / obj.width;
      obj.width = 100;
      obj.height *= ratio;
      obj.offsetX += (obj.width - oWidth) / 2;
      obj.offsetY += (obj.height - oHeight) / 2;
      obj.style = { fill: '#357BD2', strokeColor: 'white' };
    }
  }

  showDialog() {
    this.dialog.show();
  }

  onSendClick() {
    this.dialog.hide();
    convertTextToMindMap((this.textBox as any).value, this.diagram);
  }

  onBtnClick(msg: any) {
    this.dialog.hide();
    convertTextToMindMap(msg, this.diagram);
  }

  onScrollChange(args: IScrollChangeEventArgs) {
    if (args.panState !== 'Start') {
      let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
      zoomCurrentValue.content = Math.round(this.diagram.scrollSettings.currentZoom! * 100) + ' %';
    }
  }

  setUserHandle(name: string, pathData: string, side: Side, offset: number, margin: MarginModel, halignment: HorizontalAlignment, valignment: VerticalAlignment) {
    var userhandle: UserHandleModel = {
      name: name,
      pathData: pathData,
      backgroundColor: 'black',
      pathColor: 'white',
      side: side,
      offset: offset,
      margin: margin,
      horizontalAlignment: halignment,
      verticalAlignment: valignment,
    };
    return userhandle;
  }

  onUploadSuccess(args: any) {
    let file = args.file;
    let rawFile = file.rawFile;
    let reader = new FileReader();
    reader.readAsText(rawFile);
    reader.onloadend = this.loadDiagram;
  }

  onHideNodeClick() {
    var node1 = document.getElementById('shortcutDiv') as HTMLElement;
    node1.style.visibility = node1.style.visibility === "hidden" ? node1.style.visibility = "visible" : node1.style.visibility = "hidden";
    (this.menu.items[3] as any).items[1].iconCss = node1.style.visibility === "hidden" ? '' : 'sf-icon-check-tick';
    this.diagram.dataBind();
  }
  onTextBoxChange(args: InputEventArgs) {
    if (args.value !== '') {
      this.sendButton.disabled = false;
    } else {
      this.sendButton.disabled = true;
    }
  }

  // utilitymethods

  public workingData = [
    { id: "1", Label: "Business Planning", parentId: "", branch: "Root", fill: "#D0ECFF", hasChild: true, level: 0, strokeColor: "#D0ECFF", orientation: "Root" },
    { id: "2", Label: "Expectation", parentId: "1", branch: "Left", fill: "#C4F2E8", hasChild: true, level: 1, strokeColor: "#C4F2E8", orientation: "Left" },
    { id: "3", Label: "Requirements", parentId: "1", branch: "Right", fill: "#F7E0B3", hasChild: true, level: 1, strokeColor: "#F7E0B3", orientation: "Right" },
    { id: "4", Label: "Marketing", parentId: "1", branch: "Left", fill: "#E5FEE4", hasChild: true, level: 1, strokeColor: "#E5FEE4", orientation: "Left" },
    { id: "5", Label: "Budgets", parentId: "1", branch: "Right", fill: "#E9D4F1", hasChild: true, level: 1, strokeColor: "#E9D4F1", orientation: "Right" },
    { id: "6", Label: "Situation in Market", parentId: "1", branch: "Left", fill: "#90C8C2", hasChild: true, level: 1, strokeColor: "#90C8C2", orientation: "Left" },
    { id: "7", Label: "Product Sales", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "8", Label: "Strategy", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "9", Label: "Contacts", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "10", Label: "Customer Groups", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "11", Label: "Branding", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "12", Label: "Advertising", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "13", Label: "Competitors", parentId: "6", branch: "SubLeft", fill: "#90C8C2", hasChild: false, level: 2, strokeColor: "#90C8C2", orientation: "SubLeft" },
    { id: "14", Label: "Location", parentId: "6", branch: "SubLeft", fill: "#90C8C2", hasChild: false, level: 2, strokeColor: "#90C8C2", orientation: "SubLeft" },
    { id: "15", Label: "Director", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "16", Label: "Accounts Department", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "17", Label: "Administration", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "18", Label: "Development", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "19", Label: "Estimation", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" },
    { id: "20", Label: "Profit", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" },
    { id: "21", Label: "Funds", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" }
  ];
  pushWorkingData(diagram: DiagramComponent) {
    this.workingData = [];
    for (let i = 0; i < diagram.nodes.length; i++) {
      let node: any = diagram.nodes[i];
      let nodeData: any = {
        id: node.id,
        Label: node.annotations ? node.annotations[0].content : 'Node',
        fill: node!.style.fill,
        branch: node.addInfo.orientation,
        strokeColor: node.style.strokeColor,
        parentId: node.data.parentId,
        level: node.addInfo.level,
        orientation: node.addInfo!.orientation,
        hasChild: false,
      };
      this.workingData.push(nodeData);
    }
    // Create a Set of parentIds to quickly check which ids have children
    const parentIds = new Set(this.workingData.map(item => item.parentId).filter(id => id !== null));

    // Iterate over the data array and set hasChild to true if id is in parentIds
    this.workingData.forEach(item => {
      if (parentIds.has(item.id)) {
        item.hasChild = true;
      }
    });
  }
  public lastFillIndex = 0;
  public fillColorCode = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];
  public borderColorCode = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];


  public index = 1;

  addSibilingChild() {
    var selectedNode: any = (this.diagram as any).selectedItems.nodes[0];
    if (selectedNode.data.branch !== 'Root') {
      var selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
      var orientation_3 = selectedNodeOrientation;
      var connector1: ConnectorModel = this.getConnector(this.diagram.connectors, selectedNode.inEdges[0]) as ConnectorModel;
      this.diagram.startGroupAction();
      var mindmapData: any = this.getMindMapShape(this.getNode(this.diagram.nodes as NodeModel[], connector1.sourceID as string) as NodeModel);
      var node = mindmapData.node;
      this.index = this.index + 1;
      node.id = this.index.toString();
      if (node.addInfo) {
        node.addInfo.orientation = orientation_3;
      }
      else {
        node.addInfo = { 'orientation': orientation_3 };
      }
      var nodeData = {
        id: node.id,
        Label: 'Node',
        fill: node.style.fill,
        branch: orientation_3,
        strokeColor: node.style.strokeColor,
        parentId: (selectedNode.data! as MindMapData).id,
        level: node.addInfo.level,
        orientation: node.addInfo.orientation,
        hasChild: false,
      };
      node.data = {
        id: node.id,
        Label: 'Node',
        fill: node.style.fill,
        strokeColor: node.style.strokeColor,
        orientation: node.addInfo.orientation,
        branch: orientation_3,
        parentId: (selectedNode.data! as MindMapData).id,
        level: node.addInfo.level,
        hasChild: false,
      };
      var tempData = this.workingData.filter(
        (a) => a.id === selectedNode.data.id
      );
      tempData[0].hasChild = true;
      this.workingData.push(nodeData);
      this.diagram.add(node);
      var connector = this.setConnectorDefault(orientation_3, mindmapData.connector, connector1.sourceID as string, node.id);
      this.diagram.add(connector);
      var node1: any = this.getNode(this.diagram.nodes, node.id);
      this.diagram.doLayout();
      this.diagram.endGroupAction();
      this.diagram.select([node1]);
    }
  }

  public getMindMapShape(parentNode: NodeModel) {
    var sss = {};
    var node = {};
    var connector: ConnectorModel = {};
    var addInfo = parentNode.addInfo;
    node = {
      minWidth: 100, maxWidth: 100, shape: { type: 'Basic', shape: 'Rectangle' },
      annotations: [{ content: '' }],
      style: { fill: '#000000', strokeColor: '#000000' },
      addInfo: { level: (addInfo as any).level + 1 },
      offsetX: 200, offsetY: 200
    };
    connector = { type: 'Bezier', style: { strokeColor: '#000000' } };
    if ((addInfo as any).level < 1) {
      (node as Node).style.fill = this.fillColorCode[this.lastFillIndex];
      (node as Node).style.strokeColor = this.borderColorCode[this.lastFillIndex];
      ;
      if (this.lastFillIndex + 1 >= this.fillColorCode.length) {
        this.lastFillIndex = 0;
      }
      else {
        this.lastFillIndex++;
      }
    }
    else {
      (node as Node).style.strokeColor = (node as Node).style.fill = (parentNode as Node).style.fill;
    }
    connector.type = 'Bezier';
    (connector as Connector).style.strokeColor = (node as Node).style.fill;
    connector.targetDecorator = { shape: 'None' };
    (node as Node).constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
    (node as Node).ports = [
      { id: 'leftPort', offset: { x: 0, y: 0.5 } },
      { id: 'rightPort', offset: { x: 1, y: 0.5 } },
      { id: 'topPort', offset: { x: 0.5, y: 0 } },
      { id: 'bottomPort', offset: { x: 0.5, y: 1 } }];
    (sss as any).node = node;
    (sss as any).connector = connector;
    return sss;
  }

  addNode(orientation: string, label?: string, canSelect?: boolean) {
    var selectedNode: any = (this.diagram as any).selectedItems.nodes[0];
    if (selectedNode.data.branch !== 'Root') {
      var selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
      orientation = selectedNodeOrientation;
    }
    this.diagram.startGroupAction();
    var mindmapData: any = this.getMindMapShape(selectedNode);
    var node = mindmapData.node;
    this.index = this.index + 1;
    node.id = this.index.toString();
    if (node.addInfo) {
      node.addInfo.orientation = orientation;
    }
    else {
      node.addInfo = { 'orientation': orientation };
    }
    var nodeData = {
      id: node.id,
      Label: label ? label : "Node",
      fill: node.style.fill,
      branch: orientation,
      strokeColor: node.style.strokeColor,
      parentId: selectedNode.data.id,
      level: node.addInfo.level,
      orientation: node.addInfo.orientation,
      hasChild: false,
    };
    node.data = {
      id: node.id,
      Label: label ? label : "Node",
      fill: node.style.fill,
      strokeColor: node.style.strokeColor,
      orientation: node.addInfo.orientation,
      branch: orientation,
      parentId: selectedNode.data.id,
      level: node.addInfo.level,
      hasChild: false,
    };
    var tempData = this.workingData.filter(
      (a) => a.id === selectedNode.data.id
    );
    tempData[0].hasChild = true;
    this.workingData.push(nodeData);
    this.diagram.add(node);
    var connector = this.setConnectorDefault(orientation, mindmapData.connector, selectedNode.id, node.id);
    this.diagram.add(connector);
    var node1: any = this.getNode(this.diagram.nodes, node.id);
    this.diagram.doLayout();
    this.diagram.endGroupAction();
    if (!canSelect) {
      this.diagram.select([node1]);
    }
  }

  setConnectorDefault(orientation: string, connector: Connector, sourceID: string, targetID: string) {
    connector.id = 'connector' + randomId();
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    connector.sourcePortID = 'rightPort';
    connector.targetPortID = 'leftPort';
    if (orientation === 'Right') {
      connector.sourcePortID = 'leftPort';
      connector.targetPortID = 'rightPort';
    }
    connector.style.strokeWidth = 3;
    return connector;
  }

  removeSubChild(node: Node, diagram: DiagramComponent) {
    // Process outgoing edges
    for (let i = node.outEdges.length - 1; i >= 0; i--) {
      const connector: ConnectorModel = this.getConnector(diagram.connectors, node.outEdges[i]) as ConnectorModel;
      const childNode: Node = this.getNode(diagram.nodes, connector.targetID as string) as Node;

      if (childNode && childNode.outEdges.length > 0) {
        this.removeSubChild(childNode, diagram);
      } else {
        for (let x = this.workingData.length - 1; x >= 0; x--) {
          if (this.workingData[x].id === (childNode?.data as MindMapData).id) {
            this.workingData.splice(x, 1);
          }
        }
        diagram.remove(childNode);
      }
    }

    // Process incoming edges
    for (let j = node.inEdges.length - 1; j >= 0; j--) {
      const connector: ConnectorModel = this.getConnector(diagram.connectors, node.inEdges[j]) as ConnectorModel;
      const childNode: Node = this.getNode(diagram.nodes, connector.sourceID as string) as Node;
      let index = childNode.outEdges.indexOf(connector.id as string);

      if (childNode.outEdges.length > 1 && index === 0) {
        index = childNode.outEdges.length;
      }

      if (index > 0) {
        const node1 = childNode.outEdges[index - 1];
        const connector1 = diagram.getObject(node1);
        const node2 = this.getNode(diagram.nodes, (connector1 as Connector).targetID);
        diagram.select([node2] as NodeModel[]);
      } else {
        diagram.select([childNode]);
      }
    }

    // Remove the node from workingData
    for (let x = this.workingData.length - 1; x >= 0; x--) {
      if (this.workingData[x].id === (node.data as MindMapData).id) {
        this.workingData.splice(x, 1);
      }
    }

    // Remove the node from the diagram
    diagram.remove(node);
  }

  getConnector(connectors: ConnectorModel[], name: string) {
    for (var i = 0; i < connectors.length; i++) {
      if (connectors[i].id === name) {
        return connectors[i];
      }
    }
    return null;
  };
  getNode(nodes: NodeModel[], name: string) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === name) {
        return nodes[i];
      }
    }
    return null;
  };
  //hide the require userhandle.
  hideUserHandle(name: string) {
    for (let i: number = 0; i < (this.diagram as any).selectedItems.userHandles.length; i++) {
      var handle = (this.diagram as any).selectedItems.userHandles[i];
      if (handle.name === name) {
        handle.visible = false;
      }
    }
  }


  //set the value for UserHandle element
  applyHandle(handle: UserHandleModel, side: Side, offset: number, margin: MarginModel, halignment: HorizontalAlignment, valignment: VerticalAlignment) {
    handle.side = side;
    handle.offset = offset;
    handle.margin = margin;
    handle.horizontalAlignment = halignment;
    handle.verticalAlignment = valignment;
  }
  //Change the Position of the UserHandle.
  changeUserHandlePosition(change: string) {
    for (var i: number = 0; i < (this.diagram as any).selectedItems.userHandles.length; i++) {
      var handle = (this.diagram as any).selectedItems.userHandles[i];
      if (handle.name === 'devare' && change === 'leftHandle') {
        this.applyHandle(handle, 'Left', 1, { top: 0, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');

      } else if (handle.name === 'devare' && change === 'rightHandle') {
        this.applyHandle(handle, 'Right', 1, { top: 0, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
      }
    }
  }

  getOrientation() {
    var leftChildCount = 0;
    var rightChildCount = 0;
    var orientation;
    if ((this.diagram as any).selectedItems.nodes[0].data.branch === "Root") {
      for (var i = 0; i < this.diagram.nodes.length; i++) {
        if (this.diagram.nodes[i].addInfo && (this.diagram as any).nodes[i].addInfo.level === 1) {
          if ((this.diagram as any).nodes[i].addInfo.orientation === "Left") {
            leftChildCount++;
          } else {
            rightChildCount++;
          }
        }
      }
      orientation = leftChildCount > rightChildCount ? "Right" : "Left";
    } else {
      var selectedNodeOrientation = (this.diagram as any).selectedItems.nodes[0].addInfo.orientation.toString();
      orientation = selectedNodeOrientation;
    }
    return orientation;

  }

  toolbarClick(args: ClickEventArgs) {
    let item = args.item.tooltipText;
    switch (item) {
      case 'Undo':
        this.diagram.undo();
        break;
      case 'Redo':
        this.diagram.redo();
        break;
      case 'Select Tool':
        this.diagram.clearSelection();
        this.diagram.tool = DiagramTools.Default;
        break;
      case 'Pan Tool':
        this.diagram.clearSelection();
        this.diagram.tool = DiagramTools.ZoomPan;
        break;
      case 'Add Child':
        var orientation = this.getOrientation();
        this.addNode(orientation);
        break;
      case 'Add Sibling':
        this.addSibilingChild();
        break;
    }
    this.diagram.dataBind();
  }

  onClickDisable(args: boolean, node?: Node) {
    if (args === false) {
      this.toolbarObj.items[6].disabled = false;
      this.toolbarObj.items[8].disabled = false;
      if (((node as NodeModel).addInfo as any).level !== 0) {
        this.toolbarObj.items[7].disabled = false;
      } else {
        this.toolbarObj.items[7].disabled = true;
      }
    }
    else if (args === true) {
      this.toolbarObj.items[6].disabled = true;
      this.toolbarObj.items[7].disabled = true;
      this.toolbarObj.items[8].disabled = true;
    }
  }

  zoomChange(args: MenuEventArgs) {
    let zoomCurrentValue: DropDownButtonComponent = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
    let currentZoom: number = this.diagram.scrollSettings.currentZoom!;
    let zoom: any = {};
    switch (args.item.text) {
      case 'Zoom In':
        this.diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        zoomCurrentValue.content = (this.diagram.scrollSettings.currentZoom! * 100).toFixed() + '%';
        break;
      case 'Zoom Out':
        this.diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        zoomCurrentValue.content = (this.diagram.scrollSettings.currentZoom! * 100).toFixed() + '%';
        break;
      case 'Zoom to Fit':
        zoom.zoomFactor = 1 / currentZoom - 1;
        this.diagram.zoomTo(zoom);
        zoomCurrentValue.content = this.diagram.scrollSettings.currentZoom as any;
        break;
      case 'Zoom to 50%':
        if (currentZoom === 0.5) {
          currentZoom = 0;
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          this.diagram.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          this.diagram.zoomTo(zoom);
        }
        break;
      case 'Zoom to 100%':
        if (currentZoom === 1) {
          currentZoom = 0;
          zoom.zoomFactor = (1 / currentZoom) - 1;
          this.diagram.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (1 / currentZoom) - 1;
          this.diagram.zoomTo(zoom);
        }
        break;
      case 'Zoom to 200%':
        if (currentZoom === 2) {
          currentZoom = 0;
          zoom.zoomFactor = (2 / currentZoom) - 1;
          this.diagram.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (2 / currentZoom) - 1;
          this.diagram.zoomTo(zoom);
        }
        break;
    }

    zoomCurrentValue.content = Math.round(this.diagram.scrollSettings.currentZoom! * 100) + ' %';

  }

  //To update the layout based on the orientation
  updateOrientation(diagram: any) {
    for (var i = 0; i < diagram.connectors.length; i++) {
      var connector = diagram.connectors[i];
      if (diagram.layout.orientation === "Vertical") {
        if (connector.sourcePortID === "rightPort" && connector.targetPortID === "leftPort") {
          connector.sourcePortID = 'bottomPort';
          connector.targetPortID = "topPort";
        }
        if (connector.sourcePortID === "leftPort" && connector.targetPortID === "rightPort") {
          connector.sourcePortID = 'topPort';
          connector.targetPortID = 'bottomPort';
        }
      } else if (diagram.layout.orientation === "Horizontal") {
        if (connector.sourcePortID === "bottomPort" && connector.targetPortID === "topPort") {
          connector.sourcePortID = 'rightPort';
          connector.targetPortID = "leftPort";
        }
        if (connector.sourcePortID === "topPort" && connector.targetPortID === "bottomPort") {
          connector.sourcePortID = 'leftPort';
          connector.targetPortID = 'rightPort';
        }
      }
    }
  }

  download(data: string) {
    if ((window.navigator as any).msSaveBlob) {
      let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
      let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      let ele = document.createElement('a');
      ele.href = dataString;
      ele.download = 'Diagram.json';
      document.body.appendChild(ele);
      ele.click();
      ele.remove();
    }
  }

  menuClick(args: MenuEventArgs) {
    let option = args.item.text?.toLowerCase().replace(/\s+/g, '');
    let btnZoomIncrement = (document.getElementById('btnZoomIncrement') as any).ej2_instances[0];

    switch (option) {
      case 'new':
        this.diagram.clear();
        this.diagram.loadDiagram('{"width":"100%","height":"100%","snapSettings":{"constraints":0,"gridType":"Lines","verticalGridlines":{"lineIntervals":[1.25,18.75,0.25,19.75,0.25,19.75,0.25,19.75,0.25,19.75]},"horizontalGridlines":{"lineIntervals":[1.25,18.75,0.25,19.75,0.25,19.75,0.25,19.75,0.25,19.75]}},"tool":1,"layout":{"type":"MindMap","horizontalSpacing":50,"verticalSpacing":50,"getBranch":{},"enableAnimation":true,"connectionPointOrigin":"SamePoint","arrangement":"Nonlinear","enableRouting":false,"fixedNode":"sZIN0"},"selectedItems":{"constraints":4096,"userHandles":[{"name":"leftHandle","pathData":"M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z","backgroundColor":"black","pathColor":"white","side":"Left","offset":0.5,"margin":{"top":10,"bottom":0,"left":0,"right":10},"horizontalAlignment":"Left","verticalAlignment":"Top"},{"name":"rightHandle","pathData":"M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z","backgroundColor":"black","pathColor":"white","side":"Right","offset":0.5,"margin":{"top":10,"bottom":0,"left":10,"right":0},"horizontalAlignment":"Right","verticalAlignment":"Top"},{"name":"devare","pathData":"M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.7696.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.0491.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z","backgroundColor":"black","pathColor":"white","side":"Top","offset":0.5,"margin":{"top":0,"bottom":0,"left":0,"right":0},"horizontalAlignment":"Center","verticalAlignment":"Center"}],"nodes":[],"connectors":[],"wrapper":null,"selectedObjects":[]},"dataSourceSettings":{"id":"id","parentId":"parentId","dataSource":{"dateParse":true,"timeZoneHandling":true,"requests":[],"dataSource":{"json":[{"id":"1","Label":"Root","fill":"#D0ECFF","branch":"Root","hasChild":true,"level":0,"strokeColor":"#80BFEA","orientation":"Root"}],"offline":true,"dataType":"json"},"defaultQuery":{"subQuery":null,"isChild":false,"distincts":[],"queries":[{"fn":"onTake","e":{"nos":7}}],"key":"","fKey":"","expands":[],"sortedColumns":[],"groupedColumns":[],"params":[],"lazyLoad":[]},"adaptor":{"options":{"from":"table","requestType":"json","sortBy":"sorted","select":"select","skip":"skip","group":"group","take":"take","search":"search","count":"requiresCounts","where":"where","aggregates":"aggregates","expand":"expand"},"type":{},"pvt":{}}},"root":"1","dataManager":null,"crudAction":{"read":""},"connectionDataSource":{"dataManager":null},"dataMapSettings":[]},"getNodeDefaults":{},"getConnectorDefaults":{},"getCustomTool":{},"selectionChange":{},"rulerSettings":{"showRulers":true,"dynamicGrid":true,"horizontalRuler":{"orientation":"Horizontal","interval":10,"segmentWidth":100,"thickness":25,"tickAlignment":"RightOrBottom","arrangeTick":null},"verticalRuler":{"orientation":"Vertical","interval":10,"segmentWidth":100,"thickness":25,"tickAlignment":"RightOrBottom","arrangeTick":null}},"created":{},"keyDown":{},"historyChange":{},"textEdit":{},"drop":{},"scrollChange":{},"enableRtl":false,"locale":"en-US","scrollSettings":{"currentZoom":1,"viewPortWidth":1330,"viewPortHeight":629.6614379882812,"horizontalOffset":0,"verticalOffset":-0.33,"padding":{"left":0,"right":0,"top":0,"bottom":0},"scrollLimit":"Diagram","minZoom":0.2,"maxZoom":30},"enablePersistence":false,"backgroundColor":"transparent","constraints":500,"contextMenuSettings":{},"mode":"SVG","layers":[{"id":"default_layer","visible":true,"lock":false,"objects":["sZIN0"],"zIndex":0,"objectZIndex":0}],"nodes":[{"id":"sZIN0","data":{"id":"1","Label":"Root","fill":"#D0ECFF","branch":"Root","hasChild":true,"level":0,"strokeColor":"#80BFEA","orientation":"Root"},"shape":{"type":"Basic","cornerRadius":5,"shape":"Ellipse"},"ports":[{"id":"leftPort","offset":{"x":0,"y":0.5},"visibility":2,"style":{"fill":"black","strokeColor":"black","opacity":1,"strokeDashArray":"","strokeWidth":1},"inEdges":[],"outEdges":[],"height":12,"width":12,"shape":"Square","margin":{"right":0,"bottom":0,"left":0,"top":0},"horizontalAlignment":"Center","verticalAlignment":"Center"},{"id":"rightPort","offset":{"x":1,"y":0.5},"visibility":2,"style":{"fill":"black","strokeColor":"black","opacity":1,"strokeDashArray":"","strokeWidth":1},"inEdges":[],"outEdges":[],"height":12,"width":12,"shape":"Square","margin":{"right":0,"bottom":0,"left":0,"top":0},"horizontalAlignment":"Center","verticalAlignment":"Center"}],"zIndex":0,"constraints":5240810,"style":{"fill":"#D0ECFF","strokeColor":"#80BFEA","strokeWidth":1,"gradient":{"type":"None"},"strokeDashArray":"","opacity":1},"addInfo":{"level":0,"orientation":"Root"},"expandIcon":{"shape":"None","height":10,"width":10,"fill":"white","borderColor":"black","offset":{"x":0.5,"y":1}},"collapseIcon":{"shape":"None","height":10,"width":10,"fill":"white","borderColor":"black","offset":{"x":0.5,"y":1}},"width":150,"height":75,"annotations":[{"id":"VgDkd","content":"Root","annotationType":"String","style":{"strokeWidth":0,"strokeColor":"transparent","fill":"transparent","bold":false,"textWrapping":"WrapWithOverflow","color":"black","whiteSpace":"CollapseSpace","fontFamily":"Arial","fontSize":12,"italic":false,"opacity":1,"strokeDashArray":"","textAlign":"Center","textOverflow":"Wrap","textDecoration":"None"},"hyperlink":{"link":"","hyperlinkOpenState":"NewTab","content":"","textDecoration":"None"},"constraints":4,"visibility":true,"rotateAngle":0,"margin":{"right":0,"bottom":0,"left":0,"top":0},"horizontalAlignment":"Center","verticalAlignment":"Center","offset":{"x":0.5,"y":0.5}}],"container":null,"offsetX":665,"offsetY":314.8307189941406,"visible":true,"horizontalAlignment":"Left","verticalAlignment":"Top","backgroundColor":"transparent","borderColor":"none","borderWidth":0,"rotateAngle":0,"pivot":{"x":0.5,"y":0.5},"margin":{},"flip":"None","wrapper":{"actualSize":{"width":150,"height":75},"offsetX":665,"offsetY":314.8307189941406},"flipMode":"All","isExpanded":true,"fixedUserHandles":[],"excludeFromLayout":false,"inEdges":[],"outEdges":[],"parentId":"","processId":"","umlIndex":-1,"isPhase":false,"isLane":false}],"connectors":[],"diagramSettings":{"inversedAlignment":true},"pageSettings":{"boundaryConstraints":"Infinity","width":null,"orientation":"Landscape","height":null,"background":{"source":"","color":"transparent"},"showPageBreaks":false,"fitOptions":{"canFit":false}},"basicElements":[],"tooltip":{"content":""},"commandManager":{"commands":[{"name":"leftChild","canExecute":{},"execute":{},"gesture":{"key":9},"parameter":""},{"name":"rightChild","canExecute":{},"execute":{},"gesture":{"key":9,"keyModifiers":4},"parameter":""},{"name":"showShortCut","canExecute":{},"execute":{},"gesture":{"key":112},"parameter":""},{"name":"FitToPage","canExecute":{},"execute":{},"gesture":{"key":119},"parameter":""},{"name":"boldLabel","canExecute":{},"execute":{},"gesture":{"key":66,"keyModifiers":1},"parameter":""},{"name":"italicLabel","canExecute":{},"execute":{},"gesture":{"key":73,"keyModifiers":1},"parameter":""},{"name":"underlineLabel","canExecute":{},"execute":{},"gesture":{"key":85,"keyModifiers":1},"parameter":""},{"name":"deleteNode","canExecute":{},"execute":{},"gesture":{"key":8},"parameter":""},{"name":"removeNode","canExecute":{},"execute":{},"gesture":{"key":46},"parameter":""},{"name":"expandCollapse","canExecute":{},"execute":{},"gesture":{"key":32},"parameter":""},{"name":"expandCollapseParent","canExecute":{},"execute":{},"gesture":{"key":69,"keyModifiers":1},"parameter":""},{"gesture":{"key":13},"canExecute":{},"execute":{},"name":"sibilingChildTop","parameter":""},{"name":"newDiagram","canExecute":{},"execute":{},"gesture":{"key":78,"keyModifiers":1},"parameter":""},{"name":"saveDiagram","canExecute":{},"execute":{},"gesture":{"key":83,"keyModifiers":1},"parameter":""},{"name":"openDiagram","canExecute":{},"execute":{},"gesture":{"key":79,"keyModifiers":1},"parameter":""},{"name":"navigationDown","canExecute":{},"execute":{},"gesture":{"key":40},"parameter":""},{"name":"navigationUp","canExecute":{},"execute":{},"gesture":{"key":38},"parameter":""},{"name":"navigationLeft","canExecute":{},"execute":{},"gesture":{"key":37},"parameter":""},{"name":"navigationRight","canExecute":{},"execute":{},"gesture":{"key":39},"parameter":""}]},"version":17.1}');
        this.workingData = [{ id: '1', Label: 'Root', branch: 'Root', hasChild: true, level: 0, fill: "#D0ECFF", strokeColor: "#80BFEA", orientation: 'Root', parentId: '' },];
        break;
      case 'open':
        (document.getElementsByClassName('e-file-select-wrap') as any)[0].querySelector('button').click();
        break;
      case 'save':
        this.download(this.diagram.saveDiagram());
        break;
      case 'print':
        let printOptions: IExportOptions = {};
        printOptions.multiplePage = false;
        this.diagram.print(printOptions);
        break;
      case 'jpg':
      case 'png':
      case 'svg':
        this.onselectExport(option)
        break;
      case 'undo':
        this.diagram.undo();
        break;
      case 'redo':
        this.diagram.redo();
        break;
      case 'cut':
        this.diagram.cut();
        break;
      case 'copy':
        this.diagram.copy();
        break;
      case 'paste':
        this.diagram.paste();
        break;
      case 'delete':
        this.diagram.remove();
        break;
      case 'selectall':
        this.diagram.selectAll();
        break;
      case 'fittoscreen':
        this.diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
        break;
      case 'showrulers':
        this.diagram.rulerSettings.showRulers = !this.diagram.rulerSettings.showRulers;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'zoomin':
        this.diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        btnZoomIncrement.content = Math.round(this.diagram.scrollSettings.currentZoom! * 100) + ' %';
        break;
      case 'zoomout':
        this.diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        btnZoomIncrement.content = Math.round(this.diagram.scrollSettings.currentZoom! * 100) + ' %';
        break;
      case 'showtoolbar':
        let toolbar = document.getElementById('toolbarEditor') as HTMLElement;
        toolbar.style.display = toolbar.style.display === 'none' ? 'block' : 'none';
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'showlines':
        this.diagram.snapSettings.constraints = this.diagram.snapSettings.constraints! ^ SnapConstraints.ShowLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'showshortcuts':
        var node1 = document.getElementById('shortcutDiv') as HTMLElement;
        node1.style.visibility = node1.style.visibility === "hidden" ? node1.style.visibility = "visible" : node1.style.visibility = "hidden";
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'showpagebreaks':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        this.diagram.pageSettings.showPageBreaks = !this.diagram.pageSettings.showPageBreaks;
        break;
    }

  }



  //Export the diagraming object based on the format.
  onselectExport(option: string) {
    let exportOptions: IExportOptions = {};
    exportOptions.format = option.toUpperCase() as FileFormats;
    exportOptions.mode = 'Download';
    exportOptions.region = 'Content';
    exportOptions.fileName = 'Export';
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    this.diagram.exportDiagram(exportOptions);
  }

  loadDiagram(event: any) {
    this.diagram.loadDiagram(event.target.result);
    this.diagram.fitToPage({ mode: 'Page' });
    this.updateOrientation(this.diagram)
    this.workingData = [];
    if (this.diagram.dataSourceSettings.dataSource && this.diagram.dataSourceSettings.dataSource.dataSource.json && this.diagram.dataSourceSettings.dataSource.dataSource.json.length > 0) {
      for (let i = 0; i < this.diagram.dataSourceSettings.dataSource.dataSource.json.length; i++) {
        let treeData: any = this.diagram.dataSourceSettings.dataSource.dataSource.json[i];
        this.workingData.push(treeData);
      }
    }
    this.pushWorkingData(this.diagram);
  }

  // events

  selectionChange(args: ISelectionChangeEventArgs) {
    let diagram: DiagramComponent = (document.querySelector('#diagram') as any).ej2_instances[0];
    if (args.state === 'Changing') {
      if (args.type === "Addition") {
        if (args.newValue[0] instanceof Node && args.newValue[0].addInfo) {
          for (let i = 0; i < (diagram as any).selectedItems.userHandles.length; i++) {
            let handle = (diagram as any).selectedItems.userHandles[i];
            handle.visible = true;
          }
          if ((args.newValue[0].addInfo as any).orientation === 'Left' ||
            (args.newValue[0].addInfo as any).orientation === 'subLeft' ||
            (args.newValue[0].addInfo as any).orientation === 'SubLeft') {
            this.hideUserHandle('leftHandle');
            this.changeUserHandlePosition('leftHandle');
            this.changeUserHandlePosition('devare');
          }
          else if ((args.newValue[0].addInfo as any).orientation === 'Right' ||
            (args.newValue[0].addInfo as any).orientation === 'subRight' ||
            (args.newValue[0].addInfo as any).orientation === 'SubRight') {
            this.hideUserHandle('rightHandle');
            this.changeUserHandlePosition('rightHandle');
            this.changeUserHandlePosition('devare');

          }
          else if ((args.newValue[0].data as MindMapData).branch === 'Root') {
            this.hideUserHandle('devare');
          }
          this.onClickDisable(false, args.newValue[0]);
        }
        else {
          this.hideUserHandle('leftHandle');
          this.hideUserHandle('rightHandle');
          this.hideUserHandle('devare');
          this.onClickDisable(true, args.newValue[0] as Node);
        }
      }
    }
    if (args.newValue.length === 0) {
      this.onClickDisable(true);
    }
  }


  historyChange() {
    let diagram: DiagramComponent = (document.querySelector('#diagram') as any).ej2_instances[0];
    if ((diagram as any).historyManager.undoStack.length > 0) {
      this.toolbarObj.items[0].disabled = false;
    } else {
      this.toolbarObj.items[0].disabled = true;
    }
    if ((diagram as any).historyManager.redoStack.length > 0) {
      this.toolbarObj.items[1].disabled = false;
    } else {
      this.toolbarObj.items[1].disabled = true;
    }
  }
  //Sets the default values of a node
  getNodeDefaults(obj: NodeModel): NodeModel {
    if (obj.id !== 'textNode' && obj.data) {
      obj.constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
      var empInfo = obj.data as MindMapData;
      obj.style = {
        fill: (obj.data as MindMapData).fill, strokeColor: (obj.data as MindMapData).strokeColor,
        strokeWidth: 1
      };
      if (empInfo.branch === 'Root') {
        obj.addInfo = { level: 0 };
        (obj.data as MindMapData).level = (obj.addInfo as any).level;
        (obj.data as MindMapData).orientation = empInfo.branch;
      }
      obj.addInfo = { level: (obj.data as MindMapData).level, orientation: (obj.data as MindMapData).orientation };
      (obj.shape as BasicShapeModel).cornerRadius = empInfo.branch === 'Root' ? 5 : 0;
      obj.shape = { type: 'Basic', shape: 'Ellipse' };
      obj.width = empInfo.branch === 'Root' ? 150 : 100;
      obj.height = empInfo.branch === 'Root' ? 75 : 50;
      obj.annotations = [{
        content: empInfo.Label,

      }];
    }
    var port = getPort();
    if (!(obj as Node).ports.length) {
      for (var i = 0; i < port.length; i++) {
        (obj as Node).ports.push(new PointPort(obj, 'ports', port[i], true));
      }
    }

    return obj;
  }

  onUserHandleMouseDown(args: UserHandleEventsArgs) {
    if (args.element.name === 'leftHandle') {
      this.addNode('Right');
    }
    else if (args.element.name === 'rightHandle') {
      this.addNode('Left');
    }
    else if (args.element.name === 'devare') {
      let diagram: DiagramComponent = (document.querySelector('#diagram') as any).ej2_instances[0];
      if ((diagram as any).selectedItems.nodes.length > 0) {
        (diagram as any).historyManager.startGroupAction();
        this.removeSubChild((diagram as any).selectedItems.nodes[0], diagram);
        (diagram as any).historyManager.endGroupAction();
        diagram.doLayout();
      }
    }
  }

}
