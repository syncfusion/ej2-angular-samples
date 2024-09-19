import { Component, Inject, ViewChild } from '@angular/core';
import {
  DiagramComponent, DiagramModule, NodeModel, ConnectorModel, SymbolPaletteModule, GridlinesModel, IScrollChangeEventArgs, IDragEnterEventArgs,
  PaletteModel, FileFormats, Connector, IExportOptions, FlowShapeModel, Node, DiagramTools, PathAnnotationModel, DataBindingService, PrintAndExportService, FlowchartLayoutService
} from '@syncfusion/ej2-angular-diagrams';
import { ToolbarModule, ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent, ButtonModule, FabModule } from '@syncfusion/ej2-angular-buttons';
import { UploaderModule, InputEventArgs } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownButtonComponent, DropDownButtonModule, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { DataManager } from '@syncfusion/ej2-data';
import { flowchartData, flowShapes, exportItems, zoomMenuItems, connectorSymbols } from './datasource';
import { convertTextToFlowchart } from './ai-flowchart';
@Component({
  selector: 'app-smart-flowchart',
  standalone: true,
  imports: [DiagramModule, SymbolPaletteModule, ToolbarModule, ButtonModule, FabModule, UploaderModule, DialogModule, DropDownButtonModule, TextBoxModule],
  providers: [DataBindingService, PrintAndExportService, FlowchartLayoutService],
  templateUrl: './smart-flowchart.component.html',
  styleUrl: './smart-flowchart.component.css'
})
export class SmartFlowchartComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-smart-flowchart.component.html',
      'smart-flowchart.component.css',
      'ai-flowchart.ts'
    ];
  }
  @ViewChild('diagram', { static: true }) public diagram!: DiagramComponent;
  @ViewChild('dialog', { static: true }) public dialog!: DialogComponent;
  @ViewChild('msgBtn1', { static: true }) public msgBtn1!: ButtonComponent;
  @ViewChild('msgBtn2', { static: true }) public msgBtn2!: ButtonComponent;
  @ViewChild('msgBtn3', { static: true }) public msgBtn3!: ButtonComponent;
  @ViewChild('textBox', { static: true }) public textBox!: TextBoxComponent;
  @ViewChild('sendButton', { static: true }) public sendButton!: ButtonComponent;
  public dataManager = new DataManager(flowchartData);
  public asyncSettings: Object = {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  };
  public palettes: PaletteModel[] = [
    { id: 'flow', expanded: true, symbols: flowShapes, iconCss: 'e-ddb-icons e-flow', title: 'Flow Shapes' },
    { id: 'connectors', expanded: true, symbols: connectorSymbols, iconCss: 'e-ddb-icons e-connector', title: 'Connectors' }
  ];
  public zoomMenuItems: any = zoomMenuItems;
  public exportItems: any = exportItems;
  public gridlines: GridlinesModel = {
    lineColor: '#e0e0e0',
    lineIntervals: [
      1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
    ]
  };
  public zoomContent: any;
  public diagramTools: any = DiagramTools;

  public getNodeDefaults(node: NodeModel): NodeModel {
    if (node.width === undefined) {
      node.width = 150;
      node.height = 50;
    }
    if ((node.shape as FlowShapeModel).type === 'Flow' && (node.shape as FlowShapeModel).shape === 'Decision') {
      node.width = 120;
      node.height = 100;
    }
    return node;
  }
  public getConnectorDefaults(connector: Connector): ConnectorModel {
    connector.type = 'Orthogonal';
    if (connector.annotations && connector.annotations.length > 0) {
      (connector.annotations as PathAnnotationModel[])[0]!.style!.fill = 'white';
    }
    return connector;
  }

  ngOnInit(): void {
    if (this.diagram) {
      document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && document.activeElement === (this.textBox as any).element.nativeElement) {
          if ((this.textBox as any).value !== '') {
            (this.dialog as any).hide();
            convertTextToFlowchart((this.textBox as any).value, this.diagram);
          }
        }
      });
      this.zoomContent = Math.round(this.diagram.scrollSettings.currentZoom! * 100) + ' %'
    }
  }

  // Handles drag enter events
  public dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj instanceof Node) {
      let ratio: number = 100 / obj.width;
      obj.width = 100;
      obj.height *= ratio;
      obj.offsetX += (obj.width - obj.width) / 2;
      obj.offsetY += (obj.height - obj.height) / 2;
      obj.style = { fill: '#357BD2', strokeColor: 'white' };
    }
  }

  showDialog() {
    this.dialog.show();
  }

  onSendClick() {
    this.dialog.hide();
    convertTextToFlowchart((this.textBox as any).value, this.diagram);
  }

  onBtnClick(msg: any) {
    this.dialog.hide();
    convertTextToFlowchart(msg, this.diagram);
  }

  onScrollChange(args: IScrollChangeEventArgs) {
    if (args.panState !== 'Start') {
      let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
      zoomCurrentValue.content = Math.round(this.diagram.scrollSettings.currentZoom! * 100) + ' %';
    }
  }

  // Returns symbol defaults
  public getSymbolDefaults(symbol: NodeModel): void {
    const wideSymbols = new Set(['Terminator', 'Process', 'Delay']);
    const mediumSymbols = new Set(['Decision', 'Document', 'PreDefinedProcess', 'PaperTap', 'DirectData', 'MultiDocument', 'Data']);

    symbol.style = { strokeColor: '#757575' };

    if (wideSymbols.has((symbol as Node).id)) {
      symbol.width = 80;
      symbol.height = 40;
    } else if (mediumSymbols.has((symbol as Node).id)) {
      symbol.width = 50;
      symbol.height = 40;
    } else {
      symbol.width = 50;
      symbol.height = 50;
    }
  }

  public getSymbolInfo(): { fit: boolean } {
    return { fit: true };
  }

  // Export and print logic
  public printDiagram(): void {
    let options: IExportOptions = {};
    options.mode = 'Download';
    options.region = 'Content';
    options.multiplePage = this.diagram.pageSettings.multiplePage;
    options.pageHeight = this.diagram.pageSettings.height;
    options.pageWidth = this.diagram.pageSettings.width;
    this.diagram.print(options);
  }

  // Toolbar actions
  public toolbarClick(args: ClickEventArgs): void {
    let item = args.item.tooltipText;
    switch (item) {
      case 'Select Tool':
        this.diagram.clearSelection();
        this.diagram.tool = DiagramTools.Default;
        break;
      case 'Pan Tool':
        this.diagram.clearSelection();
        this.diagram.tool = DiagramTools.ZoomPan;
        break;
      case 'New Diagram':
        this.diagram.clear();
        break;
      case 'Print Diagram':
        this.printDiagram();
        break;
      case 'Save Diagram':
        this.download(this.diagram.saveDiagram());
        break;
      case 'Open Diagram':
        (document.getElementsByClassName('e-file-select-wrap') as any)[0]
          .querySelector('button')
          .click();
        break;
    }
    this.diagram.dataBind();
  }

  // Zoom change handler
  public zoomChange(args: MenuEventArgs): void {
    const currentZoom = this.diagram.scrollSettings.currentZoom!;
    let zoomFactor: number;

    switch (args.item.text) {
      case 'Zoom In':
        this.diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        break;
      case 'Zoom Out':
        this.diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        break;
      case 'Zoom to Fit':
        zoomFactor = 1 / currentZoom - 1;
        this.diagram.zoomTo({ zoomFactor });
        break;
      case 'Zoom to 50%':
        zoomFactor = 0.5 / currentZoom - 1;
        this.diagram.zoomTo({ zoomFactor });
        break;
      case 'Zoom to 100%':
        zoomFactor = 1 / currentZoom - 1;
        this.diagram.zoomTo({ zoomFactor });
        break;
      case 'Zoom to 200%':
        zoomFactor = 2 / currentZoom - 1;
        this.diagram.zoomTo({ zoomFactor });
        break;
    }

    const zoomCurrentValue: DropDownButtonComponent = (document.getElementById('btnZoomIncrement') as any).ej2_instances[0];
    if (this.diagram.scrollSettings.currentZoom)
      zoomCurrentValue.content = Math.round(this.diagram.scrollSettings.currentZoom * 100) + '%';
  }

  public onselectExport(args: MenuEventArgs): void {
    let exportOptions: IExportOptions = {
      format: args.item.text as FileFormats,
      mode: 'Download',
      region: 'PageSettings',
      fileName: 'Export',
      margin: { left: 0, top: 0, right: 0, bottom: 0 }
    };
    this.diagram.exportDiagram(exportOptions);
  }

  // Handle file upload success
  public onUploadSuccess(args: any): void {
    let reader = new FileReader();
    reader.readAsText(args.file.rawFile);
    reader.onloadend = (event: any) => {
      this.diagram.loadDiagram(event.target.result);
    };
  }

  // Download diagram as JSON
  public download(data: string): void {
    if ((window.navigator as any).msSaveBlob) {
      let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
      let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      let element = document.createElement('a');
      element.href = dataString;
      element.download = 'Diagram.json';
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  }

  // Handle textbox input change
  public onTextBoxChange(args: InputEventArgs) {
    if (args.value !== '') {
      this.sendButton.disabled = false;
    } else {
      this.sendButton.disabled = true;
    }
  }

}
