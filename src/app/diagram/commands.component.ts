import { Component, ViewEncapsulation, ViewChild,Inject } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, SnapSettingsModel, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel, NodeConstraints, IHistoryChangeArgs, ISelectionChangeEventArgs
} from '@syncfusion/ej2-diagrams';
import { ClickEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { paletteIconClick } from './script/diagram-common';
Diagram.Inject(UndoRedo);
/**
 * Default FlowShape sample
 */

@Component({
  selector: 'control-content',
  templateUrl: 'commands.html',
  styleUrls: ['commands.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommandComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;

  @ViewChild('toolbar')
  public toolbar: ToolbarComponent;

  constructor() {​​​​​​​
    
}​​​​​​​

public created(): void {
  this.diagram.rulerSettings = {
    showRulers : true
  };
}
public nodes: NodeModel[] = [
  {
      shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 150, offsetY: 40
  },
  {
      id: 'node1', width: 60, height: 40, offsetX: 150, offsetY: 100, style: { fill: '#DAEBFF', strokeColor: 'white' },
  },
  {
      id: 'node2', width: 80, height: 40, offsetX: 150, offsetY: 170, style: { fill: '#F5E0F7', strokeColor: 'white' },
  },
  {
      id: 'node3', width: 100, height: 40, offsetX: 150, offsetY: 240, style: { fill: '#E0E5BB', strokeColor: 'white' },
  },
  {
      shape: { type: 'Text', content: 'Try Alignment Commandss(AlignRight, AlignLeft \n and AlignCenter)' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 150, offsetY: 310
  },
  {
      shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 150, offsetY: 380
  },
  {
      id: 'node4', width: 40, height: 60, offsetX: 80, offsetY: 470, style: { fill: '#DAEBFF', strokeColor: 'white' },
  },
  {
      id: 'node5', width: 40, height: 80, offsetX: 160, offsetY: 470, style: { fill: '#F5E0F7', strokeColor: 'white' },
  },
  {
      id: 'node6', width: 40, height: 100, offsetX: 240, offsetY: 470, style: { fill: '#E0E5BB', strokeColor: 'white' },
  },
  {
      shape: { type: 'Text', content: 'Try Alignment Commandss(AlignTop, AlignBottom \n and AlignMiddle)' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 150, offsetY: 550
  },
  {
      shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 550, offsetY: 40
  },
  {
      id: 'node7', width: 80, height: 40, offsetX: 475, offsetY: 100, style: { fill: '#DAEBFF', strokeColor: 'white' },
  },
  {
      id: 'node8', width: 80, height: 40, offsetX: 625, offsetY: 100, style: { fill: '#F5E0F7', strokeColor: 'white' },
  },
  {
      id: 'node9', width: 80, height: 40, offsetX: 595, offsetY: 180, style: { fill: '#E0E5BB', strokeColor: 'white' },
  },
  {
      shape: { type: 'Text', content: 'Try SpaceAcross Commands' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 550, offsetY: 240
  },
  {
      shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 550, offsetY: 320
  },
  {
      id: 'node10', width: 80, height: 40, offsetX: 475, offsetY: 400, style: { fill: '#DAEBFF', strokeColor: 'white' },
  },
  {
      id: 'node11', width: 80, height: 40, offsetX: 475, offsetY: 500, style: { fill: '#F5E0F7', strokeColor: 'white' },
  },
  {
      id: 'node12', width: 80, height: 40, offsetX: 625, offsetY: 430, style: { fill: '#E0E5BB', strokeColor: 'white' },
  },
  {
      shape: { type: 'Text', content: 'Try SpaceAcross Commands' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 550, offsetY: 550
  },
  {
      shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 950, offsetY: 40
  },
  {
      id: 'RightTriangle', width: 100, height: 100, offsetX: 950, offsetY: 120, style: { fill: '#E0E5BB', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'RightTriangle' },
  },
  {
      shape: { type: 'Text', content: 'Try Flip Commands' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 950, offsetY: 240
  },
  {
      shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 950, offsetY: 300
  },
  {
      id: 'node14', width: 60, height: 20, offsetX: 950, offsetY: 350, style: { fill: '#DAEBFF', strokeColor: 'white' },
  },
  {
      id: 'node15', width: 80, height: 40, offsetX: 950, offsetY: 420, style: { fill: '#F5E0F7', strokeColor: 'white' },
  },
  {
      id: 'node16', width: 100, height: 50, offsetX: 950, offsetY: 500, style: { fill: '#E0E5BB', strokeColor: 'white' },
  },
  {
      shape: { type: 'Text', content: 'Try Sizing Commands' }, constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 950, offsetY: 550
  }
];


public selectionChange(args : ISelectionChangeEventArgs) {
  if (args.state === 'Changed') {
      if (args.type === 'Addition') {
          if (args.newValue.length > 0) {
              this.onClickDisable(false, args.newValue);
          }
      } else {
          this.onClickDisable(true, args.newValue);
      }
  }
}
public historyChange(args : IHistoryChangeArgs): void {
  debugger
  if (this.diagram.historyManager.undoStack.length > 0) {
      this.toolbar.items[3].disabled = false;
  } else {
     this.toolbar.items[3].disabled = true;
  }
  // Check if redo stack is empty or not
  if (this.diagram.historyManager.redoStack.length > 0) {
     this.toolbar.items[4].disabled = false;
  } else {
     this.toolbar.items[4].disabled = true;
  }
}


public onClickDisable(args, selectedItems){
  if (args === false) {
    this.toolbar.items[0].disabled = false;
    this.toolbar.items[1].disabled = false;
    this.toolbar.items[13].disabled = false;
    this.toolbar.items[14].disabled = false;
    if (selectedItems.length === 1) {
      this.toolbar.items[16].disabled = selectedItems[0].id === "RightTriangle" ? false : true;
      this.toolbar.items[17].disabled = selectedItems[0].id === "RightTriangle" ? false : true;
        this.disableCommonItems(true);
    } else if (selectedItems.length > 1) {
        this.disableCommonItems(false);
    }
} else {
  this.toolbar.items[0].disabled = true;
  this.toolbar.items[1].disabled = true;
  this.toolbar.items[13].disabled = true;
  this.toolbar.items[14].disabled = true;
  this.toolbar.items[16].disabled = true;
  this.toolbar.items[17].disabled = true;
    this.disableCommonItems(true);
}
}
public disableCommonItems(args) {
  this.toolbar.items[6].disabled = args;
  this.toolbar.items[7].disabled = args;
  this.toolbar.items[8].disabled = args;
  this.toolbar.items[9].disabled = args;
  this.toolbar.items[10].disabled = args;
  this.toolbar.items[11].disabled = args;
  this.toolbar.items[19].disabled = args;
  this.toolbar.items[20].disabled = args;
  this.toolbar.items[22].disabled = args;
  this.toolbar.items[23].disabled = args;
  this.toolbar.items[24].disabled = args;
}
public toolbarClick(args : ClickEventArgs){
  var item = (args as any).item.tooltipText;
  switch(item)
  {
      case 'Cut':
        this.diagram.cut();
        this.toolbar.items[2].disabled = false;
        break;
      case 'Copy':
        this.diagram.copy();
        this.toolbar.items[2].disabled = false;
        break;
      case 'Paste':
        this.diagram.paste();
      break;
      case 'Undo':
        this.diagram.undo();
        break;
      case 'Redo':
        this.diagram.redo();
      break;
      case 'Align Left':
      case 'Align Right':
      case 'Align Top':
      case 'Align Bottom':
      case 'Align Middle':
      case 'Align Center':
        var alignType = item.replace('Align', '');
        var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
        this.diagram.align(alignType1.trim());
        break;
      case 'Rotate Right':
        this.diagram.rotate(this.diagram.selectedItems, 90);
        break;
      case 'Rotate Left':
        this.diagram.rotate(this.diagram.selectedItems, -90);
        break;
      case 'Flip Vertical':
        this.flipObjects(item);
        break;
      case 'Flip Horizontal':
        this.flipObjects(item);
        break;
      case 'Distribute Objects Horizontally':
        this.diagram.distribute('RightToLeft');
        break;
      case 'Distribute Objects Vertically':
        this.diagram.distribute('BottomToTop');
        break;
      case 'Same Width':
        this.diagram.sameSize('Width', this.diagram.selectedItems.nodes);
        break;
      case 'Same Height':
        this.diagram.sameSize('Height', this.diagram.selectedItems.nodes);
        break;
      case 'Same Size':
        this.diagram.sameSize('Size', this.diagram.selectedItems.nodes);
        break;
  }
  this.diagram.dataBind();
}
public flipObjects(flipType) {
  var selectedObjects = this.diagram.selectedItems.nodes.concat(this.diagram.selectedItems.connectors as any);
  for (let i : number = 0; i < selectedObjects.length; i++) {
      selectedObjects[i].flip = flipType === 'Flip Horizontal' ? 'Horizontal' : 'Vertical';
  }
  this.diagram.dataBind();
}

}

