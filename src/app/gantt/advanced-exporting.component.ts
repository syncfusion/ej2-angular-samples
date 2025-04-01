import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { editingData, editingResources, pdfExport } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import {
  GanttComponent,
  PdfExportProperties,
  GanttAllModule,
  CriticalPathService,
} from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
import {
  PdfColor,
  PdfFontStyle,
  PdfPen,
  PdfDashStyle,
} from '@syncfusion/ej2-pdf-export';

@Component({
  selector: 'ej2-ganttadvancedexporting',
  templateUrl: 'advanced-exporting.html',
  providers: [CriticalPathService],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SBActionDescriptionComponent,
    SwitchAllModule,
    GanttAllModule,
    SBDescriptionComponent,
  ],
})
export class GanttAdvancedExportingComponent implements OnInit {
  @ViewChild('ganttExcel')
  public ganttObj: GanttComponent;
  public data: object[];
  public isFitToWidth: boolean;
  public resources: object[];
  public resourceFields: object;
  public taskSettings: object;
  public timelineSettings: object;
  public gridLines: string;
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public toolbar: string[];
  public splitterSettings: object;
  public columns: object[];
  public eventMarkers: object[];
  public holidays: object[];
  public customFunction(data: any): string {
    var container = document.createElement('div');
    if (data.ganttProperties.resourceNames) {
      var resources = data.resources.split(',');
      for (var i = 0; i < resources.length; i++) {
        var subContainer = document.createElement('div');
        var img = document.createElement('img');
        var span = document.createElement('span');
        span.className = 'labelClass';
        span.innerHTML = resources[i];
        img.src = 'assets/gantt/images/' + resources[i] + '.png';
        img.height = 20;
        img.alt = resources[i];
        subContainer.append(img);
        subContainer.append(span);
        container.append(subContainer);
      }
    }
    return container.innerHTML;
  }
  public ngOnInit(): void {
    this.data = pdfExport;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      child: 'subtasks',
      resourceInfo: 'resources',
    };
    (this.holidays = [
      {
        from: new Date('04/04/2025'),
        to: new Date('04/04/2025'),
        label: 'Local Holiday',
      },
      {
        from: new Date('04/19/2025'),
        to: new Date('04/19/2025'),
        label: 'Good Friday',
      },
      {
        from: new Date('04/30/2025'),
        to: new Date('04/30/2025'),
        label: 'Release Holiday',
      },
    ]),
      (this.eventMarkers = [
        {
          day: new Date('04/09/2025'),
          label: 'Research phase',
        },
        {
          day: new Date('06/20/2025'),
          label: 'Sales and marketing phase',
        },
      ]),
      (this.resourceFields = {
        id: 'resourceId',
        name: 'resourceName',
      });
    this.toolbar = ['PdfExport'];
    this.timelineSettings = {
      topTier: {
        unit: 'Week',
        format: 'MMM dd, y',
      },
      bottomTier: {
        unit: 'Day',
        count: 1,
      },
    };
    this.gridLines = 'Both';
    this.projectStartDate = new Date('03/25/2025');
    this.projectEndDate = new Date('06/28/2025');
    this.resources = editingResources;
    this.splitterSettings = {
      columnIndex: 2,
    };
    this.columns = [
      { field: 'TaskID', width: 80 },
      { field: 'TaskName', width: 250 },
      { field: 'StartDate' },
      { field: 'EndDate' },
      { field: 'Progress' },
    ];
  }
  toolbarClick(args?: ClickEventArgs): void {
    if (args.item.id === 'AdvancedGanttExport_pdfexport') {
      var borderWidth = 1;
      var borderColor = new PdfColor(227, 22, 91);
      var pdfpen = new PdfPen(borderColor, borderWidth);
      pdfpen.dashStyle = PdfDashStyle.Dash;
      let exportProperties: PdfExportProperties = {
        pageSize: 'A2',
        fileName: 'Product Development Report.pdf.pdf',
        ganttStyle: {
          eventMarker: {
            label: {
              fontColor: new PdfColor(33, 33, 33),
              fontStyle: PdfFontStyle.Bold,
              backgroundColor: new PdfColor(253, 191, 100),
            },
            lineStyle: pdfpen,
          },
          holiday: {
            fontColor: new PdfColor(33, 33, 33),
            backgroundColor: new PdfColor(243, 244, 246),
          },
        },
        header: {
          fromTop: 0,
          height: 150,
          contents: [
            {
              type: 'Text',
              value: 'Product Development Lifecycle Gantt Chart Report March 2025 - June 2025',
              position: { x: 20, y: 20 },
              style: { textBrushColor: '#00008B', fontSize: 24 },
            },
            {
              type: 'Line',
              style: { penColor: '#00008B', penSize: 2, dashStyle: 'Solid' },
              points: { x1: 20, y1: 70, x2: 750, y2: 70 },
            },
          ],
        },
        footer: {
          fromBottom: 160,
          height: 100,
          contents: [
            {
              type: 'Text',
              value: "© 2025 Syncfusion Inc. All Rights Reserved.\n" +
                "Generated on: " + new Date().toLocaleString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                }),
              position: { x: 1950, y: 40 },
              style: { textBrushColor: '#3a435e', fontSize: 20 },
            }
          ],
        },
        fitToWidthSettings: {
          isFitToWidth: this.isFitToWidth,
        },
      };
      this.ganttObj.pdfExport(exportProperties);
    }
  }
  public pdfQueryTaskbarInfo(args: any): void {
    args.labelSettings.leftLabel.value = args.data.ganttProperties.taskName;
    if (args.data.ganttProperties.resourceNames) {
      args.labelSettings.rightLabel.value =
        args.data.ganttProperties.resourceNames;
      args.labelSettings.rightLabel.image = [
        {
          base64: args.data.taskData.resourcesImage,
          width: 20,
          height: 20,
        },
      ];
      if (args.data.ganttProperties.taskId === 7) {
        args.labelSettings.leftLabel.value = 'Custom Label';
        args.labelSettings.leftLabel.fontStyle.fontColor = new PdfColor(
          142,
          36,
          64
        );
      }
    }
    const theme: any =
      document.body.classList.contains('tailwind3-dark') ||
      document.body.classList.contains('fluent2-dark') ||
      document.body.classList.contains('material3-dark') ||
      document.body.classList.contains('bootstrap5.3-dark') ||
      document.body.classList.contains('fluent2-highcontrast') ||
      document.body.classList.contains('fluent2-dark');
    if (theme && args.data.isCritical) {
      args.taskbar.progressColor = new PdfColor(172, 6, 136);
      args.taskbar.taskColor = args.taskbar.taskBorderColor = new PdfColor(
        73,
        4,
        58
      );
    } else if (!theme && args.data.isCritical) {
      args.taskbar.progressColor = new PdfColor(176, 0, 138);
      args.taskbar.taskColor = new PdfColor(255, 206, 244);
    }
  }
  public queryTaskbarInfo(args: any) {
    const theme: any =
      document.body.classList.contains('tailwind3-dark') ||
      document.body.classList.contains('fluent2-dark') ||
      document.body.classList.contains('material3-dark') ||
      document.body.classList.contains('bootstrap5.3-dark') ||
      document.body.classList.contains('fluent2-highcontrast') ||
      document.body.classList.contains('fluent2-dark');
    if (theme && args.data.isCritical) {
      args.taskbarBgColor = '#49043A';
      args.progressBarBgColor = '#AC0688';
    } else if (!theme && args.data.isCritical) {
      args.progressBarBgColor = '#B0008A';
      args.taskbarBgColor = '#FFCEF4';
    }
  }
  public dragDropChange(args): any {
    if (args.checked) {
      this.isFitToWidth = true;
    } else {
      this.isFitToWidth = false;
    }
  }
}
