import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, ConnectorModel, SnapSettingsModel, SnapConstraints, NodeModel, BasicShapeModel, PortVisibility, PointPortModel, PortShapes, ISelectionChangeEventArgs, Node, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { DropDownListComponent, MultiSelect, MultiSelectChangeEventArgs, ChangeEventArgs as DropDownChangeEventArgs, ChangeEventArgs, CheckBoxSelection, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ColorPickerComponent, NumericTextBoxComponent, ChangeEventArgs as NumericChangeEventArgs, ColorPickerEventArgs, ColorPickerModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
MultiSelect.Inject(CheckBoxSelection);

/**
 * Sample for Ports
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ports.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, DropDownListModule, ColorPickerModule, NumericTextBoxModule, SBDescriptionComponent]
})
export class PortDiagramComponent {
  @ViewChild('diagram') public diagram: DiagramComponent;

  @ViewChild('portVisibilityDrop')
  public portVisibilityDrop: DropDownListComponent;
  @ViewChild('portFillDrop') public portFillDrop: ColorPickerComponent;
  @ViewChild('portBorderDrop') public portBorderDrop: ColorPickerComponent;
  @ViewChild('portShapeDrop') public portShapeDrop: DropDownListComponent;
  @ViewChild('portSizeNum') public portSizeNum: NumericTextBoxComponent;
  @ViewChild('portWidthNum') public portWidthNum: NumericTextBoxComponent;

  // Snap settings configuration for the diagram
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };
  // Default shape configuration for rectangles and diamonds
  public rectangleShape: BasicShapeModel = {
    type: 'Basic',
    shape: 'Rectangle'
  };
  public diamondShape: BasicShapeModel = { type: 'Basic', shape: 'Diamond' };

  // Function to create a port with specified parameters
  public createPort(id: string, shape: PortShapes, offsetX: number, offsetY: number, text: string): CustomPort {
    return {
        id: id,
        shape: shape,
        offset: { x: offsetX, y: offsetY },
        height: 8,
        width: 8,
        visibility: PortVisibility.Visible,
        text: text
    };
  }
  // Ports configuration for various nodes
  public node1Port: CustomPort[] = [
    this.createPort('port1', 'Circle', 0, 0.5, 'In - 1'),
    this.createPort('port2', 'Circle', 1, 0.5, 'OUT - 1'),
    this.createPort('port3', 'Circle', 0.25, 1, 'In - 2'),
    this.createPort('port4', 'Circle', 0.5, 1, 'OUT - 2'),
    this.createPort('port5', 'Circle', 0.75, 1, 'In - 3')
  ];

  public node2Port: CustomPort[] = [
    this.createPort('port6', 'Circle', 0, 0.5, 'In - 1'),
    this.createPort('port7', 'Circle', 1, 0.35, 'OUT - 1'),
    this.createPort('port8', 'Circle', 1, 0.70, 'In - 2'),
    this.createPort('port9', 'Circle', 0.5, 1, 'OUT - 2')
  ];

  public node3Port: CustomPort[] = [
    this.createPort('port10', 'Circle', 0, 0.5, 'Out - 1'),
    this.createPort('port11', 'Circle', 0.5, 0, 'In - 1'),
    this.createPort('port12', 'Circle', 0.5, 1, 'OUT - 2')
  ];

  public node4Port: CustomPort[] = [
    this.createPort('port13', 'Circle', 0, 0.5, 'In - 1'),
    this.createPort('port14', 'Circle', 0.5, 0, 'In - 2'),
    this.createPort('port15', 'Circle', 0.5, 1, 'OUT - 1')
  ];

  public node5Port: CustomPort[] = [
    this.createPort('port16', 'Circle', 0, 0.5, 'out - 1'),
    this.createPort('port17', 'Circle', 0.5, 0, 'In - 1'),
    this.createPort('port18', 'Circle', 1, 0.5, 'OUT - 2')
  ];

  public node6Port: CustomPort[] = [
    this.createPort('port19', 'Circle', 0, 0.35, 'In - 1'),
    this.createPort('port20', 'Circle', 0.5, 1, 'Out - 1')
  ];

  public node7Port: CustomPort[] = [
    this.createPort('port21', 'Circle', 0.5, 0, 'In - 1'),
    this.createPort('port22', 'Circle', 0.5, 1, 'Out - 1')
  ];

  // Default settings for nodes
  public nodeDefaults(node: NodeModel): NodeModel {
    //sets height and width for nodes
    node.height = 65;
    node.width = 100;
    node.style = { fill: '#ebf8fb', strokeColor: '#baeaf5' };
    for (let i: number = 0; i < node.ports.length; i++) {
      //sets styles for the ports
      node.ports[i].style = {
        fill: '#366f8c',
        strokeColor: '#366f8c'
      };
      node.ports[i].width = 6;
      node.ports[i].height = 6;
      node.ports[i].visibility = PortVisibility.Visible;
    }
    node.annotations[0].style = {
      fontSize: 13,
      color: 'black'
    };
    return node;
  }

  // Default settings for connectors
  public connectorDefaults(connector: ConnectorModel): void {
    //defines type of the connectors
    connector.type = 'Orthogonal';
    connector.style = { strokeColor: '#8cdcef', strokeWidth: 1 };
    connector.targetDecorator = {
      width: 5,
      height: 5,
      style: { fill: '#8cdcef', strokeColor: '#8cdcef' }
    };
  }

  // Data fields configuration
  public fields: object = { value: 'value', text: 'text' };

  // Visibility options for ports
  public visibility: { [key: string]: Object }[] = [
    { value: PortVisibility.Visible, text: 'Visible' },
    { value: PortVisibility.Hidden, text: 'Hidden' },
    { value: PortVisibility.Hover, text: 'Hover' },
    { value: PortVisibility.Connect, text: 'Connect' }
  ];

  // Shape options for ports
  public shape: { [key: string]: Object }[] = [
    { value: 'X', text: 'X' },
    { value: 'Circle', text: 'Circle' },
    { value: 'Square', text: 'Square' },
    { value: 'Custom', text: 'Custom' }
  ];

  // Method to retrieve ports of selected node
  public getPort(): PointPortModel[] {
    let node: NodeModel = this.diagram.selectedItems.nodes[0];
    let port: PointPortModel[];
    if (node) {
      port = node.ports;
    }
    return port;
  }
  // Method to handle selection change in the diagram
  public selectChange(args: ISelectionChangeEventArgs): void {
    let appearance: HTMLElement = document.getElementById('propertypanel');
    if (args.state === 'Changed') {
      if (args.newValue) {
        // Custom code to handle appearance class
        if (!appearance.classList.contains('e-remove-selection')) {
          appearance.classList.add('e-remove-selection');
        }
        // Process node selection
        if (args.newValue[0] instanceof Node && appearance) {
          appearance.classList.remove('e-remove-selection');
          let port: PointPortModel = this.getPort()[0];
          this.portVisibilityDrop.value = port.visibility;
          this.portVisibilityDrop.dataBind();
          this.portFillDrop.value = port.style.fill;
          this.portFillDrop.dataBind();
          this.portBorderDrop.value = port.style.strokeColor;
          this.portBorderDrop.dataBind();
          this.portShapeDrop.value = port.shape;
          this.portShapeDrop.dataBind();
          this.portSizeNum.value = port.height;
          this.portSizeNum.dataBind();
          this.portWidthNum.value = port.style.strokeWidth;
          this.portWidthNum.dataBind();
        }
      }
    }
  }

  // Method triggered when diagram is created
  public diagramCreate(args: Object): void {
    this.diagram.select([this.diagram.nodes[0]]);
    this.diagram.fitToPage();
  }
  //Handles the change event when a port is dropped
  public portDropOnChange(args: ChangeEventArgs): void {
    let propertyPanel: HTMLElement = document.getElementById('propertyPanel');
    if (args.element) {
      propertyPanel.classList.add('disable-port-custom');
    }
  }
  // Apply port style changes based on property name and value
  private applyPortStyle(propertyName: string, propertyValue: Object): void {
    let ports: PointPortModel[] = this.getPort();
    for (let j: number = 0; j < ports.length; j++) {
      let port: PointPortModel = ports[j];
      if (propertyName === 'fill') {
        port.style.fill = propertyValue.toString();
      } else if (propertyName === 'strokecolor') {
        port.style.strokeColor = propertyValue.toString();
      } else if (propertyName === 'size') {
        port.width = port.height = Number(propertyValue);
      } else if (propertyName === 'strokewidth') {
        port.style.strokeWidth = Number(propertyValue);
      } else if (propertyName === 'visibility') {
        port.visibility = this.portVisibilityDrop.value as PortVisibility;
      } else if (propertyName === 'shape') {
        port.shape = propertyValue as PortShapes;
        if(port.shape === 'Custom') {
          port.pathData = 'M6.805,0L13.61,10.703L0,10.703z';
        }
      }
      this.diagram.dataBind();
    }
  }
  // Event handler for port fill color change
  public onFillColorChange(args: ColorPickerEventArgs): void {
    this.applyPortStyle('fill', args.currentValue.rgba);
  }
  // Event handler for port border color change
  public onBorderChange(args: ColorPickerEventArgs): void {
    this.applyPortStyle('strokecolor', args.currentValue.rgba);
  }
  // Event handler for port size change
  public onSizeChange(args: NumericChangeEventArgs): void {
    if (args.event) {
      this.applyPortStyle('size', args.value);
    }
  }
  // Event handler for port border width change
  public onBorderWidthChange(args: NumericChangeEventArgs): void {
    if (args.event) {
      this.applyPortStyle('strokewidth', args.value);
    }
  }
  // Event handler for port visibility dropdown change
  public portVisibilityDropOnChange(args: MultiSelectChangeEventArgs): void {
    this.applyPortStyle('visibility', args.value);
  }
  // Event handler for port shape dropdown change
  public portShapeDropOnChange(args: DropDownChangeEventArgs): void {
    this.applyPortStyle('shape', args.value);
  }
}
export interface CustomPort extends PointPortModel {
  text: string;
}
