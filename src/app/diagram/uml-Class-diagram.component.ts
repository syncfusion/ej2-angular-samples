/**
 * class-diagram sample
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, IDragEnterEventArgs, SymbolInfo, MarginModel, SymbolPaletteModule, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram,
  NodeModel,
  ConnectorModel,
  Connector,
  PaletteModel,
  UmlClassifierShapeModel
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for class diagram
 */
@Component({
    selector: 'control-content',
    templateUrl: 'uml-Class-diagram.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SymbolPaletteModule, DiagramModule, SBDescriptionComponent]
})
export class UmlClassDiagramComponent {
  @ViewChild('diagram')
  public diagram: DiagramComponent;

  public expandMode: ExpandMode = 'Multiple';
  // Initialize the palettes displayed in the symbol palette
  public palettes: PaletteModel[] = [
    {
      id: 'UmlActivity', expanded: true, title: 'UML Classifier Nodes', symbols: [
      {
          id: 'class',
          borderColor: 'white',
          shape: {
              type: 'UmlClassifier',
              classShape: {
                  attributes: [
                      { name: 'accepted', type: 'Date', isSeparator: true },
                      { name: 'sickness', type: 'History' },
                      { name: 'prescription', type: 'String[*]' },
                      { name: 'allergies', type: 'String[*]' }
                  ],
                  methods: [{ name: 'getHistory', style: {}, parameters: [{ name: 'Date', style: {} }], type: 'History' }],
                  name: 'Patient'
              },
              classifier: 'Class'
          },
      },
      {
          id: 'Interface',
           borderColor: 'white',
          shape: {
              type: 'UmlClassifier',
              interfaceShape: {
                  name: "Bank Account",
                  attributes: [{
                          name: "owner",
                          type: "String[*]", style: {}
                      },
                      {
                          name: "balance",
                          type: "Dollars"
                      }],
                  methods: [{
                          name: "deposit", style: {},
                          parameters: [{
                                  name: "amount",
                                  type: "Dollars",
                                  style: {}
                              }],
                      }]
              },
              classifier: 'Interface'
          },
      },
      {
          id: 'Enumeration',
           borderColor: 'white',
          shape: {
              type: 'UmlClassifier',
              enumerationShape: {
                  name: 'AccountType',
                  members: [
                      {
                          name: 'Checking Account', style: {}
                      },
                      {
                          name: 'Savings Account'
                      },
                      {
                          name: 'Credit Account'
                      }
                  ]
              },
              classifier: 'Enumeration'
          },
      },
      ]
  },
  {
    id: 'umlConnectorrs', expanded: true, title: 'UML Classifier Connectors', symbols: [
      {
        id: 'Composition',
        sourcePoint: { x: 100, y: 200 },
        targetPoint: { x: 200, y: 300 },
        type: 'Straight',
        shape: { type: 'UmlClassifier', relationship: 'Composition' }
    },
    {
        id: 'BiDirectional',
        type: 'Straight',
        sourcePoint: { x: 300, y: 200 },
        targetPoint: { x: 400, y: 300 },
        shape: { type: 'UmlClassifier', relationship: 'Aggregation', associationType: 'BiDirectional' }
    },
    {
        id: 'Directional',
        type: 'Straight',
        sourcePoint: { x: 500, y: 200 },
        targetPoint: { x: 600, y: 300 },
        shape: { type: 'UmlClassifier', relationship: 'Association', associationType: 'Directional' }
    },
    {
        id: 'Association',
        type: 'Straight',
        sourcePoint: { x: 700, y: 200 },
        targetPoint: { x: 800, y: 300 },
        shape: { type: 'UmlClassifier', relationship: 'Association' }
    },
    {
        id: 'Inheritance',
        type: 'Straight',
        sourcePoint: { x: 900, y: 200 },
        targetPoint: { x: 1000, y: 300 },
        shape: { type: 'UmlClassifier', relationship: 'Inheritance' }
    },
    {
        id: 'Interfaces',
        type: 'Straight',
        sourcePoint: { x: 100, y: 400 },
        targetPoint: { x: 200, y: 500 },
        shape: { type: 'UmlClassifier', relationship: 'Interface' }
    },
    {
        id: 'Dependency',
        type: 'Straight',
        sourcePoint: { x: 300, y: 400 },
        targetPoint: { x: 400, y: 500 },
        shape: { type: 'UmlClassifier', relationship: 'Dependency' }
    },
    {
        id: 'Realization',
        type: 'Straight',
        sourcePoint: { x: 500, y: 400 },
        targetPoint: { x: 600, y: 500 },
        shape: { type: 'UmlClassifier', relationship: 'Realization' }
    },
    {
        id: "OneToMany",
        type: 'Straight',
        sourcePoint: {
            x: 700,
            y: 400
        },
        targetPoint: {
            x: 800,
            y: 500
        },
        annotations: [{
                margin: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 20
                }
            }
        ],
        shape: {
            type: "UmlClassifier",
            relationship: 'Dependency',
            multiplicity: {
                type: 'OneToMany',
                source: {
                    optional: true,
                    lowerBounds: '89',
                    upperBounds: '67'
                },
                target: { optional: true, lowerBounds: '78', upperBounds: '90' }
            }
        }
    },
    {
        id: "ManyToMany",
        sourcePoint: {
            x: 900,
            y: 400
        },
        targetPoint: {
            x: 1000,
            y: 500
        },
        annotations: [{
                margin: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 20
                }
            }
        ],
        shape: {
            type: "UmlClassifier",
            relationship: 'Dependency',
            multiplicity: {
                type: 'ManyToMany',
                source: {
                    optional: true,
                    lowerBounds: '89',
                    upperBounds: '67'
                },
                target: { optional: true, lowerBounds: '78', upperBounds: '90' }
            }
        }
    },
    {
        id: "OneToOne",
        sourcePoint: { x: 100, y: 600 },
        targetPoint: { x: 200, y: 700 },
        annotations: [{
                margin: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 20
                }
            }
        ],
        shape: {
            type: "UmlClassifier",
            relationship: 'Dependency',
            multiplicity: {
                type: 'OneToOne',
                source: {
                    optional: true,
                    lowerBounds: '89',
                    upperBounds: '67'
                },
                target: { optional: true, lowerBounds: '78', upperBounds: '90' }
            }
        }
    },
    {
        id: "ManyToOne",
        sourcePoint: { x: 300, y: 600 },
        targetPoint: { x: 400, y: 700 },
        annotations: [{
                margin: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 20
                }
            }
        ],
        shape: {
            type: "UmlClassifier",
            relationship: 'Dependency',
            multiplicity: {
                type: 'ManyToOne',
                source: {
                    optional: true,
                    lowerBounds: '89',
                    upperBounds: '67'
                },
                target: { optional: true, lowerBounds: '78', upperBounds: '90' }
            }
        }
    },
    {
        id: "OneToMany",
        sourcePoint: { x: 500, y: 600 },
        targetPoint: { x: 600, y: 700 },
        annotations: [{
                margin: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 20
                }
            }
        ],
        shape: {
            type: "UmlClassifier",
            relationship: 'Dependency',
            multiplicity: {
                type: 'OneToMany',
            }
        }
    }
    ]
  }
  ];
 //Initialize nodes for the diagram.
  public nodes: NodeModel[] = [
    {
      id: 'Patient',
      shape: {
        type: 'UmlClassifier',
        classShape: {
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
        classShape: {
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
        classShape: {
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
        classShape: {
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
        classShape: {
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
        classShape: {
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
 //Initialize connector for the diagram.
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
  public getNodeDefaults(node: NodeModel): NodeModel {
    node.style = { fill: '#26A0DA', strokeColor: 'white' };
    if (node.annotations.length > 0) {
      for (let i: number = 0; i < node.annotations.length; i++) {
        node.annotations[i].style.color = 'white';
      }
    }
    return node;
  }
  public created(): void {
    this.diagram.fitToPage();
  }
    // Set the default values of connectors.
    public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
      return connector;
      }
      public dragEnter(arg: IDragEnterEventArgs): void {
        if(arg.element instanceof Connector){
          arg.element.targetPoint.x += 100;
          arg.element.targetPoint.y += 20
        }
      }
  public getSymbolDefaults(symbol: NodeModel): void {
    symbol.width = 100;
    symbol.height = 100;
  }


  // Create and return a connector object with specified properties during initial rendering.
  public createConnector( id: string, sourceID: string, targetID: string ): ConnectorModel {
    let connector: ConnectorModel = {};
    connector.id = id;
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    return connector;
  }

  // Create and return a node object with specified properties during initial rendering.
  public createNode(id: string, offsetX: number, offsetY: number, className: string): NodeModel {
    let node: NodeModel = {};
    node.id = id;
    node.offsetX = offsetX;
    node.offsetY = offsetY;
    node.shape = {
      type: 'UmlClassifier',
      classShape: {
        name: className
      },
      classifier: 'Class'
    } as UmlClassifierShapeModel;
    return node;
  }
  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true,description: { text: symbol.id, } ,tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
 }
 public symbolMargin: MarginModel = {
  left: 12, right: 12, top: 12, bottom: 12 
};
  // create class Property
  public createProperty(name: string, type: string): object {
    return { name: name, type: type };
  }

  // create class Methods
  public createMethods(name: string, type: string): object {
    return { name: name, type: type };
  }
}
