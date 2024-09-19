import { Component, ViewEncapsulation, ViewChild,Inject } from '@angular/core';
import { DiagramComponent, SymbolPaletteModule, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, SnapSettingsModel, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel, ScrollSettingsModel, Rect
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from './script/diagram-common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
Diagram.Inject(UndoRedo);

/**
 * Default FlowShape sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'scrolling.html',
    styleUrls: ['scrolling.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SymbolPaletteModule, DiagramModule, DropDownListModule, TextBoxModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
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
  public connectorAnnotationStyle: TextStyleModel = { fill: 'white' };
  public strokeStyle: StrokeStyleModel = { strokeDashArray: '2,2' };

  public segments: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Top', length: 120 }];
  public segments1: OrthogonalSegmentModel = [
    { type: 'Orthogonal', direction: 'Right', length: 100 }
  ];
  //Sets the default values of a Connector.
  public connectorDefaults(connector: Connector): ConnectorModel {
    //set styles for connector
    var color = '#757575';
    connector.style.strokeWidth = 1;
    connector.style.strokeColor = color;
    connector.targetDecorator.style.fill = color;
    connector.targetDecorator.style.strokeColor = color;
    return connector;
  }
   //Disable the scrollable area
  public created(): void {
    var ScrollElement = document.getElementById('scrollableDiv');
    ScrollElement.className = "disabledbutton";
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
 //Sets the Node style for DragEnter element.
  public dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj && obj.width && obj.height) {
      let nodeWidth: number = obj.width;
      let nodeHeight: number = obj.height;
      let ratio: number = 100 / obj.width;
      obj.width = 100;
      obj.height *= ratio;
      obj.offsetX += (obj.width - nodeWidth) / 2;
      obj.offsetY += (obj.height - nodeHeight) / 2;
      obj.style = { fill: '#357BD2', strokeColor: 'white' };
      obj.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
    }
  }

  //SymbolPalette Properties
  public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
  public expandMode: ExpandMode = 'Single';
  //Initialize the basicShapes for the symbol palatte
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
//Initialize the flowshapes for the symbol palatte
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
      id: 'orthogonal',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 }
    },
    {
      id: 'orthogonalConnector',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'straight',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 }
    },
    {
      id: 'straightConnector',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'bezier',
      type: 'Bezier',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
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
      iconCss: 'e-ddb-icons e-diagram-connector',
      title: 'Connectors'
    }
  ];

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }

  public getSymbolDefaults(symbol: NodeModel): void {
    var obj = symbol;
    if (obj.id === 'terminator1' || obj.id === 'process1') {
        obj.width = 80;
        obj.height = 40;
    }
    else if (obj.id === 'decision1' || obj.id === 'document1' || obj.id === 'preDefinedProcess1' ||
        obj.id === 'paperTap1' || obj.id === 'directData1' || obj.id === 'multiDocument1' || obj.id === 'data1') {
        obj.width = 50;
        obj.height = 40;
    }
    else {
        obj.width = 50;
        obj.height = 50;
    }
    obj.style.strokeColor = '#757575';
  }
   //Sets the scroll limit
public  scrollLimitDatasource = [
    { text: 'Infinity', value: 'Infinity' }, { text: 'Diagram', value: 'Diagram' },
    { text: 'Limited', value: 'Limited' }
];
  
public value: string = 'Infinity';
 //Initializes a checkbox to enable or disable autoscroll
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
//Initializes a dropdown for scrollLimit
public scrollLimitChange(args:any){
  var element = document.getElementById('scrollableDiv');
  element.className = args.value === "Limited" ? "" : "disabledbutton";
  this.diagram.scrollSettings.scrollLimit = args.value;
}
// Sets the horizontal scroll position of the diagram's scrollable area.
public scrollableX(args:any){
  this.diagram.scrollSettings.scrollableArea.x = Number(args.value);
}
// Sets the vertical scroll position of the diagram's scrollable area.
public scrollableY(args:any){
  this.diagram.scrollSettings.scrollableArea.y = Number(args.value);
}
// Sets the width of the diagram's scrollable area.
public scrollableWidth(args:any){
  this.diagram.scrollSettings.scrollableArea.width = Number(args.value);
}
// Sets the height of the diagram's scrollable area.
public scrollableHeight(args:any){
  this.diagram.scrollSettings.scrollableArea.height = Number(args.value);
}
// Sets the left auto-scroll border based on the provided value.
public autoScrollLeft(args:any){
  this.diagram.scrollSettings.autoScrollBorder.left = Number(args.value);
}
// Sets the top auto-scroll border based on the provided value.
public autoScrollTop(args:any){
  this.diagram.scrollSettings.autoScrollBorder.top = Number(args.value);
}
// Sets the right auto-scroll border based on the provided value.
public autoScrollRight(args:any){
  this.diagram.scrollSettings.autoScrollBorder.right = Number(args.value);
}
// Sets the bottom auto-scroll border based on the provided value.
public autoScrollBottom(args:any){
  this.diagram.scrollSettings.autoScrollBorder.bottom = Number(args.value);
}
public scrollSettings : ScrollSettingsModel = {
  scrollLimit : 'Infinity',
  canAutoScroll: true, autoScrollBorder: { left: 10, right: 10, top: 10, bottom: 10 },
  scrollableArea: this.scrollableArea
};

  public diagramCreate(args: Object): void {
    paletteIconClick();
  }
}
