import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    DiagramComponent, Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Node, FlowShapeModel, MarginModel, PaletteModel,
    SymbolInfo, DiagramContextMenu, GridlinesModel, SnapSettingsModel, ShapeStyleModel, TextStyleModel
} from '@syncfusion/ej2-angular-diagrams';
import { AsyncSettingsModel } from '@syncfusion/ej2-inputs';
import { ClickEventArgs, ExpandMode } from '@syncfusion/ej2-navigations';
import { showPaletteIcon } from './script/diagram-common';
Diagram.Inject(UndoRedo, DiagramContextMenu);



/**
 * Sample for serialization
 */
@Component({
    selector: 'control-content',
    templateUrl: 'serialization.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SerializationDiagramComponent {
    public terminator: FlowShapeModel = { type: 'Flow', shape: 'Terminator' };
    public process: FlowShapeModel = { type: 'Flow', shape: 'Process' };
    public decision: FlowShapeModel = { type: 'Flow', shape: 'Decision' };
    public delay: FlowShapeModel = { type: 'Flow', shape: 'Delay' };
    public margin: MarginModel = { top: 10, left: 10, right: 10, bottom: 10 };

    public terminatorStyle: ShapeStyleModel = { fill: '#d0f0f1', strokeColor: '#797979' };
    public processStyle: ShapeStyleModel = { fill: '#fbfdc5', strokeColor: '#797979' };
    public decisionStyle: ShapeStyleModel = { fill: '#c5efaf', strokeColor: '#797979' };
    public delayStyle: ShapeStyleModel = { fill: '#f8eee5', strokeColor: '#797979' };
    public connectorTextStyle: TextStyleModel = { fill: 'white' };
    public asyncSettings: AsyncSettingsModel = {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    };

    @ViewChild('diagram')
    public diagram: DiagramComponent;

    public create(args: Object): void {
        this.diagram.fitToPage();
        this.diagram.dataBind();
    }

    private interval: number[] = [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
        9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75];
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

    public getPorts(obj: Node): PointPortModel[] {
        if (obj.id === 'Data') {
            return [
                { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
                { id: 'port4', shape: 'Circle', offset: { x: .5, y: 0 } }
            ];
        } else {
            return [
                { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
                { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
                { id: 'port3', shape: 'Circle', offset: { x: 1, y: .5 } },
                { id: 'port4', shape: 'Circle', offset: { x: .5, y: 0 } }
            ];;
        }
    }

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
    //Initialize the flowshapes for the symbol palatte
    private flowshapes: NodeModel[] = [
        { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
        { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
        { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
        { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
        { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
        { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
        { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
        { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
        { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
        { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' } },
        { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' } },
        { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' } },
        { id: 'Or', shape: { type: 'Flow', shape: 'Or' } },
        { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' } },
        { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' } },
        { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' } },
        { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' } },
        { id: 'OffPageReference', shape: { type: 'Flow', shape: 'OffPageReference' } },
        { id: 'SequentialAccessStorage', shape: { type: 'Flow', shape: 'SequentialAccessStorage' } },
        { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' } },
        { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' } },
        { id: 'Data', shape: { type: 'Flow', shape: 'Data' } },
        { id: 'Card', shape: { type: 'Flow', shape: 'Card' } },
        { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' } }
    ];
    //Initializes connector symbols for the symbol palette
    private connectorSymbols: ConnectorModel[] = [
        {
            id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 2 }
        },
        {
            id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 2 }
        },
        {
            id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }
        }
    ];

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
    }

    public onUploadSuccess(args: { [key: string]: Object }): void {
        let file1: { [key: string]: Object } = args.file as { [key: string]: Object };
        let file: Blob = file1.rawFile as Blob;
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = this.loadDiagram.bind(this);
    }

    public loadDiagram(event: ProgressEvent): void {
        this.diagram.loadDiagram((event.target as FileReader).result.toString());
    }

    public download(data: string): void {
        if (window.navigator.msSaveBlob) {
            let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
            window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
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
};