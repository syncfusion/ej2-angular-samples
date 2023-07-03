import { Component, ViewEncapsulation, ViewChild,Inject } from '@angular/core';
import { ConnectorConstraints, DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, SnapSettingsModel, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel, UserHandleModel, SelectorModel, SelectorConstraints, ISelectionChangeEventArgs, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from './script/diagram-common';
Diagram.Inject(UndoRedo);

/**
 * Default FlowShape sample
 */

@Component({
  selector: 'control-content',
  templateUrl: 'grouping-and-ordering.html',
  styleUrls: ['default-functionalities.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupingAndOrderingComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;
  @ViewChild('sample')
  public comboBoxObj: ComboBoxComponent;
  public tool: DiagramTools;
  ngOnInit(): void {
debugger
  }

  @ViewChild('toolbar')
public toolbar: ToolbarComponent;
  constructor(){

  }​​​​​​​
  
  public created(): void {
    this.diagram.rulerSettings = {
      showRulers : true
    };
  }
  public drawingObject : any = {type : 'Orthogonal'};

  public nodes : NodeModel[] = [
    {
    id:"Diamond",
    // Position of the node
    offsetX: 350,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 100,
    shape: { type: 'Basic', shape: 'Diamond' },
    annotations: [{
    content: 'Decision'
    }]
    },
    {
    id:"ellipse",
    // Position of the node
    offsetX: 150,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' },
    annotations: [{
        content: 'Start/Stop'
    }]
    },
    {
    id:"node1",
    // Position of the node
    offsetX: 150,
    offsetY: 100,
    // Size of the node
    width: 100,
    height: 55,
    shape: { type: 'Basic', shape: 'Rectangle' },
    },
    {
    id:"node2",
    // Position of the node
    offsetX: 350,
    offsetY: 100,
    // Size of the node
    width: 90,
    height: 55,
    // style: { fill: '#6BA5D7', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'Rectangle' ,cornerRadius:5},
    },
    {
    id: 'group',
    children: ['node1', 'node2'],
    padding:{left:10,right:10,top:10,bottom:10},
    annotations: [{
      content: 'Group 1'
  },
],
style : { strokeWidth : 0, fill : 'transparent'}
},
  {
    id:"rectangle",
    // Position of the node
    offsetX: 150,
    offsetY: 400,
    // Size of the node
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Rectangle' },
    annotations: [{
      content: 'Process'
    }]
  },
  ];


  public dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj && obj.width && obj.height) {
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

  //SymbolPalette Properties
  public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
  public expandMode: ExpandMode = 'Multiple';
  //Initialize the flowshapes for the symbol palatte
  private basicShapes: NodeModel[] = [
    { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' }, style: { strokeWidth: 2 } },
    { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeWidth: 2 } },
    { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' }, style: { strokeWidth: 2 } },
    { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' }, style: { strokeWidth: 2 } },
    { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' }, style: { strokeWidth: 2 } },
    { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' }, style: { strokeWidth: 2 } },
    { id: 'Star', shape: { type: 'Basic', shape: 'Star' }, style: { strokeWidth: 2 } },
    { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' }, style: { strokeWidth: 2 } },
    { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' }, style: { strokeWidth: 2 } },
    { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' }, style: { strokeWidth: 2 } },
    { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' }, style: { strokeWidth: 2 } },
    { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' }, style: { strokeWidth: 2 } },
    { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' }, style: { strokeWidth: 2 } },
    { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' }, style: { strokeWidth: 2 } },
    { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' }, style: { strokeWidth: 2 } },
  ];

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

  public fields : Object = {
    value: 'type', text: 'text' 
  }

  public getSymbolDefaults(symbol: NodeModel): void {
    symbol.style.strokeColor = '#757575';
    if (symbol.id === 'Terminator' || symbol.id === 'Process') {
      symbol.width = 80;
      symbol.height = 40;
    } else if (
      symbol.id === 'Decision' ||
      symbol.id === 'Document' ||
      symbol.id === 'PreDefinedProcess' ||
      symbol.id === 'PaperTap' ||
      symbol.id === 'DirectData' ||
      symbol.id === 'MultiDocument' ||
      symbol.id === 'Data'
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



public toolbarClick(args) {
  switch (args.item.tooltipText) {
      case 'Group':
          this.diagram.group();
          this.toolbar.items[0].disabled = true;
          this.toolbar.items[1].disabled = false;
          break;
      case 'UnGroup':
          this.diagram.unGroup();
          break;
      case 'Bring Forward':
           this.diagram.moveForward();
          break;
      case 'Bring To Front':
        this.diagram.bringToFront();
          break;
      case 'Send Backward':
        this.diagram.sendBackward();
          break;
      case 'Send To Back':
        this.diagram.sendToBack();
          break;
      case 'Bold':
          this.updateAnnotationValue('bold',args.value,null,11,true);
      break;
      case 'Italic':
          this.updateAnnotationValue('italic',args.value,null,12, true);  
      break;
      case 'Underline':
          this.updateAnnotationValue('underline',args.value,null,13, true);
      break;
    }
    this.diagram.dataBind();
}
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

public selectedItems: SelectorModel = {
  userHandles: this.handles
};
public drawingNode : any;

public selectionChange(args: ISelectionChangeEventArgs): void {
if(args.state === "Changed")
{
  var selectedItems = this.diagram.selectedItems.nodes;
  selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors as any);
  if(selectedItems.length===0){
    this.toolbar.items[0].disabled = true;
    this.toolbar.items[1].disabled = true;
    this.toolbar.items[3].disabled = true;
    this.toolbar.items[4].disabled = true;
    this.toolbar.items[5].disabled = true;
    this.toolbar.items[6].disabled = true;
    this.toolbar.items[8].disabled = true;
    this.toolbar.items[10].disabled = true;
    this.toolbar.items[11].disabled = true;
    this.toolbar.items[12].disabled = true;
    this.toolbar.items[13].disabled = true;
    this.toolbar.items[14].disabled = true;
    }
    if(selectedItems.length === 1){
      this.enableItems();
      this.disableMultiselectedItems(selectedItems);
     
    if(selectedItems[0].children !== undefined && selectedItems[0].children.length>0){
      this.toolbar.items[1].disabled = false;
      this.disableMultiselectedItems(selectedItems);
    }
    else{
      this.toolbar.items[1].disabled = true;
    }
    
    }
    if(selectedItems.length > 1){
      this.enableItems();
      this.toolbar.items[0].disabled = false; 
      this.toolbar.items[1].disabled = true;
      this.disableMultiselectedItems(selectedItems);
    }
  if(args.newValue.length>0 && args.newValue[0] instanceof Node){
    this.diagram.selectedItems = { constraints: SelectorConstraints.All| SelectorConstraints.UserHandle, userHandles: this.handles };
      if(this.diagram.selectedItems.nodes.length>0){
          this.drawingNode = this.diagram.selectedItems.nodes[this.diagram.selectedItems.nodes.length-1];
      }
    }
  else
  {
    debugger
    this.diagram.selectedItems = { constraints: SelectorConstraints.All&~ SelectorConstraints.UserHandle };
  }
}
};

public enableItems()
{
  this.toolbar.items[3].disabled = false;
  this.toolbar.items[4].disabled = false;
  this.toolbar.items[5].disabled = false;
  this.toolbar.items[6].disabled = false;
}

 public disableMultiselectedItems (selectedItems){
  for(let i : number = 0 ;i < selectedItems.length;i++){
    if(selectedItems[i].annotations[0] !== undefined){
      this.toolbar.items[8].disabled = false;
      this.toolbar.items[10].disabled = false;
      this.toolbar.items[11].disabled = false;
      this.toolbar.items[12].disabled = false;
      this.toolbar.items[13].disabled = false;
      this.toolbar.items[14].disabled = false;
    }
    else{
      this.toolbar.items[8].disabled = true;
      this.toolbar.items[10].disabled = true;
      this.toolbar.items[11].disabled = true;
      this.toolbar.items[12].disabled = true;
      this.toolbar.items[13].disabled = true;
      this.toolbar.items[14].disabled = true;
    }
  }
};

public getCustomTool: Function = this.getTool.bind(this);

public getTool(action: string) {  
  if (action == "Delete") {
      this.diagram.remove();
  }
  else if (action == "Clone"){
    this.diagram.paste(this.diagram.selectedItems.selectedObjects);
  }
  else if (action == "Draw"){
    this.diagram.drawingObject.shape = {};
    (this.diagram.drawingObject as any).type = (this.diagram.drawingObject as any).type?(this.diagram.drawingObject as any).type: 'Orthogonal';
    (this.diagram.drawingObject as any).sourceID = this.drawingNode.id;
    this.diagram.dataBind();
    }
  };
 
public updateAnnotationValue(value, fontSize, fontFamily,index,isSelected) {
  for (let i : number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
      let node = this.diagram.selectedItems.nodes[i];
      for (var j = 0; j < node.annotations.length; j++) {
          var annotationstyle = node.annotations[j].style;
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
          if(annotationstyle.textDecoration ==="None"){
            annotationstyle.textDecoration = 'Underline';
          }
          else{
            annotationstyle.textDecoration = 'None';
            }
          }
        this.diagram.dataBind();
      }
    }
  }

  public colorChange(args){
    for (let i : number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
      var nodes = this.diagram.selectedItems.nodes[i];
      for (let j : number = 0; j < nodes.annotations.length; j++) {
          nodes.annotations[j].style.color = args.currentValue.rgba;
          this.diagram.dataBind();
      }
  }
  }
  
  public fontSizeChange(args){
    this.updateAnnotationValue('fontsize', args.value, null,10, true);
  }

  public fontFamily(args){
    this.updateAnnotationValue('fontfamily', null, args.itemData.text,8,true);
  }
}