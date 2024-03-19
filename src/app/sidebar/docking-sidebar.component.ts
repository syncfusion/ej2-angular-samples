import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent, ClickEventArgs, ToolbarModule, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

@Component({
    selector: 'control-content',
    styleUrls: ['dock-style.css'],
    templateUrl: 'docking-sidebar.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ToolbarModule, SidebarModule, ListViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DockSidebarComponent {
    @ViewChild('dockBar')
    public dockBar: SidebarComponent;
    public enableDock: boolean = true;
    public showIcon: boolean = true;
    public ListData: { [key: string]: Object }[] = [
        { id: "1", text: "Grid", iconcss: "sb-icons icon-grid e-sb-icon control-icon", 
            description: "The Angular DataGrid is a feature-rich component useful for" +
            "displaying data in a tabular format. Its wide range of functionalities" + 
            "includes data binding, editing, Excel-like filtering, custom sorting," +
            "aggregating rows, selection, and support for Excel, CSV, and PDF formats." +
            "It loads millions of records in just a second. It has flexible editing and intuitive record selection modes." + 
            "Also, it has seamless data exporting options like PDF, CSV, and Excel." },
        { id: "2", text: "Chart", iconcss: "sb-icons icon-chart e-sb-icon control-icon", 
            description: "The Angular Charts is a well-crafted charting component to visualize data." + 
            "It contains a rich UI gallery of 30+ charts and graphs, ranging from line to financial" + 
            " that cater to all charting scenarios. Its high performance helps to render large amounts of data quickly." + 
            "It also comes with features such as zooming, panning, tooltip, crosshair, trackball, highlight, and selection" },
        { id: "3", text: "Datepicker", iconcss: "sb-icons icon-datepicker e-sb-icon control-icon", 
            description: "The Angular DatePicker is a lightweight and mobile-friendly component that allows" +
            "end-users to enter or select a date value. It has month, year, and decade view options to quickly" +
            "navigate to the desired date. It supports minimum dates, maximum dates, and disabled dates to restrict the date selection." +
            "It has built-in features such as validation, custom date formats, range restriction, and disable dates to enhance the progressive usage." },
        { id: "4", text: "Dialog", iconcss: "sb-icons icon-dialog e-sb-icon control-icon",
            description: "The Angular Dialog is a useful user interface (UI) component for informing users" +
            "about critical information, errors, warnings, and questions, as well as confirming decisions and collecting" +
            "input from users. The component has a rich set of built-in features such as action buttons, positioning, animations," + 
            "dragging, resizing, templating, and more with mobile dialog support. The Angular dialog provides two different types:" +
            "modal dialogs and non-modal dialogs (modeless) based on interactions." },
        { id: "5", text: "Dropdown List", iconcss: "sb-icons icon-dropdownlist e-sb-icon control-icon", 
            description: "The Angular Dropdown List is a quick replacement of the HTML select tags." +
            "It has a rich appearance and allows users to select a single value that is non-editable" +
            " from a list of predefined values. It has several out-of-the-box features, such as data binding," +
            " filtering, grouping, UI customization, accessibility, and preselected values." }
    ];
    public listFields: { [key: string]: Object } = { id: "id", text: "text", iconCss: "iconcss" };
    // only for sample browser use 
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['dock-style.css'];
    }
    toolbarCliked(args: ClickEventArgs) {
        if(args.item.tooltipText == "Menu") {
            this.dockBar.toggle();
        }
    }
    onSelect(args: any) {
        document.getElementById("dockContent").innerHTML = args.data.description;
    }
}