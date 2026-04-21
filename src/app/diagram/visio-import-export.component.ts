import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import {
  DiagramComponent, DiagramTools, SymbolPaletteModule, DiagramModule, SymbolInfo,
  NodeModel, ConnectorModel, Connector, IDragEnterEventArgs, ISelectionChangeEventArgs,
  MarginModel, Node, PaletteModel, BpmnDiagramsService, UndoRedoService, ImportAndExportVisioService, FlowShapes
} from '@syncfusion/ej2-angular-diagrams';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ClickEventArgs, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from './script/diagram-common';
import { AsyncSettingsModel, FileInfo } from '@syncfusion/ej2-inputs';
import { ToastComponent, ToastModule } from '@syncfusion/ej2-angular-notifications';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Visio Import/Export
 */

@Component({
  selector: 'control-content',
  templateUrl: 'visio-import-export.html',
  styleUrls: ['visio-import-export.css', 'diagram-common.style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ToolbarModule, SplitButtonModule, SymbolPaletteModule, DiagramModule, UploaderModule, ToastModule, SBDescriptionComponent],
  providers: [BpmnDiagramsService, UndoRedoService, ImportAndExportVisioService]
})

export class VisioImportDiagramComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;
  @ViewChild('toolbar')
  public toolbar: ToolbarComponent;
  @ViewChild('toast')
  public toast: ToastComponent;
  @ViewChild('defaultupload')
  public uploadObject: UploaderComponent;
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['diagram-common.style.css'];
  }
  public asyncSettings: AsyncSettingsModel = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };
  public toastPosition = { X: 'Right', Y: 'Bottom' };

  // Helper method to create a process node
  private createNode(id: string, content: string, offsetY: number, shape: FlowShapes = 'Process',
    offsetX: number = 400, width: number = 100, height: number = 50, ports?: any[]): NodeModel {
    return {
      id,
      shape: { type: 'Flow', shape: shape },
      style: { fill: '#357BD2', strokeColor: 'white' },
      annotations: [{ content, style: { color: 'white' } }],
      offsetX,
      offsetY,
      width,
      height,
      ...(ports && { ports }),
    };
  }

  // Helper method to create a connector
  private createConnector(id: string, sourceID: string, targetID: string, annotation?: string,
    sourcePortID?: string, targetPortID?: string): ConnectorModel {
    return {
      id,
      sourceID,
      targetID,
      type: 'Orthogonal',
      ...(annotation && {
        annotations: [{
          content: annotation,
          alignment: annotation === 'Yes' ? 'After' : 'Before',
          displacement: annotation === 'Yes' ? { x: 5, y: 0 } : { x: 5, y: 5 },
        }],
      }),
      ...(sourcePortID && { sourcePortID }),
      ...(targetPortID && { targetPortID }),
    };
  }

  // Define the nodes using helper method
  public nodes: NodeModel[] = [
    this.createNode('start', 'Start', 80, 'Terminator'),
    this.createNode('draft', 'Draft', 180, 'Process', 400, 100, 50, [
      { id: 'rightport', offset: { x: 1, y: 0.5 } },
    ]),
    this.createNode('approvedDecision', 'Approved?', 280, 'Decision', 400, 120, 60),
    this.createNode('revise', 'Revise', 280, 'Process', 600, 100, 50, [
      { id: 'rightport', offset: { x: 1, y: 0.5 } },
    ]),
    this.createNode('copyedit', 'Copyedit', 400),
    this.createNode('proof', 'Proof', 500),
    this.createNode('finalrevise', 'Revise', 600),
    this.createNode('finalize', 'Finalize', 700),
    this.createNode('publish', 'Publish', 800, 'Terminator')
  ];

  // Define the connectors using helper method
  public connectors: ConnectorModel[] = [
    this.createConnector('connector1', 'start', 'draft'),
    this.createConnector('connector2', 'draft', 'approvedDecision'),
    this.createConnector('connector3', 'approvedDecision', 'copyedit', 'Yes'),
    this.createConnector('connector4', 'approvedDecision', 'revise', 'No'),
    this.createConnector('connector5', 'revise', 'draft', undefined, 'rightport', 'rightport'),
    this.createConnector('connector6', 'copyedit', 'proof'),
    this.createConnector('connector7', 'proof', 'finalrevise'),
    this.createConnector('connector8', 'finalrevise', 'finalize'),
    this.createConnector('connector9', 'finalize', 'publish'),
  ];

  //Sets the default values of a node
  public nodeDefaults(node: NodeModel): NodeModel {
    node.style = { fill: '#357BD2', strokeColor: 'white' };
    if (node.annotations.length > 0) {
      node.annotations[0].style = { color: 'white' };
    }
    return node;
  }

  //To enable and disable the toolbar items based on selection.
  public selectionChange(args: ISelectionChangeEventArgs): void {
    if (args.state === 'Changed') {
      let selectedItems: NodeModel[] = this.diagram.selectedItems.nodes;
      selectedItems = selectedItems.concat(
        (this.diagram.selectedItems as any).connectors
      );
      if (selectedItems.length === 0) {
        this.updateToolbarState(['Cut', 'Copy', 'Delete'], false);
      }
      if (selectedItems.length === 1) {
        this.updateToolbarState(['Cut', 'Copy', 'Delete'], true);
      }

      if (selectedItems.length > 1) {
        this.updateToolbarState(['Cut', 'Copy', 'Delete'], true);
      }
    }
  }

  //To enable and disable undo/redo button.
  public historyChange(): void {
    this.updateToolbarState(['Undo'], this.diagram.historyManager.undoStack.length !== 0);
    this.updateToolbarState(['Redo'], this.diagram.historyManager.redoStack.length !== 0);
  }

  //Sets the Node style for DragEnter element.
  public dragEnter(args: IDragEnterEventArgs): void {
    const obj: NodeModel = args.element as NodeModel;
    if (obj instanceof Node) {
      let objWidth: number = obj.width;
      let objHeight: number = obj.height;
      let ratio: number = 100 / obj.width;
      obj.width = 100;
      obj.height *= ratio;
      obj.offsetX += (obj.width - objWidth) / 2;
      obj.offsetY += (obj.height - objHeight) / 2;
    }
  }

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }

  public created(): void {
    paletteIconClick();
    this.diagram.fitToPage();
  }

  // Handle Visio import status and show toast messages
  public diagramImporting(args: any): void {
    this.toast.timeOut = 0;
    this.toast.showCloseButton = false;
    if (args.status === 'started') {
      this.updateToolbarState(['Export', 'Import'], false); // Disable buttons
      this.toast.hide();
      this.toast.timeOut = 1000;
      this.toast.title = 'Importing Diagram';
      this.toast.content = 'The Visio diagram is being imported. Please wait...';
      this.toast.cssClass = 'e-toast-info';
      this.toast.show();
    } else if (args.status === 'completed') {
      this.toast.showCloseButton = true;
      this.toast.timeOut = 3000;
      this.toast.title = 'Import Complete';
      this.toast.content = 'The Visio diagram has been imported successfully.';
      this.toast.cssClass = 'e-toast-success';
      this.toast.show();
      this.diagram.fitToPage();
      this.updateToolbarState(['Export', 'Import'], true); // Enable buttons
    } else if (args.status === 'failed') {
      this.toast.showCloseButton = true;
      this.toast.timeOut = 3000;
      this.toast.title = 'Import Failed';
      this.toast.content = 'The Visio diagram import failed. Please try again.';
      this.toast.cssClass = 'e-toast-danger';
      this.toast.show();
      this.updateToolbarState(['Export', 'Import'], true); // Enable buttons
    }
  }

  // Handle Visio export status and show toast messages
  public diagramExporting(args: any): void {
    this.toast.timeOut = 0;
    this.toast.showCloseButton = false;
    if (args.status === 'started') {
      this.updateToolbarState(['Export', 'Import'], false); // Disable buttons
      this.toast.hide();
      this.toast.timeOut = 1000;
      this.toast.title = 'Exporting Diagram';
      this.toast.content = 'The diagram is being exported to Visio. Please wait...';
      this.toast.cssClass = 'e-toast-info';
      this.toast.show();
    } else if (args.status === 'completed') {
      this.toast.showCloseButton = true;
      this.toast.timeOut = 3000;
      this.toast.title = 'Export Complete';
      this.toast.content = 'The diagram has been exported successfully.';
      this.toast.cssClass = 'e-toast-success';
      this.toast.show();
      this.updateToolbarState(['Export', 'Import'], true); // Enable buttons
    } else if (args.status === 'failed') {
      this.toast.showCloseButton = true;
      this.toast.timeOut = 3000;
      this.toast.title = 'Export Failed';
      this.toast.content = 'The diagram export failed. Please try again.';
      this.toast.cssClass = 'e-toast-danger';
      this.toast.show();
      this.updateToolbarState(['Export', 'Import'], true); // Enable buttons
    }
  }

  //SymbolPalette Properties
  public expandMode: ExpandMode = 'Multiple';

  // Define the palette nodes for "Flow Shapes"
  private flowShapes: NodeModel[] = [
    { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
    { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
    { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'PredefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
    { id: 'Data', shape: { type: 'Flow', shape: 'Data' } },
    { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' } },
    { id: 'ManualInput', shape: { type: 'Flow', shape: 'ManualInput' } },
    { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' } },
  ];

  // Define the palette nodes for "Basic Shapes"
  private basicShapes: NodeModel[] = [
    { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
    { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
    { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
    { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
    { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
    { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
    { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
    { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
    { id: 'Star', shape: { type: 'Basic', shape: 'Star' } },
    { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
  ];

  // Define the palette connectors for "Connectors"
  private paletteConnectors: ConnectorModel[] = [
    {
      id: 'Link1', type: 'Orthogonal',
      targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
    },
    {
      id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
    },
    {
      id: 'Link4', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'Link5', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'None' }
    },
  ];

  // Define the palettes for the SymbolPalette
  public palettes: PaletteModel[] = [
    {
      id: 'flowShapesPalette',
      expanded: true,
      symbols: this.flowShapes,
      title: 'Flow Shapes',
      iconCss: 'e-ddb-icons e-flow'
    },
    {
      id: 'basicShapesPalette',
      expanded: false,
      symbols: this.basicShapes,
      title: 'Basic Shapes',
      iconCss: 'e-ddb-icons e-basic'
    },
    {
      id: 'connectorsPalette',
      expanded: false,
      symbols: this.paletteConnectors,
      title: 'Connectors',
      iconCss: 'e-ddb-icons e-diagram-connector'
    },
  ];

  public nodeSymbolDefaults(symbol: NodeModel): void {
    symbol.style = { fill: '#357BD2', strokeColor: 'white' };
    symbol.width = 40;
    symbol.height = 40;
  }
  //Sets the default values of a connector
  public connectorSymbolDefaults(connector: Connector): void {
    connector.sourcePoint = { x: 0, y: 0 };
    connector.targetPoint = { x: 60, y: 60 };
    connector.style = { strokeWidth: 1, strokeColor: '#757575' };
  }

  // Function to update the toolbar state based on selected nodes constraints
  public updateToolbarState(itemIds: string[], isEnabled: boolean) {
    itemIds.forEach((itemId) => {
      this.toolbar.enableItems(document.getElementById(itemId).parentElement, isEnabled);
    });
  }

  // To handle toolbar click
  public toolbarClicked(args: ClickEventArgs) {
    let item: string = (args as any).item.tooltipText;
    let selectedItems = this.diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors as any);
    switch (item) {
      case 'Undo':
        this.diagram.undo();
        break;
      case 'Redo':
        this.diagram.redo();
        break;
      case 'Cut':
        this.diagram.cut();
        this.updateToolbarState(["Paste"], true);
        break;
      case 'Copy':
        this.diagram.copy();
        this.updateToolbarState(["Paste"], true);
        break;
      case 'Paste':
        this.diagram.paste();
        break;
      case 'Delete':
        this.diagram.remove();
        break;
      case 'New Diagram':
        this.diagram.clear();
        this.historyChange();
        break;
      case 'Export as Visio (.vsdx)':
        this.diagram.exportToVisio();
        break;
      case 'Import Visio (.vsdx)':
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        break;
    }
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
  ];

  //To handle selection of drawing connectors.
  public onConnectorSelect(args: any) {
    this.diagram.clearSelection();
    this.diagram.drawingObject = { type: args.item.text } as ConnectorModel;
    this.diagram.tool = DiagramTools.DrawOnce;
    this.diagram.dataBind();
  }

  //To handle selection of drawing shapes.
  public onShapesSelect(args: any) {
    this.diagram.clearSelection();
    this.diagram.drawingObject = {
      shape: { shape: args.item.text },
      style: { fill: '#357BD2', strokeColor: 'white' }
    } as NodeModel;
    this.diagram.tool = DiagramTools.DrawOnce;
    this.diagram.dataBind();
  }

  //set up uploaded file
  public async onUploadSuccess(args: any): Promise<void> {
    let fileObj: FileInfo = args.file;
    let rawFile: File = fileObj.rawFile as File;
    await this.diagram.importFromVisio(rawFile);
    this.diagram.width = '100%';
    this.diagram.height = '700px';
    this.uploadObject.clearAll(); // clears the file list AND resets the internal input
  }

}
