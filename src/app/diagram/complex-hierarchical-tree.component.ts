import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, LineDistribution, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    NodeModel, ConnectorModel, DiagramTools, Diagram, DataBinding, ComplexHierarchicalTree,
    SnapConstraints, SnapSettingsModel, LayoutModel, LayoutOrientation,ConnectionPointOrigin
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { multiParentData } from './diagram-data';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(DataBinding, ComplexHierarchicalTree,LineDistribution);

export interface DataInfo {
    [key: string]: string;
}

/**
 * Sample for Multiple parent sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'complex-hierarchical-tree.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, NumericTextBoxModule, CheckBoxModule, SBDescriptionComponent]
})

export class ComplexHierarchicalTreeDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;

    //Sets the default values of nodes.
    public nodeDefaults(obj: NodeModel): NodeModel {
        obj.width = 40; obj.height = 40;
        obj.shape = { type: 'Basic', shape: 'Rectangle', cornerRadius: 7 };
        return obj;
    };
    //Configures data source
    public data: Object = {
        id: 'Name', parentId: 'ReportingPerson',
        dataSource: new DataManager(multiParentData),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
            /* tslint:disable:no-string-literal */
            nodeModel.style = { fill: data['fillColor'], strokeWidth: 1, strokeColor: data['border'] };
        }
    };
    public created(): void {
        this.diagram.fitToPage();
    };
    //Sets the default values of connectors
    public connectorDefaults(connector: ConnectorModel): void {
        connector.type = 'Orthogonal';
        connector.cornerRadius = 7;
        connector.targetDecorator.height = 7;
        connector.targetDecorator.width = 7;
        connector.style.strokeColor = '#6d6d6d';
    };

    //Disables all interactions except zoom/pan
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public layout: LayoutModel = {
        type: 'ComplexHierarchicalTree',
        connectionPointOrigin:ConnectionPointOrigin.DifferentPoint,
        horizontalSpacing: 40, verticalSpacing: 40, orientation: 'TopToBottom',
        margin: { left: 10, right: 0, top: 50, bottom: 0 }
    };

    ngOnInit(): void {
        document.getElementById('appearance').onclick = this.documentClick.bind(this);
    }
    //To handle connectoroverlaping 
    public onChange(args: CheckBoxChangeEventArgs): void {

        this.diagram.layout.connectionPointOrigin = args.checked ? ConnectionPointOrigin.DifferentPoint : ConnectionPointOrigin.SamePoint;  
    }

    public documentClick(args: MouseEvent): void {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style') {
            let id: string = target.id;
            let orientation1: string = id.substring(0, 1).toUpperCase() + id.substring(1, id.length);
            this.diagram.layout.orientation = orientation1 as LayoutOrientation;
            this.diagram.layout.orientation = orientation1 as LayoutOrientation;
            this.diagram.doLayout();
            // custom code start
            target.classList.add('e-selected-style');
            // custom code end
            this.diagram.dataBind();
        }
    };

    //To handle left margin of the layout.
    public onMarginLeftChange(args: NumericChangeEventArgs): void {
        this.diagram.layout.margin.left = args.value;
        this.diagram.dataBind();
    }
    //To handle top margin of the layout.
    public onMarginTopChange(args: NumericChangeEventArgs): void {
        this.diagram.layout.verticalAlignment = 'Top';
        this.diagram.layout.margin.top = args.value;
        this.diagram.dataBind();
    }
    //To handle horizontalspacing of the layout.
    public onhSpacingChange(args: NumericChangeEventArgs): void {
        this.diagram.layout.horizontalSpacing = Number(args.value);
        this.diagram.dataBind();
    }
    //To handle verticalspacing of the layout.
    public onvSpacingChange(args: NumericChangeEventArgs): void {
        this.diagram.layout.verticalSpacing = Number(args.value);
        this.diagram.dataBind();
    }
}
