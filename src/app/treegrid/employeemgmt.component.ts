import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { sampleData, employeeData } from './jsontreegriddata';
import {
  FilterSettingsModel,
  PageSettingsModel,
  SortSettingsModel,
  TreeGridAllModule,
  TreeGridComponent,
} from '@syncfusion/ej2-angular-treegrid';
import { QueryCellInfoEventArgs, Column } from '@syncfusion/ej2-angular-grids';
import {
  TreeGrid,
  ColumnModel,
  PageService,
  FreezeService,
  SortService,
  FilterService,
} from '@syncfusion/ej2-angular-treegrid';
import { DdtChangeEventArgs } from '@syncfusion/ej2-dropdowns';

import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';


@Component({
  selector: 'ej2-treegrid-container',
  templateUrl: 'employeemgmt.html',
  styleUrl: 'employeemgmt.css',
  providers: [PageService, FreezeService, SortService, FilterService],
  standalone: true,
  imports: [TreeGridAllModule, CommonModule, DropDownListAllModule],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeemgmtComponent implements OnInit {
   @ViewChild('treegrid') treegrid: TreeGridComponent;
  @ViewChild('employeeTemplate', { static: true })
  employeeTemplate: any;
  @ViewChild('employeeHeaderTemplate', { static: true })
  employeeHeaderTemplate: any;
  @ViewChild('emailTemplate', { static: true })
  emailTemplate: any;
  @ViewChild('flagTemplate', { static: true }) flagTemplate: any;
  @ViewChild('leaveAvailabilityTemplate', { static: true })
  leaveAvailabilityTemplate: any;
  @ViewChild('leaveCountHeaderTemplate', { static: true })
  leaveCountHeaderTemplate: any;
  @ViewChild('statusTemplate', { static: true })
  statusTemplate: any;

  public data = employeeData;
  public columns: ColumnModel[] = [];
  public pageSettings: PageSettingsModel = { pageSize: 10 };
  public sortSettings: SortSettingsModel = { columns: [] };
  public filterSettings: FilterSettingsModel = {
    type: 'Menu',
    hierarchyMode: 'Child',
    mode: 'Immediate',
  };
  selectedRole = 'hr'; // default viewer role

  viewerRoles = [
    { id: 'hr', role: 'HR' },
    { id: 'employee', role: 'Employee' },
    { id: 'helpdesk', role: 'Help Desk' },
    { id: 'pm', role: 'Project Management' },
  ];

  ngOnInit(): void {
    // equivalent to initTreeGrid('hr')
    this.columns = this.getColumns(this.selectedRole);
  }

  onViewerChange(args: any): void {
    this.selectedRole = args.value as string;
    this.treegrid.clearFiltering();
    this.treegrid.clearSorting();
    this.treegrid.columns = this.getColumns(this.selectedRole);
    setTimeout(() => {
      this.treegrid.refreshColumns();
    }, 10);
  }

  // 👇 Your getColumns function with viewer switch logic
  getColumns(viewer: string): ColumnModel[] {
    const baseColumns: ColumnModel[] = [
      {
        field: 'ID',
        headerText: 'ID',
        width: 200,
        minWidth: 200,
        textAlign: 'Left',
      },
      {
        field: 'Employee',
        template: this.employeeTemplate,
        headerText:'Name', 
        width: 280,
      },
    ];

    switch (viewer) {
      case 'hr':
        return [
          ...baseColumns,
          {
            field: 'Location',
            template: this.flagTemplate,
            headerText: 'Location',
            width: 200,
          },
          {
            field: 'JoinDate',
            headerText: 'Date Joined',
            textAlign: 'Right',
            width: 180,
            format: { skeleton: 'yMd', type: 'date' },
          },
          {
            field: 'Salary',
            headerText: 'Salary per month',
            format: 'c0',
            textAlign: 'Right',
            //headerTextAlign:"Left",
            width: 240,
            clipMode:"EllipsisWithTooltip"
          },
          {
            field: 'Email',
            headerText: 'Email',
            template: this.emailTemplate,
            textAlign: 'Center',
            width: 200,
          },
        ];
      case 'employee':
        return [
          ...baseColumns,
          {
            field: 'Status',
            headerText: 'Presence',
            template: this.statusTemplate,
            width: 200,
            textAlign: 'Center',
          },
          {
            field: 'WorkMode',
            headerText: 'Work Mode',
            width: 230,
          },
          {
            field: 'Email',
            headerText: 'Email',
            template: this.emailTemplate,
            textAlign: 'Center',
            width: 200,
          },
        ];
      case 'helpdesk':
        return [
          ...baseColumns,
           {
            field: 'Status',
            headerText: 'Presence',
            template: this.statusTemplate,
            width: 200,
            textAlign: 'Center',
          },
          {
            field: 'LeaveAvailability',
            headerText: 'Leave Availability',
            template: this.leaveAvailabilityTemplate,
            textAlign: 'Center',
            headerTextAlign:"Center",
            width: 400,
            allowFiltering:false
          },
          {
            field: 'LeaveCount',
            headerText: `Leave Taken in ${new Date().getFullYear()}`,
            textAlign: 'Center',
            width: 280,
            clipMode: 'EllipsisWithTooltip'
          },
        ];
      case 'pm':
        return [
          ...baseColumns,
          {
            field: 'Department',
            headerText: 'Department',
            width: 200,
          },
          {
            field: 'ProjectDetails',
            headerText: 'Project Details',
            width: 230,
          },
          {
            field: 'ProjectStatus',
            headerText: 'Project Status',
            width: 200,
          },
          {
            field: 'Email',
            headerText: 'Email',
            template: this.emailTemplate,
            textAlign: 'Center',
            width: 200,
          },
        ];
      default:
        return baseColumns;
    }
  }
  getStatusStyles(status: string): { [key: string]: string } {
   var bgColor = status === 'Available' ? '#ccffcc' : status === 'Busy' ? '#ffd09d' : '#ffd7cc';
   var color = status === 'Available' ? '#00cc00' :  status === 'Busy' ? '#ff8707': '#e60000';
    return {
      'background-color': bgColor,
      color,
      padding: '0 4px',
      'border-radius': '4px',
      'text-align': 'center',
      'font-size': '12px',
      display: 'inline-block',
    };
  }

  dataBound() {
    const leaveYearSpan: any = document.getElementById('leaveYear');
    if (leaveYearSpan) {
      leaveYearSpan.textContent = new Date().getFullYear();
    }
  }

  getBarStyle(value: number): { [key: string]: any } {
    const percent = (value / 12) * 100;
    let color = '#df2222';
    if (value > 8) color = '#00b300';
    else if (value > 4) color = '#ffa500';

    return {
      width: `${percent}%`,
      backgroundColor: color,
    };
  }
}
