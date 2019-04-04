import { Component, ViewEncapsulation } from '@angular/core';
import {
    Diagram, NodeModel, ConnectorModel, SnapConstraints, SnapSettingsModel,
    DataBinding, HierarchicalTree, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';

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
    encapsulation: ViewEncapsulation.None
})
export class LocalDataDiagramComponent {

    public nodeDefaults(node: NodeModel): NodeModel {
        let obj: NodeModel = {};
        obj.shape = { type: 'Basic', shape: 'Rectangle' };
        obj.style = { strokeWidth: 1 };
        obj.width = 95;
        obj.height = 30;
        return obj;
    };
    public data: Object = {
        id: 'Name', parentId: 'Category', dataManager: new DataManager((Data as any).species),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
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

    public connDefaults(connector: ConnectorModel): void {
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