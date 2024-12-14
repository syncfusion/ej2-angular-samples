import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GanttComponent, PdfExportProperties, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { overviewData, editingResources } from './data';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { NgIf } from '@angular/common';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonComponent, ButtonAllModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SidebarComponent, SidebarAllModule } from '@syncfusion/ej2-angular-navigations';
import { SliderModule, SliderComponent, Placement, SliderAllModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectAllModule, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListComponent, DropDownListModule, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchComponent, SwitchModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-dropdowns';
import { extend } from '@syncfusion/ej2-base';
import { NumericTextBoxModule, NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'ej2-ganttoverview',
    templateUrl: 'overview.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, NgIf, SBDescriptionComponent, ButtonModule, SidebarAllModule, SliderAllModule, MultiSelectAllModule, DropDownListAllModule, SwitchAllModule, NumericTextBoxAllModule]
})

export class GanttOverviewComponent implements OnInit {
    public data: object[];
    public resources: object[];
    public resourceFields: object;
    public taskSettings: object;
    public timelineSettings: object;
    public gridLines: string;
    public labelSettings: object;
    public eventMarkers: object[];
    public toolbar: object;
    public splitterSettings: object;
    @ViewChild('gantt')
    public gantt: GanttComponent;
    public holidays: object[];
    public projectStartDate: Date;
    public projectEndDate: Date;
    public theme: any;
    public style: any;
    public CurrentTheme: any;
    public statusStyleColor: any;
    public priorityStyle: any;
    public priorityContentStyle: any;
    public statusContentstyleColor: any;
    public workWeek?: string[];
    public dropDownData?: Object;
    public dropDownFields?: Object;
    public mode?: string;

    @ViewChild('sidebar')
    public sidebar: SidebarComponent;

    @ViewChild('slider')
    public defaultObj?: SliderComponent;

    @ViewChild('switch')
    public switch?: SwitchComponent;

    @ViewChild('WorkingDaysObj')
    public WorkingDaysObj: MultiSelectComponent;

    @ViewChild('sample')
    public listObj?: DropDownListComponent;

    public sidebarToggle: boolean = false;
    public isSideBar: boolean = false;

    public ngOnInit(): void {
        this.data = overviewData;
        this.mode = 'CheckBox';
        this.dropDownFields = { text: 'day', value: 'id' };
        this.dropDownData = [{ id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' }];
        this.workWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.taskSettings = {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'TimeLog',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentId',
            resourceInfo: 'Assignee'
        };
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        this.toolbar = ['ExpandAll', 'CollapseAll', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExcelExport', 'CsvExport', 'PdfExport'],
        this.timelineSettings = {
            showTooltip: true,
            topTier: {
                unit: 'Month',
                format: 'MMM yyyy'
            },
            bottomTier: {
                unit: 'Day',
                count: 4,
                format: 'dd'
            }
        },
        this.gridLines = 'Vertical';
        this.labelSettings = {
            rightLabel: 'Assignee',
            taskLabel: '${Progress}%'
        };
        this.eventMarkers = [
            {
                day: new Date('04/04/2024'),
                cssClass: 'e-custom-event-marker',
                label: 'Q-1 Release'
            },
            {
                day: new Date('06/30/2024'),
                cssClass: 'e-custom-event-marker',
                label: 'Q-2 Release'
            },
            {
                day: new Date('09/29/2024'),
                cssClass: 'e-custom-event-marker',
                label: 'Q-3 Release'
            }
        ];
        this.holidays = [{
            from: new Date("01/01/2024"),
            to: new Date("01/01/2024"),
            label: "New Year holiday",
            cssClass: "e-custom-holiday"
        },
        {
            from: new Date("12/25/2023"),
            to: new Date("12/26/2023"),
            label: "Christmas holidays",
            cssClass: "e-custom-holiday"
        }],
            this.resources = editingResources;
        this.splitterSettings = {
            // columnIndex: 2,
            position: '50%'
        };
        this.projectStartDate = new Date('12/17/2023');
        this.projectEndDate = new Date('10/26/2024');
    }
    load(): void {
        let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind','fluent2','tailwind3','bootstrap5.3'];
        let cls: any = document.body.className.split(' ');
        this.theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
            cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                    cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : cls.indexOf('bootstrap5.3') > 0 ? 'bootstrap5.3' :
                    cls.indexOf('fluent2') > 0 ? 'fluent2' : cls.indexOf('tailwind3') > 0 ? 'tailwind3' : '';
        let check: any = themeCollection.indexOf(this.theme);
        if (check >= 0) {
            this.CurrentTheme = true;
        }
        else {
            this.CurrentTheme = false;
        }
    };

    pdfQueryCellInfo(args: any): void {
        if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
            {
                args.image = { height:25,width:25, base64: args.data.taskData.resourcesImage };
            }
        }
    };
    Status(status: any) {
        switch (status) {
            case "In Progress":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFECFF" : "#2D3E57";
                this.style = "display: flex; padding: 0px 12px; gap: 10px; width: 96px; height: 24px; border-radius: 24px; background:" + this.statusStyleColor;
                break;
            case "Open":
                this.style = "background-color: red; color: white; border-radius: 15px; padding:6px";
                break;
            case "On Hold":
                this.statusStyleColor = (this.CurrentTheme) ? "#E4E4E7" : "#3C3B43";
                this.style = "display: flex; border-radius: 24px; padding: 0px 12px; gap: 10px; width: 78px; height: 24px; background:" + this.statusStyleColor;
                break;
            case "Completed":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFFFE2" : "#16501C";
                this.style = "display: flex; padding: 0px 12px; gap: 10px; width: 98px; height: 24px; border-radius: 24px;background:" + this.statusStyleColor;
                break;
            case "High":
                this.statusStyleColor = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.style = "display: flex; padding: 0px 12px; gap: 10px; width: 55px; height: 24px; border-radius: 24px; background:" + this.statusStyleColor;
                break;
        }
        return this.style;
    };

    StatusContent(status: any) {
        switch (status) {
            case "In Progress":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#006AA6" : "#34B6FF";
                this.style = "width: 72px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + this.statusContentstyleColor;
                break;
            case "Open":
                this.style = "background-color: red; color: white; border-radius: 15px; padding:6px";
                break;
            case "On Hold":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#766B7C" : "#CDCBD7";
                this.style = "width: 54px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + this.statusContentstyleColor;
                break;
            case "Completed":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#00A653" : "#92FFC8";
                this.style = "width: 74px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + this.statusContentstyleColor;
                break;
            case "High":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.style = "width: 31px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + this.statusContentstyleColor;
                break;
        }
        return this.style;
    };

    Priority(priority: any) {
        switch (priority) {
            case "Low":
                this.priorityStyle = (this.CurrentTheme) ? "#FFF6D1" : "#473F1E";
                this.style = "display: flex; padding: 0px 12px; gap: 10px; width: 52px; height: 24px; border-radius: 24px; background: " + this.priorityStyle;
                break;
            case "Normal":
                this.priorityStyle = (this.CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
                this.style = "display: flex; padding: 0px 12px; gap: 10px; width: 73px; height: 24px; border-radius: 24px; background: " + this.priorityStyle;
                break;
            case "Critical":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.style = "display: flex; padding: 0px 12px; gap: 10px; width: 72px; height: 24px; border-radius: 24px; background: " + this.priorityStyle;
                break;
            case "High":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.style = "display: flex; padding: 0px 12px; gap: 10px; width: 55px; height: 24px; border-radius: 24px; background: " + this.priorityStyle;
                break;
        }
        return this.style;
    };

    PriorityContent(priority: any) {
        switch (priority) {
            case "Low":
                this.priorityContentStyle = (this.CurrentTheme) ? "#70722B" : "#FDFF88";
                this.style = "width: 28px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + this.priorityContentStyle;
                break;
            case "Normal":
                this.priorityContentStyle = (this.CurrentTheme) ? "#7100A6" : "#E3A9FF";
                this.style = "width: 49px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + this.priorityContentStyle;
                break;
            case "Critical":
                this.priorityContentStyle = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.style = "width: 48px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + this.priorityContentStyle;
                break;
            case "High":
                this.priorityContentStyle = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.style = "width: 31px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + this.priorityContentStyle;
                break;
        }
        return this.style;
    };
    toolbarClick(args?: ClickEventArgs): void {
        debugger;
        if (args.item.id === 'overviewSample_excelexport') {
            this.gantt.excelExport();
        }
        else if (args.item.id === "overviewSample_csvexport") {
            this.gantt.csvExport();
        }
        else if (args.item.id === "overviewSample_pdfexport") {
            this.gantt.pdfExport();
        }
    }

    public triggerSidebar(): void {
        this.sidebarToggle = !this.sidebarToggle;
        this.isSideBar = true;
    }

    public closeSidebar(): void {
        this.sidebarToggle = false;
        this.isSideBar = false;
        this.sidebar.hide();
    }

    valueofSlider: number = 30;
    min: number = 40;
    max: number = 60;
    step: number = 5;
    ticks: Object = {
        placement: 'Before',
        largeStep: 10,
        showSmallTicks: true
    };
    tooltip: Object = {
        isVisible: true,
        placement: 'Before',
        showOn:"Hover"
    };
    sliderWidth = 190;
    onChanged(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.rowHeight = args.value;
    }

    gridLinesChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.gridLines = 'Both';
        } else {
            gantt.gridLines = 'Vertical';
        }
    }

    tempEvents: any;
    showEventMarkers(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.eventMarkers = this.tempEvents;
        } else {
            this.tempEvents = gantt.eventMarkers;
            gantt.eventMarkers = null;
        }
    }

    dependencyChange(args: any) {
        var ganttDependencyViewContainer = document.querySelector('.e-gantt-dependency-view-container');
        if (args.checked) {
            if (ganttDependencyViewContainer) {
                (ganttDependencyViewContainer as HTMLElement).style.visibility = 'visible';
            }
        } else {
            (ganttDependencyViewContainer as HTMLElement).style.visibility = 'hidden';
        }
    }

    tempLabels: any;
    taskLabelChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.labelSettings.rightLabel = this.tempLabels;
        } else {
            this.tempLabels = gantt.labelSettings.rightLabel;
            gantt.labelSettings.rightLabel = null;
        }
    }

    select(args: SelectEventArgs): void {
        let workingDays = Object[7];
        workingDays = extend([], this.WorkingDaysObj.value, [], true);
        workingDays.push(args.item.innerText);
        this.gantt.workWeek = workingDays;
    }
    remove(args: RemoveEventArgs): void {
        var index = this.gantt.workWeek.indexOf(args.item.innerText);
        let workingDays = Object[7];
        if (index !== -1) {
            workingDays = this.WorkingDaysObj.value;
            this.gantt.workWeek = workingDays;
        }
    }


    public durationUnit: Object[] = [
        { Id: 'hour', Text: 'Hour' },
        { Id: 'day', Text: 'Day' },
        { Id: 'week', Text: 'Week' }
    ];
    public durationFields: Object = { text: 'Text', value: 'Id' };
    public durationValue: string = 'day';
    public height: string = '220px';

    changeDuration(args: any): void {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.durationUnit = args.value;
    }

    onChangeUnit(args: any): void {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        var width = args.value;
        gantt.timelineSettings.timelineUnitSize = width;
    }

    public viewTypeData: any = [
        { id: "ResourceView", Text: "Resource View" },
        { id: "ProjectView", Text: "Project View" }
    ];
    public viewFields: any = { text: 'Text', value: 'id' };
    typeChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.viewType = args.value;
        if ((document.getElementsByClassName('checkeddependency')[0] as any).hidden !== true) {
            (document.querySelectorAll('.e-switch')[2] as any).ej2_instances[0].checked = true;
        }
    }

    public viewModeData: any = [
        { ID: "Default", Text: "Default" },
        { ID: "Grid", Text: "Grid" },
        { ID: "Chart", Text: "Chart" },
    ];
    public modeFields: any = { value: 'ID', text: 'Text' };
    modeChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.value == 'Grid') {
            gantt.setSplitterPosition('100%', 'position');
        }
        else if (args.value == 'Chart') {
            gantt.setSplitterPosition('0%', 'position');
        }
        else {
            gantt.setSplitterPosition('50%', 'position');
        }
    }
}
