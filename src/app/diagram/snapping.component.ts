/**
 * Sample for Keyboard functions
 */

 import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
 import { BasicShapeModel, DiagramComponent, RulerSettingsModel, ScrollSettingsModel, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
 import {
     Diagram, NodeModel, UndoRedo, Node, DataBinding, DiagramContextMenu, HierarchicalTree, ConnectorModel, 
     SnapSettingsModel, PortConstraints, PortVisibility, Connector, ConnectorConstraints, UserHandleModel, SelectorModel, SelectorConstraints, ISelectionChangeEventArgs, IRotationEventArgs
 } from '@syncfusion/ej2-diagrams';
 import { SnapConstraints, Snapping } from '@syncfusion/ej2-diagrams';
 import { NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxComponent, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
 
 Diagram.Inject(UndoRedo, DiagramContextMenu, HierarchicalTree, DataBinding, Snapping);
 
 export interface DataInfo {
     [key: string]: string;
 }
 
 @Component({
    selector: 'control-content',
    templateUrl: 'snapping.html',
    styleUrls: ['snapping.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, NumericTextBoxModule, ColorPickerModule, CheckBoxModule, RadioButtonModule, SBDescriptionComponent]
})
 
 export class SnappingComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;

    @ViewChild('showGridLines')
    public showGridLines : CheckBoxComponent;

    @ViewChild('snappingToObject')
    public snappToObject : CheckBoxComponent;

    @ViewChild('snappingInterval')
      public snappingInterval : NumericTextBoxModule;

    // Method called when the diagram is created
    public created(args) {
      // Fits the diagram to the width of the page
      this.diagram.fitToPage({mode : 'Width'});
    }
    // Specifies that the diagram has infinite scroll
    public scrollSettings : ScrollSettingsModel = {
    scrollLimit : 'Infinity'
    }
    // Defines the type of drawing object as 'Orthogonal'
    public drawingObject : any = { type : 'Orthogonal'};
    // Array defining the nodes in the diagram
    public nodes : NodeModel[] = [
      {
          id:'node_1',width:100,height:100,offsetX:350,offsetY:250,
          ports:[
              {id:'port1',offset:{x:0.5,y:0.5},visibility:PortVisibility.Visible,
              style:{fill:'black'},
              constraints:PortConstraints.Default|PortConstraints.Draw
          }],
          annotations:[{id:'annot1',content:'Shape 1', offset:{x:0.5,y:1.2},style:{bold:true}}]
      },
      {
          id:'node_2',width:100,height:100,offsetX:650,offsetY:250,
          ports:[
              {id:'port11', offset:{x:0.5,y:0.5},visibility: PortVisibility.Visible,style:{fill:'black'},
              constraints:PortConstraints.Default|PortConstraints.Draw
          },{
              id:'port2',offset:{x:0,y:0.5},visibility:PortVisibility.Visible,
              style:{fill:'black'},
              constraints:PortConstraints.Default|PortConstraints.Draw,
              height:100,width:7
          }],
          annotations:[{id:'annot1',content:'Shape 2',offset:{x:0.5,y:1.2},style:{bold:true}}]
  
      },
      {
          id:'node_3',width:100,height:100,offsetX:500,offsetY:400,
          annotations:[{id:'annot1',content:'Shape 3', offset:{x:0.5,y:1.2}, style:{bold:true}}]
  
      },
    ];
    // Array defining the connectors between nodes
    public connectors : ConnectorModel[] = [
        {
            id:'connector_1',sourceID:'node_1',targetID:'node_3',type:'Orthogonal',
        }
    ];

    public drawingNode : any;
    // Method to set default styles for nodes
    public nodeDefaults(node: NodeModel): any {
        node.style = {fill:'orange',strokeColor:'orange'};
    }
    // Method to set default styles for connectors
    public connectorDefaults(connector: Connector): void {
      connector.constraints = ConnectorConstraints.Default| ConnectorConstraints.DragSegmentThumb;
    }
    // Custom user handles for the diagram elements
    public handles: UserHandleModel[] = [
      {
        name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',tooltip:{content:'Clone'},
        visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Delete', pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',tooltip:{content:'Delete'},
        visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Draw', pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',tooltip:{content:'Draw'},
        visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    ]
    // Specifies the user handles for selected items
    public selectedItems: SelectorModel = {
      userHandles: this.handles
    };
    // Defines custom actions for the user handles
    public getCustomTool: Function = this.getTool.bind(this);
    // Custom actions for user handles
    public getTool(action: string) {  
      if (action == "Delete") {
          this.diagram.remove();
      }
      else if (action == "Clone"){
        this.diagram.paste(this.diagram.selectedItems.selectedObjects);
      }
      else if (action == "Draw"){
        (this.diagram.drawingObject as any).type = (this.diagram.drawingObject as any).type?(this.diagram.drawingObject as any).type: 'Orthogonal';
        (this.diagram.drawingObject as any).sourceID = this.drawingNode.id;
        this.diagram.dataBind();
        }
      };
    // Configures snapping settings for the diagram
    public snapSettings : SnapSettingsModel = {
      snapAngle : 5
    }
    // Event handler for selection changes
    public selectionChange(args : ISelectionChangeEventArgs){
      if(args.state === 'Changed'){
          var selectedItems = this.diagram.selectedItems.nodes;
          selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors as any);
          if(selectedItems.length>0){
              if(args.newValue.length>0 && args.newValue[0] instanceof Node){
                this.diagram.selectedItems = { constraints: SelectorConstraints.All| SelectorConstraints.UserHandle, userHandles: this.handles };
                  if(this.diagram.selectedItems.nodes.length>0){
                      this.drawingNode = this.diagram.selectedItems.nodes[this.diagram.selectedItems.nodes.length-1];
                  }
              }
              else{
              this.diagram.selectedItems = { constraints: SelectorConstraints.All&~ SelectorConstraints.UserHandle };
              }
          }
      }
    } 
    // Event handler for rotation changes
    public rotateChange(args : IRotationEventArgs){
      if(args.state === 'Start' || args.state === 'Progress')
      {
        this.diagram.selectedItems = { constraints: SelectorConstraints.All&~SelectorConstraints.UserHandle};
      }
      if(args.state === 'Completed'){
        this.diagram.selectedItems = { constraints: SelectorConstraints.All|SelectorConstraints.UserHandle, userHandles: this.handles };
      }
    }
    // Sets the snapping interval
    public snappingIntervalChange(args : any){
      this.diagram.snapSettings.horizontalGridlines.snapIntervals[0] = args.value;
      this.diagram.snapSettings.verticalGridlines.snapIntervals[0] = args.value;
      this.diagram.dataBind();
    }
    // Sets the snapping angle
    public snappingAngle(args : any){
      this.diagram.snapSettings.snapAngle = args.value;
      this.diagram.dataBind();
    }
    // Change the color of the snap lines
    public colorChange(args : any){
      this.diagram.snapSettings.snapLineColor = args.value;
      this.diagram.dataBind();    
    }
    // Toggle the visibility of grid lines
    public showGridLine(args: any){
          this.diagram.snapSettings.constraints = this.diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
          this.diagram.dataBind();
          debugger
          this.scale();
    }
    // Toggle the snapping to objects
    public snappToObjects(args : any){
      this.diagram.snapSettings.constraints = this.diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
      this.diagram.dataBind();
      this.scale();
    }
    // Update the snap interval scale
    public scale() {
      this.diagram.snapSettings.horizontalGridlines.snapIntervals[0] = (
        this.snappingInterval as any
      ).value;
      this.diagram.snapSettings.verticalGridlines.snapIntervals[0] = (
        this.snappingInterval as any
      ).value;
      this.diagram.dataBind();
    }
    public snapToLines(args:any) {
      // Determine the current state of showGridLines and snappToObject checkboxes
      if (this.showGridLines.checked && this.snappToObject.checked) {
        this.diagram.snapSettings.constraints = SnapConstraints.All;
      } else if (this.showGridLines.checked && !this.snappToObject.checked) {
        this.diagram.snapSettings.constraints =
          SnapConstraints.All & ~SnapConstraints.SnapToObject;
      } else if (!this.showGridLines.checked && this.snappToObject.checked) {
        this.diagram.snapSettings.constraints =
          SnapConstraints.All & ~SnapConstraints.ShowLines;
      } else if (!this.showGridLines.checked && !this.snappToObject.checked) {
        this.diagram.snapSettings.constraints =
          SnapConstraints.All &
          ~(SnapConstraints.ShowLines | SnapConstraints.SnapToObject);
      }
      // Handle specific snap to line options based on user selection
      let option = args.value;
      switch (option) {
        case 'Snap To Gridlines':
          // Enable SnapToLines constraint and adjust based on checkbox states
          this.diagram.snapSettings.constraints =
            SnapConstraints.All | SnapConstraints.SnapToLines;
          if (!this.showGridLines.checked && !this.snappToObject.checked) {
            this.diagram.snapSettings.constraints =
              SnapConstraints.All &
              ~(SnapConstraints.ShowLines | SnapConstraints.SnapToObject);
          } else if (!this.snappToObject.checked && this.showGridLines.checked) {
            this.diagram.snapSettings.constraints =
              SnapConstraints.All & ~SnapConstraints.SnapToObject;
          } else if (this.snappToObject.checked && !this.showGridLines.checked) {
            this.diagram.snapSettings.constraints =
              SnapConstraints.All & ~SnapConstraints.ShowLines;
          }
          break;
        case 'Snap To Horizontal Gridlines':
          // Toggle SnapToHorizontalLines constraint
          this.diagram.snapSettings.constraints =
          this.diagram.snapSettings.constraints ^
            SnapConstraints.SnapToVerticalLines;
          break;
        case 'Snap To Vertical Gridlines':
          // Toggle SnapToVerticalLines constraint
          this.diagram.snapSettings.constraints =
          this.diagram.snapSettings.constraints ^
            SnapConstraints.SnapToHorizontalLines;
          break;
        case 'None':
          // Disable all snap to line constraints
          this.diagram.snapSettings.constraints =
            SnapConstraints.All &
            ~(
              SnapConstraints.SnapToHorizontalLines |
              SnapConstraints.SnapToVerticalLines |
              SnapConstraints.SnapToLines
            );
          if (!this.showGridLines.checked && !this.snappToObject.checked) {
            this.diagram.snapSettings.constraints =
              SnapConstraints.All &
              ~(
                SnapConstraints.ShowLines |
                SnapConstraints.SnapToObject |
                SnapConstraints.SnapToHorizontalLines |
                SnapConstraints.SnapToVerticalLines |
                SnapConstraints.SnapToLines
              );
          } else if (this.showGridLines.checked && !this.snappToObject.checked) {
            this.diagram.snapSettings.constraints =
              SnapConstraints.All &
              ~(
                SnapConstraints.SnapToObject |
                SnapConstraints.SnapToHorizontalLines |
                SnapConstraints.SnapToVerticalLines |
                SnapConstraints.SnapToLines
              );
          } else if (!this.showGridLines.checked && this.snappToObject.checked) {
            this.diagram.snapSettings.constraints =
              SnapConstraints.All &
              ~(
                SnapConstraints.ShowLines |
                SnapConstraints.SnapToHorizontalLines |
                SnapConstraints.SnapToVerticalLines |
                SnapConstraints.SnapToLines
              );
          }
          break;
      }
      this.diagram.dataBind();
      this.scale();
    }
}
 