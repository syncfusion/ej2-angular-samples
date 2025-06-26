import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  DiagramModule,
  NodeModel,
  ConnectorModel,
  DiagramTools,
  SnapConstraints,
  SnapSettingsModel,
  Diagram,
  UndoRedo,
  PointPortModel,
  ISelectionChangeEventArgs,
  DiagramConstraints,
  RulerSettingsModel
} from '@syncfusion/ej2-angular-diagrams';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';
import { NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

Diagram.Inject(UndoRedo);

/**
 * Container sample
 */

@Component({
  selector: 'app-root',
  templateUrl: 'container.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent,ToolbarModule,ComboBoxModule, DiagramModule,NumericTextBoxModule, ColorPickerModule,  SBDescriptionComponent]
})
export class ContainerDiagramComponent {
  @ViewChild('diagram')
  public diagram!: DiagramComponent;

  public nodes: NodeModel[] = [];
  public connectors: ConnectorModel[] = [];

  public tools: DiagramTools = DiagramTools.ZoomPan;

  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };
  public constraints: DiagramConstraints = DiagramConstraints.Default | DiagramConstraints.Bridging;
  public fontTypeCollection = [
    { type: 'Arial', text: 'Arial' },
    { type: 'Aharoni', text: 'Aharoni' },
    { type: 'Bell MT', text: 'Bell MT' },
    { type: 'Fantasy', text: 'Fantasy' },
    { type: 'Segoe UI', text: 'Segoe UI' },
    { type: 'Times New Roman', text: 'Times New Roman' },
    { type: 'Verdana', text: 'Verdana' }
  ];
   // Reference to the toolbar component
    @ViewChild('toolbar')
    public toolbar: ToolbarComponent;
    constructor() {
    }

  ngOnInit(): void {
    this.initializeNodes();
    this.initializeConnectors();
  }

  public created(): void {
     this.diagram.fitToPage();
  }

  public rulerSettings: RulerSettingsModel = { showRulers: true, dynamicGrid: true };

  private initializeNodes(): void {
    const createNode = (
      id: string,
      x: number,
      y: number,
      height: number,
      width: number,
      content: string,
      marginX?: number,
      marginY?: number
    ): NodeModel => {
      let ports: PointPortModel[] = [];

      switch (id) {
        case 'node5':
        case 'node6':
          ports = [{ id: 'port1', offset: { x: 0.9, y: 0 } }];
          break;
        case 'node13':
        case 'node15':
          ports = [{ id: 'port2', offset: { x: 1, y: 0.5 } }];
          break;
        case 'node3':
          ports = [
            { id: 'port3', offset: { x: 0.25, y: 1 } },
            { id: 'port4', offset: { x: 0.5, y: 1 } },
            { id: 'port5', offset: { x: 0.75, y: 1 } }
          ];
          break;
        case 'node7':
          ports = [
            { id: 'port1', offset: { x: 0, y: 0.5 } },
            { id: 'port2', offset: { x: 1, y: 0.5 } }
          ];
          break;
        case 'node8':
          ports = [
            { id: 'port3', offset: { x: 0.25, y: 1 } },
            { id: 'port5', offset: { x: 0.75, y: 1 } }
          ];
          break;
      }

      return {
        id,
        offsetX: x,
        offsetY: y,
        margin: { left: marginX || 0, top: marginY || 0 },
        width,
        height,
        style: { fill: 'white', strokeColor: '#2546BB', strokeWidth: 1 },
        shape: {
          type: 'Basic',
          shape: 'Rectangle',
          cornerRadius: 4
        },
        annotations: [
          {
            content,
            style: { color: '#343434' },
            horizontalAlignment: 'Center'
          }
        ],
        ports
      };
    };

    this.nodes = [
      createNode('node1', 300, 300, 60, 100, 'HTTP Traffic'),
      createNode('node2', 500, 300, 60, 100, 'Ingestion service', 50, 30),
      createNode('node3', 650, 300, 60, 100, 'Workflow service', 200, 30),
      createNode('node4', 500, 415, 60, 100, 'Package service', 50, 150),
      createNode('node5', 650, 415, 60, 150, 'Drone Scheduler service', 175, 150),
      createNode('node6', 800, 415, 60, 100, 'Delivery service', 350, 150),
      createNode('node7', 580, 130, 60, 90, 'Azure Service Bus'),
      createNode('node8', 815, 130, 60, 100, 'Managed Identities'),
      createNode('node9', 1000, 130, 60, 100, 'Azure Key Vault'),
      createNode('node10', 500, 550, 60, 100, 'Azure Cosmos DB for MongoDB API'),
      createNode('node11', 650, 550, 60, 100, 'Azure Cosmos DB'),
      createNode('node12', 800, 550, 60, 100, 'Azure Cache for Redis'),
      createNode('node13', 1040, 255, 60, 100, 'Azure Application Insights'),
      createNode('node14', 1140, 350, 60, 100, 'Azure Monitor'),
      createNode('node15', 1040, 445, 60, 100, 'Azure Log Analytics workspace'),
      {
        id: 'container',
        width: 520,
        height: 300,
        offsetX: 660,
        offsetY: 350,
        shape: {
          type: 'Container',
          header: {
            annotation: {
              content: 'Azure Container Apps Environment',
              style: {
                fontSize: 18,
                bold: true,
                fill: 'transparent',
                strokeColor: 'transparent'
              }
            },
            height: 40,
            style: {
              fontSize: 18,
              bold: true,
              fill: 'transparent',
              strokeColor: 'transparent'
            }
          },
          children: ['node2', 'node3', 'node4', 'node5', 'node6']
        },
        style: { fill: '#E9EEFF', strokeColor: '#2546BB', strokeWidth: 1 }
      }
    ];
  }

  private initializeConnectors(): void {
    const createConnector = (
      id: string,
      sourceID: string,
      targetID: string,
      sourcePortID?: string,
      targetPortID?: string,
      sourceDecorator?: any
    ): ConnectorModel => {
      return {
        id,
        type: 'Orthogonal',
        sourceID,
        targetID,
        sourcePortID,
        targetPortID,
        style: { strokeColor: '#5E5E5E', strokeWidth: 1 },
        sourceDecorator: sourceDecorator || { shape: 'None' },
        targetDecorator: {
          style: {
            fill: '#5E5E5E',
            strokeColor: '#5E5E5E',
            strokeWidth: 1
          }
        }
      };
    };

    const sourceDecorator = {
      shape: 'Arrow',
      style: {
        fill: '#5E5E5E',
        strokeColor: '#5E5E5E',
        strokeWidth: 1
      }
    };

    this.connectors = [
      createConnector('connector1', 'node1', 'node2'),
      createConnector('connector2', 'node4', 'node10'),
      createConnector('connector3', 'node5', 'node11'),
      createConnector('connector4', 'node6', 'node12'),
      createConnector('connector5', 'node8', 'node9'),
      createConnector('connector6', 'container', 'node13'),
      createConnector('connector7', 'container', 'node15'),
      createConnector('connector8', 'node3', 'node4', 'port3'),
      createConnector('connector9', 'node3', 'node5', 'port4'),
      createConnector('connector10', 'node3', 'node6', 'port5'),
      createConnector('connector11', 'node2', 'node7', '', 'port1'),
      createConnector('connector12', 'node7', 'node3', 'port2'),
      createConnector('connector13', 'node13', 'node14', 'port2'),
      createConnector('connector14', 'node15', 'node14', 'port2'),
      createConnector('connector16', 'node8', 'node5', 'port3', 'port1', sourceDecorator),
      createConnector('connector17', 'node8', 'node6', 'port5', 'port1', sourceDecorator)
    ];
  }


    public fields: Object = {
      value: 'type', text: 'text'
    }

    public value: string = 'Aharoni';
    public fontTypeList = [
      { type: 'Arial', text: 'Arial' },
      { type: 'Aharoni', text: 'Aharoni' },
      { type: 'Bell MT', text: 'Bell MT' },
      { type: 'Fantasy', text: 'Fantasy' },
      { type: 'Segoe UI', text: 'Segoe UI' },
      { type: 'Times New Roman', text: 'Times New Roman' },
      { type: 'Verdana', text: 'Verdana' }
    ];


    //Handles toolbar item actions based on tooltip text.
    public toolbarClick(args): void  {
      switch (args.item.tooltipText) {
      // Toggle bold style for selected annotation(s)
        case 'Bold':
          this.updateAnnotationValue('bold', args.value, null, 11, true);
          break;

        // Toggle italic style for selected annotation(s)
        case 'Italic':
          this.updateAnnotationValue('italic', args.value, null, 12, true);
          break;

        // Toggle underline style for selected annotation(s)
        case 'Underline':
          this.updateAnnotationValue('underline', args.value, null, 13, true);
          break;
      }
      this.diagram.dataBind();
    }

    public selectionChange(args: ISelectionChangeEventArgs): void {
      if (args.state === 'Changed') {
        const selectedItems = [...this.diagram.selectedItems.nodes, ...this.diagram.selectedItems.connectors];

        const hasAnnotation = selectedItems.some(item => {
          // Check for annotations directly on the item
          if (item.annotations && item.annotations.length > 0) {
            return true;
          }
          // Specifically handle the case for containers
          if (item.shape && item.shape.type === 'Container' && (item as any).shape.header && (item as any).shape.header.annotation) {
            return true;
          }
          return false;
        });

        const toolbarItems = ['FontStyle', 'FontSize', 'Bold', 'Italic', 'Underline', 'FontColor'];

        toolbarItems.forEach(id => {
          const item = this.toolbar.items.find(item => item.id === id);
          if (item) {
            item.disabled = !hasAnnotation;
          }
        });
      }
    }

     /**
      * Update annotation style attributes such as font size, font family, bold, italic, and underline.
      */
    public updateAnnotationValue(value, fontSize, fontFamily, index, isSelected) {
      const selectedItems = [
        ...this.diagram.selectedItems.nodes,
        ...this.diagram.selectedItems.connectors,
      ];
      for (let i = 0; i < selectedItems.length; i++) {
        const node = selectedItems[i];
        // Determine the annotations to update, including container headers if applicable
        const annotations = node.shape?.type === 'Container' ? [(node as any).shape.header.annotation] : (node.annotations || []);
        for (let j = 0; j < annotations.length; j++) {
          const annotationstyle = annotations[j].style;
          // Update style attributes based on the provided value
          if (value === 'fontsize') {
            annotationstyle.fontSize = fontSize;
          } else if (value === 'fontfamily') {
            annotationstyle.fontFamily = fontFamily.toString();
          } else if (value === 'bold') {
            annotationstyle.bold = !annotationstyle.bold;
            isSelected = annotationstyle.bold;
          } else if (value === 'italic') {
            annotationstyle.italic = !annotationstyle.italic;
            isSelected = annotationstyle.italic;
          } else if (value === 'underline') {
            if (annotationstyle.textDecoration === 'None') {
              annotationstyle.textDecoration = 'Underline';
              isSelected = true;
            } else {
              annotationstyle.textDecoration = 'None';
              isSelected = false;
            }
          }
        }
        this.diagram.dataBind();
      }
    }

    /**
    * Function Renders a Color selector component for selecting font color.
     */
    public colorChange(args: any): void {
      const selectedItems = [
        ...this.diagram.selectedItems.nodes,
        ...this.diagram.selectedItems.connectors,
      ];
      for (let i = 0; i < selectedItems.length; i++) {
        const node = selectedItems[i];
        // Determine the annotations to update, including container headers if applicable
        const annotations = node.shape?.type === 'Container' ? [(node as any).shape.header.annotation] : (node.annotations || []);
        for (let j = 0; j < annotations.length; j++) {
          annotations[j].style.color = args.currentValue.rgba;
        }
      }
      this.diagram.dataBind();
    }

    /**
    * Function Renders a numeric text box component for selecting font size.
    */
    public fontSizeChange(args: any): void {
      const size = args.value;
      this.updateAnnotationValue('fontsize', size, null, null, true);
    }


    /**
    * Function Renders a dropdown component for selecting font family.
    */
      public fontFamily(args: any): void {
      const selectedFont = args.itemData.type;
      this.updateAnnotationValue('fontfamily', null, selectedFont, null, true);
    }



}
