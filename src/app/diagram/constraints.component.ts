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
  public created(args: any) {
    this.diagram.rulerSettings = {
      showRulers : true
    }
  }
  //Initializes the nodes for the diagram
  public nodes : NodeModel[] = [
    {
        id:"textNode1",
        // Position of the node
        offsetX:340,
        offsetY: 50,
        // Size of the node
        width: 550,
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
        height: 65,
        shape: { type: 'Basic', shape: 'Rectangle' },
        annotations: [{ content: 'Selection = False', }],
        constraints: NodeConstraints.Default & ~ NodeConstraints.Select
    },
    {
        id:"ellipse",
        offsetX:190,
        offsetY:160,
        height: 80,
        shape: { type: 'Basic', shape: 'Ellipse',cornerRadius: 10 },
        annotations: [{ content: 'Dragging = False' }],
        constraints:  NodeConstraints.Default & ~ NodeConstraints.Drag
       
    },
    {
        id:"heptagon",
        offsetX:295,
        offsetY:160,
        height: 80,
        shape: { type: 'Basic', shape: 'Heptagon' },
        annotations: [{ content: 'Delete = False' }],
        constraints: NodeConstraints.Default & ~ NodeConstraints.Delete
    },
    {
        id:"directData",
        offsetX:410,
        offsetY:160,
        height: 80,
        rotateAngle:-45,
        shape: { type: 'Flow', shape: 'DirectData' },
        annotations: [{ content: 'Rotate = False' }],
        constraints: NodeConstraints.Default &~ NodeConstraints.Rotate
    },
    {
        id:"Plus",
        offsetX:530,
        offsetY:160,
        height: 80,
        shape: { type: 'Basic', shape: 'Plus' },
        annotations: [{ content: 'TextEdit = False',constraints: AnnotationConstraints.ReadOnly }],
    },
    {
        id:"decision",
        offsetX:630,
        offsetY:160,
        height: 80,
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

//Defines the default node properties
public nodeDefaults(nodes: NodeModel): void {
  if(nodes.id !== "textNode1" && nodes.id !== "textNode2") {
    nodes.width = 80;
    nodes.style.fill = '#C7E6FF';
    nodes.style.strokeColor = '#1587FF';
    }
};

//Defines the default connector properties
public connectorDefaults(connectors: ConnectorModel): void {
  connectors.style.strokeColor = '#6BA5D7';
  connectors.style.fill = '#6BA5D7';
  connectors.style.strokeWidth = 2;
  connectors.targetDecorator.style.strokeColor = '#6BA5D7';
  connectors.targetDecorator.style.fill = '#6BA5D7';
};

// Define selectedItems property with initial configuration
public selectedItems: SelectorModel = {
  userHandles: this.handles // Assuming this.handles is defined elsewhere
};
// Define contextMenuSettings property with initial configuration to show the context menu
public contextMenuSettings: ContextMenuSettingsModel = {
  show: true // Show the context menu
};
// Define getCustomTool function as a method bound to the current instance ('this')
public getCustomTool: Function = this.getTool.bind(this);

// Method used to delete objects using user handle
public getTool(action: string) { 
  if (action === "delete") {
    this.diagram.remove(); // Assuming this.diagram is your diagram instance and has a 'remove' method
  }
}

//Function used to enable zooming of diagram
public zoomingChange(args: any){
  this.diagram.constraints = this.diagram.constraints ^ DiagramConstraints.Zoom;
}
//Function used to enable undo redo in diagram
public undoRedoChange(args: any){
  this.diagram.constraints = this.diagram.constraints ^ DiagramConstraints.UndoRedo ;
  this.diagram.dataBind();
}

// Function used to enable or disable editing for annotations in the diagram
public editingChange(args: { checked: any; }) {
  // Loop through all nodes in the diagram
  for (let i: number = 0; i < this.diagram.nodes.length; i++) {
    let node = this.diagram.nodes[i];
    // Check if the node has annotations and content
    if (node.annotations.length > 0 && node.annotations[0].content) {
      // Enable or disable editing based on the checkbox state
      if (args.checked) {
        // Enable editing if not 'Plus' node
        if (node.id !== 'Plus') {
          node.annotations[0].constraints =
            node.annotations[0].constraints ^ AnnotationConstraints.ReadOnly; // Toggle ReadOnly constraint off
        }
      } else {
        // Disable editing
        node.annotations[0].constraints =
          node.annotations[0].constraints | AnnotationConstraints.ReadOnly; // Apply ReadOnly constraint
      }
    }
  }
  // Loop through all connectors in the diagram
  for (let x: number = 0; x < this.diagram.connectors.length; x++) {
    let connector = this.diagram.connectors[x];
    // Check if the connector has annotations and content
    if (connector.annotations.length > 0 && connector.annotations[0].content) {
      // Enable or disable editing based on the checkbox state
      if (args.checked) {
        // Disable selection for specific 'select' connector
        if (connector.id === 'select') {
          connector.constraints =
            connector.constraints & ~(ConnectorConstraints.Select); // Toggle off Select constraint
        } else {
          connector.annotations[0].constraints =
            connector.annotations[0].constraints ^ AnnotationConstraints.ReadOnly; // Toggle ReadOnly constraint off
        }
      } else {
        // Enable editing
        connector.annotations[0].constraints =
          connector.annotations[0].constraints ^ AnnotationConstraints.ReadOnly; // Toggle ReadOnly constraint off
      }
    }
  }
  // Commit changes to the diagram
  this.diagram.dataBind();
}

//Function used to enable context menu on right click
public contextMenuChange(args: { checked: any; }){
  if (args.checked) {
  this.diagram.contextMenuSettings.show = true;
  this.diagram.refresh();
    } 
else {
  this.diagram.contextMenuSettings.show = false;
    }
  this.diagram.dataBind();
}

// Function used to enable or disable selection in the diagram
public elementSelectableChange(args: { checked: any; }) {
  // Loop through all nodes in the diagram
  for (let i: number = 0; i < this.diagram.nodes.length; i++) {
    let node = this.diagram.nodes[i];
    // Check if the checkbox is checked
    if (args.checked) {
      // Enable selection for the node
      node.constraints = node.constraints | NodeConstraints.Select;
    } else {
      // Disable selection for the node
      node.constraints = node.constraints & ~NodeConstraints.Select;
    }
    // Commit changes to the diagram
    this.diagram.dataBind();
  }
  // Loop through all connectors in the diagram
  for (let j: number = 0; j < this.diagram.connectors.length; j++) {
    let connector = this.diagram.connectors[j];
    // Check if the checkbox is checked
    if (args.checked) {
      // Enable selection for the connector, except for specific cases
      if (connector.id === "select") {
        connector.constraints = connector.constraints ^ ConnectorConstraints.Select; // Toggle select for 'select' id connector
      } else {
        connector.constraints = connector.constraints | ConnectorConstraints.Select;
      }
    } else {
      // Disable selection for the connector, except for specific cases
      if (connector.id === "endThumb") {
        connector.constraints = connector.constraints ^ ConnectorConstraints.Select; // Toggle select for 'endThumb' id connector
      } else {
        connector.constraints = connector.constraints & ~ConnectorConstraints.Select;
      }
    }
    // Commit changes to the diagram
    this.diagram.dataBind();
  }
}

//Function used to enable dragging intractions in diagram
public draggableChange(args: { checked: any; }){
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
//Looping diagram connectors
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
// Define the selectionChange method for handling selection events
public selectionChange(args: ISelectionChangeEventArgs) {
  // Check if the selection state is 'Changing'
  if (args.state === 'Changing') {
    // Handle addition type of selection change
    if (args.type === 'Addition') {
      // Check if the newly added item is 'endThumb'
      if (args.newValue[0].id === "endThumb") {
        // Adjust selected items constraints for 'endThumb' scenario
        this.diagram.selectedItems.constraints =
          (SelectorConstraints.All) &
          ~(SelectorConstraints.ConnectorSourceThumb |
            SelectorConstraints.ConnectorTargetThumb);

        // Modify constraints for the 'endThumb' specific item
        args.newValue[0].constraints =
          (ConnectorConstraints.Default |
            ConnectorConstraints.DragSegmentThumb) &
          ~(ConnectorConstraints.Drag);
      } else {
        // Set default constraints for other selections
        this.diagram.selectedItems.constraints = SelectorConstraints.All;
      }
    } else {
      // Set default constraints for other types of selection changes
      this.diagram.selectedItems.constraints = SelectorConstraints.All;
    }
  }

  // Check if the selection state is 'Changed'
  if (args.state === "Changed") {
    // Handle selection change when newValue is a Node instance
    if (args.newValue.length > 0 && args.newValue[0] instanceof Node) {
      this.diagram.selectedItems = {
        constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
        userHandles: this.handles  // Assuming handles is defined somewhere
      };
    } else {
      // Handle selection change for connectors or other cases
      if (args.newValue.length > 0 && args.newValue[0].id !== "endThumb") {
        this.diagram.selectedItems = {
          constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle
        };
      } else {
        this.diagram.selectedItems = {
          constraints: SelectorConstraints.All & ~(
            SelectorConstraints.UserHandle |
            SelectorConstraints.ConnectorSourceThumb |
            SelectorConstraints.ConnectorTargetThumb
          )
        };
      }
    }
  }
}

}
