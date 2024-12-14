import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { ConnectorConstraints, DiagramComponent, DiagramTools, IExportOptions, IHistoryChangeArgs, ISelectionChangeEventArgs, NodeConstraints, ZoomOptions, SymbolPaletteModule, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ClickEventArgs, ItemModel, MenuEventArgs, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, SnapSettingsModel, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from './script/diagram-common';
import { AsyncSettingsModel } from '@syncfusion/ej2-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo);

/**
 * Default FlowShape sample
 */

@Component({
  selector: 'control-content',
  templateUrl: 'default-functionalities.html',
  styleUrls: ['default-functionalities.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ToolbarModule, SplitButtonModule, SymbolPaletteModule, DiagramModule, UploaderModule, SBDescriptionComponent]
})
export class FlowDiagramComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;
  @ViewChild('toolbar')
  public toolbar: ToolbarComponent;
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['diagram-common.style.css'];
  }
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
  public drawingObject: any;
  public asyncSettings: AsyncSettingsModel = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };
  //Sets the default values of a node
  public nodeDefaults(node: NodeModel): NodeModel {
    if (node.width === undefined) {
      node.width = 145;
    }
    node.style = { fill: '#357BD2', strokeColor: 'white' };
    for (let i: number = 0; i < node.annotations.length; i++) {
      node.annotations[i].style = {
        color: 'white',
        fill: 'transparent',
      };
    }
    node.ports = getPorts(node);
    return node;
  }
  //Sets the default values of a connector
  public connectorDefaults(obj: Connector): void {
    if (obj.id.indexOf('connector') !== -1) {
      obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
    }
  }
  public created(): void {
    this.diagram.fitToPage();
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
      let objWidth: number = obj.width;
      let objHeight: number = obj.height;
      let ratio: number = 100 / obj.width;
      obj.width = 100;
      obj.height *= ratio;
      obj.offsetX += (obj.width - objWidth) / 2;
      obj.offsetY += (obj.height - objHeight) / 2;
      obj.style = { fill: '#357BD2', strokeColor: 'white' };
    }
  }

  //SymbolPalette Properties
  public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
  public expandMode: ExpandMode = 'Multiple';

  //Function to get flowshapes.
  public getFlowShape(id: string, shapeType: any): NodeModel {
    let flowshape: NodeModel = { id: id, shape: { type: 'Flow', shape: shapeType } };
    return flowshape;
  }
  //Initialize the flowshapes for the symbol palatte
  private flowshapes: NodeModel[] = [
    this.getFlowShape('Terminator', 'Terminator'),
    this.getFlowShape('Process', 'Process'),
    this.getFlowShape('Decision', 'Decision'),
    this.getFlowShape('Document', 'Document'),
    this.getFlowShape('PreDefinedProcess', 'PreDefinedProcess'),
    this.getFlowShape('PaperTap', 'PaperTap'),
    this.getFlowShape('DirectData', 'DirectData'),
    this.getFlowShape('SequentialData', 'SequentialData'),
    this.getFlowShape('Sort', 'Sort'),
    this.getFlowShape('MultiDocument', 'MultiDocument'),
    this.getFlowShape('Collate', 'Collate'),
    this.getFlowShape('Or', 'Or'),
    this.getFlowShape('Extract', 'Extract'),
    this.getFlowShape('Merge', 'Merge'),
    this.getFlowShape('OffPageReference', 'OffPageReference'),
    this.getFlowShape('SequentialAccessStorage', 'SequentialAccessStorage'),
    this.getFlowShape('Annotation', 'Annotation'),
    this.getFlowShape('Annotation2', 'Annotation2'),
    this.getFlowShape('Data', 'Data'),
    this.getFlowShape('Card', 'Card'),
    this.getFlowShape('Delay', 'Delay'),
  ];

  // Function to create connector symbols
  private createConnectorSymbol(id: string, type: any, targetDecoratorShape: any, strokeColor: string = '#757575'): ConnectorModel {
    return {
      id: id,
      type: type,
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: strokeColor },
      targetDecorator: { shape: targetDecoratorShape, style: { strokeColor: strokeColor, fill: strokeColor } }
    };
  }

  // Initializes connector symbols for the symbol palette
  private connectorSymbols: ConnectorModel[] = [
    this.createConnectorSymbol('Link1', 'Orthogonal', 'Arrow'),
    this.createConnectorSymbol('Link2', 'Orthogonal', 'None'),
    this.createConnectorSymbol('Link3', 'Straight', 'Arrow'),
    this.createConnectorSymbol('Link4', 'Straight', 'None'),
    this.createConnectorSymbol('Link5', 'Bezier', 'None')
  ];
  //To Initialise Symbol palette
  public palettes: PaletteModel[] = [
    {
      id: 'flow',
      expanded: true,
      symbols: this.flowshapes,
      iconCss: 'shapes',
      title: 'Flow Shapes'
    },
    {
      id: 'connectors',
      expanded: true,
      symbols: this.connectorSymbols,
      iconCss: 'shapes',
      title: 'Connectors'
    }
  ];

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }
  //To set Default values for symbol palette
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
  //To enable and disable the toolbar items based on selection.
  public selectionChange(args: ISelectionChangeEventArgs): void {
    if (args.state === 'Changed') {
      var selectedItems = this.diagram.selectedItems.nodes;
      selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors as any);
      if (selectedItems.length === 0) {
        const itemIds = ['Cut', 'Copy', 'Lock', 'Delete', 'Order', 'Rotate', 'Flip'];
        itemIds.forEach(itemId => {
          const item = this.toolbar.items.find(item => item.id === itemId);
          if (item) {
            item.disabled = true;
          }
        });
        this.disableMultiselectedItems();
      }
      if (selectedItems.length === 1) {
        this.enableItems();
        this.disableMultiselectedItems();

        if (selectedItems[0].children !== undefined && selectedItems[0].children.length > 0) {
          var Index = this.toolbar.items.findIndex(item => item.id === 'Group');
          if (Index !== -1) {
            this.toolbar.items[Index].disabled = false;
          }
        }
        else {
          var Index = this.toolbar.items.findIndex(item => item.id === 'Group');
          if (Index !== -1) {
            this.toolbar.items[Index].disabled = true;
          }
        }

      }

      if (selectedItems.length > 1) {
        this.enableItems();
        const itemIds = ['Align_objects', 'Group'];
        itemIds.forEach(itemId => {
          const item = this.toolbar.items.find(item => item.id === itemId);
          if (item) {
            item.disabled = false;
          }
        });
        //To enable distribute objcets when selected items length is greater than 2
        if (selectedItems.length > 2) {
          var Index = this.toolbar.items.findIndex(item => item.id === 'Distribute_objects');
          if (Index !== -1) {
            this.toolbar.items[Index].disabled = false;
          }
        }
        else {
          var Index = this.toolbar.items.findIndex(item => item.id === 'Distribute_objects');
          if (Index !== -1) {
            this.toolbar.items[Index].disabled = true;
          }
        }
      }

    }
  }
  //To enable and disable undo/redo button.
  public historyChange(args: IHistoryChangeArgs): void {
    const undoItem = this.toolbar.items.find(item => item.id === 'Undo');
    if (undoItem) {
      undoItem.disabled = this.diagram.historyManager.undoStack.length > 0 ? false : true;
    }
    const redoItem = this.toolbar.items.find(item => item.id === 'Redo');
    if (redoItem) {
      redoItem.disabled = this.diagram.historyManager.redoStack.length > 0 ? false : true;
    }
  }
  // Function to update the toolbar state based on selected nodes constraints
  public updateToolbarState(isLocked) {
    const itemIds = ['Cut', 'Copy', 'Delete', 'Order', 'Rotate', 'Flip'];
    itemIds.forEach(itemId => {
      const item = this.toolbar.items.find(item => item.id === itemId);
      if (item) {
        item.disabled = isLocked;
      }
    });
    var Index = this.toolbar.items.findIndex(item => item.id === 'Lock');
    if (Index !== -1) {
      this.toolbar.items[Index].disabled = false;
    }

  }
  // To enable toolbar items
  public enableItems() {
    const itemIds = ['Cut', 'Copy', 'Lock', 'Delete', 'Order', 'Rotate', 'Flip'];
    itemIds.forEach(itemId => {
        const item = this.toolbar.items.find(item => item.id === itemId);
        if (item) {
            item.disabled = false;
        }
    });
  }
  //To disable toolbar items
  public disableMultiselectedItems() {
    const itemIds = ['Align_objects', 'Distribute_objects', 'Group'];
    itemIds.forEach(itemId => {
        const item = this.toolbar.items.find(item => item.id === itemId);
        if (item) {
            item.disabled = true;
        }
    });
  }
  // To handle toolbar click
  public clicked(args: ClickEventArgs) {
    var item = (args as any).item.tooltipText;
    switch (item) {
      case 'Undo':
        this.diagram.undo();
        break;
      case 'Redo':
        this.diagram.redo();
        break;
      case 'Lock':
        this.lockObject();
        break;
      case 'Cut':
        this.diagram.cut();
        var pasteIndex =  this.toolbar.items.findIndex(item => item.id === 'Paste');
                if (pasteIndex !== -1) {
                  this.toolbar.items[pasteIndex].disabled = false;
                }
        break;
      case 'Copy':
        this.diagram.copy();
        var pasteIndex = this.toolbar.items.findIndex(item => item.id === 'Paste');
        if (pasteIndex !== -1) {
          this.toolbar.items[pasteIndex].disabled = false;
        }
        break;
      case 'Paste':
        this.diagram.paste();
        break;
      case 'Delete':
        this.diagram.remove();
        break;
      case 'Select Tool':
        this.diagram.clearSelection();
        this.diagram.tool = DiagramTools.Default;
        break;
      case 'Text Tool':
        this.diagram.clearSelection();
        this.diagram.selectedItems.userHandles = [];
        this.diagram.drawingObject = { shape: { type: 'Text' }, };
        this.diagram.tool = DiagramTools.ContinuousDraw;
        break;
      case 'Pan Tool':
        this.diagram.clearSelection();
        this.diagram.tool = DiagramTools.ZoomPan;
        break;
      case 'New Diagram':
        this.diagram.clear();
        this.historyChange(args as any);
        break;
      case 'Print Diagram':
        this.printDiagram(args);
        break;
      case 'Save Diagram':
        this.download(this.diagram.saveDiagram());
        break;
      case 'Open Diagram':
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        break;
    }
    this.diagram.dataBind();
  }

  //Icons for Zoom Items
  public zoomMenuItems = [
    { text: 'Zoom In' },
    { text: 'Zoom Out' }, { text: 'Zoom to Fit' },
    { text: 'Zoom to 50%' },
    { text: 'Zoom to 100%' },
    { text: 'Zoom to 200%' },
  ]

  // To perform zoom operation
  public zoomChange(args) {
    var currentZoom = this.diagram.scrollSettings.currentZoom;
    var zoom: ZoomOptions = {};
    switch (args.item.text) {
      case 'Zoom In':
        this.diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        break;
      case 'Zoom Out':
        this.diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        break;
      case 'Zoom to Fit':
        zoom.zoomFactor = 1 / currentZoom - 1;
        this.diagram.zoomTo(zoom);
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
  }
  //To handle selection of connectors.
  public onConnectorSelect(args: any) {
    debugger
    this.diagram.clearSelection();
    this.diagram.drawingObject = { type: args.item.text };
    this.diagram.tool = DiagramTools.ContinuousDraw;
    this.diagram.selectedItems.userHandles = [];
    this.diagram.dataBind();
  }
  //Connector Icons
  public conTypeItems = [
    { text: 'Straight', iconCss: 'e-icons e-line' },
    { text: 'Orthogonal', iconCss: 'sf-icon-orthogonal' },
    { text: 'Bezier', iconCss: 'sf-icon-bezier' }
  ];
  //Shape Icons
  public shapesItems = [
    { text: 'Rectangle', iconCss: 'e-rectangle e-icons' },
    { text: 'Ellipse', iconCss: ' e-circle e-icons' },
    { text: 'Polygon', iconCss: 'e-line e-icons' }
  ];
  //To handle selection of shapes.
  public onShapesSelect(args) {
    this.diagram.clearSelection();
    this.diagram.drawingObject = { shape: { shape: args.item.text } };
    this.diagram.tool = DiagramTools.ContinuousDraw;
    this.diagram.selectedItems.userHandles = [];
    this.diagram.dataBind();
  }
  //Icons to Group and ungroup
  public groupItems = [
    { text: 'Group', iconCss: 'e-icons e-group-1' },
    { text: 'Ungroup', iconCss: 'e-icons e-ungroup-1' }
  ];
  //Group and ungroup the diagraming object.
  public onSelectGroup(args) {
    if (args.item.text === 'Group') {
      this.diagram.group();
    }
    else if (args.item.text === 'Ungroup') {
      this.diagram.unGroup();
    }
  }
  //Icons to align items
  public alignItems = [
    { iconCss: 'sf-icon-align-left-1', text: 'Align Left' },
    { iconCss: 'sf-icon-align-center-1', text: 'Align Center' },
    { iconCss: 'sf-icon-align-right-1', text: 'Align Right' },
    { iconCss: 'sf-icon-align-top-1', text: 'Align Top' },
    { iconCss: 'sf-icon-align-middle-1', text: 'Align Middle' },
    { iconCss: 'sf-icon-align-bottom-1', text: 'Align Bottom' },
  ];
  //To align selelcted diagram objects.
  public onSelectAlignObjects(args) {
    var item = args.item.text;
    var alignType = item.replace('Align', '');
    var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
    this.diagram.align(alignType1.trim());
  }
  //Icon to distributeItems
  public distributeItems = [
    { iconCss: 'sf-icon-distribute-vertical', text: 'Distribute Objects Vertically', },
    { iconCss: 'sf-icon-distribute-horizontal', text: 'Distribute Objects Horizontally', },
  ];
  //To distribute selected objects horizontally and vertically.
  public onSelectDistributeObjects(args) {
    this.diagram.distribute(args.item.text === 'Distribute Objects Vertically' ? 'BottomToTop' : 'RightToLeft');
  }
  //OrderItem Icons
  public orderItems = [
    { iconCss: 'e-icons e-bring-forward', text: 'Bring Forward' },
    { iconCss: 'e-icons e-bring-to-front', text: 'Bring To Front' },
    { iconCss: 'e-icons e-send-backward', text: 'Send Backward' },
    { iconCss: 'e-icons e-send-to-back', text: 'Send To Back' }
  ];
  //To execute order commands
  public onSelectOrder(args) {
    switch (args.item.text) {
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
    }
  }
  //Icons for rotate button
  public rotateItems = [
    { iconCss: 'e-icons e-transform-right', text: 'Rotate Clockwise' },
    { iconCss: 'e-icons e-transform-left', text: 'Rotate Counter-Clockwise' }
  ];

  //To rotate the selected objects.
  public onSelectRotate(args) {

    this.diagram.rotate(this.diagram.selectedItems, args.item.text === 'Rotate Clockwise' ? 90 : -90);
  }
  //Flip Icons
  public flipItems = [
    { iconCss: 'e-icons e-flip-horizontal', text: 'Flip Horizontal' },
    { iconCss: 'e-icons e-flip-vertical', text: 'Flip Vertical' }
  ];
  public onSelectFlip(args) {
    this.flipObjects(args.item.text);
  }

  // To flip diagram objects
  public flipObjects(flipType) {
    var selectedObjects = this.diagram.selectedItems.nodes.concat(this.diagram.selectedItems.connectors as any);
    for (let i: number = 0; i < selectedObjects.length; i++) {
      selectedObjects[i].flip = flipType === 'Flip Horizontal' ? 'Horizontal' : 'Vertical';
    }
    this.diagram.dataBind();
  }
  //To lock the selected diagram object.
  public lockObject() {
    let isChecked;
    for (let i: number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
      let node = this.diagram.selectedItems.nodes[i];
      if (node.constraints & NodeConstraints.Drag) {
        node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select | NodeConstraints.ReadOnly;
        isChecked = true;
      } else {
        node.constraints = NodeConstraints.Default;
        isChecked = false;
      }
    }
    for (let j: number = 0; j < this.diagram.selectedItems.connectors.length; j++) {
      let connector = this.diagram.selectedItems.connectors[j];
      if (connector.constraints & ConnectorConstraints.Drag) {
        connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select | ConnectorConstraints.ReadOnly;
        isChecked = true;
      } else {
        connector.constraints = ConnectorConstraints.Default;
        isChecked = false;
      }
    }
    this.updateToolbarState(isChecked);
    this.diagram.dataBind();
  }
  public zoomContent() {
    return Math.round(this.diagram.scrollSettings.currentZoom * 100) + ' %'
  };
  // Set up print options and initiate printing of the diagram.
  public printDiagram(args) {
    var options: IExportOptions = {};
    options.mode = 'Download';
    options.region = 'Content';
    options.multiplePage = this.diagram.pageSettings.multiplePage;
    options.pageHeight = this.diagram.pageSettings.height;
    options.pageWidth = this.diagram.pageSettings.width;
    this.diagram.print(options);
  }
  //Export the diagraming object based on the format.
  public onselectExport(args) {
    var exportOptions: IExportOptions = {};
    exportOptions.format = args.item.text;
    exportOptions.mode = 'Download';
    exportOptions.region = 'PageSettings';
    exportOptions.fileName = 'Export';
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    this.diagram.exportDiagram(exportOptions);
  }
  // To save the diagram.
  public download(data: string): void {
    if ((window.navigator as any).msSaveBlob) {
      let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    } else {
      let dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      let a: HTMLAnchorElement = document.createElement('a');
      a.href = dataStr;
      a.download = 'Diagram.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }
  //set up uploaded file and call loadDiagram
  public onUploadSuccess(args: { [key: string]: Object }): void {
    debugger
    let file1: { [key: string]: Object } = args.file as { [key: string]: Object };
    let file: Blob = file1.rawFile as Blob;
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = this.loadDiagram.bind(this);
  }
  //To load diagram 
  public loadDiagram(event: ProgressEvent): void {
    this.diagram.loadDiagram((event.target as FileReader).result.toString());
  }

  public items: ItemModel[] = [
    { text: 'JPG' }, { text: 'PNG' }, { text: 'SVG' }

  ];
  public addDisabled(args: MenuEventArgs) {
    this.onselectExport(args);
  }

  public diagramCreate(args: Object): void {
    paletteIconClick();
  }
}
//Create and add ports for node.
function getPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'port3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } }
  ];
  return ports;
}