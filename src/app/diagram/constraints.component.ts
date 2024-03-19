import { Component, ViewEncapsulation, ViewChild,Inject } from '@angular/core';
import { ContextMenuSettingsModel, DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, SnapSettingsModel, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel, NodeConstraints, AnnotationConstraints, ConnectorConstraints, SelectorConstraints, DiagramConstraints, ISelectionChangeEventArgs, UserHandleModel, SelectorModel
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from './script/diagram-common';
import { SBDescriptionComponent } from '../common/dp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo);

/**
 * Default FlowShape sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'constraints.html',
    styleUrls: ['constraints.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, CheckBoxModule, SBDescriptionComponent]
})
export class ConstraintComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;
  constructor() {​​​​​​​
    
}​​​​​​​
  public created(args) {
    this.diagram.rulerSettings = {
      showRulers : true
    }
  }
  public nodes : NodeModel[] = [
    {
        id:"textNode1",
        // Position of the node
        offsetX:340,
        offsetY: 50,
        // Size of the node
        width: 500,
        height: 50,
        //Sets type of the node
        shape: { type: 'Text', content: 'Use Node Constraints to restrict end-users from performing certain operations on Node.' },
        //Customizes the appearances such as text, font, fill, and stroke.
        style: { strokeColor: 'none', fill: 'none', color: 'black', textAlign: 'Center', },
        constraints:  NodeConstraints.None
       
    },
    {
        id:"rectangle",
        offsetX:80,
        offsetY:160,
        width: 80,
        height: 65,
        // style: { fill: '#6BA5D7', strokeColor: 'white' },
        shape: { type: 'Basic', shape: 'Rectangle' },
        annotations: [{ content: 'Selection = False', }],
        constraints: NodeConstraints.Default & ~ NodeConstraints.Select
    },
    {
        id:"ellipse",
        offsetX:190,
        offsetY:160,
        width: 80,
        height: 80,
        // style: { fill: '#6BA5D7', strokeColor: 'white' },
        shape: { type: 'Basic', shape: 'Ellipse',cornerRadius: 10 },
        annotations: [{ content: 'Dragging = False' }],
        constraints:  NodeConstraints.Default & ~ NodeConstraints.Drag
       
    },
    {
        id:"heptagon",
        offsetX:295,
        offsetY:160,
        width: 80,
        height: 80,
        // style: { fill: '#6BA5D7', strokeColor: 'white' },
        shape: { type: 'Basic', shape: 'Heptagon' },
        annotations: [{ content: 'Delete = False' }],
        constraints: NodeConstraints.Default & ~ NodeConstraints.Delete
    },
    {
        id:"directData",
        offsetX:410,
        offsetY:160,
        width: 80,
        height: 80,
        rotateAngle:-45,
        // style: { fill: '#6BA5D7', strokeColor: 'white' },
        shape: { type: 'Flow', shape: 'DirectData' },
        annotations: [{ content: 'Rotate = False' }],
        constraints: NodeConstraints.Default &~ NodeConstraints.Rotate
    },
    {
        id:"Plus",
        offsetX:530,
        offsetY:160,
        width: 80,
        height: 80,
        // style: { fill: '#6BA5D7', strokeColor: 'white' },
        shape: { type: 'Basic', shape: 'Plus' },
        annotations: [{ content: 'TextEdit = False',constraints: AnnotationConstraints.ReadOnly }],
    },
    {
        id:"decision",
        offsetX:630,
        offsetY:160,
        width: 80,
        height: 80,
        // style: { fill: '#6BA5D7', strokeColor: 'white' },
        shape: { type: 'Flow', shape: 'Decision' },
        annotations: [{ content: 'Resizing = False' }],
       constraints:NodeConstraints.Default & ~ NodeConstraints.Resize
    },
    {
        id:"textNode2",
        // Position of the node
        offsetX:350,
        offsetY: 280,
        // Size of the node
        width: 550,
        height: 50,
        //Sets type of the node
        shape: { type: 'Text', content: 'Use Connector Constraints to restrict end-users from performing certain operations on Connector.' },
        //Customizes the appearances such as text, font, fill, and stroke.
        style: { strokeColor: 'none', fill: 'none', color: 'black', textAlign: 'Center', },
        constraints:  NodeConstraints.None
    },
];
public connectors : ConnectorModel[] = [
    {
    id: "select",
    type: 'Orthogonal',
    annotations: [{ content: 'Selection = False' , horizontalAlignment: 'Right' , verticalAlignment: 'Bottom' }],
     constraints: ConnectorConstraints.Default & ~ ConnectorConstraints.Select,
     style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2
    },
    targetDecorator: {
        style: {
            fill: '#6BA5D7',
            strokeColor: '#6BA5D7'
        }
    },
    sourcePoint: {
        x: 40,
        y: 350
    },
    targetPoint: {
        x: 120,
        y: 430
    }
},
{
    id: "connector2",
    type: 'Orthogonal',
    annotations: [{ content: 'Dragging = True',horizontalAlignment: 'Right' , verticalAlignment: 'Bottom'  }],
    constraints: ConnectorConstraints.Default | ~ConnectorConstraints.Drag,
     style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2
    },
    targetDecorator: {
        style: {
            fill: '#6BA5D7',
            strokeColor: '#6BA5D7'
        }
    },
    sourcePoint: {
        x: 140,
        y: 350
    },
    targetPoint: {
        x: 220,
        y: 430
    }
},
{
    id: "delete",
    type: 'Orthogonal',
    annotations: [{ content: 'Delete = False',horizontalAlignment: 'Right' , verticalAlignment: 'Bottom'  }],
    constraints: (ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb) &~(ConnectorConstraints.Delete | ConnectorConstraints.Drag),
     style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2
    },
    targetDecorator: {
        style: {
            fill: '#6BA5D7',
            strokeColor: '#6BA5D7'
        }
    },
    sourcePoint: {
        x: 250,
        y: 350
    },
    targetPoint: {
        x: 320,
        y: 430
    }
},
{
    id: "endThumb",
    type: 'Orthogonal',
    annotations: [{ content: 'EndThumb = False' ,horizontalAlignment: 'Right' , verticalAlignment: 'Bottom' }],
    constraints:(SelectorConstraints.All ) &~ ( SelectorConstraints.ConnectorSourceThumb | SelectorConstraints.ConnectorTargetThumb),
     style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2
    },
    targetDecorator: {
        style: {
            fill: '#6BA5D7',
            strokeColor: '#6BA5D7'
        }
    },
    sourcePoint: {
        x: 360,
        y: 350
    },
    targetPoint: {
        x: 440,
        y: 430
    }
},
{
    id: "draggable",
    type: 'Orthogonal',
    annotations: [{ content: 'EndDraggable = False',horizontalAlignment: 'Right' , verticalAlignment: 'Bottom'  }],
    constraints: (ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb) &~(ConnectorConstraints.DragSourceEnd | ConnectorConstraints.DragTargetEnd),
     style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2
    },
    targetDecorator: {
        style: {
            fill: '#6BA5D7',
            strokeColor: '#6BA5D7'
        }
    },
    sourcePoint: {
        x: 460,
        y: 350
    },
    targetPoint: {
        x: 540,
        y: 430
    }
},
{
    id: "segmentThumb",
    type: 'Orthogonal',
    annotations: [{ content: 'SegmentThumb = False',horizontalAlignment: 'Right' , verticalAlignment: 'Bottom'  }],
    constraints: ConnectorConstraints.Default &~ ConnectorConstraints.Drag,
     style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2
    },
    targetDecorator: {
        style: {
            fill: '#6BA5D7',
            strokeColor: '#6BA5D7'
        }
    },
    sourcePoint: {
        x: 580,
        y: 350
    },
    targetPoint: {
        x: 660,
        y: 430
    }
},];

public handles: UserHandleModel[] = [
  {
    name: 'delete', pathData: "M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76 96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04 91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z",
    visible: true, offset: 0.5, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
}
];

public selectedItems: SelectorModel = {
  userHandles: this.handles
};
public contextMenuSettings: ContextMenuSettingsModel = {show:true};
public getCustomTool: Function = this.getTool.bind(this);

public getTool(action: string) { 
  if (action == "delete") {
      this.diagram.remove();
  }
  };

public zoomingChange(args){
  this.diagram.constraints = this.diagram.constraints ^ DiagramConstraints.Zoom;
}
public undoRedoChange(args){
  this.diagram.constraints = this.diagram.constraints ^ DiagramConstraints.UndoRedo ;
  this.diagram.dataBind();
}

public editingChange(args){
    for (let i: number = 0; i < this.diagram.nodes.length; i++) {
        var node = this.diagram.nodes[i];
        for (let j: number = 0; j < node.annotations.length; j++) {
          if (node.annotations[j].content) {
            if (args.checked) {
              if (node.id !== 'Plus') {
                node.annotations[j].constraints =
                  node.annotations[j].constraints ^
                  AnnotationConstraints.ReadOnly;
              }
            } else {
              node.annotations[j].constraints =
                node.annotations[j].constraints | AnnotationConstraints.ReadOnly;
            }
          }
        }
      }
      for (let x: number = 0; x < this.diagram.connectors.length; x++) {
        var connector = this.diagram.connectors[x];
        for (let y: number = 0; y < connector.annotations.length; y++) {
          if (connector.annotations[y].content) {
            if (args.checked) {
              if (connector.id === 'select') {
                connector.constraints =
                  connector.constraints & ~(ConnectorConstraints.Select);
              } else {
                connector.annotations[y].constraints =
                  connector.annotations[y].constraints ^
                  AnnotationConstraints.ReadOnly;
              }
            } else {
              connector.annotations[y].constraints =
                connector.annotations[y].constraints ^
                AnnotationConstraints.ReadOnly;
            }
          }
        }
      }
      this.diagram.dataBind();
}

public contextChange(args){
  if (args.checked) {
  this.diagram.contextMenuSettings.show = true;
  this.diagram.refresh();
    } 
else {
  this.diagram.contextMenuSettings.show = false;
    }
  this.diagram.dataBind();
}

public selectableChange(args){
  for (let i : number = 0; i < this.diagram.nodes.length; i++) {
    let node = this.diagram.nodes[i];
    if (args.checked) {
        node.constraints  = node.constraints | NodeConstraints.Select;
    } 
    else 
    {
        node.constraints = node.constraints &~  NodeConstraints.Select;
    }
    this.diagram.dataBind();
}
for (let j : number = 0; j < this.diagram.connectors.length; j++) {
  let connector = this.diagram.connectors[j];
  if (args.checked) {
      if(connector.id ==="select"){
          connector.constraints= connector.constraints^ ConnectorConstraints.Select;
      }
      else{
          connector.constraints  = connector.constraints | ConnectorConstraints.Select;
      }
  } 
  else
  {
      if(connector.id ==="endThumb"){
          connector.constraints= connector.constraints ^ ConnectorConstraints.Select;
      }
      else
      {
      connector.constraints = connector.constraints &~ ConnectorConstraints.Select;
      }
  }
  this.diagram.dataBind();
}

}

public draggableChange(args){
  for (let i:number = 0; i < this.diagram.nodes.length; i++) {
    let nodes = this.diagram.nodes[i];
    if (args.checked) {
         if(nodes.id ==="ellipse"){
            nodes.constraints = NodeConstraints.Default & ~ NodeConstraints.Drag;
        }
        else{
            nodes.constraints = nodes.constraints | NodeConstraints.Drag;
        }
    } 
    else {
          nodes.constraints = nodes.constraints &~ NodeConstraints.Drag;
    }
    this.diagram.dataBind();
}
for (let j : number = 0; j < this.diagram.connectors.length; j++) {
  let connectors = this.diagram.connectors[j];
    if (args.checked) {
        connectors.constraints =  connectors.constraints | ConnectorConstraints.Drag;   
    } else 
    {
        connectors.constraints = connectors.constraints  &~ ConnectorConstraints.Drag;   
    }
    this.diagram.dataBind();
}
}
public selectionChange(args : ISelectionChangeEventArgs){
  if(args.state === 'Changing')
  {
      if(args.type === 'Addition')
      {
          if(args.newValue[0].id === "endThumb")
      {
        this.diagram.selectedItems.constraints =(SelectorConstraints.All ) &~ ( SelectorConstraints.ConnectorSourceThumb | SelectorConstraints.ConnectorTargetThumb) ;
          args.newValue[0].constraints = (ConnectorConstraints.Default  | ConnectorConstraints.DragSegmentThumb) &~ (ConnectorConstraints.Drag);
      }
      else{
        this.diagram.selectedItems.constraints = SelectorConstraints.All;
          }
      }
      else
      {
        this.diagram.selectedItems.constraints = SelectorConstraints.All;
      }
                  
  }  
  if(args.state === "Changed")
  {
      if(args.newValue.length>0 && args.newValue[0] instanceof Node){
        this.diagram.selectedItems = { constraints: SelectorConstraints.All|SelectorConstraints.UserHandle, userHandles: this.handles };
          }
          else{
              if(args.newValue.length>0 && args.newValue[0].id !== "endThumb"){
                this.diagram.selectedItems = { constraints: SelectorConstraints.All &~ SelectorConstraints.UserHandle };
              }
              else{
                this.diagram.selectedItems = { constraints: SelectorConstraints.All &~(SelectorConstraints.UserHandle|SelectorConstraints.ConnectorSourceThumb | SelectorConstraints.ConnectorTargetThumb)   };
              }
          }
  }
}

}
