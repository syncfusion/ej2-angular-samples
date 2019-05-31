import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  DiagramComponent, ConnectorModel, SnapSettingsModel, SnapConstraints,
  NodeModel, BasicShapeModel, PortVisibility, PointPortModel,
  PortShapes, ISelectionChangeEventArgs, Node
} from '@syncfusion/ej2-angular-diagrams';
import {
  DropDownListComponent, MultiSelectComponent, MultiSelect, MultiSelectChangeEventArgs, ChangeEventArgs as DropDownChangeEventArgs,
  ChangeEventArgs,
  CheckBoxSelection
} from '@syncfusion/ej2-angular-dropdowns';
import {
  ColorPickerComponent, NumericTextBoxComponent,
  ChangeEventArgs as NumericChangeEventArgs, ColorPickerEventArgs
} from '@syncfusion/ej2-angular-inputs';
MultiSelect.Inject(CheckBoxSelection);

/**
 * Sample for Ports
 */
@Component({
  selector: 'control-content',
  templateUrl: 'ports.html',
  styleUrls: ['diagram-style.css'],
  encapsulation: ViewEncapsulation.None
})
export class PortDiagramComponent {
  @ViewChild('diagram') public diagram: DiagramComponent;

  @ViewChild('portVisibilityDrop')
  public portVisibilityDrop: MultiSelectComponent;
  @ViewChild('portFillDrop') public portFillDrop: ColorPickerComponent;
  @ViewChild('portBorderDrop') public portBorderDrop: ColorPickerComponent;
  @ViewChild('portShapeDrop') public portShapeDrop: DropDownListComponent;
  @ViewChild('portSizeNum') public portSizeNum: NumericTextBoxComponent;
  @ViewChild('portWidthNum') public portWidthNum: NumericTextBoxComponent;

  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };
  public rectangleShape: BasicShapeModel = {
    type: 'Basic',
    shape: 'Rectangle'
  };
  public diamondShape: BasicShapeModel = { type: 'Basic', shape: 'Diamond' };

  public node1Port: CustomPort[] = [
    {
      id: 'port1',
      shape: 'Circle',
      offset: { x: 0, y: 0.5 },
      text: 'In - 1'
    },
    {
      id: 'port2',
      shape: 'Circle',
      offset: { x: 1, y: 0.5 },
      text: 'OUT - 1'
    },
    {
      id: 'port3',
      shape: 'Circle',
      offset: { x: 0.25, y: 1 },
      text: 'In - 2'
    },
    {
      id: 'port4',
      shape: 'Circle',
      offset: { x: 0.5, y: 1 },
      text: 'OUT - 2'
    },
    {
      id: 'port5',
      shape: 'Circle',
      offset: { x: 0.75, y: 1 },
      text: 'In - 3'
    }
  ];

  public node2Port: CustomPort[] = [
    {
      id: 'port6',
      shape: 'Circle',
      offset: { x: 0, y: 0.5 },
      text: 'In - 1'
    },
    {
      id: 'port7',
      shape: 'Circle',
      offset: { x: 1, y: 0.35 },
      text: 'OUT - 1'
    },
    {
      id: 'port8',
      shape: 'Circle',
      offset: { x: 1, y: 0.7 },
      text: 'In - 2'
    },
    {
      id: 'port9',
      shape: 'Circle',
      offset: { x: 0.5, y: 1 },
      text: 'OUT - 2'
    }
  ];

  public node3Port: CustomPort[] = [
    {
      id: 'port10',
      shape: 'Circle',
      offset: { x: 0, y: 0.5 },
      text: 'Out - 1'
    },
    {
      id: 'port11',
      shape: 'Circle',
      offset: { x: 0.5, y: 0 },
      text: 'In - 1'
    },
    {
      id: 'port12',
      shape: 'Circle',
      offset: { x: 0.5, y: 1 },
      text: 'OUT - 2'
    }
  ];

  public node4Port: CustomPort[] = [
    {
      id: 'port13',
      shape: 'Circle',
      offset: { x: 0, y: 0.5 },
      text: 'In - 1'
    },
    {
      id: 'port14',
      shape: 'Circle',
      offset: { x: 0.5, y: 0 },
      text: 'In - 2'
    },
    {
      id: 'port15',
      shape: 'Circle',
      offset: { x: 0.5, y: 1 },
      text: 'OUT - 1'
    }
  ];

  public node5Port: CustomPort[] = [
    {
      id: 'port16',
      shape: 'Circle',
      offset: { x: 0, y: 0.5 },
      text: 'out - 1'
    },
    {
      id: 'port17',
      shape: 'Circle',
      offset: { x: 0.5, y: 0 },
      text: 'In - 1'
    },
    {
      id: 'port18',
      shape: 'Circle',
      offset: { x: 1, y: 0.5 },
      text: 'OUT - 2'
    }
  ];

  public node6Port: CustomPort[] = [
    {
      id: 'port19',
      shape: 'Circle',
      offset: { x: 0, y: 0.35 },
      text: 'In - 1'
    },
    {
      id: 'port20',
      shape: 'Circle',
      offset: { x: 0.5, y: 1 },
      text: 'Out - 1'
    }
  ];

  public node7Port: CustomPort[] = [
    {
      id: 'port21',
      shape: 'Circle',
      offset: { x: 0.5, y: 0 },
      text: 'In - 1'
    },
    {
      id: 'port22',
      shape: 'Circle',
      offset: { x: 0.5, y: 1 },
      text: 'Out - 1'
    }
  ];

  public nodeDefaults(node: NodeModel): NodeModel {
    let obj: NodeModel = {};
    //sets height and width for nodes
    obj.height = 65;
    obj.width = 100;
    obj.style = { fill: '#ebf8fb', strokeColor: '#baeaf5' };
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
    return obj;
  }

  public connDefaults(connector: ConnectorModel): void {
    //defines type of the connectors
    connector.type = 'Orthogonal';
    connector.style = { strokeColor: '#8cdcef', strokeWidth: 1 };
    connector.targetDecorator = {
      width: 5,
      height: 5,
      style: { fill: '#8cdcef', strokeColor: '#8cdcef' }
    };
  }

  public fields: object = { value: 'value', text: 'text' };

  public visibility: { [key: string]: Object }[] = [
    { value: PortVisibility.Visible, text: 'Visible' },
    { value: PortVisibility.Hidden, text: 'Hidden' },
    { value: PortVisibility.Hover, text: 'Hover' },
    { value: PortVisibility.Connect, text: 'Connect' }
  ];

  public shape: { [key: string]: Object }[] = [
    { value: 'X', text: 'X' },
    { value: 'Circle', text: 'Circle' },
    { value: 'Square', text: 'Square' },
    { value: 'Custom', text: 'Custom' }
  ];

  public getPort(): PointPortModel[] {
    let node: NodeModel = this.diagram.selectedItems.nodes[0];
    let port: PointPortModel[];
    if (node) {
      port = node.ports;
    }
    return port;
  }
  public selectChange(args: ISelectionChangeEventArgs): void {
    let appearance: HTMLElement = document.getElementById('propertypanel');
    if (args.state === 'Changed') {
      if (args.newValue) {
        // custom code start
        if (!appearance.classList.contains('e-remove-selection')) {
          appearance.classList.add('e-remove-selection');
        }
        // custom code end
        if (args.newValue[0] instanceof Node && appearance) {
          appearance.classList.remove('e-remove-selection');
          let port: PointPortModel = this.getPort()[0];
          this.portVisibilityDrop.value = [] as number[];
          if (PortVisibility.Visible & port.visibility) {
            this.portVisibilityDrop.value.push(PortVisibility.Visible);
          }
          if (PortVisibility.Hidden & port.visibility) {
            this.portVisibilityDrop.value.push(PortVisibility.Hidden);
          }
          if (PortVisibility.Hover & port.visibility) {
            this.portVisibilityDrop.value.push(PortVisibility.Hover);
          }
          if (PortVisibility.Connect & port.visibility) {
            this.portVisibilityDrop.value.push(PortVisibility.Connect);
          }
          if (this.portVisibilityDrop.value.length === 0) {
            this.portVisibilityDrop.placeholder = 'Select Visibility';
          }
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

  public diagramCreate(args: Object): void {
    this.diagram.select([this.diagram.nodes[0]]);
  }

  public portDropOnChange(args: ChangeEventArgs): void {
    let propertyPanel: HTMLElement = document.getElementById('propertyPanel');
    if (args.element) {
      propertyPanel.classList.add('disable-port-custom');
    }
  }

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
        port.visibility = 0;
        let propertyValue1: number[] = propertyValue as number[];
        for (let i: number = 0; i < propertyValue1.length; i++) {
          port.visibility += propertyValue1[i] as PortVisibility;
        }
      } else if (propertyName === 'shape') {
        port.shape = propertyValue as PortShapes;
      }
      this.diagram.dataBind();
    }
  }

  public onFillColorChange(args: ColorPickerEventArgs): void {
    this.applyPortStyle('fill', args.currentValue.rgba);
  }
  public onBorderChange(args: ColorPickerEventArgs): void {
    this.applyPortStyle('strokecolor', args.currentValue.rgba);
  }
  public onSizeChange(args: NumericChangeEventArgs): void {
    if (args.event) {
      this.applyPortStyle('size', args.value);
    }
  }
  public onBorderWidthChange(args: NumericChangeEventArgs): void {
    if (args.event) {
      this.applyPortStyle('strokewidth', args.value);
    }
  }

  public portVisibilityDropOnChange(args: MultiSelectChangeEventArgs): void {
    this.applyPortStyle('visibility', args.value);
  }

  public portShapeDropOnChange(args: DropDownChangeEventArgs): void {
    this.applyPortStyle('shape', args.value);
  }
}
export interface CustomPort extends PointPortModel {
  text: string;
}
