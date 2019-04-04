import { Component, ViewEncapsulation } from '@angular/core';
import {
    Diagram, NodeModel, ConnectorModel, SnapConstraints,
    DataBinding, HierarchicalTree, TreeInfo, DiagramTools,SnapSettingsModel
} from '@syncfusion/ej2-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';
Diagram.Inject(DataBinding, HierarchicalTree);

export interface DataInfo {
    [key: string]: string;
}

/**
 * Remote Data binding sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class RemoteDataDiagramComponent {

    public nodeDefaults(obj: NodeModel): NodeModel {
        obj.width = 80;
        obj.height = 40;
        //Initialize shape
        obj.shape = { type: 'Basic', shape: 'Rectangle' };
        obj.style = { fill: '#048785', strokeColor: 'Transparent' };
        return obj;
    };

    public data: Object = {
        id: 'EmployeeID', parentId: 'ReportsTo',
        dataManager: new DataManager(
            { url: 'https://mvc.syncfusion.com/Services/Northwnd.svc/', crossDomain: true },
            new Query().from('Employees').select('EmployeeID,ReportsTo,FirstName').take(9),
        ),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
            nodeModel.annotations = [{
                /* tslint:disable:no-string-literal */
                content: data['FirstName'],
                style: { color: 'white' }
            }];
        }
    };

    public connDefaults(connector: ConnectorModel): void {
        connector.type = 'Orthogonal';
        connector.style.strokeColor = '#048785';
        connector.targetDecorator.shape = 'None';
    };

    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public layout: Object = {
        type: 'HierarchicalTree', margin: { left: 0, right: 0, top: 100, bottom: 0 },
        verticalSpacing: 40,
        getLayoutInfo: (node: NodeModel, options: TreeInfo) => {
            if (options.level === 3) {
                node.style.fill = '#3c418d';
            }
            if (options.level === 2) {
                node.style.fill = '#108d8d';
                options.type = 'Center';
                options.orientation = 'Horizontal';
            }
            if (options.level === 1) {
                node.style.fill = '#822b86';
            }
        }
    };
}
