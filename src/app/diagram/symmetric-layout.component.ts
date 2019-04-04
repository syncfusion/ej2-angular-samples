import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  DiagramComponent, Node, NodeModel, SnapConstraints, Diagram, ConnectorModel, SnapSettingsModel,
  DataBinding, BasicShapeModel, SymmetricLayout, DiagramTools
} from '@syncfusion/ej2-angular-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';
Diagram.Inject(DataBinding, SymmetricLayout);

/**
 * Sample for Symmetric layout
 */
@Component({
  selector: 'control-content',
  templateUrl: 'symmetric-layout.html',
  styleUrls: ['diagram-style.css'],
  encapsulation: ViewEncapsulation.None
})
export class SymmetricLayoutDiagramComponent {
  @ViewChild('diagram') public diagram: DiagramComponent;

  public springlength: number = 80;
  public springfactor: number = 0.8;
  public maxiteration: number = 500;

  public nodeDefaults(obj: NodeModel): NodeModel {
    obj.height = 20;
    obj.width = 20;
    obj.style = { fill: 'transparent', strokeWidth: 2 };
    return obj;
  }

  public connDefaults(obj: ConnectorModel): void {
    obj.targetDecorator.shape = 'None';
    obj.type = 'Straight';
  }

  public setNodeTemplate(obj: Node, diagram: Diagram): void {
    let shape: BasicShapeModel = { type: 'Basic', shape: 'Ellipse' };
    if (
      !(obj.data as EmployeeInfo).Type ||
      (obj.data as EmployeeInfo).Type === 'Server'
    ) {
      obj.width = 30;
      obj.height = 30;
      obj.shape = {
        type: 'Native',
        content:
          '<svg width="50" height="65"><g id="Server2_shape" fill="transparent" stroke="transparent" stroke-width="1"' +
          ' opacity="1" stroke-dasharray="" transform="translate(-15.517241379310343,-2.6329421835819375),' +
          'scale(1.7241379310344827,1.3774530437803194)" width="50" height="65"><g><g xmlns="http://www.w3.org/2000/svg">' +
          '<polygon fill="#DBD5DA" points="37.3,7.3 19.4,17.8 9.8,12.1 9.2,12.9 19,18.7 19,49 20,49 20,18.5 37.8,8.1  ">' +
          '</polygon>    <polygon fill="#E5DCE1" points="36.3,7.8 28.2,2.6 10.5,12.5 19.5,17.8  "></polygon> <polygon' +
          ' fill="#BBB5B9" points="20,18.5 37,8.6 36.9,38.4 20,47.9  "></polygon> <polygon fill="#DBD2D7" ' +
          'points="10,13.4 19,18.7 19,48.2 10,42.7  "></polygon>    <path fill="#656666" d="M19.2,49.1c-0.5,' +
          '0-0.9-0.1-1.3-0.4L10.2,44C9.4,43.5,9,42.7,9,41.8V13.6c0-0.9,0.5-1.7,1.3-2.2l16.7-9.2   c0.8-0.4,1.8-0.4,' +
          '2.5,0.1L36.8,7C37.6,7.5,38,8.2,38,9.1l-0.1,28.4c0,0.9-0.5,1.7-1.3,2.2l-16.2,9.1C20.1,49,19.6,49.1,19.2,49.1z ' +
          'M28.1,2.9c-0.3,0-0.5,0.1-0.7,0.2l-16.6,9.2c-0.5,0.3-0.8,0.8-0.8,1.3v28.2c0,0.5,0.3,1,0.7,1.3l7.7,4.8c0.5,0.3,' +
          '1.1,0.3,1.5,0  l16.2-9.1c0.5-0.3,0.8-0.8,0.8-1.3L37,9.1c0-0.5-0.3-1-0.7-1.3L29,3.2C28.7,3,28.4,2.9,28.1,2.9z">' +
          '</path><ellipse fill="#656666"  cx="14.3" cy="40.2" rx="0.6" ry="1.1"></ellipse> <polygon fill="#656666" ' +
          'points="10.9,22.6 10.9,22.6 10.9,22.6  "></polygon> <polygon fill="#656666" class="st4ed" points="11.9,' +
          '22 11.9,23.2 16.7,26 16.7,24.9 "></polygon><polygon fill="#656666" points="10.9,18.9 10.9,18.9 10.9,18.9"></polygon>' +
          '<polygon fill="#656666" points="11.9,18.4 11.9,19.5 16.7,22.4 16.7,21.2  "></polygon></g></g></g></svg>'
      };
    } else {
      obj.shape = shape;
      obj.style = { fill: 'orange' };
    }
  }

  public tool: DiagramTools = DiagramTools.ZoomPan;
  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

  public data: Object = { id: 'Id', parentId: 'Source', dataManager: new DataManager((Data as any).data) };
  public layout: Object = {
    type: 'SymmetricalLayout', springLength: 80, springFactor: 0.8, maxIteration: 500, margin: { left: 20, top: 20 }
  };
  public btnClick(args: MouseEvent): void {
    this.diagram.layout.springLength = this.springlength;
    this.diagram.layout.springFactor = this.springfactor;
    this.diagram.layout.maxIteration = this.maxiteration;
    this.diagram.dataBind();
  }
}

export interface EmployeeInfo {
  Type: string;
}
