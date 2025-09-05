import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Node, Connector, NodeModel, ConnectorModel, SymbolPaletteModule, DiagramModule, DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { SymbolPalette, SymbolInfo, MarginModel, PaletteModel, SnapSettingsModel, ScrollSettingsModel, NodeConstraints } from '@syncfusion/ej2-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Symbol Palette
 */
@Component({
    selector: 'control-content',
    templateUrl: 'symbol-palette.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SymbolPaletteModule, DropDownListModule, NumericTextBoxModule, CheckBoxModule, SBDescriptionComponent, DiagramModule],
    
})
export class SymbolPaletteDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    @ViewChild('symbolpalette')
    public palette: SymbolPalette;
    //Collection of expand options
    public expandOptions: { [key: string]: Object }[] = [
        { mode: 'Single', text: 'Single' },
        { mode: 'Multiple', text: 'Multiple' },
    ];
    public fields: Object = { text: 'text', value: 'mode' };
    //SymbolPalette Properties
    public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
    public expandMode: ExpandMode = 'Multiple';
    public enableAnimation: any = true;
    public enableSearch: any = true;
    public isItemText: boolean = false;
    public symbolSize: number = 50;
    public htmlSymbolWidth: number = 91;
    public htmlSymbolHeight: number = 100;

    public template(obj: any) {
        if (obj === 'Script') {
            return `<svg width="200" height="200">
                    <path d="M 13.69 3.77 C 13.69 3.77 12.22 0.03 16.83 0 C 16.83 0 19.9 0.13 19 4.32 C 18.99 4.36 18.98 4.41 18.97 4.45 C 17.98 8.77 15.87 12.87 15.04 15.03 H 19.85 C 19.85 15.03 21.06 19.61 16.71 20 H 2.42 C 2.42 20 -1.39 18.58 0.55 14.68 L 4.24 3.84 H 0.63 C 0.63 3.84 -0.76 0.94 2.74 0.03 L 16.79 0 L 15.9 0.36 L 14.43 2.08 L 13.69 3.77 Z M 13.64 1.33 C 13.64 1.33 13.34 1.81 13.3 2.31 H 2.1 C 2.1 2.31 2.03 1.44 2.98 1.27 L 13.64 1.33 Z M 18.48 16.47 C 18.48 16.47 18.32 19.15 15.74 18.34 C 15.74 18.34 14.72 17.77 14.8 16.48 L 18.48 16.47 Z M 14.25 3.74 C 14.25 3.74 15.05 3.48 15.12 2.24 C 15.12 2.24 15.3 1.1 16.95 1.55 C 16.95 1.55 17.94 1.9 17.26 3.95 C 17.26 3.95 14.52 12.45 13.53 14.29 C 13.53 14.29 12.22 16.94 13.65 18.52 H 3.09 C 3.09 18.52 0.87 18.07 2.18 14.9 C 2.18 14.9 5.79 5.36 6.11 3.74 L 14.25 3.74 Z" visibility="visible" opacity="1" fill="skyblue" stroke="black" stroke-width="1" stroke-dasharray="none"></path>
                    </svg>`;
        } else if (obj === 'Settings') {
            return `<svg width="200" height="200">
                    <g><path d="M20,12 L20,8 L16.68,8 C16.56,7.57,16.39,7.17,16.19,6.79 L18.57,4.41 L15.73,1.58 L13.4,3.92 C12.96,3.66,12.5,3.47,12.01,3.32 L12.01,0 L8.01,0 L8.01,3.32 C7.55,3.46,7.12,3.64,6.71,3.86 L4.42,1.58 L1.59,4.41 L3.88,6.69 C3.64,7.11,3.47,7.54,3.33,8 L0,8 L0,12 L3.33,12 C3.48,12.49,3.67,12.96,3.92,13.4 L1.59,15.72 L4.41,18.55 L6.79,16.17 C7.18,16.38,7.58,16.54,8,16.67 L8,20 L12,20 L12,16.67 C12.46,16.53,12.89,16.35,13.3,16.12 L15.73,18.55 L18.55,15.72 L16.13,13.3 C16.36,12.89,16.53,12.45,16.67,12 L20,12 Z M10,13.8 C7.9,13.8,6.2,12.1,6.2,10 C6.2,7.9,7.9,6.2,10,6.2 C12.1,6.2,13.8,7.9,13.8,10 C13.8,12.1,12.1,13.8,10,13.8 Z " visibility="visible" opacity="1" role="img"  stroke="black" stroke-width="1" stroke-dasharray="none" fill="yellow"></path></g>
                    <g><path d="M20,12 L20,8 L16.68,8 C16.56,7.57,16.39,7.17,16.19,6.79 L18.57,4.41 L15.73,1.58 L13.4,3.92 C12.96,3.66,12.5,3.47,12.01,3.32 L12.01,0 L8.01,0 L8.01,3.32 C7.55,3.46,7.12,3.64,6.71,3.86 L4.43,1.58 L1.59,4.41 L3.88,6.69 C3.64,7.11,3.47,7.54,3.33,8 L0,8 L0,12 L3.33,12 C3.48,12.49,3.67,12.96,3.92,13.4 L1.59,15.72 L4.42,18.55 L6.79,16.17 C7.18,16.38,7.58,16.54,8,16.67 L8,20 L12,20 L12,16.67 C12.46,16.53,12.89,16.35,13.3,16.12 L15.73,18.55 L18.56,15.72 L16.14,13.3 C16.36,12.89,16.54,12.45,16.67,12 L20,12 Z M10,13.8 C7.9,13.8,6.2,12.1,6.2,10 C6.2,7.9,7.9,6.2,10,6.2 C12.1,6.2,13.8,7.9,13.8,10 C13.8,12.1,12.1,13.8,10,13.8 Z " transform="translate(9,9)" visibility="visible" opacity="1" role="img"  stroke="black" stroke-width="1" stroke-dasharray="none" fill="grey"></path></g>
                    </svg>`;
        } else if (obj === 'Bluetooth') {
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <!-- Blue background -->
                    <rect width="24" height="24" fill="#007BFF"/>
                    <!-- White Bluetooth logo with top/bottom gap -->
                    <path d="M6.5 7.5L17.5 16.5L12 21V3L17.5 7.5L6.5 16.5" fill="none" stroke="white" stroke-width="2"/>
                    </svg>`;
        } else if (obj === 'Wifi') {
            return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#2196F3" height="200px" width="200px" viewBox="0 0 365.892 365.892" xml:space="preserve">
                    <g>
                        <circle cx="182.945" cy="286.681" r="41.494"/>
                        <path d="M182.946,176.029c-35.658,0-69.337,17.345-90.09,46.398c-5.921,8.288-4.001,19.806,4.286,25.726   c3.249,2.321,6.994,3.438,10.704,3.438c5.754,0,11.423-2.686,15.021-7.724c13.846-19.383,36.305-30.954,60.078-30.954   c23.775,0,46.233,11.571,60.077,30.953c5.919,8.286,17.437,10.209,25.726,4.288c8.288-5.92,10.208-17.438,4.288-25.726   C252.285,193.373,218.606,176.029,182.946,176.029z"/>
                        <path d="M182.946,106.873c-50.938,0-99.694,21.749-133.77,59.67c-6.807,7.576-6.185,19.236,1.392,26.044   c3.523,3.166,7.929,4.725,12.32,4.725c5.051-0.001,10.082-2.063,13.723-6.116c27.091-30.148,65.849-47.439,106.336-47.439   s79.246,17.291,106.338,47.438c6.808,7.576,18.468,8.198,26.043,1.391c7.576-6.808,8.198-18.468,1.391-26.043   C282.641,128.621,233.883,106.873,182.946,106.873z"/>
                        <path d="M360.611,112.293c-47.209-48.092-110.305-74.577-177.665-74.577c-67.357,0-130.453,26.485-177.664,74.579   c-7.135,7.269-7.027,18.944,0.241,26.079c3.59,3.524,8.255,5.282,12.918,5.281c4.776,0,9.551-1.845,13.161-5.522   c40.22-40.971,93.968-63.534,151.344-63.534c57.379,0,111.127,22.563,151.343,63.532c7.136,7.269,18.812,7.376,26.08,0.242   C367.637,131.238,367.745,119.562,360.611,112.293z"/>
                    </g>
                    </svg>`;
        } else if (obj === 'Meeting') {
            return `<div style="width:100%; height:100%; background:#e3daf1;font-family:Arial;padding-left:10px;">
                    <div style="font-size:12px;font-weight:bold;margin-left:3px;padding-top: 16px;">📅Meeting</div>
                    <div style="font-size:10px;margin-left:5px;">Team Sync @4PM</div>
                    <div style="font-size:8px; color:#666;margin-left:5px;">Room 30</div>
                    </div>`
        } else if (obj === 'Message') {
            return `<div style="width:100%; height:100%; background:#f3e5f5;font-family:Arial;padding-left:10px;">
                        <div style="font-size:12px;font-weight:bold;margin-left:5px;padding-top: 16px;">👤 Alice</div>
                        <div style="font-size:10px;margin-left:5px;">"Can we meet at 3PM?"</div>
                        <div style="font-size:8px; color:#999;margin-left:5px;">2 mins ago</div>
                    </div>`
        } else if (obj === 'BugFix') {
            return `<div style="width:100%; height:100%; background:#fff3e0; font-family:Arial;padding-left:10px;">
                        <div style="font-size:12px;font-weight:bold;margin-left:5px;padding-top: 17px;">Bug Fix</div>
                        <div style="font-size:10px;margin-left:5px;">Resolve login issue</div>
                        <div style="font-size:8px; color:#999;margin-left:5px;">High Priority</div>
                    </div>`
        } else if (obj === 'Weather') {
            return `<div style="width:100%; height:100%; background:#e0f7fa;font-family:Arial;padding-left:10px;">
                        <div style="font-size:12px;font-weight:bold;margin-left:5px;padding-top: 25px;">🌤 28°C</div>
                        <div style="font-size:10px;margin-left:5px;">Puducherry</div>
                        <div style="font-size:8px; color:#666;margin-left:5px;">Humidity: 60%</div>
                    </div>`
        }
        
    }
    //Initialize the flowShapes for the symbol palatte
    private flowShapes: NodeModel[] = [
        { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
        { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
        { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
        { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
        { id: 'PredefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
        { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
        { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
        { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } }
    ];
    //Initialize the basicshapes for the symbol palatte
    private basicShapes: NodeModel[] = [
        { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
        { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
        { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
        { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
        { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
        { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
        { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
        { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
    ];

    //Initializes connector symbols for the symbol palette
    private connectorSymbols: ConnectorModel[] = [
        {
            id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
        },
        {
            id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            targetDecorator: { shape: 'None' }
        },
        {
            id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            targetDecorator: { shape: 'None' }
        },
        {
            id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
        },
        {
            id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            targetDecorator: { shape: 'None' }
        }
    ];

    // Initializes SVG shape symbols for the symbol palette
    private SVGTemplate: NodeModel[] = [
        {
            id: 'Script', shape: { type: 'Native', scale: 'Stretch', content: this.template('Script') }, width: 80, height: 80
        },
        {
            id: 'Settings', shape: { type: 'Native', scale: 'Stretch', content: this.template('Settings') }, width: 80, height: 80
        },
        {
            id: 'Bluetooth', shape: { type: 'Native', scale: 'Stretch', content: this.template('Bluetooth') }, width: 70, height: 70
        },
        {
            id: 'Wi-Fi', shape: { type: 'Native', scale: 'Stretch', content: this.template('Wifi') }, width: 70, height: 55
        },
    ];
    private HTMLTemplate: NodeModel[] = [
        {
            id: "Meeting", width: 80, height: 80,shape: { type: 'HTML', content: this.template('Meeting') }
        },
        {
            id: "Message", width: 80, height: 80,shape: { type: 'HTML', content: this.template('Message') }
        },
        {
            id: "Weather", width: 80, height: 80,shape: { type: 'HTML', content: this.template('Weather') }
        },
        {
            id: "BugFix", width: 80, height: 80,shape: { type: 'HTML', content: this.template('BugFix') }, tooltip: {content: 'Bug Fix'}, constraints: NodeConstraints.Tooltip
        },
    ];
    //Initializes the palette
    public palettes: PaletteModel[] = [
        { id: 'flow', expanded: true, symbols: this.flowShapes, iconCss: 'e-ddb-icons e-flow', title: 'Flow Shapes' },
        { id: 'basic', expanded: true, symbols: this.basicShapes, iconCss: 'e-ddb-icons e-basic', title: 'Basic Shapes' },
        { id: 'connectors', expanded: true, symbols: this.connectorSymbols, iconCss: 'e-ddb-icons e-diagram-connector', title: 'Connectors' },
        { id: 'nodeSVG', expanded: true, symbols: this.SVGTemplate, title: 'SVG Node' },
        { id: 'nodeHTML', expanded: true, symbols: this.HTMLTemplate, title: 'HTML Node' }];

    public getSymbolInfo = (symbol: NodeModel): SymbolInfo => {
        if (symbol.shape.type === 'HTML') {
            return { width: this.htmlSymbolWidth, height: this.htmlSymbolHeight, fit: true };
        }
        else {
            return { width: this.symbolSize, height: this.symbolSize, fit: true };
        }
        return { fit: true };
    }
    //Set Node default value
    public getSymbolDefaults = (symbol: NodeModel): void => {
        if (symbol.shape.type === 'HTML') {
            symbol.width = this.htmlSymbolWidth;
            symbol.height = this.htmlSymbolHeight;
        }
        symbol.style = { strokeWidth: 2, strokeColor: '#757575' };
    }
    public getNodeDefaults = (symbol: NodeModel): void => {
        if (symbol.id.includes("BugFix")) {
            symbol.constraints = NodeConstraints.Default;
            symbol.tooltip.content = "";
        }
    }
    //Set connector default value
    public getConnectorDefaults(symbol: ConnectorModel): void {
        symbol.style.strokeWidth = 2;
        symbol.style.strokeColor = '#757575';
        symbol.targetDecorator.style.strokeColor = '#757575';
        symbol.targetDecorator.style.fill = '#757575';
    };
    public created(): void {
        this.diagram.rulerSettings = {
            showRulers : true
        }
    }
    public scrollSettings : ScrollSettingsModel = {
        scrollLimit : 'Infinity',
        canAutoScroll: true, autoScrollBorder: { left: 10, right: 10, top: 10, bottom: 10 },
        //scrollableArea: this.scrollableArea
    };
  

    //Change the expandMode of the Symbolpallete.
    public onExpandChange(args: DropDownChangeEventArgs): void {
        this.symbolPropertyChange('expandMode', args.value);
    }
    //Enable or disable the animation of the symbol palette.
    public onAnimationChange(args: CheckBoxChangeEventArgs): void {
        this.symbolPropertyChange('animation', args.checked);
    }
    //Change the size of the Symbol.
    public onSizeChange(args: NumericChangeEventArgs): void {
        this.symbolPropertyChange('size', args.value);
    }
    //Add or Remove the Text for Symbol palette item.
    public onItemTextChange(args: CheckBoxChangeEventArgs): void {
        this.isItemText = args.checked;
        this.updateGetSymbolInfo();
    }
    public updateGetSymbolInfo() {
        this.palette.getSymbolInfo = (symbol) =>{
            return {
                width: (symbol.shape.type === 'HTML') ? this.htmlSymbolWidth : this.symbolSize,
                height: (symbol.shape.type === 'HTML') ? this.isItemText ? this.htmlSymbolHeight + 20 : this.htmlSymbolHeight : this.symbolSize,
                fit: true,
                description: { text: this.isItemText ? (symbol.id == "BugFix" ? "Bug Fix" : symbol.id) : '' }
            };
        }
        this.palette.dataBind();
    }
    //Add or Remove the Header icon for Symbol palette item.
    public onHeaderIconChange(args: CheckBoxChangeEventArgs): void {
        for(let i: number = 0;i<this.palette.palettes.length;i++){
            if (args.checked) {
                if (i === 0) {
                    this.palette.palettes[i].iconCss = 'e-ddb-icons e-flow';
                } else if (i === 1) {
                    this.palette.palettes[i].iconCss = 'e-ddb-icons e-basic';
                } else if (i === 2) {
                    this.palette.palettes[i].iconCss = 'e-ddb-icons e-diagram-connector';
                }
            } else {
                this.palette.palettes[i].iconCss = '';
            }
        }
        this.palette.dataBind();
    }
    //Add or Remove the show search icon for Symbol palette item.
    public onShowSearchChange(args: CheckBoxChangeEventArgs): void {
        if (args.checked) {
                this.palette.enableSearch=true;
            } else {
                this.palette.enableSearch = false;
            }
        this.palette.dataBind();
    }
    //Change property of the symbol palette
    private symbolPropertyChange(propertyName: string, propertyValue: Object): void {
        switch (propertyName) {
            case 'expandMode':
                this.palette.expandMode = propertyValue as ExpandMode;
                break;
            case 'animation':
                this.palette.enableAnimation = propertyValue as boolean;
                break;
            case 'size':
                if (this.symbolSize != propertyValue) {
                    this.symbolSize = propertyValue as number;
                    this.updateGetSymbolInfo();
                }
                break;
        }
        this.palette.dataBind();
    }
}
interface Symbol extends NodeModel {
    text?: string;
}
