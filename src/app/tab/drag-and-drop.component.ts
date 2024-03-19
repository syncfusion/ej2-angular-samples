import { Component, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { TreeViewComponent, DragAndDropEventArgs, TabComponent, DragEventArgs, TreeViewModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleModule,View } from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { CategoryService, LineSeriesService, ChartModule } from '@syncfusion/ej2-angular-charts';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule, CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';


/**
 * Draggable Tab Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'drag-and-drop.html',
    styleUrls: ['drag-and-drop.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, CategoryService, LineSeriesService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [GridModule, ChartModule, ScheduleModule, DropDownListModule, DatePickerModule, UploaderModule, CalendarModule, TreeViewModule, TabModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DragAndDropComponent {
    @ViewChild('treeObj') public treeObj: TreeViewComponent;
    @ViewChild('tabObj') public tabObj: TabComponent;
    @ViewChild('GridtemplateRef') public Gridtemplate: TemplateRef<any>;
    @ViewChild('CharttemplateRef') public Charttemplate: TemplateRef<any>;
    @ViewChild('ScheduletemplateRef') public Scheduletemplate: TemplateRef<any>;
    @ViewChild('DropDowntemplateRef') public DropDowntemplate: TemplateRef<any>;
    @ViewChild('DatePickertemplateRef') public DatePickertemplate: TemplateRef<any>;
    @ViewChild('UploadtemplateRef') public Uploadtemplate: TemplateRef<any>;
    @ViewChild('CalendartemplateRef') public Calendartemplate: TemplateRef<any>;

    public draggedItemHeader: string = '';
    public i: number;

    public headerText: Object = [{ text: 'Grid' }, { text: 'Chart' }, { text: 'Schedule' }];

    public field: Object = {
        dataSource: [
            { text: "DropDown List", id: "list-01" },
            { text: "DatePicker", id: "list-02" },
            { text: "Calendar", id: "list-03" },
            { text: "File Upload", id: "list-04" },
        ],
        id: "id", text: "text"
    }
    public sportsData: Object[] = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' }
    ];
    public fields: Object = { text: 'Game', value: 'Id' };
    public value: string = 'Game3';

    public allowDragAndDrop: boolean = true;
    public gridData: Object[] = [
        { OrderID: 10248, CustomerID: "VINET", OrderDate: new Date(8364186e5), Freight: 32.38 },
        { OrderID: 10249, CustomerID: "TOMSP", OrderDate: new Date(836505e6), Freight: 11.61 },
        { OrderID: 10250, CustomerID: "HANAR", OrderDate: new Date(8367642e5), Freight: 65.83 },
        { OrderID: 10251, CustomerID: "VICTE", OrderDate: new Date(8367642e5), Freight: 41.34 },
        { OrderID: 10252, CustomerID: "SUPRD", OrderDate: new Date(8368506e5), Freight: 51.3 }
    ];

    public primaryXAxis: Object = { valueType: 'Category' };
    public chartData: Object = [
        { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
        { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
        { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
        { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
        { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
        { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
    ];

    public currentView: View = 'Month';
    public readonly: boolean = true;
    private dataManger: DataManager = new DataManager({
        url: "https://services.syncfusion.com/angular/production/api/schedule",
        adaptor: new ODataV4Adaptor(),
        crossDomain: true
    });
    public eventSettings: EventSettingsModel = { dataSource: this.dataManger };

    onNodeDrag(args: DragAndDropEventArgs): void {
        if (!isNullOrUndefined(args.target.closest('.tab-content'))) {
            args.dropIndicator = 'e-no-drop';
        } else if (!isNullOrUndefined(args.target.closest('#draggableTab .e-tab-header'))) {
            args.dropIndicator = 'e-drop-in';
        }
    }
    onNodeDragStop(args: DragAndDropEventArgs): void {
        let dropElement = args.target.closest("#draggableTab .e-toolbar-item");
        if (dropElement != null) {
            let tabElement = document.querySelector("#draggableTab");
            let itemPosition = (((args.event.type.indexOf('touch') > -1) ? args.event.changedTouches[0].clientX
                : args.event.clientX) < dropElement.getBoundingClientRect().left + (dropElement as HTMLElement).offsetWidth / 2) ? 0 : 1;
            let dropItemIndex = [].slice.call(tabElement.querySelectorAll(".e-toolbar-item")).indexOf(dropElement) + itemPosition;
            let tabContent;
            switch (args.draggedNodeData.text) {
                case "DropDown List":
                    tabContent = this.DropDowntemplate;
                    break;
                case "DatePicker":
                    tabContent = this.DatePickertemplate;
                    break;
                case "Calendar":
                    tabContent = this.Calendartemplate
                    break;
                case "File Upload":
                    tabContent = this.Uploadtemplate
                    break;
                case "Chart":
                    tabContent = this.Charttemplate;
                    break;
                case "Grid":
                    tabContent = this.Gridtemplate;
                    break;
                case "Schedule":
                    tabContent = this.Scheduletemplate;
                    break;
                default:
                    break;
            }
            let newTabItem = [{ header: { text: args.draggedNodeData.text.toString() }, content: tabContent }];
            this.tabObj.addTab(newTabItem, dropItemIndex);
            this.treeObj.removeNodes([args.draggedNode]);
        }
        args.cancel = true;
    }
    onTabCreate(): void {
        let tabElement: HTMLElement = document.getElementById('draggableTab');
        if (!isNullOrUndefined(tabElement)) {
            tabElement.querySelector(".e-tab-header").classList.add("e-droppable");
            tabElement.querySelector(".e-content").classList.add("tab-content");
        }
    }
    onTabDragStart(args: DragEventArgs): void {
        this.draggedItemHeader = <string>this.tabObj.items[args.index].header.text;
    }
    onDraggedTab(args: DragEventArgs): void {
        let dragTabIndex: number = Array.prototype.indexOf.call(this.tabObj.element.querySelectorAll('.e-toolbar-item'), args.draggedItem);
        let dropNode: HTMLElement = <HTMLElement>args.target.closest('#ListView .e-list-item');
        if (dropNode != null && !args.target.closest('#draggableTab .e-toolbar-item')) {
            args.cancel = true;
            let dropContainer: NodeListOf<Element> = (document.querySelector('.treeview-external-drag-tab')).querySelectorAll('.e-list-item');
            let dropIndex: number = Array.prototype.indexOf.call(dropContainer, dropNode);
            let newNode: { [key: string]: Object }[] = [{ id: 'list' + this.i, text: this.draggedItemHeader }];
            this.tabObj.removeTab(dragTabIndex);
            this.treeObj.addNodes(newNode, 'Treeview', dropIndex);
        }
    }
}
