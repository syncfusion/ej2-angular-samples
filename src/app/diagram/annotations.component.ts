import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ChangeEventArgs, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import {
    DiagramComponent, NodeModel, ConnectorModel, ShapeAnnotationModel, VerticalAlignment, HorizontalAlignment,
    TextStyleModel, ISelectionChangeEventArgs, ConnectorConstraints, OrthogonalSegmentModel,
    DecoratorModel, SnapSettingsModel, SnapConstraints, Node, AnnotationConstraints
} from '@syncfusion/ej2-angular-diagrams';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';

/**
 * Sample for Annotation
 */

let node: NodeModel;
@Component({
    selector: 'control-content',
    templateUrl: 'annotations.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class AnnotationDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;


    public segments1: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Right', length: 60 }];
    public segments2: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Bottom', length: 100 }];
    public segments3: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Left', length: 60 }];
    public segments4: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Top', length: 100 }];

    public decorator: DecoratorModel = { shape: 'None' };

    public fontType: { [key: string]: Object }[] = [
        { type: 'Arial', text: 'Arial' },
        { type: 'Aharoni', text: 'Aharoni' },
        { type: 'Bell MT', text: 'Bell MT' },
        { type: 'Fantasy', text: 'Fantasy' },
        { type: 'Times New Roman', text: 'Times New Roman' },
        { type: 'Segoe UI', text: 'Cubic Bezier' },
        { type: '"Verdana") ', text: 'Cubic Bezaier' }
    ];
    public templateList: { [key: string]: Object }[] = [
        { value: 'none', text: 'None' },
        { value: 'industry', text: 'Industry Competitors' },
        { value: 'suppliers', text: 'Suppliers' },
        { value: 'potential', text: 'Potential Entrants' },
        { value: 'buyers', text: 'Buyers' },
        { value: 'substitutes', text: 'Substitutes' }
    ];

    public fields: object = { value: 'type', text: 'text' };
    public templateFields: object = { value: 'value', text: 'text' };

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public nodeDefaults(node: NodeModel): NodeModel {
        let obj: NodeModel = {
            width: 150, height: 50, style: { fill: '#D5EDED', strokeColor: '#7DCFC9', strokeWidth: 1 },
            shape: { cornerRadius: 5 }
        };
        return obj;
    };

    public connDefaults(obj: ConnectorModel): void {
        obj.type = 'Orthogonal';
        obj.constraints = ConnectorConstraints.None;
    };

    ngOnInit(): void {
        document.getElementById('appearance').onclick = this.documentClick.bind(this);
    }

    public selectionChange(arg: ISelectionChangeEventArgs): void {
        if (arg.state === 'Changed') {
            // custom code start
            let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
            if (selectedElement.length) {
                selectedElement[0].classList.remove('e-selected-style');
            }
            // custom code end
            if (arg.newValue[0]) {
                let node: NodeModel = arg.newValue[0] as NodeModel;
                let annotation: ShapeAnnotationModel = node.annotations[0];
                if (annotation.offset.x === 0 && annotation.offset.y === 0) {
                    this.updatePosition('left');
                } else if (annotation.offset.x === 1 && annotation.offset.y === 0) {
                    this.updatePosition('right');
                } else if (annotation.offset.x === 1 && annotation.offset.y === 0) {
                    this.updatePosition('right');
                } else if (annotation.offset.x === 0 && annotation.offset.y === 1) {
                    this.updatePosition('bottoml');
                } else if (annotation.offset.x === 1 && annotation.offset.y === 1) {
                    this.updatePosition('bottomr');
                } else if (annotation.offset.x === 0.5 && annotation.offset.y === 0.5) {
                    this.updatePosition('center');
                } else if (annotation.offset.x === 0.5 && annotation.offset.y === 1) {
                    this.updatePosition('bottomcenter_top');
                }
            }
            this.enableOptions(arg);
        }
    };

    public diagramCreate(args: Object): void {
        this.diagram.select([this.diagram.nodes[0]]);
    }

    private documentClick(args: MouseEvent): void {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style') {
            this.updatePosition(target.id);
        }
    };
    private updatePosition(id: string): void {
        let target: HTMLElement = document.getElementById(id);
        for (let i: number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
            node = this.diagram.selectedItems.nodes[i];
            //we can refactor this code using a method
            for (let j: number = 0; j < node.annotations.length; j++) {
                let annotation: ShapeAnnotationModel = node.annotations[j];
                switch (target.id) {
                    case 'topLeft':
                        this.setAnnotationPosition(annotation, 0, 0, 'Top', 'Left');
                        break;
                    case 'topRight':
                        this.setAnnotationPosition(annotation, 1, 0, 'Top', 'Right');
                        break;
                    case 'bottomLeft':
                        this.setAnnotationPosition(annotation, 0, 1, 'Bottom', 'Left');
                        break;
                    case 'bottomRight':
                        this.setAnnotationPosition(annotation, 1, 1, 'Bottom', 'Right');
                        break;
                    case 'center':
                        this.setAnnotationPosition(annotation, 0.5, .5, 'Center', 'Center');
                        break;
                    case 'bottomCenter':
                        this.setAnnotationPosition(annotation, 0.5, 1, 'Top', 'Center');
                        break;
                }
                // custom code start
                target.classList.add('e-selected-style');
                // custom code end
            }
        }
    }
    private setAnnotationPosition(
        //it is in dedicated line here.
        annotation: ShapeAnnotationModel, offsetX: number, offsetY: number,
        vAlignment: VerticalAlignment, hAlignment: HorizontalAlignment): void {
        annotation.offset.x = offsetX;
        annotation.offset.y = offsetY;
        annotation.verticalAlignment = vAlignment;
        annotation.horizontalAlignment = hAlignment;
        if (vAlignment === 'Top' && hAlignment === 'Left') {
            annotation.margin = { left: 3, top: 3 };
        } else if (vAlignment === 'Top' && hAlignment === 'Right') {
            annotation.margin = { right: 3, top: 3 };
        } else if (vAlignment === 'Bottom' && hAlignment === 'Left') {
            annotation.margin = { left: 3, bottom: 3 };
        } else if (vAlignment === 'Bottom' && hAlignment === 'Right') {
            annotation.margin = { right: 3, bottom: 3 };
        }
    }

    private applyAnnotationStylenotationStyle(propertyName: string, propertyValue: string): void {
        for (let i: number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
            node = this.diagram.selectedItems.nodes[i];
            for (let j: number = 0; j < node.annotations.length; j++) {
                let textStyle: TextStyleModel = node.annotations[j].style;
                if (propertyName === 'fontsize') {
                    textStyle.fontSize = Number(propertyValue);
                } else if (propertyName === 'underline') {
                    textStyle.textDecoration = textStyle.textDecoration === 'Underline' ? 'None' : 'Underline';
                } else if (propertyName === 'fontfamily') {
                    textStyle.fontFamily = propertyValue;
                } else if (propertyName === 'bold') {
                    textStyle.bold = !textStyle.bold;
                } else if (propertyName === 'italic') {
                    textStyle.italic = !textStyle.italic;
                } else if (propertyName === 'color') {
                    textStyle.color = propertyValue;
                } else if (propertyName === 'template') {
                    if (propertyValue === 'none') {
                        node.annotations[j].template = '';
                        node.annotations[j].width = undefined;
                        node.annotations[j].height = undefined;
                    } else {
                        node.annotations[j].width = 25;
                        node.annotations[j].height = 25;
                        node.annotations[j].template =
                            '<img src="./assets/diagram/Images/annotation/' + propertyValue + '.svg" style="width:100%;height:100%" />';
                    }
                } else if (propertyName === 'interaction') {
                    node.annotations[j].constraints = node.annotations[j].constraints ^ AnnotationConstraints.Interaction;
                }
                this.diagram.dataBind();
            }
        }
    }

    public btnBoldClick(): void {
        this.applyAnnotationStylenotationStyle('bold', '');
    }

    public btnItalicClick(): void {
        this.applyAnnotationStylenotationStyle('italic', '');
    }

    public btnUnderlineClick(): void {
        this.applyAnnotationStylenotationStyle('underline', '');
    }

    public onFontColorChange(args: ColorPickerEventArgs): void {
        this.applyAnnotationStylenotationStyle('color', args.currentValue.rgba);
    }

    public onFontSizeChange(args: ChangeEventArgs): void {
        if (args.event) {
            this.applyAnnotationStylenotationStyle('fontsize', args.value.toString());
        }
    }

    public onFontFamilyChange(args: DropDownChangeEventArgs): void {
        if (args.element) {
            this.applyAnnotationStylenotationStyle('fontfamily', args.value.toString());
        }
    }

    public onLabelTemplateChange(args: DropDownChangeEventArgs): void {
        this.applyAnnotationStylenotationStyle('template', args.value.toString());
    }

    // Enable the label interaction while enabling the checkbox.
    public onLabelInteractionChange(args: CheckBoxChangeEventArgs): void {
        this.applyAnnotationStylenotationStyle('interaction', '');
    }

    private enableOptions(arg: ISelectionChangeEventArgs): void {
        let appearance: HTMLElement = document.getElementById('propertypanel');
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-remove-selection');
        if (arg.newValue) {
            if (arg.newValue[0] instanceof Node && selectedElement.length) {
                selectedElement[0].classList.remove('e-remove-selection');
            } else {
                if (!appearance.classList.contains('e-remove-selection')) {
                    appearance.classList.add('e-remove-selection');
                }
            }
        }
    }
}