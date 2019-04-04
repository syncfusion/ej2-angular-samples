import { Component, Inject , ViewChild } from '@angular/core';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

/**
 * TreeView Checkboxes sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'check-box.html'
})
export class CheckboxTreeViewComponent {
    @ViewChild('defaultCheck')
    public treeObj: TreeViewComponent;
    @ViewChild('check')
    public checkboxObj: CheckBoxComponent;

   // Data source for TreeView component
   public countries: Object[] = [
        { id: 1, name: 'Australia', hasChild: true, expanded: true },
        { id: 2, pid: 1, name: 'New South Wales' },
        { id: 3, pid: 1, name: 'Victoria' },
        { id: 4, pid: 1, name: 'South Australia' },
        { id: 6, pid: 1, name: 'Western Australia' },
        { id: 7, name: 'Brazil', hasChild: true },
        { id: 8, pid: 7, name: 'Paraná' },
        { id: 9, pid: 7, name: 'Ceará' },
        { id: 10, pid: 7, name: 'Acre' },
        { id: 11, name: 'China', hasChild: true },
        { id: 12, pid: 11, name: 'Guangzhou' },
        { id: 13, pid: 11, name: 'Shanghai' },
        { id: 14, pid: 11, name: 'Beijing' },
        { id: 15, pid: 11, name: 'Shantou' },
        { id: 16, name: 'France', hasChild: true },
        { id: 17, pid: 16, name: 'Pays de la Loire' },
        { id: 18, pid: 16, name: 'Aquitaine' },
        { id: 19, pid: 16, name: 'Brittany' },
        { id: 20, pid: 16, name: 'Lorraine' },
        { id: 21, name: 'India', hasChild: true },
        { id: 22, pid: 21, name: 'Assam' },
        { id: 23, pid: 21, name: 'Bihar' },
        { id: 24, pid: 21, name: 'Tamil Nadu' },
        { id: 25, pid: 21, name: 'Punjab' }
    ];
    public field: Object = { dataSource: this.countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    // Enable the checkbox for TreeView
    public showCheckBox = true;

    public onChange(): void {
        this.treeObj.autoCheck = this.checkboxObj.checked;
    }
}
