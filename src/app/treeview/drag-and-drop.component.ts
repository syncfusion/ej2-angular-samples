import { Component, Inject ,  ViewChild, ViewEncapsulation } from '@angular/core';
import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';
import { closest } from '@syncfusion/ej2-base';

/**
 * TreeView drag and drop sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'drag-and-drop.html',
	encapsulation: ViewEncapsulation.None
})
export class DragdropTreeViewComponent {
     @ViewChild('list')
    public list: ListView;
   // Hierarchical data source for TreeView component
   public productTeam1: Object[] = [
        {
            id: 't1', name: 'ASP.NET MVC Team', expanded: true,
            child: [
                { id: 't2', pid: 't1', name: 'Smith' },
                { id: 't3', pid: 't1', name: 'Johnson' },
                { id: 't4', pid: 't1', name: 'Anderson'},
            ]
        },
        {
            id: 't5', name: 'Windows Team', expanded: true,
            child: [
                { id: 't6', pid: 't5', name: 'Clark' },
                { id: 't7', pid: 't5', name: 'Wright' },
                { id: 't8', pid: 't5', name: 'Lopez' },
            ]
        }
   ];
    public field:Object ={ dataSource: this.productTeam1, id: 'id', text: 'name', child: 'child' };
    // Allow multi selection
    public allowMultiSelection:boolean = true;
    // Allow drag and drop
    public allowDragAndDrop:boolean = true;
    public productTeam2: Object[] = [
        {
            id: 't9', name: 'Web Team', expanded: true,
            child: [
                { id: 't11', pid: 't9', name: 'Joshua' },
                { id: 't12', pid: 't9', name: 'Matthew' },
                { id: 't13', pid: 't9', name: 'David' },
            ]
        },
        {
            id: 't14', name: 'Build Team', expanded: true,
            child: [
                { id: 't15', pid:'t14', name: 'Ryan' },
                { id: 't16', pid: 't14', name: 'Justin' },
                { id: 't17', pid: 't14', name: 'Robert' },
            ]
        }
    ];
    // Mapping TreeView fields property with data source properties
    public fields:Object ={ dataSource: this.productTeam2, id: 'id', text: 'name', child: 'child', selected: 'isSelected' };
    // Allow multi selection
    public allowMultiSelections:boolean = true;
    // Allow drag and drop
    public allowDragAndDrops:boolean = true;
    public id:number=1;
    public onDragStop(args: any): void {
        let targetEle: any = closest(args.target, '.e-droppable');
        targetEle = targetEle ? targetEle : args.target;
        // Check the target as ListView or not
        if (targetEle && targetEle.classList.contains('custom-list')) {
           args.cancel = true;
            let newData: { [key: string]: Object }[] = [];
            if (args.draggedNode.classList.contains('e-active')) {
                var dragNode: any = closest(args.draggedNode, '.e-treeview');
                var selNodes = dragNode.ej2_instances[0].selectedNodes;
                for (let i: number = 0, len: number = selNodes.length; i < len; i++) {
                    let nodeEle: Element = document.querySelector('[data-uid="' + selNodes[i] + '"]').querySelector('.e-list-text');
                    let nodeText: string = nodeEle.textContent;
                    let newNode: { [key: string]: Object } = { id: 'l' + this.id, text: nodeText, class: 'custom-delete', iconId: 'i' + this.id };
                    this.id++;
                    newData.push(newNode);
                }
            } else {
                let text: string = 'text';
                let nodeText: string = args.draggedNodeData[text] as string;
                let newNode: { [key: string]: Object } = { id: 'l' + this.id, text: nodeText, class: 'custom-delete', iconId: 'i' + this.id };
                this.id++;
                newData.push(newNode);
            }
            // Add collection of node to ListView
             var listObj =this.list ;
             listObj.addItem(newData, undefined);
        }
    }
  
    // Add the custom action for delete icon in ListView
    public onCreate(args: any){
    document.getElementById('list').addEventListener('mousedown', (event: any) => {
        if (event.target.classList.contains('custom-delete')) {
            let node: Element = closest(event.target, 'li');
             var listObj = this.list;
             listObj.removeItem(node);
        }
    });
    document.getElementById('overlay').addEventListener('mousedown', (event: any) => {
        document.getElementById('overlay').style.display = 'none';
     });
    }
};
