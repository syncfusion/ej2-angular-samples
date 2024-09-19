import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DiagramComponent, Diagram, NodeModel, ConnectorModel, LayoutOrientation, LayoutAnimation, TreeInfo, SnapSettingsModel, SubTreeOrientation, SubTreeAlignments, DiagramTools, Node, DataBinding, HierarchicalTree, ConnectorConstraints, SnapConstraints, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { localBindData } from './diagram-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

export interface EmployeeInfo {
    Role: string;
    color: string;
}
export interface DataInfo {
    [key: string]: string;
}

/**
 * Sample for Organizational Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'organization-chart.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, NumericTextBoxModule, SBDescriptionComponent]
})
export class OrganizationalChartDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public tool: DiagramTools = DiagramTools.ZoomPan;
    //configures data
    public data: Object = {
        id: 'Id', parentId: 'Manager',
        dataSource: new DataManager(localBindData),
        doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
            nodeModel.shape = {
                type: 'Text', content: (data as EmployeeInfo).Role,
                margin: { left: 10, right: 10, top: 10, bottom: 10 }
            };
        }
    };
    //Configures automatic layout
    public layout: Object = {
        type: 'OrganizationalChart',
        getLayoutInfo: (node: Node, options: TreeInfo) => {
            /* tslint:disable:no-string-literal */
            if ((node.data as DataInfo)['Role'] === 'General Manager') {
                options.assistants.push(options.children[0]);
                options.children.splice(0, 1);
            }
            if (!options.hasSubTree) {
                options.type = 'Right';
            }
        }
    };

    //Defines the default node and connector properties
    public nodeDefaults(obj: NodeModel): NodeModel {
        obj.backgroundColor = (obj.data as EmployeeInfo).color;
        obj.style = { fill: 'none', strokeColor: 'none', color: 'white' };
        obj.expandIcon = { height: 10, width: 10, shape: 'None', fill: 'lightgray', offset: { x: .5, y: 1 } };
        obj.expandIcon.verticalAlignment = 'Center';
        obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
        obj.collapseIcon = { height: 10, width: 10, shape: 'None', fill: 'lightgray', offset: { x: .5, y: 1 } };
        obj.collapseIcon.verticalAlignment = 'Center';
        obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
        obj.width = 120;
        obj.height = 30;
        return obj;
    };
    public connectorDefaults(connector: any, diagram: Diagram): ConnectorModel {
        connector.targetDecorator.shape = 'None';
        connector.type = 'Orthogonal';
        connector.constraints = ConnectorConstraints.None;;
        connector.cornerRadius = 0;
        return connector;
    }
    ngOnInit(): void {
        document.getElementById('pattern').onclick = this.documentClick.bind(this);
        document.getElementById('orientation').onclick = this.orientation.bind(this);
    }
     //To change orientation
     private orientation(args: any) {
        let target: HTMLElement = args.target as HTMLElement;
        let selectedElement: HTMLCollection = document.getElementsByClassName(
          'e-selected-orientation-style'
        );
        if (selectedElement.length) {
          selectedElement[0].classList.remove('e-selected-orientation-style');
        }
        if (!target.classList.contains('e-selected-orientation-style')) {
          target.classList.add('e-selected-orientation-style');
        }
        if (
          target.className === 'image-pattern-style e-selected-orientation-style'
        ) {
          let id: string = target.id;
          let orientation1: string =
            id.substring(0, 1).toUpperCase() + id.substring(1, id.length);
          this.diagram.layout.orientation = orientation1 as LayoutOrientation;
          this.diagram.dataBind();
          this.diagram.doLayout();
        }
      }
    //To change subtree alignment
    private documentClick(args: MouseEvent): void {
      debugger
        let target: HTMLElement = args.target as HTMLElement;
        var selectedpatternElement = document.getElementsByClassName(
          'e-selected-pattern-style'
        );
        if (selectedpatternElement.length) {
          selectedpatternElement[0].classList.remove('e-selected-pattern-style');
        }
        if (!target.classList.contains('e-selected-pattern-style')) {
          target.classList.add('e-selected-pattern-style');
        }
        if (target.className === 'image-pattern-style e-selected-pattern-style') {
          let subTreeOrientation: SubTreeOrientation;
          let subTreeAlignment: SubTreeAlignments;
          switch (target.id) {
            case 'pattern1':
              subTreeOrientation = 'Vertical';
              subTreeAlignment = 'Alternate';
              break;
            case 'pattern2':
              subTreeOrientation = 'Vertical';
              subTreeAlignment = 'Left';
              break;
            case 'pattern3':
              subTreeOrientation = 'Vertical';
              subTreeAlignment = 'Left';
              break;
              case 'pattern4':
              subTreeOrientation = 'Vertical';
              subTreeAlignment = 'Right';
              break;
            case 'pattern5':
              subTreeOrientation = 'Vertical';
              subTreeAlignment = 'Right';
              break;
            case 'pattern6':
              subTreeOrientation = 'Horizontal';
              subTreeAlignment = 'Balanced';
              break;
            case 'pattern7':
              subTreeOrientation = 'Horizontal';
              subTreeAlignment = 'Center';
              break;
            case 'pattern8':
              subTreeOrientation = 'Horizontal';
              subTreeAlignment = 'Left';
              break;
            case 'pattern9':
              subTreeOrientation = 'Horizontal';
              subTreeAlignment = 'Right';
              break;
          }
    
          this.diagram.layout.getLayoutInfo = (
            node: NodeModel,
            options: TreeInfo
          ) => {
            if (target.id === 'pattern4' || target.id === 'pattern3') {
              options.offset = -50;
            }
            if ((node.data as DataInfo)['Role'] === 'General Manager') {
              options.assistants.push(options.children[0]);
              options.children.splice(0, 1);
            }
            if (!options.hasSubTree) {
              options.orientation = subTreeOrientation;
              options.type = subTreeAlignment;
            }
          };
          this.diagram.dataBind();
          this.diagram.doLayout();
        }
      }
    //To change horizontal spacing
    public onHorizontalSpacingChange(args: NumericChangeEventArgs): void {
        this.diagram.layout.horizontalSpacing = Number(args.value);
        this.diagram.dataBind();
    }
    //To change vertical spacing
    public onVerticalSpacingChange(args: NumericChangeEventArgs): void {
        this.diagram.layout.verticalSpacing = Number(args.value);
        this.diagram.dataBind();
    }

}