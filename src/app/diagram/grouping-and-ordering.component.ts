/**
 * Grouping and Ordering sample
 */

// Importing needed dependencies for diagram
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, SymbolPaletteModule, DiagramModule, BasicShapes } from '@syncfusion/ej2-angular-diagrams';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Diagram, NodeModel, UndoRedo, SymbolInfo, IDragEnterEventArgs, MarginModel, Node, PaletteModel, UserHandleModel, SelectorModel, 
  SelectorConstraints, ISelectionChangeEventArgs, DiagramTools } from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from './script/diagram-common';
import { SBDescriptionComponent } from '../common/dp.component';
import { NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo);


/**
 * Component for displaying a BPMN Editor  sample.
 * Manages the presentation and behavior of the diagram using Syncfusion's Angular Diagram component.
 */
@Component({
  selector: 'control-content', // Angular component selector
  templateUrl: 'grouping-and-ordering.html', // HTML template file for the component
  styleUrls: ['default-functionalities.css'], // CSS styles specific to the component
  encapsulation: ViewEncapsulation.None,// No view encapsulation
  standalone: true,  // Indicates it's a standalone component
  imports: [SBActionDescriptionComponent, ToolbarModule, ComboBoxModule, NumericTextBoxModule, ColorPickerModule, SymbolPaletteModule, DiagramModule, SBDescriptionComponent] // Importing necessary Angular modules and components
})


/**
 * Represents a diagram component of Grouping and Ordering.
 */
export class GroupingAndOrderingComponent {
  // Reference to the diagram component
  @ViewChild('diagram')
  public diagram: DiagramComponent;
  // Reference to the sample component
  @ViewChild('sample')
  public comboBoxObj: ComboBoxComponent;
  // Reference to the toolbar component
  public tool: DiagramTools;
  ngOnInit(): void {
  }

  // Reference to the toolbar component
  @ViewChild('toolbar')
  public toolbar: ToolbarComponent;
  constructor() {
  }

  public created(): void {
    this.diagram.rulerSettings = {
      showRulers: true
    };
  }
  public drawingObject: any = { type: 'Orthogonal' };


  // function to create a node
  createNode(id: string, offsetX: number, offsetY: number, width: number, height: number, shape: BasicShapes,
    annotations: any[] = [], cornerRadius: number = 0): NodeModel {
    return {
      id: id,
      offsetX: offsetX,
      offsetY: offsetY,
      width: width,
      height: height,
      shape: { type: "Basic", shape, cornerRadius: cornerRadius },
      annotations: annotations,
    };
  }

  // Initialize nodes
  public nodes: NodeModel[] = [
    this.createNode('Diamond', 350, 250, 100, 100, 'Diamond', [{ content: 'Decision' }]),
    this.createNode('ellipse', 150, 250, 100, 60, 'Ellipse', [{ content: 'Start/Stop' }]),
    this.createNode('rectangle', 150, 400, 100, 60, 'Rectangle', [{ content: 'Process' }]),
    this.createNode('node1', 150, 100, 100, 55, 'Rectangle'),
    this.createNode('node2', 350, 100, 90, 55, 'Rectangle', [], 5),
    {
      id: 'group',
      children: ['node1', 'node2'],
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
      annotations: [{ content: 'Group 1' }],
    },
  ];


  /**
  * Handles drag enter event for a node. 
  * it Adjusts the node's size and appearance when dragged into a target area.
  */
  public dragEnter(args: IDragEnterEventArgs): void {
    let node: NodeModel = args.element as NodeModel;
    if (node && node.width && node.height) {
      let nodeWidth: number = node.width;
      let nodeHeight: number = node.height;
      let ratio: number = 100 / node.width;
      node.width = 100;
      node.height *= ratio;
      node.offsetX += (node.width - nodeWidth) / 2;
      node.offsetY += (node.height - nodeHeight) / 2;
      node.style = { fill: '#357BD2', strokeColor: 'white' };
    }
  }

  // function to create a basic Shapes
  createBasicShape(id: string, shape: BasicShapes): NodeModel {
    return {
      id: id,
      shape: { type: "Basic", shape },
      style: { strokeWidth: 2 }
    }
  }
  //Initialize the basicshapes for the symbol palatte
  private basicShapes: NodeModel[] = [
    this.createBasicShape('Rectangle', 'Rectangle'),
    this.createBasicShape('Ellipse', 'Ellipse'),
    this.createBasicShape('Hexagon', 'Hexagon'),
    this.createBasicShape('Parallelogram', 'Parallelogram'),
    this.createBasicShape('Triangle', 'Triangle'),
    this.createBasicShape('Plus', 'Plus'),
    this.createBasicShape('Star', 'Star'),
    this.createBasicShape('Pentagon', 'Pentagon'),
    this.createBasicShape('Heptagon', 'Heptagon'),
    this.createBasicShape('Octagon', 'Octagon'),
    this.createBasicShape('Trapezoid', 'Trapezoid'),
    this.createBasicShape('Decagon', 'Decagon'),
    this.createBasicShape('RightTriangle', 'RightTriangle'),
    this.createBasicShape('Cylinder', 'Cylinder'),
    this.createBasicShape('Diamond', 'Diamond')
  ];

  //SymbolPalette Properties
  public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
  public expandMode: ExpandMode = 'Multiple';

  //Initialize a default shape in symbol palettes
  public palettes: PaletteModel[] = [
    {
      id: 'basic',
      expanded: true,
      symbols: this.basicShapes,
      iconCss: 'shapes',
      title: 'Basic Shapes'
    },
  ];

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }

  public fields: Object = {
    value: 'type', text: 'text'
  }

   //Initialize a default size for symbols to diagram from symbol palette
  public getSymbolDefaults(symbol: NodeModel): void {
    symbol.style.strokeColor = '#757575';
    if (symbol.id === 'Terminator' || symbol.id === 'Process') {
      symbol.width = 80;
      symbol.height = 40;
    } else if (
      symbol.id === 'Decision' || symbol.id === 'Document' ||
      symbol.id === 'PreDefinedProcess' || symbol.id === 'PaperTap' ||
      symbol.id === 'DirectData' || symbol.id === 'MultiDocument' || symbol.id === 'Data'
    ) {
      symbol.width = 50;
      symbol.height = 40;
    } else {
      symbol.width = 50;
      symbol.height = 50;
    }
  }

  public diagramCreate(args: Object): void {
    paletteIconClick();
  }
  public value: string = 'Aharoni';
  public fontTypeList = [
    { type: 'Arial', text: 'Arial' },
    { type: 'Aharoni', text: 'Aharoni' },
    { type: 'Bell MT', text: 'Bell MT' },
    { type: 'Fantasy', text: 'Fantasy' },
    { type: 'Segoe UI', text: 'Segoe UI' },
    { type: 'Times New Roman', text: 'Times New Roman' },
    { type: 'Verdana', text: 'Verdana' }
  ];


  //Handles toolbar item actions based on tooltip text.
  public toolbarClick(args): void  {
    switch (args.item.tooltipText) {
      // Group selected items
      case 'Group':
        this.diagram.group();
        this.toolbar.items.find((item: any) => item.id === 'Group').disabled = true;
        this.toolbar.items.find((item: any) => item.id === 'UnGroup').disabled = false;
        break;

      // Ungroup selected items
      case 'UnGroup':
        this.diagram.unGroup();
        break;

      // Bring selected item(s) forward
      case 'Bring Forward':
        this.diagram.moveForward();
        break;

      // Bring selected item(s) to front
      case 'Bring To Front':
        this.diagram.bringToFront();
        break;

      // Send selected item(s) backward
      case 'Send Backward':
        this.diagram.sendBackward();
        break;

      // Send selected item(s) to back
      case 'Send To Back':
        this.diagram.sendToBack();
        break;

      // Toggle bold style for selected annotation(s)
      case 'Bold':
        this.updateAnnotationValue('bold', args.value, null, 11, true);
        break;

      // Toggle italic style for selected annotation(s)
      case 'Italic':
        this.updateAnnotationValue('italic', args.value, null, 12, true);
        break;

      // Toggle underline style for selected annotation(s)
      case 'Underline':
        this.updateAnnotationValue('underline', args.value, null, 13, true);
        break;
    }
    this.diagram.dataBind();
  }

  // Handles for user interactions on diagram elements
  public handles: UserHandleModel[] = [
    {
      name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z', tooltip: { content: 'Clone' },
      visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
      name: 'Delete', pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z', tooltip: { content: 'Delete' },
      visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
      name: 'Draw', pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z', tooltip: { content: 'Draw' },
      visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
  ]

  // Configuration for selected items in the diagram
  public selectedItems: SelectorModel = {
    userHandles: this.handles
  };
  public drawingNode: any;

  // Handles the selection change event in the diagram.
  public selectionChange(args: ISelectionChangeEventArgs): void {
    if (args.state === "Changed") {
      var selectedItems = this.diagram.selectedItems.nodes;
      selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors as any);
      
      // Disabling toolbar items when no items are selected
      if (selectedItems.length === 0) {
        for (var i = 0; i < this.toolbar.items.length; i++) {
          var itemId = this.toolbar.items[i].id;
          if (itemId === "Group" || itemId === "UnGroup" || itemId === "BringForward" || itemId === "BringToFront" ||
              itemId === "SendBackward" || itemId === "SendToBack" || itemId === "Bold" || itemId === "Italic" ||
              itemId === "Underline" || itemId === "FontStyle" || itemId === "FontSize" || itemId === "FontColor") {
                this.toolbar.items[i].disabled = (selectedItems.length === 0);
          }
        }
      }
      
      // Handling single item selection
      if (selectedItems.length === 1) {
        this.enableItems();
        this.disableMultiselectedItems(selectedItems);
             
        // Enabling or disabling specific toolbar items based on selection type
        if (selectedItems[0].children !== undefined && selectedItems[0].children.length > 0) {
          this.toolbar.items.find((item: any) => item.id === 'UnGroup').disabled = false;
          this.disableMultiselectedItems(selectedItems);
        }
        else {
          this.toolbar.items.find((item: any) => item.id === 'UnGroup').disabled = true;
        }

      }
                    
      // Handling multiple items selection
      if (selectedItems.length > 1) {
        this.enableItems();
        this.toolbar.items.find((item: any) => item.id === 'Group').disabled = false;
        this.toolbar.items.find((item: any) => item.id === 'UnGroup').disabled = true;
        this.disableMultiselectedItems(selectedItems);
      }
                    
      // Handling specific scenarios when nodes are selected
      if (args.newValue.length > 0 && args.newValue[0] instanceof Node) {
        this.diagram.selectedItems = { constraints: SelectorConstraints.All | SelectorConstraints.UserHandle, userHandles: this.handles };
        if (this.diagram.selectedItems.nodes.length > 0) {
          this.drawingNode = this.diagram.selectedItems.nodes[this.diagram.selectedItems.nodes.length - 1];
        }
      }
      else {
        this.diagram.selectedItems = { constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle };
      }
    }
  };

  //Enable toolbar items for specific functionalities.
  public enableItems() {
    this.toolbar.items.find((item: any) => item.id === 'BringForward').disabled = false;
    this.toolbar.items.find((item: any) => item.id === 'BringToFront').disabled = false;
    this.toolbar.items.find((item: any) => item.id === 'SendBackward').disabled = false;
    this.toolbar.items.find((item: any) => item.id === 'SendToBack').disabled = false;
  }

  //Disable toolbar items for multi-selected elements based on their annotations.
  public disableMultiselectedItems(selectedItems) {
    for (let i: number = 0; i < selectedItems.length; i++) {
      // Check if the selected item has annotations
      if (selectedItems[i].annotations[0] !== undefined) {
        // Enable toolbar items for annotation-related functionalities
        this.toolbar.items.find((item: any) => item.id === 'FontStyle').disabled = false;
        this.toolbar.items.find((item: any) => item.id === 'FontSize').disabled = false;
        this.toolbar.items.find((item: any) => item.id === 'Bold').disabled = false;
        this.toolbar.items.find((item: any) => item.id === 'Italic').disabled = false;
        this.toolbar.items.find((item: any) => item.id === 'Underline').disabled = false;
        this.toolbar.items.find((item: any) => item.id === 'FontColor').disabled = false;
      }

      // Disable toolbar items when annotations are not present
      else {
        this.toolbar.items.find((item: any) => item.id === 'FontStyle').disabled = true;
        this.toolbar.items.find((item: any) => item.id === 'FontSize').disabled = true;
        this.toolbar.items.find((item: any) => item.id === 'Bold').disabled = true;
        this.toolbar.items.find((item: any) => item.id === 'Italic').disabled = true;
        this.toolbar.items.find((item: any) => item.id === 'Underline').disabled = true;
        this.toolbar.items.find((item: any) => item.id === 'FontColor').disabled = true;
      }
    }
  };

  public getCustomTool: Function = this.getTool.bind(this);

  
  //Initialize user handles functions
  public getTool(action: string) {
    if (action == "Delete") {
      this.diagram.remove();
    }
    else if (action == "Clone") {
      this.diagram.paste(this.diagram.selectedItems.selectedObjects);
    }
    else if (action == "Draw") {
      this.diagram.drawingObject.shape = {};
      (this.diagram.drawingObject as any).type = (this.diagram.drawingObject as any).type ? (this.diagram.drawingObject as any).type : 'Orthogonal';
      (this.diagram.drawingObject as any).sourceID = this.drawingNode.id;
      this.diagram.dataBind();
    }
  };

  /**
  * Update annotation style attributes such as font size, font family, bold, italic, and underline.
  */
  public updateAnnotationValue(value, fontSize, fontFamily, index, isSelected) {
    // Iterate through selected nodes in the diagram
    for (let i: number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
      let node = this.diagram.selectedItems.nodes[i];
      // Iterate through annotations of each node
      for (var j = 0; j < node.annotations.length; j++) {
        var annotationstyle = node.annotations[j].style;

      // Update style attributes based on the provided value
        if (value === 'fontsize') {
          annotationstyle.fontSize = fontSize;
        } else if (value === 'fontfamily') {
          annotationstyle.fontFamily = fontFamily.toString();
        }
        else if (value === 'bold') {
          annotationstyle.bold = !annotationstyle.bold;
        }
        else if (value === 'italic') {
          annotationstyle.italic = !annotationstyle.italic;
        }
        else if (value === 'underline') {
          if (annotationstyle.textDecoration === "None") {
            annotationstyle.textDecoration = 'Underline';
          }
          else {
            annotationstyle.textDecoration = 'None';
          }
        }
        this.diagram.dataBind();
      }
    }
  }

  /**
  * Function Renders a Color selector component for selecting font color.
  */
  public colorChange(args) {
    for (let i: number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
      var nodes = this.diagram.selectedItems.nodes[i];
      for (let j: number = 0; j < nodes.annotations.length; j++) {
        nodes.annotations[j].style.color = args.currentValue.rgba;
        this.diagram.dataBind();
      }
    }
  }

  /**
  * Function Renders a numeric text box component for selecting font size.
  */
  public fontSizeChange(args) {
    this.updateAnnotationValue('fontsize', args.value, null, 10, true);
  }

  /**
  * Function Renders a dropdown component for selecting font family.
  */
  public fontFamily(args) {
    this.updateAnnotationValue('fontfamily', null, args.itemData.text, 8, true);
  }
}