/**
 * Sample for virtualization
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, ConnectorModel, DataBinding,ZoomOptions,
    HierarchicalTree, SnapConstraints, SnapSettingsModel,Rect,DiagramTools,DiagramConstraints
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { virtualizationData } from './complexShapes.data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
Diagram.Inject(DataBinding, HierarchicalTree);

@Component({
    selector: 'control-content',
    templateUrl: 'virtualization.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})

export class VirtualizationComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public bound: Rect = new Rect(200, 100, 500, 100);
    public constraints: DiagramConstraints;
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public virtualData: any = new DataManager(this.dataVirtualization());

    ngOnInit(): void {
        this.constraints = DiagramConstraints.Default | DiagramConstraints.Virtualization;
    }
    public data: Object = {
        //sets the fields to bind
        dataSource: this.virtualData,
        parentId: "Parent",
        id: "Name"
    };
    public dataVirtualization() {
        let i: number = 0, j, k, name, parentName;
        let data = [];
        parentName = virtualizationData[0].Name;
        data.push({ 'Name': parentName, 'Parent': "" })
        i++;
        for (j = 1; j < 100; j++) {
            name = virtualizationData[i].Name
            data.push({ 'Name': name, 'Parent': parentName })
            i++;
            for (k = 0; k < 2; k++) {
                data.push({ 'Name': virtualizationData[i].Name, 'Parent': name })
                i++;
            }
        }
        return data;
    }
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public layout: Object = {
        type: 'HierarchicalTree',
            margin: { left: 10, top: 10 },
            horizontalSpacing: 40.0,
            verticalSpacing: 50.0,
            orientation: 'TopToBottom',
    };

    //Defines the default node and connector properties
    public nodeDefaults(obj: any): NodeModel {
        obj.shape = { type: 'Text', content: obj.data.Name,shape: 'Rectangle', cornerRadius: 5 };
    obj.style = { fill: '#659be5', strokeColor: 'none', color: 'white', strokeWidth: 2 };
    obj.backgroundColor = '#659be5';
    obj.margin = { left: 5, right: 5, bottom: 5, top: 5 };
    obj.width = 80;
    obj.height = 30;
    return obj;
    };
    public created(): void {
        this.diagram.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: this.bound });
    }
    public connDefaults(connector: ConnectorModel): ConnectorModel {
        connector.type = 'Orthogonal';
    connector.cornerRadius = 7;
    connector.targetDecorator.height = 7;
    connector.targetDecorator.width = 7;
    connector.style.strokeColor = '#6d6d6d';
        return connector;
    }

    public onItemClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            case 'Zoom In':
                let zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomin);
                this.diagram.dataBind();
                break;
            case 'Zoom Out':
                let zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomout);
                this.diagram.dataBind();
                break;
            case 'Reset':
                this.diagram.reset();
                this.diagram.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: this.bound });
                break;
        }
    }
}