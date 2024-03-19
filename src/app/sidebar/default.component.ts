import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent, ClickEventArgs, NodeSelectEventArgs, ToolbarModule, SidebarModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewComponent, SelectEventArgs, ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    styleUrls: ['default-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ToolbarModule, ListViewModule, SidebarModule, TreeViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DefaultSidebarComponent {
    @ViewChild('sidebar')
    public sidebarobj: SidebarComponent;
    @ViewChild('listview')
    public listObj: ListViewComponent;
    //ListView data source initialization
    public inboxData: { [key: string]: Object }[] = [
        { id: "1", text: "Albert Lives", subject: "Business dinner invitation", message: "Hello Uta Morgan," },
        { id: "2", text: "Ila Russo", subject: "Opening for Sales Manager", message: "Hello Jelani Moreno," },
        { id: "3", text: "Garth Owen", subject: "Application for Job Title", message: "Hello Ila Russo," },
        { id: "4", text: "Ursula Patterson", subject: "Programmer Position Application", message: "Hello Kerry Best," },
        { id: "5", text: "Nichole Rivas", subject: "Annual Conference", message: "Hi Igor Mccoy," }
    ];
    public sentItemData: { [key: string]: Object }[] = [
        { id: "11", text: "Gemma Roberson", subject: "Apology for late response email", message: "Hello Colette Wooten," },
        { id: "12", text: "Ann Garza", subject: "Application for Job Title", message: "Hello Kerry Best," },
        { id: "13", text: "Alfonso Burnett", subject: "Anything I can help with", message: "Hello Otto Ashley," },
        { id: "14", text: "Rogan Espinoza", subject: "Assistant Marketing Department", message: "Hello Kerry Best," },
        { id: "15", text: "Sierra Kerr", subject: "Application for Transfer", message: "Hi Halee Lindsey," }
    ];
    public draftsData: { [key: string]: Object }[] = [
        { id: "21", text: "Chaim Barber", subject: "We launched new Product!", message: "Hello Cameran Roth," },
        { id: "22", text: "Lara Knox", subject: "Request for meeting appointment email", message: "Hello Mona Bates," },
        { id: "23", text: "Igor Mccoy", subject: "Thank you", message: "Hello Kerry Best," },
        { id: "24", text: "Patricia Boyle", subject: "Sales Team", message: "Hello Amelia Curtis," },
        { id: "25", text: "Zachery Peters", subject: "Today’s meeting schedule", message: "Hi Leslie Juarez," }
    ];
    public deleteData: { [key: string]: Object }[] = [
        { id: "31", text: "Elijah Berry", subject: "Apology marketing email", message: "Dear Kerry Best," },
        { id: "32", text: "Cameran Newman", subject: "Business appointment request", message: "Hello Mona Bates," },
        { id: "33", text: "Amity Slater", subject: "Business dinner invitation", message: "Hello Kerry Best," },
        { id: "34", text: "Leo Cooley", subject: "Apology Email for Wrong Order", message: "Hi Athena Mcintosh," },
        { id: "35", text: "Halee Lindsey", subject: "Apology for late response email", message: "Hi Fletcher Beck," }
    ];
    public outBoxData: { [key: string]: Object }[] = [
        { id: "41", text: "Willow Frye", subject: "Out of Office", message: "Hello Maggy Randall," },
        { id: "42", text: "Regan Haney", subject: "Project Manager Interview", message: "Hello Kerry Best," },
        { id: "43", text: "Stella Calderon", subject: "Proposition for a new business", message: "Hello Gail Pierce," },
        { id: "44", text: "Xanthus Harmon", subject: "Performance appraisal announcement", message: "Dear Clare Heath," },
        { id: "45", text: "Cheyenne Cline", subject: "Office Holiday", message: "Hi Fletcher Beck," }
    ];
    public treeData: { [key: string]: Object }[] = [
        { id: "1", name: "Favorites", hasChild: true, expanded: true },
        { id: "2", name: "Inbox", selected: true, pid: "1" },
        { id: "3", name: "Sent Items", pid: "1" },
        { id: "5", name: "John", hasChild: true, expanded: true },
        { id: "6", name: "Inbox", pid: "5" },
        { id: "7", name: "Drafts", pid: "5" },
        { id: "8", name: "Deleted Items", pid: "5" },
        { id: "9", name: "Sent Items", pid: "5" },
        { id: "12", name: "Outbox", pid: "5" },
    ];
    public fields: { [ key: string]: Object } = { id: "id", text: "text" };
    public treeFields: { [key: string]: Object } = { dataSource: this.treeData, id: "id", text: "name", selected: "selected", parentID: "pid", hasChildren: "hasChild", expanded: "expanded" };
    // only for sample browser use 
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default-style.css'];
    }
    //open / close the sidebar
    toolbarCliked(args: ClickEventArgs) {
        if(args.item.tooltipText == "Menu") {
            this.sidebarobj.toggle();
        }
    }
    beforeSelect(args: NodeSelectEventArgs) {
        if (args.nodeData.text == "Favorites" || args.nodeData.text == "John") {
            args.cancel = true;
        }
    }
    onSelect(args: NodeSelectEventArgs) {
        if (args.nodeData.text == "Inbox")
        {
            this.listObj.dataSource = this.inboxData;
        }
        else if (args.nodeData.text == "Sent Items")
        {
            this.listObj.dataSource = this.sentItemData;
        }
        else if (args.nodeData.text == "Drafts")
        {
            this.listObj.dataSource = this.draftsData;
        }
        else if (args.nodeData.text == "Deleted Items")
        {
            this.listObj.dataSource = this.deleteData;
        }
        else if (args.nodeData.text == "Outbox")
        {
            this.listObj.dataSource = this.outBoxData;
        }
        this.listObj.dataBind();
    }
    onListSelect(args: SelectEventArgs) {
        args.item.classList.remove("e-active");
    }
}