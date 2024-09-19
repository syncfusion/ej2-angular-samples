import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { DiagramComponent, Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Node, FlowShapeModel, MarginModel, PaletteModel, SymbolInfo, DiagramContextMenu, GridlinesModel, SnapSettingsModel, ShapeStyleModel, TextStyleModel, SymbolPaletteModule, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { AsyncSettingsModel } from '@syncfusion/ej2-inputs';
import { ClickEventArgs, ExpandMode } from '@syncfusion/ej2-navigations';
import { showPaletteIcon } from './script/diagram-common';
import { SBDescriptionComponent } from '../common/dp.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo, DiagramContextMenu);

/**
 * Sample for serialization
 */
@Component({
    selector: 'control-content',
    templateUrl: 'serialization.html',
    styleUrls: ['diagram-common.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, SymbolPaletteModule, DiagramModule, UploaderModule, SBDescriptionComponent]
})
export class SerializationDiagramComponent {
    public terminator: FlowShapeModel = { type: 'Flow', shape: 'Terminator' };
    public process: FlowShapeModel = { type: 'Flow', shape: 'Process' };
    public decision: FlowShapeModel = { type: 'Flow', shape: 'Decision' };
    public delay: FlowShapeModel = { type: 'Flow', shape: 'Delay' };
    public margin: MarginModel = { top: 10, left: 10, right: 10, bottom: 10 };
    // Styles
    public terminatorStyle: ShapeStyleModel = { fill: '#d0f0f1', strokeColor: '#797979' };
    public processStyle: ShapeStyleModel = { fill: '#fbfdc5', strokeColor: '#797979' };
    public decisionStyle: ShapeStyleModel = { fill: '#c5efaf', strokeColor: '#797979' };
    public delayStyle: ShapeStyleModel = { fill: '#f8eee5', strokeColor: '#797979' };
    public connectorTextStyle: TextStyleModel = { fill: 'white' };
    public loaded() {
        this.diagram.select([this.diagram.nodes[0]]);
    }
    // Async settings for file upload
    public asyncSettings: AsyncSettingsModel = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };
    // Diagram Settings
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['diagram-common.style.css'];
    }
    public create(args: Object): void {
        this.diagram.fitToPage();
        this.diagram.dataBind();
    }
    // Gridline configuration for the diagram.
    private interval: number[] = [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75];
    private horizontalGridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: this.interval };
    private verticalGridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: this.interval };
    public snapSettings: SnapSettingsModel = { horizontalGridlines: this.horizontalGridlines, verticalGridlines: this.verticalGridlines };

    
    public getConnectorDefaults(args: ConnectorModel, diagram: Diagram): ConnectorModel {
        args.targetDecorator.height = 5;
        args.targetDecorator.width = 5;
        args.style.strokeColor = '#797979';
        args.targetDecorator.style = { fill: '#797979', strokeColor: '#797979' };
        return args;
    };

    // Handle click events
    public onClicked(args: ClickEventArgs): void {
        if (args.item.text === 'New') {
            this.diagram.clear();
        } else if (args.item.text === 'Load') {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        } else if (args.item.id === 'palette-icon') {
            showPaletteIcon()
        } else {
            this.download(this.diagram.saveDiagram());
        }
    }


    //SymbolPalette Properties
    public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
    public expandMode: ExpandMode = 'Multiple';
    public enableAnimation: any = true;

// Preparing flow shapes for the symbol palette.
 flowShapeTypes = ["Terminator", "Process", "Decision", "Document","PreDefinedProcess", "PaperTap", "DirectData",
                   "SequentialData", "Sort", "MultiDocument","Collate", "SummingJunction", "Or", "InternalStorage",
                   "Extract", "ManualOperation", "Merge", "OffPageReference","SequentialAccessStorage", "Annotation", "Annotation2","Data", "Card", "Delay"];

public flowshapes: NodeModel[] = this.flowShapeTypes.map(type => ({ id: type, shape: { type: "Flow", shape: type } }))

    //Initializes connector symbols for the symbol palette
    public connectorSymbols: ConnectorModel[] = [
        { id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, style: this.getConnectorStyle('Arrow') },
        { id: 'link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, style: this.getConnectorStyle('None') },
        { id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, style: this.getConnectorStyle('Arrow') },
        { id: 'link4', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, style: this.getConnectorStyle('None') },
        { id: 'link5', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, style: this.getConnectorStyle('None') }
    ];
  // Function to create a connector style for the symbol palette.
    private getConnectorStyle(decoratorShape: string): { strokeWidth: number, strokeColor: string, targetDecorator: { shape: string, style: any } } {
        return {
            strokeWidth: 2,
            strokeColor: '#757575',
            targetDecorator: {
                shape: decoratorShape,
                style: { strokeColor: '#757575', fill: '#757575' }
            }
        };
    }

    public palettes: PaletteModel[] = [
        { id: 'flow', expanded: true, symbols: this.flowshapes, iconCss: 'shapes', title: 'Flow Shapes' },
        { id: 'connectors', expanded: true, symbols: this.connectorSymbols, iconCss: 'shapes', title: 'Connectors' }
    ]

    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
        return { fit: true };
    }

    public getSymbolDefaults(symbol: NodeModel): void {
        if (symbol.id === 'Terminator' || symbol.id === 'Process') {
            symbol.width = 80;
            symbol.height = 40;
        } else if (symbol.id === 'Decision' || symbol.id === 'Document' || symbol.id === 'PreDefinedProcess' ||
            symbol.id === 'PaperTap' || symbol.id === 'DirectData' || symbol.id === 'MultiDocument' || symbol.id === 'Data') {
            symbol.width = 50;
            symbol.height = 40;
        } else {
            symbol.width = 50;
            symbol.height = 50;
        }
        symbol.style.strokeColor = '#757575';
    }

    // Handle file upload success
    public onUploadSuccess(args: { [key: string]: Object }): void {
        // Extracts the file from the upload success event arguments.
        let files: { [key: string]: Object } = args.file as { [key: string]: Object };
        let file: Blob = files.rawFile as Blob;
        // Creates a FileReader to read the content of the file.
        let reader: FileReader = new FileReader();
        // Reads the content of the file as a text string.
        reader.readAsText(file);
        // Assigns the loadDiagram function to execute when the file read operation completes.
        reader.onloadend = this.loadDiagram.bind(this);
    }

// Load the diagram object from a JSON string.
    public loadDiagram(event: ProgressEvent): void {
        // Extracts the text content from the FileReader event.
        let results=(event.target as FileReader).result.toString();
        // Loads the diagram from the JSON string.
        this.diagram.loadDiagram(results);
    }

    // Save the diagram object as a JSON file.
    public download(data: string): void {
        // MIME type for JSON data.
        let mimeType='data:text/json;charset=utf-8,';
        // Checks for MS browser to use the msSaveBlob method.
        if ((window.navigator as any).msSaveBlob) {
            // Creates a new Blob object containing the JSON data.
            let blob: Blob = new Blob([data], { type: mimeType });
            // Saves or opens the blob depending on the browser capability.
            (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
        } else {
            // Encodes the JSON data as a data URL.
            let dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
            // Creates an anchor element to facilitate downloading.
            let downloadAnchor: HTMLAnchorElement = document.createElement('a');
            downloadAnchor.href = dataStr;
            downloadAnchor.download = 'Diagram.json';
            document.body.appendChild(downloadAnchor);
            // Triggers the download process.
            downloadAnchor.click();
            // Removes the anchor element from the document.
            downloadAnchor.remove();
        }
    }
};