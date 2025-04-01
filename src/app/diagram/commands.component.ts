import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import {
  Diagram, NodeModel, UndoRedo, Connector,
  NodeConstraints, IHistoryChangeArgs, ISelectionChangeEventArgs, FlipDirection
} from '@syncfusion/ej2-diagrams';
import { ClickEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo);
/**
 * Default FlowShape sample
 */

@Component({
  selector: 'control-content',
  templateUrl: 'commands.html',
  styleUrls: ['commands.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ToolbarModule, DiagramModule, SBDescriptionComponent]
})
export class CommandComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;

  @ViewChild('toolbar')
  public toolbar: ToolbarComponent;

  constructor() {

  }

  public created(): void {
    this.diagram.rulerSettings = {
      showRulers: true
    };
  }
  public createTextNode(content: string, offsetX: number, offsetY: number): NodeModel {
    return {
      shape: { type: 'Text', content: content },
      constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 },
      offsetX: offsetX,
      offsetY: offsetY
    };
  }

  public CreateNode(id: string, width: number, height: number, fill: string, offsetX: number, offsetY: number): NodeModel {
    return {
      id: id,
      width: width,
      height: height,
      offsetX: offsetX,
      offsetY: offsetY,
      style: { fill: fill, strokeColor: 'white' }
    };
  }
  public nodes: NodeModel[] = [
    this.createTextNode('Select the below shapes', 150, 40),
    this.CreateNode('node1', 60, 40, '#DAEBFF', 150, 100),
    this.CreateNode('node2', 80, 40, '#F5E0F7', 150, 170),
    this.CreateNode('node3', 100, 40, '#E0E5BB', 150, 240),
    this.createTextNode('Try Alignment Commands (AlignRight, AlignLeft\nand AlignCenter)', 150, 310),
    this.createTextNode('Select the below shapes', 150, 380),
    this.CreateNode('node4', 40, 60, '#DAEBFF', 80, 470),
    this.CreateNode('node5', 40, 80, '#F5E0F7', 160, 470),
    this.CreateNode('node6', 40, 100, '#E0E5BB', 240, 470),
    this.createTextNode('Try Alignment Commands (AlignTop, AlignBottom\nand AlignMiddle)', 150, 550),
    this.createTextNode('Select the below shapes', 550, 40),
    this.CreateNode('node7', 80, 40, '#DAEBFF', 475, 100),
    this.CreateNode('node8', 80, 40, '#F5E0F7', 625, 100),
    this.CreateNode('node9', 80, 40, '#E0E5BB', 595, 180),
    this.createTextNode('Try SpaceAcross Commands', 550, 240),
    this.createTextNode('Select the below shapes', 550, 320),
    this.CreateNode('node10', 80, 40, '#DAEBFF', 475, 400),
    this.CreateNode('node11', 80, 40, '#F5E0F7', 475, 500),
    this.CreateNode('node12', 80, 40, '#E0E5BB', 625, 430),
    this.createTextNode('Try SpaceAcross Commands', 550, 550),
    this.createTextNode('Select the below shapes', 950, 40),
    {
      id: 'RightTriangle', width: 100, height: 100, offsetX: 950, offsetY: 120, style: { fill: '#E0E5BB', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'RightTriangle' },
    },
    this.createTextNode('Try Flip Commands', 950, 240),
    this.createTextNode('Select the below shapes', 950, 300),
    this.CreateNode('node14', 60, 20, '#DAEBFF', 950, 350),
    this.CreateNode('node15', 80, 40, '#F5E0F7', 950, 420),
    this.CreateNode('node16', 100, 50, '#E0E5BB', 950, 500),
    this.createTextNode('Try Sizing Commands (Same width, Same height, Same size)', 950, 550)
  ];

  //Handle selection change in the diagram.
  public selectionChange(args: ISelectionChangeEventArgs) {
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

  public historyChange(args: IHistoryChangeArgs): void {
    const undoItem = this.toolbar.items.find(item => item.id === 'undo');
    if (undoItem) {
      undoItem.disabled = this.diagram.historyManager.undoStack.length > 0 ? false : true;
    }
    const redoItem = this.toolbar.items.find(item => item.id === 'redo');
    if (redoItem) {
      redoItem.disabled = this.diagram.historyManager.redoStack.length > 0 ? false : true;
    }
  }

  //Enable or disable toolbar items based on selection state.
  public onClickDisable(args, selectedItems) {
    if (args === false) {
      const itemIds = ['cut', 'copy', 'transform_right', 'transform_left'];
      itemIds.forEach(itemId => {
        const item = this.toolbar.items.find(item => item.id === itemId);
        if (item) {
          item.disabled = false;
        }
      });
      if (selectedItems.length === 1) {
        var index = this.toolbar.items.findIndex(item => item.id === 'flip_vertical');
        if (index !== -1) {
          this.toolbar.items[index].disabled = selectedItems[0].id === "RightTriangle" ? false : true;
        }
        var index = this.toolbar.items.findIndex(item => item.id === 'flip_horizontal');
        if (index !== -1) {
          this.toolbar.items[index].disabled = selectedItems[0].id === "RightTriangle" ? false : true;
        }
        this.disableCommonItems(true);
      } else if (selectedItems.length > 1) {
        this.disableCommonItems(false);
      }
    } else {
      const itemIds = ['cut', 'copy', 'align_right', 'transform_right', 'transform_left', 'flip_vertical', 'flip_horizontal'];
      itemIds.forEach(itemId => {
        const item = this.toolbar.items.find(item => item.id === itemId);
        if (item) {
          item.disabled = true;
        }
      });
      this.disableCommonItems(true);
    }
  }
  //Function to disable common toolbat items
  public disableCommonItems(args) {
    const itemIds = ['align_left', 'align_center', 'align_right', 'align_top', 'align_middle', 'align_bottom', 'distribute_horizontal', 'distribute_vertical', 'same_width', 'same_height', 'same_size'];
    itemIds.forEach(itemId => {
      const item = this.toolbar.items.find(item => item.id === itemId);
      if (item) {
        item.disabled = args;
      }
    });
  }
  // Handle toolbar item click events
  public toolbarClick(args: ClickEventArgs) {
    var item = (args as any).item.tooltipText;
    switch (item) {
      case 'Cut':
        this.diagram.cut();
        var pasteIndex = this.toolbar.items.findIndex(item => item.id === 'paste');
        if (pasteIndex !== -1) {
          this.toolbar.items[pasteIndex].disabled = false;
        }
        break;
      case 'Copy':
        this.diagram.copy();
        var pasteIndex = this.toolbar.items.findIndex(item => item.id === 'paste');
        if (pasteIndex !== -1) {
          this.toolbar.items[pasteIndex].disabled = false;
        }
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
    for (let i: number = 0; i < selectedObjects.length; i++) {
      selectedObjects[i].flip ^= flipType === 'Flip Horizontal' ? FlipDirection.Horizontal : FlipDirection.Vertical;
    }
    this.diagram.dataBind();
  }

}

