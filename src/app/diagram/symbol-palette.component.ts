import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Node, Connector, NodeModel, ConnectorModel, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';
import { SymbolPalette, SymbolInfo, MarginModel, PaletteModel } from '@syncfusion/ej2-diagrams';
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
    imports: [SBActionDescriptionComponent, SymbolPaletteModule, DropDownListModule, NumericTextBoxModule, CheckBoxModule, SBDescriptionComponent]
})
export class SymbolPaletteDiagramComponent {
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
    //Initialize the flowShapes for the symbol palatte
    private flowShapes: NodeModel[] = [
        { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
        { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
        { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
        { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
        { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
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
            id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} }, style: { strokeWidth: 2, strokeColor: '#757575' }
        },
        {
            id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} }, style: { strokeWidth: 2, strokeColor: '#757575' }
        },
        {
            id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
            style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
        }
    ];
    //Initializes the palette
    public palettes: PaletteModel[] = [
        { id: 'flow', expanded: true, symbols: this.flowShapes, iconCss: 'e-ddb-icons e-flow', title: 'Flow Shapes' },
        { id: 'basic', expanded: true, symbols: this.basicShapes, iconCss: 'e-ddb-icons e-basic', title: 'Basic Shapes' },
        { id: 'connectors', expanded: true, symbols: this.connectorSymbols, iconCss: 'e-ddb-icons e-diagram-connector', title: 'Connectors' }];

    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
        return { fit: true };
    }
    //Set Node default value
    public getSymbolDefaults(symbol: NodeModel): void {
        if (symbol.id === 'Terminator' || symbol.id === 'Process') {
            symbol.width = 80;
            symbol.height = 40;
        } else if (symbol.id === 'Document' || symbol.id === 'PreDefinedProcess' ||
            symbol.id === 'PaperTap' || symbol.id === 'DirectData') {
            symbol.width = 50;
            symbol.height = 40;
        }
        symbol.style = { strokeWidth: 2, strokeColor: '#757575' };
    }

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
        if (args.checked) {
            this.palette.getSymbolInfo = (symbol: Symbol): SymbolInfo => {
                if (symbol.text !== undefined) {
                    return { description: { text: symbol.text, overflow: 'Wrap' } };
                }
                return { description: { text: symbol.id } };
            };
        } else {
            this.palette.getSymbolInfo = (symbol: Node | Connector): SymbolInfo => {
                return { description: { text: '' } };
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
                this.palette.symbolWidth = this.palette.symbolHeight = propertyValue as number;
                break;
        }
        this.palette.dataBind();
    }
}
interface Symbol extends NodeModel {
    text?: string;
}
