/**
 * Symmetric Layout sample
 */

// Importing needed dependencies for diagram
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, Node, NodeModel, SnapConstraints, Diagram, ConnectorModel, SnapSettingsModel, DataBinding, BasicShapeModel, SymmetricLayout, DiagramTools, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import  { data } from './diagram-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(DataBinding, SymmetricLayout);

/**
 * Component for displaying a Symmetric Layout sample.
 * Manages the presentation and behavior of the diagram using Syncfusion's Angular Diagram component.
 */
@Component({
    selector: 'control-content', // Angular component selector
    templateUrl: 'symmetric-layout.html',  // HTML template file for the component
    styleUrls: ['diagram-style.css'],  // CSS styles specific to the component
    encapsulation: ViewEncapsulation.None,  // No view encapsulation
    standalone: true,  // Indicates it's a standalone component
    imports: [SBActionDescriptionComponent, DiagramModule, NumericTextBoxModule, ButtonModule, SBDescriptionComponent]  // Importing necessary Angular modules and components
})

/**
 * Represents a diagram component with symmetric layout.
 */
export class SymmetricLayoutDiagramComponent {
  // Reference to the diagram component
  @ViewChild('diagram') 
  public diagram: DiagramComponent;
  
  // Spring layout parameters
  public springlength: number = 80;
  public springfactor: number = 0.8;
  public maxiteration: number = 500;

  //Set the default values of Node
  public nodeDefaults(node: NodeModel): NodeModel {
    node.height = 20;
    node.width = 20;
    node.style = { fill: 'transparent', strokeWidth: 2 };
    return node;
  }
//Set the default values of Connectors
  public connDefaults(connector: ConnectorModel): void {
    connector.targetDecorator.shape = 'None';
    connector.type = 'Straight';
  }

  //Funtion to add the Template of the Node.
  public setNodeTemplate(node: Node): void {
    let shape: BasicShapeModel = { type: 'Basic', shape: 'Ellipse' };
    if (
      !(node.data as EmployeeInfo).Type ||
      (node.data as EmployeeInfo).Type === 'Server'
    ) {
      node.width = 30;
      node.height = 30;
      node.shape = {
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
      node.shape = shape;
      node.style = { fill: 'orange' };
    }
  }
 // Tool settings
  public tool: DiagramTools = DiagramTools.ZoomPan;

        //Set the constraints of the SnapSettings

  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
// Add Data source for the diagram
  public data: Object = { id: 'Id', parentId: 'Source', dataSource: new DataManager(data) };
  
  // Layout configuration
  public layout: Object = {
    type: 'SymmetricalLayout', springLength: 80, springFactor: 0.8, maxIteration: 500, margin: { left: 20, top: 20 }
  };
  // Button click handlers
  public btnClick(args: MouseEvent): void {
    this.diagram.layout.springLength = this.springlength;
    this.diagram.layout.springFactor = this.springfactor;
    this.diagram.layout.maxIteration = this.maxiteration;
    this.diagram.doLayout();
  }
}

// Interface to define properties of EmployeeInfo
export interface EmployeeInfo {
  Type: string;
}
