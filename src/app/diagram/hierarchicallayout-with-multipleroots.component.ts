/**
 * Sample for Hierarchical layout
 */

 import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
 import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
 import {
   Diagram,
   NodeModel,
   ConnectorModel,
   LayoutAnimation,
   DataBinding,
   HierarchicalTree,
   SnapConstraints,
   SnapSettingsModel,
   TextModel,
   LayoutOrientation,
 DiagramTools,
 } from '@syncfusion/ej2-diagrams';
 import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
 import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
 import { DataManager, Query } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
 Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);
 
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
     { id: 1, Label: 'Production Manager' },
     { id: 2, Label: 'Control Room', parentId: 1 },
     { id: 3, Label: 'Plant Operator', parentId: 1 },
     { id: 4, Label: 'Foreman', parentId: 2 },
     { id: 5, Label: 'Foreman', parentId: 3 },
     { id: 6, Label: 'Craft Personnel', parentId: 4 },
     { id: 7, Label: 'Craft Personnel', parentId: 4 },
     { id: 8, Label: 'Craft Personnel', parentId: 5 },
     { id: 9, Label: 'Craft Personnel', parentId: 5 },
     { id: 10, Label: 'Administrative Officer' },
     { id: 11, Label: 'Security Supervisor', parentId: 10 },
     { id: 12, Label: 'HR Supervisor', parentId: 10 },
     { id: 13, Label: 'Reception Supervisor', parentId: 10 },
     { id: 14, Label: 'Securities', parentId: 11 },
     { id: 15, Label: 'HR Officer', parentId: 12 },
     { id: 16, Label: 'Receptionist', parentId: 13 },
     { id: 17, Label: 'Maintainence Manager' },
     { id: 18, Label: 'Electrical Supervisor', parentId: 17 },
     { id: 19, Label: 'Mechanical Supervisor', parentId: 17 },
     { id: 20, Label: 'Craft Personnel', parentId: 18 },
     { id: 21, Label: 'Craft Personnel', parentId: 19 },
   ];
   public tools = DiagramTools.ZoomPan;
   public items: DataManager = new DataManager(
     this.data as JSON[],
     new Query().take(7)
   );
   public dataSourceSettings: Object = {
     //sets the fields to bind
     id: 'id',
     parentId: 'parentId',
     dataSource: this.items,
     doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
       debugger
       nodeModel.shape = {
         type: 'Text',
         content: (data as any).Label,
       };
     },
   };
 
   public snapSettings: SnapSettingsModel = {
     constraints: SnapConstraints.None,
   };
  // Layout
   public layout: Object = {
     type: 'HierarchicalTree',
     verticalSpacing: 30, horizontalSpacing: 40,
         enableAnimation: true
   };
 
   //Defines the default node and connector properties
   public nodeDefaults(obj: NodeModel): NodeModel {
     if((obj.data as any).id === 1 || (obj.data as any).id === 10 || (obj.data as any).id === 17){
       obj.style = { fill: '#1c5b9b', strokeColor: 'none', color: 'white', strokeWidth: 2 };
       obj.borderColor = '#1c5b9b';
       obj.backgroundColor = '#1c5b9b';
    }
    else if((obj.data as any).id === 2 ||(obj.data as any).id === 3 ||(obj.data as any).id === 11 ||(obj.data as any).id ===12 ||(obj.data as any).id === 13||(obj.data as any).id === 18||(obj.data as any).id === 19) {
       obj.style = { fill: '#18c1be', strokeColor: '#18c1be', color: 'white', strokeWidth: 2 };
       obj.borderColor = '#18c1be';
       obj.backgroundColor = '#18c1be';
    }
    else if((obj.data as any).id === 4||(obj.data as any).id === 5 ||(obj.data as any).id === 14 ||(obj.data as any).id === 15||(obj.data as any).id ===16||(obj.data as any).id ===20||(obj.data as any).id ===21) {
       obj.style = { fill: '#17a573', strokeColor: 'none', color: 'white', strokeWidth: 2 };
       obj.borderColor = '#17a573';
       obj.backgroundColor = '#17a573';
    }
    else {
       obj.style = { fill: '#73bb34', strokeColor: 'none', color: 'white', strokeWidth: 2 };
       obj.borderColor = '#73bb34';
       obj.backgroundColor = '#73bb34';
    }
   obj.width = 75;
   obj.height =35;
   (obj.shape as any).margin = { left: 5, right: 5, bottom: 5, top: 5 };
   return obj;
   }
 
   public connDefaults(
     connector: ConnectorModel,
     diagram: Diagram
   ): ConnectorModel {
     connector.type = 'Orthogonal';
     return connector;
   }
 
 }
 