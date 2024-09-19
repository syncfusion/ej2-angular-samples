import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, Connector, SnapSettingsModel, PortVisibility, SnapConstraints, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo);

/**
 * Default FlowShape sample
 */

@Component({
    selector: 'app-root',
    templateUrl: 'uml-sequence-diagram.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class UmlSequenceComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;
  constructor() {​​​​​​​
    
}​​​​​​​

//Function to Create nodes by the parameters
public createNode(id: string, width: number, height: number, offsetX: number, offsetY: number, 
  content: string, fill: string, bold: boolean): NodeModel {
  return {
      id: id,
      width: width,
      height: height,
      offsetX: offsetX,
      offsetY: offsetY,
      shape: { type: "Text", content: content },
      style: { fill: fill, bold: bold }
  };
}
//Function to Create connectors by the parameters
public createConnector(id:string, sourceX:number, sourceY:number, targetX:number, targetY:number):ConnectorModel {
  return {
      id: id,
      type: 'Straight',
      sourcePoint: { x: sourceX, y: sourceY },
      targetPoint: { x: targetX, y: targetY },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' }
  };
}
// Array of nodes with their respective properties
public nodes : NodeModel[] = [
  // Call to createNode method to generate nodes
  this.createNode('employee', 100, 60, 100, 100, 'Employee', 'transparent', true),
  this.createNode('teamLead', 100, 60, 350, 100, 'Team Lead', 'transparent', true),
  this.createNode('dashboard', 100, 60, 600, 100, 'Dashboard', 'transparent', true),
  this.createNode('manager', 100, 60, 850, 100, 'Manager', 'transparent', true),
  this.createNode('leaveRequest', 100, 60, 225, 250, 'Leave Request', 'transparent', false),
  this.createNode('leaveApproval', 100, 60, 225, 484, 'Leave Approval', 'transparent', false),
  this.createNode('checkEmplyeeAvail', 175, 30, 470, 345, 'Check Employee availability and task status', 'transparent', false),
  this.createNode('forwardLeaveMssg', 150, 30, 600, 420, 'Forward Leave Request', 'transparent', false),
  this.createNode('noObjection', 150, 30, 600, 460, 'No Objection', 'transparent', false),
  // Custom node for special operation
  {
      id:'employeeNode',shape:{type:'Basic',shape:'Rectangle'},width:10,height:250,offsetX:100,offsetY:350,
      style:{fill:'orange',strokeColor:'orange'},
      ports:[{id:'p1',offset:{x:1,y:0.05},visibility:PortVisibility.Hidden},
              {id:'p2',offset:{x:1,y:0.97},visibility:PortVisibility.Hidden},]
  },
  {
      id:'teamLeadNode',shape:{type:'Basic',shape:'Rectangle'},width:10,height:190,offsetX:350,offsetY:320,
      style:{fill:'orange',strokeColor:'orange'},
      ports:[{id:'p1',offset:{x:0,y:0.07},visibility:PortVisibility.Hidden},
      {id:'p2',offset:{x:1,y:0.92},visibility:PortVisibility.Hidden},
      {id:'p3',offset:{x:1,y:0.5},visibility:PortVisibility.Hidden},]
  },
  {
      id:'dashboardNode',shape:{type:'Basic',shape:'Rectangle'},width:10,height:25,offsetX:600,offsetY:320,
      style:{fill:'orange',strokeColor:'orange'},
      ports:[{id:'p1',offset:{x:0,y:0.5},visibility:PortVisibility.Hidden}]
  },
  {
      id:'managerNode',shape:{type:'Basic',shape:'Rectangle'},width:10,height:50,offsetX:850,offsetY:420,
      style:{fill:'orange',strokeColor:'orange'},
      ports:[{id:'p1',offset:{x:0,y:0.1},visibility:PortVisibility.Hidden},
      {id:'p2',offset:{x:0,y:0.9},visibility:PortVisibility.Hidden},]
  },

];
// Array of connectors between nodes
public connectors : ConnectorModel[] = [
  // Call to createConnector method to generate straight connectors
  this.createConnector('employeeCon1', 100, 120, 100, 225),
  this.createConnector('employeeCon2', 100, 475, 100, 600),
  this.createConnector('teamLeanCon1', 350, 120, 350, 225),
  this.createConnector('teamLeanCon2', 350, 415, 350, 600),
  this.createConnector('dashboardCon1', 600, 120, 600, 307),
  this.createConnector('dashboardCon2', 600, 333, 600, 600),
  this.createConnector('managerCon1', 850, 120, 850, 395),
  this.createConnector('managerCon2', 850, 445, 850, 600),
  // Custom connectors between specific nodes
  {
      id:'empToTeamLead',type:'Straight',sourceID:'employeeNode',sourcePortID:'p1',
      targetID:'teamLeadNode',targetPortID:'p1'
  },
  {
      id:'teamLeadToEmp',type:'Straight',sourcePoint:{x:350,y:465},style:{strokeDashArray:'4 4'},
      targetID:'employeeNode',targetPortID:'p2'
  },
  {
      id:'teamLeadToDash',type:'Straight',sourceID:'teamLeadNode',sourcePortID:'p3',
      targetID:'dashboardNode',targetPortID:'p1'
  },
  {
      id:'teamLeadToManager',type:'Straight',sourceID:'teamLeadNode',sourcePortID:'p2',
      targetID:'managerNode',targetPortID:'p1'
  },
  {
      id:'managerToTeamLead',type:'Straight',sourceID:'managerNode',sourcePortID:'p2',
      targetPoint:{x:350,y:440},style:{strokeDashArray:'4 4'}
  },
];
  // Default settings for connectors
  public connectorDefaults(connector: Connector): void {
    connector.targetDecorator.style = {fill:'#489ECC',strokeColor:'#489ECC'};
    if(connector.targetDecorator.shape === 'Arrow'){
    connector.style = {strokeColor:'#489ECC',strokeWidth:2};
    }
  }
  // Method to handle initialization logic when the component is created
  public created(args : any): void {
    this.diagram.fitToPage();
  }
  // Tools used for the diagram
  public tools = DiagramTools.ZoomPan;
  // Snap settings configuration for the diagram
  public snapSettings: SnapSettingsModel = {
    constraints : SnapConstraints.None
  };

}