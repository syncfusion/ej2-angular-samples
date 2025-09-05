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
import { PdfColor } from "@syncfusion/ej2-pdf-export";

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
  public iconClass: any;
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
      constraintType: 'ConstraintType',
      constraintDate: 'ConstraintDate',
      dependency: 'Predecessor',
      parentID: 'ParentId',
      resourceInfo: 'resource'
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
      this.gridLines = 'Both';
    this.labelSettings = {
      rightLabel: 'Assignee',
      taskLabel: '${Progress}%'
    };
    this.eventMarkers = [
      {
        day: new Date('2025-03-13'),
        cssClass: 'e-custom-event-marker',
        label: 'Project Initiative'
      },
      {
        day: new Date('2025-04-18'),
        cssClass: 'e-custom-event-marker',
        label: 'Requirement Gathering'
      },
      {
        day: new Date('2025-05-30'),
        cssClass: 'e-custom-event-marker',
        label: 'Design Phase'
      },
      {
        day: new Date('2025-11-25'),
        cssClass: 'e-custom-event-marker',
        label: 'Deployment'
      }
    ];
    this.holidays = [
      {
            from: new Date("01/01/2025"),
            to: new Date("01/01/2025"),
            label: "New Year holiday",
            cssClass: "e-custom-holiday"
        },
        {
            from: new Date("12/25/2024"),
            to: new Date("12/26/2024"),
            label: "Christmas holidays",
            cssClass: "e-custom-holiday"
        }
  ],
      this.resources = editingResources;
    this.splitterSettings = {
      columnIndex: 4,
    };
    this.projectStartDate = new Date('01/25/2025');
    this.projectEndDate = new Date('01/30/2026');
  }
  load(): void {
    let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind', 'fluent2', 'tailwind3', 'bootstrap5.3'];
    let theme = document.body.className.split(' ').find(function(cls) { return themeCollection.includes(cls); }) || '';
    this.CurrentTheme = theme ? true : false;
  };

  Status(status: any) {
    switch (status) {
      case 'In Progress':
        this.statusStyleColor = this.CurrentTheme ? '#006AA6' : '#34B6FF';
        this.style = `display: flex; padding: 2px 10px; gap: 10px; width: 96px; height: 24px; border: solid 1px ${this.statusStyleColor}`;
        break;
      case 'Open':
        this.style = 'display: flex; justify-content: center; gap: 10px; width: 96px; height: 24px; border: solid 1px red';
        break;
      case 'On Hold':
        this.statusStyleColor = this.CurrentTheme ? '#766B7C' : '#CDCBD7';
        this.style = `display: flex; justify-content: center; gap: 10px; width: 96px; height: 24px; border: solid 1px ${this.statusStyleColor}`;
        break;
      case 'Completed':
        this.statusStyleColor = this.CurrentTheme ? '#00A653' : '#92FFC8';
        this.style = `display: flex; padding: 2px 10px; gap: 10px; width: 96px; height: 24px; border: solid 1px ${this.statusStyleColor}`;
        break;
    }
    return this.style;
  };

  StatusContent(status: any) {
   switch (status) {
      case 'In Progress':
        this.statusContentstyleColor = this.CurrentTheme ? 'rgb(0, 106, 166)' : 'rgb(52, 182, 255)';
        this.style = `width: 72px; height: 22px; font-style: normal; font-weight: 400; font-size: 14px; line-height: 20px; text-align: center; color: ${this.statusContentstyleColor}`;
        break;
      case 'Open':
        this.style = 'width: 54px; height: 22px; font-style: normal; font-weight: 400; font-size: 14px; line-height: 22px; text-align: center; color: rgb(255,0,0)';
        break;
      case 'On Hold':
        this.statusContentstyleColor = this.CurrentTheme ? 'rgb(118, 107, 124)' : 'rgb(205, 203, 215)';
        this.style = `width: 54px; height: 22px; font-style: normal; font-weight: 400; font-size: 14px; line-height: 22px; text-align: center; color: ${this.statusContentstyleColor}`;
        break;
      case 'Completed':
        this.statusContentstyleColor = this.CurrentTheme ? 'rgb(0, 166, 83)' : 'rgba(146, 255, 200)';
        this.style = `width: 74px; height: 22px; font-style: normal; font-weight: 400; font-size: 14px; line-height: 20px; text-align: center; color: ${this.statusContentstyleColor}`;
        break;
      case 'High':
        this.statusContentstyleColor = this.CurrentTheme ? 'rgb(243, 86, 32)' : 'rgb(255, 181, 184)';
        this.style = `width: 31px; height: 22px; font-style: normal; font-weight: 400; font-size: 14px; line-height: 20px; text-align: center; color: ${this.statusContentstyleColor}`;
        break;
    }
    return this.style;
  };

  PriorityIconStyle(priority: any) {
   switch (priority) {
      case 'Low':
        this.priorityStyle = this.CurrentTheme ? '#00A653' : '#FDFF88';
        this.style = `margin-top: 3px; color: ${this.priorityStyle} !important`;
        break;
      case 'Normal':
        this.priorityStyle = this.CurrentTheme ? '#7100A6' : '#E3A9FF';
        this.style = `margin-top: 3px; color: ${this.priorityStyle} !important`;
        break;
      case 'Critical':
        this.priorityStyle = this.CurrentTheme ? '#FF3740' : '#FFB5B8';
        this.style = `margin-top: 3px; color: ${this.priorityStyle} !important`;
        break;
      case 'High':
        this.priorityStyle = this.CurrentTheme ? '#f35620' : '#FFB5B8';
        this.style = `margin-top: 3px; color: ${this.priorityStyle} !important`;
        break;
    }
    return this.style;
  };

  PriorityContent(priority: any) {
    switch (priority) {
      case 'Low':
        this.priorityContentStyle = this.CurrentTheme ? 'rgb(0, 166, 83)' : 'rgb(253, 255, 136)';
        this.style = `width: 28px; height: 22px; font-style: normal; font-size: 14px; margin-left: 3px; line-height: 20px; text-align: center; color: ${this.priorityContentStyle}`;
        break;
      case 'Normal':
        this.priorityContentStyle = this.CurrentTheme ? 'rgb(113, 0, 166)' : 'rgb(227, 169, 255)';
        this.style = `width: 28px; height: 22px; font-style: normal; margin-left: 3px; font-size: 14px; line-height: 20px; text-align: center; color: ${this.priorityContentStyle}`;
        break;
      case 'Critical':
        this.priorityContentStyle = this.CurrentTheme ? 'rgb(255, 55, 64)' : 'rgb(255, 181, 184)';
        this.style = `width: 48px; height: 22px; font-style: normal; font-size: 14px; margin-left: 3px; line-height: 20px; text-align: center; color: ${this.priorityContentStyle}`;
        break;
      case 'High':
        this.priorityContentStyle = this.CurrentTheme ? 'rgb(235, 99, 67)' : 'rgb(255, 181, 184)';
        this.style = `width: 31px; height: 22px; font-style: normal; font-size: 14px; margin-left: 3px; line-height: 20px; text-align: center; color: ${this.priorityContentStyle}`;
        break;
    }
    return this.style;
  };

  PriorityIcon(priority: any) {
    switch (priority) {
      case 'Low':
        this.iconClass = 'e-icons e-arrow-down e-icon-style';
        break;
      case 'Normal':
        this.iconClass = 'e-icons e-arrow-right e-icon-style';
        break;
      case 'Critical':
        this.iconClass = 'e-icons e-arrow-up e-icon-style';
        break;
      case 'High':
        this.iconClass = 'e-icons e-arrow-up e-icon-style';
        break;
    }
    return this.iconClass;
  }

  toolbarClick(args?: ClickEventArgs): void {
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
    showOn: "Hover"
  };
  sliderWidth = 190;
  onChanged(args: any) {
    this.gantt.rowHeight = args.value;
  }

  gridLinesChange(args: any) {
    if (args.checked) {
      this.gantt.gridLines = 'Both';
    } else {
      this.gantt.gridLines = 'Vertical';
    }
  }

  tempEvents: any;
  showEventMarkers(args: any) {
    if (args.checked) {
      this.gantt.eventMarkers = this.tempEvents;
    } else {
      this.tempEvents = this.gantt.eventMarkers;
      this.gantt.eventMarkers = [];
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
    if (args.checked) {
      this.gantt.labelSettings.rightLabel = this.tempLabels;
    } else {
      this.tempLabels = this.gantt.labelSettings.rightLabel;
      this.gantt.labelSettings.rightLabel = " ";
    }
  }

  select(args: SelectEventArgs): void {
    let workingDays: string[] = [...(this.WorkingDaysObj.value as string[])]; // Create a copy of the array
    workingDays.push(args.item.innerText); // Add the selected item
    this.gantt.workWeek = workingDays; // Update gantt workWeek
  }

  remove(args: RemoveEventArgs): void {
    let workingDays: string[] = [...(this.WorkingDaysObj.value as string[])]; // Create a copy of the array
    const index = workingDays.indexOf(args.item.innerText); // Find index of item to remove
    if (index !== -1) {
        workingDays.splice(index, 1); // Remove the item
        this.gantt.workWeek = workingDays; // Update gantt workWeek
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
    this.gantt.durationUnit = args.value;
  }

  onChangeUnit(args: any): void {
    var width = args.value;
    this.gantt.timelineSettings.timelineUnitSize = width;
  }

  public viewTypeData: any = [
    { id: "ResourceView", Text: "Resource View" },
    { id: "ProjectView", Text: "Project View" }
  ];
  public viewFields: any = { text: 'Text', value: 'id' };
  typeChange(args: any) {
    this.gantt.viewType = args.value;
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
    if (args.value == 'Grid') {
      this.gantt.setSplitterPosition('100%', 'position');
    }
    else if (args.value == 'Chart') {
      this.gantt.setSplitterPosition('0%', 'position');
    }
    else {
      this.gantt.setSplitterPosition('50%', 'position');
    }
  } 
  pdfQueryCellInfo(args: any): void {
    if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
        args.image = { height: 30, width: 30, base64: args.data.taskData.resourcesImage};
        args.value = `${args.data.Assignee}\n${args.data.taskData.Department}`; 
    }

    // Set font color for Status or Priority columns
    if (args.column.field === 'Status' || args.column.field === 'Priority') {
        const style = args.column.field === 'Status' ? this.StatusContent(args.value) : this.PriorityContent(args.value);
        const rgbMatch = style.match(/rgb\(\d+,\s*\d+,\s*\d+\)/);
        if (rgbMatch) {
            const rgbValues = rgbMatch[0].slice(4, -1).split(', ').map(Number);
            args.style.fontColor = new PdfColor(rgbValues[0], rgbValues[1], rgbValues[2]);
        }   
    }
  };
  pdfQueryTaskbarInfo(args:any):void{
    if(this.gantt.labelSettings.rightLabel && args.data.taskData.resourcesImage){
      args.labelSettings.rightLabel.image= [{base64: args.data.taskData.resourcesImage, height: 25, width: 25}];
      args.labelSettings.rightLabel.value=args.data.ganttProperties.resourceNames;
  };
}
}
