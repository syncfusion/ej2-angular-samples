import { Component, ViewEncapsulation, ViewChild,Inject } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, SnapSettingsModel, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel, ScrollSettingsModel, Rect
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from './script/diagram-common';
Diagram.Inject(UndoRedo);

/**
 * Default FlowShape sample
 */

@Component({
  selector: 'control-content',
  templateUrl: 'scrolling.html',
  styleUrls: ['scrolling.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScrollingComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;
  constructor() {​​​​​​​
    
}​​​​​​​
  public terminator: FlowShapeModel = { type: 'Flow', shape: 'Terminator' };
  public process: FlowShapeModel = { type: 'Flow', shape: 'Process' };
  public decision: FlowShapeModel = { type: 'Flow', shape: 'Decision' };
  public data: FlowShapeModel = { type: 'Flow', shape: 'Data' };
  public directdata: FlowShapeModel = { type: 'Flow', shape: 'DirectData' };

  public margin: MarginModel = { left: 25, right: 25 };
  public connAnnotStyle: TextStyleModel = { fill: 'white' };
  public strokeStyle: StrokeStyleModel = { strokeDashArray: '2,2' };

  public segments: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Top', length: 120 }];
  public segments1: OrthogonalSegmentModel = [
    { type: 'Orthogonal', direction: 'Right', length: 100 }
  ];

  public nodeDefaults(node: NodeModel): NodeModel {
    let obj: NodeModel = {};
    if (obj.width === undefined) {
      obj.width = 145;
    } else {
      let ratio: number = 100 / obj.width;
      obj.width = 100;
      obj.height *= ratio;
    }
    obj.style = { fill: '#357BD2', strokeColor: 'white' };
    obj.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
    return obj;
  }
  public connDefaults(obj: Connector): void {
    if (obj.id.indexOf('connector') !== -1) {
      obj.type = 'Orthogonal';
      obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
    }
  }
  public created(): void {
    var element2 = document.getElementById('scrollableDiv');
    element2.className = "disabledbutton";
    this.diagram.rulerSettings = {
      showRulers : true
    }
  }
  public interval: number[] = [
    1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
    9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
  ];

  public snapSettings: SnapSettingsModel = {
    horizontalGridlines: { lineColor: '#e0e0e0', lineIntervals: this.interval },
    verticalGridlines: { lineColor: '#e0e0e0', lineIntervals: this.interval }
  };

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
  public expandMode: ExpandMode = 'Single';
  //Initialize the flowshapes for the symbol palatte
  private basicShapes: NodeModel[] = [
    {
      id: 'rectangle', shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
      id: 'ellipse', shape: { type: 'Basic', shape: 'Ellipse' }
  },
  {
      id: 'triangle', shape: { type: 'Basic', shape: 'Triangle' }
  },
  {
      id: 'plus', shape: { type: 'Basic', shape: 'Plus' }
  },
  {
      id: 'star', shape: { type: 'Basic', shape: 'Star' }
  },
  {
      id: 'pentagon', shape: { type: 'Basic', shape: 'Pentagon' }
  },
  {
      id: 'heptagon', shape: { type: 'Basic', shape: 'Heptagon' }
  },
  {
      id: 'octagon', shape: { type: 'Basic', shape: 'Octagon' }
  },
  {
      id: 'trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' }
  },
  {
      id: 'decagon', shape: { type: 'Basic', shape: 'Decagon' }
  },
  {
      id: 'rightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' }
  },
  {
      id: 'parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' }
  },
  ]

  private flowshapes: NodeModel[] = [
    { id: 'terminator1', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'process1', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'extract1', shape: { type: 'Flow', shape: 'Extract' } },
    { id: 'manualOperation1', shape: { type: 'Flow', shape: 'ManualOperation' } },
    { id: 'merge1', shape: { type: 'Flow', shape: 'Merge' } },
    { id: 'offPageReference1', shape: { type: 'Flow', shape: 'OffPageReference' } },
    { id: 'sequentialAccessStorage1', shape: { type: 'Flow', shape: 'SequentialAccessStorage' } },
    { id: 'annotation1', shape: { type: 'Flow', shape: 'Annotation' } },
    { id: 'annotation21', shape: { type: 'Flow', shape: 'Annotation2' } },
    { id: 'data1', shape: { type: 'Flow', shape: 'Data' } },
    { id: 'summingJunction1', shape: { type: 'Flow', shape: 'SummingJunction' } },
    { id: 'or1', shape: { type: 'Flow', shape: 'Or' } },
    { id: 'internalStorage1', shape: { type: 'Flow', shape: 'InternalStorage' } },
    { id: 'card1', shape: { type: 'Flow', shape: 'Card' } },
    { id: 'delay1', shape: { type: 'Flow', shape: 'Delay' } },
    { id: 'decision1', shape: { type: 'Flow', shape: 'Decision' } },
    { id: 'document1', shape: { type: 'Flow', shape: 'Document' } },
    { id: 'preDefinedProcess1', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
    { id: 'paperTap1', shape: { type: 'Flow', shape: 'PaperTap' } },
    { id: 'directData1', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'sequentialData1', shape: { type: 'Flow', shape: 'SequentialData' } },
    { id: 'sort1', shape: { type: 'Flow', shape: 'Sort' } },
    { id: 'multiDocument1', shape: { type: 'Flow', shape: 'MultiDocument' } },
    { id: 'collate1', shape: { type: 'Flow', shape: 'Collate' } },
  ];

   //Initializes connector symbols for the symbol palette
   private connectorSymbols: ConnectorModel[] = [
    {
      id: 'Link1',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link3',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'Link21',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link23',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'link33',
      type: 'Bezier',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    }
  ];

  public palettes: PaletteModel[] = [
    {
      id: 'basic',
      expanded: true,
      symbols: this.basicShapes,
      iconCss: 'e-ddb-icons e-basic',
      title: 'Basic Shapes'
    },
    {
      id: 'flow',
      expanded: false,
      symbols: this.flowshapes,
      iconCss: 'e-ddb-icons e-flow',
      title: 'Flow Shapes'
    },
    {
      id: 'connectors',
      expanded: false,
      symbols: this.connectorSymbols,
      iconCss: 'shapes',
      title: 'Connectors'
    }
  ];

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }

  public getSymbolDefaults(symbol: NodeModel): void {
    var obj = symbol;
    if (obj.id === 'terminator' || obj.id === 'process') {
        obj.width = 80;
        obj.height = 40;
    }
    else if (obj.id === 'decision' || obj.id === 'document' || obj.id === 'preDefinedProcess' ||
        obj.id === 'paperTap' || obj.id === 'directData' || obj.id === 'multiDocument' || obj.id === 'data') {
        obj.width = 50;
        obj.height = 40;
    }
    else {
        obj.width = 50;
        obj.height = 50;
    }
    obj.style.strokeColor = '#757575';
  }
public  scrollLimitDatasource = [
    { text: 'Infinity', value: 'Infinity' }, { text: 'Diagram', value: 'Diagram' },
    { text: 'Limited', value: 'Limited' }
];
  
public value: string = 'Infinity';

public canAutoScrollFn(args:any){
  let autoScrollArea = document.getElementById('autoScrollDiv');
  if(args.checked){
    this.diagram.scrollSettings.canAutoScroll = true;
    autoScrollArea.className = "";
  }else{
    this.diagram.scrollSettings.canAutoScroll = false;
    autoScrollArea.className = "disabledbutton";
  }
  this.diagram.dataBind();
}

public scrollableArea = new Rect(0, 0, 1500, 1500);

public scrollLimitChange(args){
  var element = document.getElementById('scrollableDiv');
  element.className = args.value === "Limited" ? "" : "disabledbutton";
  this.diagram.scrollSettings.scrollLimit = args.value;
}

public scrollableX(args){
  this.diagram.scrollSettings.scrollableArea.x = Number(args.value);
}
public scrollableY(args){
  this.diagram.scrollSettings.scrollableArea.y = Number(args.value);
}
public scrollableWidth(args){
  this.diagram.scrollSettings.scrollableArea.width = Number(args.value);
}
public scrollableHeight(args){
  this.diagram.scrollSettings.scrollableArea.height = Number(args.value);
}

public autoScrollLeft(args){
  this.diagram.scrollSettings.autoScrollBorder.left = Number(args.value);
}

public autoScrollTop(args){
  this.diagram.scrollSettings.autoScrollBorder.top = Number(args.value);
}

public autoScrollRight(args){
  this.diagram.scrollSettings.autoScrollBorder.right = Number(args.value);
}

public autoScrollBottom(args){
  this.diagram.scrollSettings.autoScrollBorder.bottom = Number(args.value);
}
public scrollSettings : ScrollSettingsModel = {
  scrollLimit : 'Infinity',
  canAutoScroll: false, autoScrollBorder: { left: 10, right: 10, top: 10, bottom: 10 },
  scrollableArea: this.scrollableArea
};

  public diagramCreate(args: Object): void {
    paletteIconClick();
  }
}
