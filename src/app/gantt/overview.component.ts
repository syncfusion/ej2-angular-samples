import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { overviewData, editingResources } from './data';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'ej2-ganttoverview',
    templateUrl: 'overview.html',
    encapsulation: ViewEncapsulation.None
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
    public dataList: { [key: string]: Object }[] = [
        { ID: 'Default', Text: 'Default' },
        { ID: 'Grid', Text: 'Grid' },
        { ID: 'Chart', Text: 'Chart' }
    ];
    public value: string = 'Default';
    public fields: Object = { value: 'ID', text: 'Text' };

    public ngOnInit(): void {
        this.data = overviewData;
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
        this.toolbar = [{
            type: 'Input', align: 'Right', template: new DropDownList({
                dataSource: this.dataList,
                placeholder: 'View',
                width: '90px',
                fields: { value: 'ID', text: 'Text' },
                change: function (args: any) {
                    let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
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
            })
        }, 'ExpandAll', 'CollapseAll'],
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
                day: '04/04/2022',
                cssClass: 'e-custom-event-marker',
                label: 'Q-1 Release'
            },
            {
                day: '06/30/2022',
                cssClass: 'e-custom-event-marker',
                label: 'Q-2 Release'
            },
            {
                day: '09/29/2022',
                cssClass: 'e-custom-event-marker',
                label: 'Q-3 Release'
            }
        ];
        this.holidays = [{
            from: "01/01/2022",
            to: "01/01/2022",
            label: "New Year holiday",
            cssClass: "e-custom-holiday"
        },
        {
            from: "12/25/2021",
            to: "12/26/2021",
            label: "Christmas holidays",
            cssClass: "e-custom-holiday"
        }],
            this.resources = editingResources;
        this.splitterSettings = {
            // columnIndex: 2,
            position: '50%'
        };
        this.projectStartDate = new Date('12/17/2021');
        this.projectEndDate = new Date('10/26/2022');
    }
    load(): void {
        let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind'];
        let check: any = themeCollection.indexOf(this.theme);
        let cls: any = document.body.className.split(' ');
        this.theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
            cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                    cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : ''
        if (check >= 0) {
            this.CurrentTheme = true;
        }
        else {
            this.CurrentTheme = false;
        }
    };

    Status(status: any) {
        switch (status) {
            case "In Progress":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFECFF" : "#2D3E57";
                this.style = "display: flex; padding: 1px 12px; gap: 10px; width: 96px; height: 24px; border-radius: 24px; background:" + this.statusStyleColor;
                break;
            case "Open":
                this.style = "background-color: red; color: white; border-radius: 15px; padding:6px";
                break;
            case "On Hold":
                this.statusStyleColor = (this.CurrentTheme) ? "#E4E4E7" : "#3C3B43";
                this.style = "display: flex; border-radius: 24px; padding: 1px 12px; gap: 10px; width: 78px; height: 24px; background:" + this.statusStyleColor;
                break;
            case "Completed":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFFFE2" : "#16501C";
                this.style = "display: flex; padding: 1px 12px; gap: 10px; width: 98px; height: 24px; border-radius: 24px;background:" + this.statusStyleColor;
                break;
            case "High":
                this.statusStyleColor = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.style = "display: flex; padding: 1px 12px; gap: 10px; width: 55px; height: 24px; border-radius: 24px; background:" + this.statusStyleColor;
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
                this.style = "display: flex; padding: 1px 12px; gap: 10px; width: 52px; height: 24px; border-radius: 24px; background: " + this.priorityStyle;
                break;
            case "Normal":
                this.priorityStyle = (this.CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
                this.style = "display: flex; padding: 1px 12px; gap: 10px; width: 73px; height: 24px; border-radius: 24px; background: " + this.priorityStyle;
                break;
            case "Critical":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.style = "display: flex; padding: 1px 12px; gap: 10px; width: 72px; height: 24px; border-radius: 24px; background: " + this.priorityStyle;
                break;
            case "High":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.style = "display: flex; padding: 1px 12px; gap: 10px; width: 55px; height: 24px; border-radius: 24px; background: " + this.priorityStyle;
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

}
