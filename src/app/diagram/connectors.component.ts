import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, NodeModel, HierarchicalTree, ConnectorModel, StackPanel, TextElement, Segments, ConnectorConstraints, NodeConstraints, PointPortModel, PortVisibility, BasicShapeModel, LayoutModel, ConnectorEditing, DecoratorShapes, SegmentThumbShapes, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { Diagram, SnapConstraints, SnapSettingsModel, randomId } from '@syncfusion/ej2-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { ColorPickerModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(HierarchicalTree,ConnectorEditing);


/**
 * Sample for Connectors
 */

@Component({
    selector: 'control-content',
    templateUrl: 'connectors.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, DropDownListModule, ColorPickerModule, SBDescriptionComponent, NumericTextBoxModule]
})

export class ConnectorDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    //Configrues hierarchical tree layout
    public layout: LayoutModel = {
        type: 'HierarchicalTree', orientation: 'LeftToRight',
        verticalSpacing: 75, margin: { left: 90, right: 0, top: 0, bottom: 0 }
    }
    //Shape collection of the decorators.
    public decoratorShape = [
        { shape: 'None', text: 'None' },
        { shape: 'Square', text: 'Square' },
        { shape: 'Circle', text: 'Circle' },
        { shape: 'Diamond', text: 'Diamond' },
        { shape: 'Arrow', text: 'Arrow' },
        { shape: 'OpenArrow', text: 'Open Arrow' },
        { shape: 'Fletch', text: 'Fletch' },
        { shape: 'OpenFetch', text: 'Open Fetch' },
        { shape: 'IndentedArrow', text: 'Indented Arrow' },
        { shape: 'OutdentedArrow', text: 'Outdented Arrow' },
        { shape: 'DoubleArrow', text: 'Double Arrow' }
    ];

    public selectionChange() {
        if (this.diagram.selectedItems.connectors.length > 0) {
            (document.getElementById('segmentDecoratorSize') as any).ej2_instances[0].enabled = true;
        }
        else{
            (document.getElementById('segmentDecoratorSize') as any).ej2_instances[0].enabled = false;
        }
    }
    public shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle', cornerRadius: 10 };
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public getNodeDefaults: Function = this.nodeDefaults.bind(this);
    public getConnectorDefaults: Function = this.connectorDefaults.bind(this);

    public setNodeTemplate: Function = this.nodeTemplate.bind(this);

    ngOnInit(): void {
        document.getElementById('appearance').onclick = this.connectorTypeClick.bind(this);
    }

    //set default value for Nodes.
    private nodeDefaults(node: NodeModel, diagram: Diagram): NodeModel {
        let obj: NodeModel = {};
        if (node.id !== 'node1') {
            //Set ports
            obj.ports = this.getPorts(node);
        }
        if (node.id !== 'node6') {
            obj.width = 80;
            obj.style = { strokeWidth: 2, strokeColor: '#6F409F' };
            obj.height = 35;
        }
        return obj;
    };

    //set default value for Connectors.
    private connectorDefaults(obj: ConnectorModel): void {
        obj.type = 'Bezier';
        obj.style.strokeColor = '#6f409f';
        obj.style.strokeWidth = 2;
        obj.targetDecorator = { style: { strokeColor: '#6f409f', fill: '#6f409f' } };
        obj.segments = [
            {
                type: 'Bezier',
            }
        ],
        obj.constraints = ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb 
    };

    public created(): void {
        this.diagram.fitToPage();
    }

    //Customize the content of the node
    private nodeTemplate(node: NodeModel): StackPanel {
        if (node.id === 'node6') {
            let canvas: StackPanel = new StackPanel();
            canvas.id = randomId();
            canvas.children = [
                this.getTextElement('Events', '#a6a1e0'),
                this.getTextElement('Emails', '#db8ec9'),
                this.getTextElement('Calls', '#db8ec9'),
                this.getTextElement('Smart Contents', '#db8ec9')
            ];
            canvas.style.strokeWidth = 0;
            canvas.style.fill = '#e6e0eb';
            return canvas;
        }
        return null;
    };

    //creation of Port for Node.
    private getPorts(obj: NodeModel): PointPortModel[] {
        if (obj.id === 'node2') {
            let node2Ports: PointPortModel[] = [
                { id: 'port1', offset: { x: 1, y: 0.25 }, visibility: PortVisibility.Hidden },
                { id: 'port2', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
                { id: 'port3', offset: { x: 1, y: 0.75 }, visibility: PortVisibility.Hidden }
            ];
            return node2Ports;
        } else if (obj.id === 'node6') {
            let node6Ports: PointPortModel[] = [
                { id: 'port4', offset: { x: 0, y: 0.46 }, visibility: PortVisibility.Hidden },
                { id: 'port5', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
                { id: 'port6', offset: { x: 0, y: 0.54 }, visibility: PortVisibility.Hidden }
            ];
            return node6Ports;
        } else {
            let ports: PointPortModel[] = [
                { id: 'portIn', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
                { id: 'portOut', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
            ];
            return ports;
        }
    }

    //creation of the TextElement.
    private getTextElement(text: string, color: string): TextElement {
        let textElement: TextElement = new TextElement();
        textElement.id = randomId();
        textElement.width = 80;
        textElement.height = 35;
        textElement.content = text;
        textElement.style.fill = '#6f409f';
        textElement.style.color = 'white';
        textElement.style.strokeColor = '#6f409f';
        textElement.cornerRadius = 5;
        textElement.margin = { top: 10, bottom: 10, left: 10, right: 10 };
        textElement.relativeMode = 'Object';
        return textElement;
    }

    //Event to change the connector type.
    private connectorTypeClick(args: MouseEvent): void {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style') {
            switch (target.id) {
                case 'straightConnector':
                    this.applyConnectorStyle(false, false, false, 'Straight', 1);
                    break;
                case 'orthogonalConnector':
                    this.applyConnectorStyle(false, false, false, 'Orthogonal', 1);
                    break;
                case 'bezierConnector':
                    this.applyConnectorStyle(false, false, false, 'Bezier', 1);
                    break;
                case 'straightConnectorWithStroke':
                    this.applyConnectorStyle(false, false, false, 'Straight');
                    break;
                case 'orthogonalConnectorWithStroke':
                    this.applyConnectorStyle(false, false, false, 'Orthogonal');
                    break;
                case 'bezierConnectorWithStroke':
                    this.applyConnectorStyle(false, false, false, 'Bezier');
                    break;
                case 'straightConnectorWithDasharray':
                    this.applyConnectorStyle(true, false, false, 'Straight');
                    break;
                case 'orthogonalConnectorWithDasharray':
                    this.applyConnectorStyle(true, false, false, 'Orthogonal');
                    break;
                case 'bezierConnectorWithDasharray':
                    this.applyConnectorStyle(true, false, false, 'Bezier');
                    break;
                case 'cornerRadius':
                    this.applyConnectorStyle(false, false, true, 'Orthogonal');
                    break;
                case 'sourceDecorators':
                    this.applyConnectorStyle(false, true, false, 'Straight');
                    break;
                case 'sourceDecoratorWithDasharray':
                    this.applyConnectorStyle(true, true, false, 'Straight');
                    break;
            }
            // custom code start
            target.classList.add('e-selected-style');
            // custom code end
        }
    };
    //Connector style customization
    private applyConnectorStyle(dashedLine: boolean, sourceDecorator: boolean, isRounded: boolean, type: Segments, strokeWidth?: number): void {
        for (let i: number = 0; i < this.diagram.connectors.length; i++) {
            this.diagram.connectors[i].style.strokeWidth = strokeWidth ? strokeWidth : 2;
            this.diagram.connectors[i].type = type;
            this.diagram.connectors[i].cornerRadius = isRounded ? 5 : 0;
            this.diagram.connectors[i].style.strokeDashArray = dashedLine ? '5,5' : '';
            if (sourceDecorator) {
                this.diagram.connectors[i].sourceDecorator = {
                    style: {
                        strokeColor: this.diagram.connectors[i].style.strokeColor,
                        fill: this.diagram.connectors[i].style.strokeColor, strokeWidth: 2
                    }, shape: 'Circle'
                };
                (document.getElementById('sourceDecorator') as any).ej2_instances[0].value='Circle';
            } else {
                this.diagram.connectors[i].sourceDecorator = { shape: 'None' };
                (document.getElementById('sourceDecorator') as any).ej2_instances[0].value='None';
            }
            this.diagram.connectors[i].targetDecorator = {
                style: {
                    strokeColor: this.diagram.connectors[i].style.strokeColor,
                    fill: this.diagram.connectors[i].style.strokeColor, strokeWidth: 2
                }, shape: 'Arrow'
            };
            (document.getElementById('targetDecorator') as any).ej2_instances[0].value='Arrow';
            this.diagram.dataBind();
            this.diagram.updateSelector();
        }
    }
    //set connector color
    public colorChange(args: any) {
        for(let i=0;i<this.diagram.connectors.length;i++)
        {
            this.diagram.connectors[i].style.strokeColor=args.currentValue.hex;
            this.diagram.connectors[i].targetDecorator.style.strokeColor= args.currentValue.hex;
            this.diagram.connectors[i].targetDecorator.style.fill= args.currentValue.hex;
            this.diagram.connectors[i].sourceDecorator.style.strokeColor= args.currentValue.hex;
            this.diagram.connectors[i].sourceDecorator.style.fill= args.currentValue.hex;
        }
        this.diagram.dataBind();
    }
    //Change Source decorator shape
    public sourceDecoratorShapeChange(args:any) {
        for (let i = 0; i < this.diagram.connectors.length; i++) {
            this.diagram.connectors[i].sourceDecorator = {
                shape: args.itemData.shape,
                style: {
                    strokeColor: this.diagram.connectors[i].style.strokeColor,
                    fill: this.diagram.connectors[i].style.strokeColor,
                }
            };
        }
        this.diagram.dataBind();

    }
    //Change target decorator shape
    public targetDecoratorShapeChange(args:any) {
        for (let i = 0; i < this.diagram.connectors.length; i++) {
            this.diagram.connectors[i].targetDecorator = {
                shape: args.itemData.shape,
                style: {
                    strokeColor: this.diagram.connectors[i].style.strokeColor,
                    fill: this.diagram.connectors[i].style.strokeColor,
                }
            };
            this.diagram.dataBind();
        }
    }
    //Change segment decorator shape
    public segmentDecoratorShapeChange(args:any) {
        for (let i = 0; i < this.diagram.connectors.length; i++) {
            this.diagram.segmentThumbShape = args.itemData.shape;
        }
        this.diagram.dataBind();
    }
     //Change Source decorator size
     public sourceDecoratorSizeChange(args:any) {
        for (let i = 0; i < this.diagram.connectors.length; i++) {
            this.diagram.connectors[i].sourceDecorator.width = args.value;
            this.diagram.connectors[i].sourceDecorator.height = args.value;
        }
        this.diagram.dataBind();

    }
    //Change target decorator size
    public targetDecoratorSizeChange(args:any) {
        for (let i = 0; i < this.diagram.connectors.length; i++) {
            this.diagram.connectors[i].targetDecorator.width = args.value;
            this.diagram.connectors[i].targetDecorator.height = args.value;
        }
        this.diagram.dataBind();
    }
    //Change segment decorator size
    public segmentDecoratorSizeChange(args:any) {
        let connector = this.diagram.selectedItems.connectors[0];
        this.diagram.segmentThumbSize = args.value;
        this.diagram.clearSelection();
        this.diagram.select([this.diagram.nameTable[connector.id]]);
        this.diagram.dataBind();
    }
}