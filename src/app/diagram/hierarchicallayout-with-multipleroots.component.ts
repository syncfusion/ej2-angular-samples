/**
 * Sample for Hierarchical layout
 */

 import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
 import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
 import {
   Diagram,
   NodeModel,
   ConnectorModel,
   DataBinding,
   HierarchicalTree,
   SnapConstraints,
   SnapSettingsModel,
 DiagramTools,
 } from '@syncfusion/ej2-diagrams';
 import { DataManager, Query } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
 Diagram.Inject(DataBinding, HierarchicalTree);
 
 export interface EmployeeInfo {
   Name: string;
 }
 
 @Component({
    selector: 'control-content',
    templateUrl: 'hierarchicallayout-with-multipleroots.html',
    styleUrls: ['hierarchicallayout-with-multipleroots.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        SBActionDescriptionComponent,
        DiagramModule,
        SBDescriptionComponent,
    ],
})
 export class HierarchicalLayoutWithMultipleRootComponent {
   @ViewChild('diagram')
   public diagram: DiagramComponent;
   //Initializes data source.
   public data: object[] = [
     { id: 1, Label: 'Production Manager', color:'#1c5b9b' },
     { id: 2, Label: 'Control Room', parentId: 1, color:'#18c1be'},
     { id: 3, Label: 'Plant Operator', parentId: 1, color:'#18c1be'},
     { id: 4, Label: 'Foreman', parentId: 2, color:'#17a573'},
     { id: 5, Label: 'Foreman', parentId: 3, color:'#17a573' },
     { id: 6, Label: 'Craft Personnel', parentId: 4, color:'#73bb34' },
     { id: 7, Label: 'Craft Personnel', parentId: 4, color:'#73bb34' },
     { id: 8, Label: 'Craft Personnel', parentId: 5, color:'#73bb34' },
     { id: 9, Label: 'Craft Personnel', parentId: 5, color:'#73bb34' },
     { id: 10, Label: 'Administrative Officer', color:'#1c5b9b'},
     { id: 11, Label: 'Security Supervisor', parentId: 10, color:'#18c1be' },
     { id: 12, Label: 'HR Supervisor', parentId: 10, color:'#18c1be' },
     { id: 13, Label: 'Reception Supervisor', parentId: 10, color:'#18c1be' },
     { id: 14, Label: 'Securities', parentId: 11, color:'#17a573' },
     { id: 15, Label: 'HR Officer', parentId: 12, color:'#17a573' },
     { id: 16, Label: 'Receptionist', parentId: 13, color:'#17a573' },
     { id: 17, Label: 'Maintainence Manager', color:'#1c5b9b' },
     { id: 18, Label: 'Electrical Supervisor', parentId: 17, color:'#18c1be' },
     { id: 19, Label: 'Mechanical Supervisor', parentId: 17, color:'#18c1be' },
     { id: 20, Label: 'Craft Personnel', parentId: 18, color:'#17a573' },
     { id: 21, Label: 'Craft Personnel', parentId: 19, color:'#17a573' },
   ];
   public tools = DiagramTools.ZoomPan;
   public items: DataManager = new DataManager(
     this.data as JSON[],
     new Query().take(7)
   );
     //configure data source settings
   public dataSourceSettings: Object = {
     //sets the fields to bind
     id: 'id',
     parentId: 'parentId',
     dataSource: this.items,
     doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
       nodeModel.shape = {
         type: 'Text',
         content: (data as any).Label,
       };
     },
   };
 
   public snapSettings: SnapSettingsModel = {
     constraints: SnapConstraints.None,
   };
  //Configure automatic layout
   public layout: Object = {
     type: 'HierarchicalTree',
     verticalSpacing: 30, horizontalSpacing: 40,
         enableAnimation: true
   };
 
   //Defines the default node properties
   public nodeDefaults(obj: NodeModel): NodeModel {
    (obj.style as any).fill = (obj.data as any).color;
    obj.backgroundColor = (obj.data as any).color;
   obj.width = 75;
   obj.height =35;
   (obj.style as any).color = 'white';
   (obj.style as any).strokeWidth = 2;
   (obj.shape as any).margin = { left: 5, right: 5, bottom: 5, top: 5 };
   return obj;
   }
  //Define the default connector properties
   public connectorDefaults(
     connector: ConnectorModel,
     diagram: Diagram
   ): ConnectorModel {
     connector.type = 'Orthogonal';
     connector.style = { strokeColor: 'CornflowerBlue' };
     connector.targetDecorator = { shape: 'Arrow', height: 10, width: 10, style: { fill: 'CornflowerBlue', strokeColor: 'white' } };
     return connector;
   }
 
 }
 