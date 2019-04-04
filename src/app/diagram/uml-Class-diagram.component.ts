/**
 * class-diagram sample
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram,
  NodeModel,
  ConnectorModel,
  UmlClassifierShapeModel
} from '@syncfusion/ej2-diagrams';

/**
 * Sample for class diagram
 */
@Component({
  selector: 'control-content',
  templateUrl: 'uml-Class-diagram.html',
  styleUrls: ['diagram-style.css'],
  encapsulation: ViewEncapsulation.None
})
export class UmlClassDiagramComponent {
  @ViewChild('diagram')
  public diagram: DiagramComponent;

  public nodes: NodeModel[] = [
    {
      id: 'Patient',
      shape: {
        type: 'UmlClassifier',
        class: {
          name: 'Patient',
          attributes: [
            this.createProperty('accepted', 'Date'),
            this.createProperty('sickness', 'History'),
            this.createProperty('prescription', 'String[*]'),
            this.createProperty('allergies', 'String[*]')
          ],
          methods: [this.createMethods('getHistory', 'History')]
        },
        classifier: 'Class'
      } as UmlClassifierShapeModel,
      offsetX: 200,
      offsetY: 250
    },
    {
      id: 'Doctor',
      shape: {
        type: 'UmlClassifier',
        class: {
          name: 'Doctor',
          attributes: [
            this.createProperty('specialist', 'String[*]'),
            this.createProperty('locations', 'String[*]')
          ]
        },
        classifier: 'Class'
      } as UmlClassifierShapeModel,
      offsetX: 240,
      offsetY: 545
    },
    {
      id: 'Person',
      shape: {
        type: 'UmlClassifier',
        class: {
          name: 'Person',
          attributes: [
            this.createProperty('name', 'Name'),
            this.createProperty('title', 'String[*]'),
            this.createProperty('gender', 'Gender')
          ]
        },
        classifier: 'Class'
      } as UmlClassifierShapeModel,
      offsetX: 405,
      offsetY: 105
    },
    {
      id: 'Hospital',
      shape: {
        type: 'UmlClassifier',
        class: {
          name: 'Hospital',
          attributes: [
            this.createProperty('name', 'Name'),
            this.createProperty('address', 'Address'),
            this.createProperty('phone', 'Phone')
          ],
          methods: [this.createMethods('getDepartment', 'String')]
        },
        classifier: 'Class'
      } as UmlClassifierShapeModel,
      offsetX: 638,
      offsetY: 100
    },
    {
      id: 'Department',
      shape: {
        type: 'UmlClassifier',
        class: {
          name: 'Department',
          methods: [this.createMethods('getStaffCount', 'Int')]
        },
        classifier: 'Class'
      } as UmlClassifierShapeModel,
      offsetX: 638,
      offsetY: 280
    },
    {
      id: 'Staff',
      shape: {
        type: 'UmlClassifier',
        class: {
          name: 'Staff',
          attributes: [
            this.createProperty('joined', 'Date'),
            this.createProperty('education', 'string[*]'),
            this.createProperty('certification', 'string[*]'),
            this.createProperty('languages', 'string[*]')
          ],
          methods: [
            this.createMethods('isDoctor', 'bool'),
            this.createMethods('getHistory', 'bool')
          ]
        },
        classifier: 'Class'
      } as UmlClassifierShapeModel,
      offsetX: 635,
      offsetY: 455
    },
    this.createNode('OperationStaff', 410, 455, 'OperationStaff'),
    this.createNode('Nurse', 410, 545, 'Nurse'),
    this.createNode('Surgeon', 240, 665, 'Surgeon'),
    this.createNode('AdministrativeStaff', 632, 605, 'AdministrativeStaff'),
    this.createNode('FrontDeskStaff', 630, 695, 'FrontDeskStaff'),
    this.createNode('TechnicalStaff', 928, 445, 'TechnicalStaff'),
    this.createNode('Technician', 815, 535, 'Technician'),
    this.createNode('Technologist', 1015, 535, 'Technologist'),
    this.createNode('SurgicalTechnologist', 1015, 630, 'SurgicalTechnologist')
  ];

  public connectors: ConnectorModel[] = [
    this.createConnector('connect1', 'Patient', 'Person'),
    this.createConnector('connect2', 'Person', 'Hospital'),
    this.createConnector('connect3', 'Department', 'Hospital'),
    this.createConnector('connect4', 'OperationStaff', 'Patient'),
    this.createConnector('connect5', 'Doctor', 'OperationStaff'),
    this.createConnector('connect6', 'Nurse', 'OperationStaff'),
    this.createConnector('connect7', 'Surgeon', 'Doctor'),
    this.createConnector('connect8', 'FrontDeskStaff', 'AdministrativeStaff'),
    this.createConnector('connect9', 'Technician', 'TechnicalStaff'),
    this.createConnector('connect10', 'Technologist', 'TechnicalStaff'),
    this.createConnector('connect11', 'SurgicalTechnologist', 'Technologist'),
    this.createConnector('connect12', 'Staff', 'Department'),
    this.createConnector('connect13', 'Staff', 'Person'),
    this.createConnector('connect14', 'OperationStaff', 'Staff'),
    this.createConnector('connect15', 'AdministrativeStaff', 'Staff'),
    this.createConnector('connect16', 'TechnicalStaff', 'Staff')
  ];

  // Set the default values of nodes.
  public getNodeDefaults(obj: NodeModel): NodeModel {
    obj.style = { fill: '#26A0DA', strokeColor: 'white' };
    return obj;
  }

  // Set the default values of connectors.
  public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.shape = {
      type: 'UmlClassifier',
      relationship: 'Association',
      multiplicity: {
          type: 'OneToOne'
      }
  };
  return connector;
  }

  // Set an annoation style at runtime.
  public setNodeTemplate(node: NodeModel): void {
    if (node.annotations.length > 0) {
      for (let i: number = 0; i < node.annotations.length; i++) {
        node.annotations[i].style.color = 'white';
      }
    }
  }

  // Create a connector.
  public createConnector( id: string, sourceID: string, targetID: string ): ConnectorModel {
    let connector: ConnectorModel = {};
    connector.id = id;
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    return connector;
  }

  // Create class Diagram shapes.
  public createNode( id: string, offsetX: number, offsetY: number, className: string ): NodeModel {
    let node: NodeModel = {};
    node.id = id;
    node.offsetX = offsetX;
    node.offsetY = offsetY;
    node.shape = {
      type: 'UmlClassifier',
      class: {
        name: className
      },
      classifier: 'Class'
    } as UmlClassifierShapeModel;
    return node;
  }

  // create class Property
  public createProperty(name: string, type: string): object {
    return { name: name, type: type };
  }

  // create class Methods
  public createMethods(name: string, type: string): object {
    return { name: name, type: type };
  }
}
