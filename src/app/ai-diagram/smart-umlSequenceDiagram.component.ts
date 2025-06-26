import { Component, ViewChild } from '@angular/core';
import {
  DiagramComponent, DiagramModule, NodeModel,
  IScrollChangeEventArgs, FileFormats, DiagramTools, PrintAndExportService,
  IExportOptions, SnapConstraints,
} from '@syncfusion/ej2-angular-diagrams';
import {UmlSequenceParticipant, UmlSequenceFragment, UmlSequenceDiagramModel} from '@syncfusion/ej2-diagrams';
import { ToolbarModule, ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent, ButtonModule, FabModule } from '@syncfusion/ej2-angular-buttons';
import { UploaderModule, InputEventArgs } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownButtonComponent, DropDownButtonModule, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { convertTextToUmlSequenceDiagram } from './ai-umlSequenceDiagram';
import { exportItems, sequenceModel, zoomMenuItems } from './datasource';

@Component({
  selector: 'app-smart-uml-sequence-diagram',
  providers: [PrintAndExportService],
  templateUrl: './smart-umlSequenceDiagram.component.html',
  styleUrls: ['./smart-umlSequenceDiagram.component.css'],
  standalone: true,
  imports: [DiagramModule,ToolbarModule, ButtonModule, FabModule, UploaderModule, DialogModule, DropDownButtonModule, TextBoxModule],
})
export class SmartUmlSequenceDiagramComponent {
  @ViewChild('diagram', { static: true }) public diagram!: DiagramComponent;
  @ViewChild('dialog', { static: true }) public dialog!: DialogComponent;
  @ViewChild('msgBtn1', { static: true }) public msgBtn1!: ButtonComponent;
  @ViewChild('msgBtn2', { static: true }) public msgBtn2!: ButtonComponent;
  @ViewChild('msgBtn3', { static: true }) public msgBtn3!: ButtonComponent;
  @ViewChild('textBox', { static: true }) public textBox!: TextBoxComponent;
  @ViewChild('dbSend', { static: true }) public sendButton!: ButtonComponent;
  public asyncSettings: Object = {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  };
  public zoomMenuItems: any = zoomMenuItems;
  public exportItems: any = exportItems;
  public zoomContent: any;
  public diagramTools: DiagramTools = DiagramTools.ZoomPan;
  public sequenceModel: UmlSequenceDiagramModel = sequenceModel;
  public nodes: NodeModel[] = [{ id: 'content', offsetX: 100, offsetY: 100 }];
  ngOnInit(): void {
    document.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && document.activeElement === (this.textBox as any).element.nativeElement) {
        if ((this.textBox as any).value !== '') {
          (this.dialog as any).hide();
          convertTextToUmlSequenceDiagram((this.textBox as any).value, this.diagram);
        }
      }
    });
    this.zoomContent = Math.round(this.diagram.scrollSettings.currentZoom! * 100) + ' %';
  }

  showDialog() {
    this.dialog.show();
  }

  onSendClick() {
    this.dialog.hide();
    convertTextToUmlSequenceDiagram((this.textBox as any).value, this.diagram);
  }
  diagramCreated() {
    (this.diagram as any).model = this.sequenceModel;
    this.diagram.updateFromModel();
  }
  onBtnClick(msg: any) {
    this.dialog.hide();
    convertTextToUmlSequenceDiagram(msg, this.diagram);
  }

  onScrollChange(args: IScrollChangeEventArgs) {
    if (args.panState !== 'Start') {
      let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
      zoomCurrentValue.content = Math.round(this.diagram.scrollSettings.currentZoom! * 100) + ' %';
    }
  }

  public snapSettings: any = { constraints: SnapConstraints.None };
  // Configure node defaults for UML diagrams
  public getNodeDefaults(node: NodeModel): NodeModel {
    // participant node
    if (node.data instanceof UmlSequenceParticipant) {
      if (!((node!.data! as UmlSequenceParticipant).isActor)) {
        if (node.annotations && node.annotations[0] && node.annotations[0].style) {
          node.annotations[0].style.color = 'white';
        }
      }
    }
    // fragment node
    else if (node.data instanceof UmlSequenceFragment) {
      node.style = { strokeColor: 'cornflowerblue' };
    }
    return node;
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
      this.diagram.model = {fragments:[],messages:[],participants:[]};
      this.diagram.loadDiagram(event.target.result);
      this.diagram.fitToPage();
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