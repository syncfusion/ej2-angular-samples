/**
 * Sample for Hierarchical layout
 */

 import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
 import { DiagramComponent, IClickEventArgs, ISelectionChangeEventArgs, NodeConstraints, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
 import {
   Diagram,
   NodeModel,
   ConnectorModel,
   LayoutAnimation,
   DataBinding,
   HierarchicalTree,
   SnapConstraints,
   SnapSettingsModel,
   DiagramTools,
 } from '@syncfusion/ej2-diagrams';
 import { DataManager, Query } from '@syncfusion/ej2-data';
import { TreeViewComponent, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
 Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

 export interface EmployeeInfo {
   Name: string;
 }
 
 @Component({
    selector: 'control-content',
    templateUrl: 'data-binding-with-treeview.html',
    styleUrls: ['data-binding-with-treeview.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        SBActionDescriptionComponent,
        ButtonModule,
        TreeViewModule,
        DiagramModule,
        SBDescriptionComponent,
    ],
})
 export class DataBindingWithTreeviewComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
 
    @ViewChild('treeview')
    public treeview: TreeViewComponent;
    public index : number = 1;
    public targetNodeId : string;
    public elementNodeId : string;
    public addButtonDisabled : boolean = true;
    public deleteButtonDisabled : boolean = true;
    //Collection of data
    public data1: object[] = [
     { Name: "Plant Manager", Id: "1", hasChild: true, expanded: true },
     { Name: "Production Manager", Id: "2", ParentId: "1", hasChild: true, expanded: true },
     { Name: "Control Room", Id: "3", ParentId: "2", hasChild: true, expanded: true },
     { Name: "Foreman1", Id: "4", ParentId: "3", hasChild: true, expanded: true },
     { Name: "Craft Personnel5", Id: "5", ParentId: "4" },
     { Name: "Craft Personnel6", Id: "6", ParentId: "4" },
     { Name: "Plant Operator", Id: "7", ParentId: "2", hasChild: true, expanded: true },
     { Name: "Foreman2", Id: "8", ParentId: "7", hasChild: true, expanded: true },
     { Name: "Craft Personnel7", Id: "9", ParentId: "8" },
     { Name: "Administrative Officer", Id: "10", ParentId: "1" },
     { Name: "Maintenance Manager", Id: "11", ParentId: "1", hasChild: true, expanded: true },
     { Name: "Electrical Supervisor", Id: "12", ParentId: "11", hasChild: true, expanded: true },
     { Name: "Craft Personnel1", Id: "13", ParentId: "12" },
     { Name: "Craft Personnel2", Id: "14", ParentId: "12" },
     { Name: "Mechanical Supervisor", Id: "15", ParentId: "11", hasChild: true, expanded: true },
     { Name: "Craft Personnel3", Id: "16", ParentId: "15" },
     { Name: "Craft Personnel4", Id: "17", ParentId: "15" }
    ];
    public tools = DiagramTools.Default;
 
    public items1: DataManager = new DataManager(
      this.data1 as JSON[],
      new Query().take(7)
    );
    public dataSourceSettings: Object = {
      //sets the fields to bind
      id: 'Id', parentId: 'ParentId',
      dataSource: this.items1,
      doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
         nodeModel.id = (data as any).Id;
      },
    };
    //Set the snap constraints
    public snapSettings: SnapSettingsModel = {
      constraints: SnapConstraints.None,
    };
  
    public layout: Object = {
      type: 'HierarchicalTree',
      verticalSpacing: 50, horizontalSpacing: 40,
          enableAnimation: true
    };
  
    //Defines the default node and connector properties
    public nodeDefaults(node: NodeModel): NodeModel {
     node.width = 100;
     node.height = 40;
     node.style = { strokeWidth: 1, strokeColor: 'whitesmoke', fill: 'CornflowerBlue' };
     node.annotations = [{ content: (node.data as any).Name, style: { color: 'white' } }];
     node.constraints = NodeConstraints.Default | NodeConstraints.AllowDrop;
     return node;
    }
    //Sets the default values of a connector
    public connectorDefaults( obj: ConnectorModel, diagram: Diagram): ConnectorModel {
     obj.type = 'Orthogonal';
     obj.style = { strokeColor: 'CornflowerBlue' };
     obj.targetDecorator = { shape: 'Arrow', height: 10, width: 10, style: { fill: 'CornflowerBlue', strokeColor: 'white' } };
     return obj;
    }
    //enable or disable the add and delete button
    public selectionChange(args : ISelectionChangeEventArgs){
     if (args.state === 'Changed') {
         if (args.type === "Addition") {
             this.deleteButtonDisabled = false;
             this.addButtonDisabled = false;
         } else {
           this.deleteButtonDisabled = true;
           this.addButtonDisabled = true;
         }
         var selectedItems = this.diagram.selectedItems.nodes.concat(this.diagram.selectedItems.connectors as any);
                if(selectedItems.length==0)
                {
                    this.treeview.selectedNodes=[];
                }
        }
    }
    public addButton(){
     this.add();
    }
    public deleteButton(){
      debugger
      if ((this.diagram.selectedItems.nodes[0].data as any).Id !== "1") {
       this.remove();
   }
    }
    //click event handler
    public click(args : IClickEventArgs){
     if(args.element && (args.element as any).sourceID === undefined && (args.element as any).shape !==undefined) {
     this.treeview.selectedNodes = [(args.element as any).data.Id];
     }
    }
    //Drag a node from the palette into the diagram
    public dragEnter(args : any) {
     let lable = '';
     if (args.dragData) {
         lable = args.dragData.text;
     }
     let node =
     {
         id: 'node' + this.index,
         data: { Name: lable, Id: 'node' + this.index },
         annotations: [{ content: lable }]
     };
     args.dragItem = node;
    }
    //Drop a node from the palette into the diagram 
     public drop(args : any) {
     let connector;
     let tempData;
     let workingData = this.data1;
     let diagram = this.diagram;
       setTimeout(() => {
          this.targetNodeId = args.target.id;
          tempData = (workingData as any).filter((a: any) => a.Id === this.targetNodeId);
          tempData[0].hasChild = true;
          tempData[0].expanded = true;
          if (args.element.inEdges.length === 0) {
              let id = args.element.id;
              let item = {
                  Name: args.element.annotations[0].content, Id: args.element.id, ParentId: this.targetNodeId, hasChild: false, expanded: false
              };
              this.treeview.addNodes([item], this.targetNodeId, null);
              connector = { sourceID: this.targetNodeId, targetID: id };
              diagram.add(connector);
                 diagram.doLayout();
                 this.index++;
                 this.data1.push(item);
          } else {
              connector = diagram.getObject(args.element.inEdges[0]);
              connector.sourceID = this.targetNodeId;
              diagram.dataBind();
              diagram.doLayout();
              this.elementNodeId = args.element.id;
              tempData = (workingData as any).filter((a: any) => a.Id === this.elementNodeId);
              tempData[0].ParentId = this.targetNodeId;
              this.treeview.fields = {
                  dataSource: this.data1 as any,
                  id: 'Id',
                  text: 'Name',
                  parentID: 'ParentId',
                  hasChildren: 'hasChild',
              };
              this.treeview.refresh();
          }
       }, 0);
 
 }
//Change the annotation of the node
 public textEdit(args : any) {
    let data:any = this.data1;
    let treeObj = this.treeview;
     setTimeout(function () {
         if (args.annotation) {
             this.elementNodeId = args.element.id;
             let tempData = data.filter((a: any)=>a.Id === this.elementNodeId);
             let node = treeObj.getNode(tempData[0].Id);
             treeObj.updateNode(tempData[0].Id, args.annotation.content);
         }
     }, 0);
 }
 //Enable the add and delete button
 public nodeSelected(args : any) {
     this.deleteButtonDisabled = false;
     this.addButtonDisabled = false;
 }
 //node click event
 public nodeClicked(args : any) {
     let node = this.diagram.getObject(this.treeview.selectedNodes[0]);
     this.diagram.select([node]);
 }
 
 // Key Press Event
 public keyPress(args : any) {
     if (args.event.key === 'Enter') {
         this.add();
     }
 }
 //node edited event
 public nodeEdited(args : any) {
     let node = this.diagram.getObject(args.nodeData.id);
     (node as any).annotations[0].content = args.newText;
     this.treeview.selectedNodes = [args.nodeData.id];
 }
 //Remove node
 public remove() {
     let nodeId;
     if (this.diagram.selectedItems.nodes.length > 0) {
         nodeId = this.diagram.selectedItems.nodes[0].id;
         this.removeSubChild(this.diagram.selectedItems.nodes[0], true);
         this.diagram.doLayout();
     } else if (this.treeview.selectedNodes.length > 0) {
         nodeId = this.treeview.selectedNodes[0];
         this.treeview.removeNodes([nodeId]);
         let node = this.diagram.getObject(nodeId);
         this.removeSubChild(node, false);
     }
     for (let i = this.data1.length - 1; i >= 0; i--) {
         if ((this.data1[i] as any).id === nodeId) {
             this.data1.splice(i, 1);
         }
     }
     this.diagram.doLayout();
 
 }
 //Remove sub child node
 public removeSubChild(node, canDelete) {
     let childNode;
     let connector;
     for (let i = node.outEdges.length - 1; i >= 0; i--) {
         connector = this.diagram.getObject(node.outEdges[i]);
         childNode = this.diagram.getObject(connector.targetID);
         if (childNode != null && childNode.outEdges.length > 0) {
             this.removeSubChild(childNode, canDelete);
         }
         else {
             this.diagram.remove(childNode);
             if (canDelete) {
                 this.treeview.removeNodes([childNode.id]);
             }
             for (let j = this.data1.length - 1; j >= 0; j--) {
                 if ((this.data1[j] as any).id === childNode.id) {
                     this.data1.splice(j, 1);
                 }
             }
         }
     }
     for (let k = node.inEdges.length - 1; k >= 0; k--) {
         connector = this.diagram.getObject(node.inEdges[k]);
         childNode = this.diagram.getObject(connector.sourceID);
         let index = childNode.outEdges.indexOf(connector.id);
         if (childNode.outEdges.length > 1 && index === 0) {
             index = childNode.outEdges.length;
         }
         if (index > 0) {
             let node1 = childNode.outEdges[index - 1];
             let connector1 = this.diagram.getObject(node1);
             let node2 = this.diagram.getObject((connector1 as any).targetID);
             this.diagram.select([node2]);
         }
         else {
             this.diagram.select([childNode]);
         }
     }
     this.diagram.remove(node);
     if (canDelete) {
         this.treeview.removeNodes([node.id]);
     }
     for (let t = this.data1.length - 1; t >= 0; t--) {
         if ((this.data1[t] as any).id === node.id) {
             this.data1.splice(t, 1);
         }
     }
 }
 //Add function
 public add() {
     let nodeId: string;
     if (this.diagram.selectedItems.nodes.length > 0) {
         nodeId = this.diagram.selectedItems.nodes[0].id;
         this.addNode(nodeId);
     } else if (this.treeview.selectedNodes.length > 0) {
         nodeId = this.treeview.selectedNodes[0];
         this.addNode(nodeId);
     }
 }
 //Add node Function
 public addNode(nodeId:string) {
     this.targetNodeId = nodeId ? nodeId : this.treeview.selectedNodes[0];
     let tempData = this.data1.filter((a: any) => a.Id === this.targetNodeId);
     (tempData[0] as any).hasChild = true;
     (tempData[0] as any).expanded = true;
     let id = 'tree_' + this.index;
     let item = {
         Name: "Node", Id: id, ParentId: this.targetNodeId, hasChild: false, expanded: false
     };
     this.treeview.addNodes([item], this.targetNodeId, null);
     this.treeview.beginEdit(id);
     let node = { id: id, data: item };
     let targetId;
     if (this.diagram.selectedItems.nodes.length > 0) {
         targetId = this.diagram.selectedItems.nodes[0].id;
     } else {
         let temp = this.diagram.nodes.filter((a: any) => a.data.Id === this.targetNodeId);
         targetId = temp[0].id;
     }
     let connector = { sourceID: targetId, targetID: id };
     this.diagram.add(node);
     this.diagram.add(connector);
     this.diagram.doLayout();
     this.index++;
     this.data1.push(item);
 }
 public field:Object ={ dataSource: this.data1, id: 'Id', text: 'Name', parentID: 'ParentId',
 hasChildren: 'hasChild' };
 
 public allowEditing:boolean = true;
 public allowDragAndDrops:boolean = true;
 
  }
  