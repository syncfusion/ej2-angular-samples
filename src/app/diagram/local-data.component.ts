import { Component, ViewEncapsulation } from '@angular/core';
import {
    Diagram, NodeModel, ConnectorModel, SnapConstraints, SnapSettingsModel,
    DataBinding, HierarchicalTree, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { species } from './diagram-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { SBActionDescriptionComponent } from '../common/adp.component';

export interface DataInfo {
    [key: string]: string;
}

Diagram.Inject(DataBinding, HierarchicalTree);

/**
 * Local Data Binding sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'local-data.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class LocalDataDiagramComponent {

     // Used to set default values of node
    public nodeDefaults(node: NodeModel): void {
        node.shape = { type: 'Basic', shape: 'Rectangle' };
        node.style = { strokeWidth: 1 };
        node.width = 95;
        node.height = 30;
    };
    public data: Object = {
        id: 'Name', parentId: 'Category', dataSource: new DataManager(species),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: DataInfo) => {
            nodeModel.annotations = [{
                /* tslint:disable:no-string-literal */
                content: data['Name'],
                style: { color: 'black' }
            }
            ];
            /* tslint:disable:no-string-literal */
            nodeModel.style = { fill: '#ffeec7', strokeColor: '#f5d897', strokeWidth: 1 };
        }
    };

     // Used to set default values of connector
    public connectorDefaults(connector: ConnectorModel): void {
        connector.type = 'Orthogonal';
        connector.style.strokeColor = '#4d4d4d';
        connector.targetDecorator.shape = 'None';
    };

    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public layout: Object = {
        type: 'HierarchicalTree', horizontalSpacing: 40, verticalSpacing: 40,
        margin: { top: 10, left: 10, right: 10, bottom: 0 }
    };
}

export interface EmployeeInfo {
    Role: string;
    color: string;
}