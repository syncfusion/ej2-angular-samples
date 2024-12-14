import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { timelineTemplateData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { Internationalization } from '@syncfusion/ej2-base';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-gantttimelinetemplate',
    templateUrl: 'timeline-template.html',
    styleUrls: ['timeline-template.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttTimelineTemplateComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public timelineSettings: object;
    public columns: object[];
    public splitterSettings: object;

    // Create an Internationalization instance
    public intlObj = new Internationalization();

    public weekDate(dateString: any) {
      const gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
      const date = gantt.locale === 'ar' ? this.parseArabicDate(dateString) : this.parseDateString(dateString);
      return this.intlObj.formatDate(date, { skeleton: 'E' });
    }
    public formatDate(dateString: any) {
      const gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
      const date = gantt.locale === 'ar' ? this.parseArabicDate(dateString) : this.parseDateString(dateString);
      return this.intlObj.formatDate(date, { skeleton: 'd' });
    }
    public imageString(date: any) {
      const gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
      const imageDate = gantt.locale === 'ar' ? this.parseArabicDate(date) : this.parseDateString(date);
      return 'assets/gantt/images/'+ imageDate.getDay() +'.svg' ;
    }

    public convertArabicNumeralsToWestern(arabicNumerals: any) {
      const arabicToWesternMap: { [key: string]: string }  = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
      return arabicNumerals.replace(/[\u0660-\u0669]/g, (match: string) => arabicToWesternMap[match]);
    }

    public parseArabicDate(arabicDateString: any) {
      // To convert the 'arabicDateString' Arabic Date to ISO Date format
      const normalizedDate = this.convertArabicNumeralsToWestern(arabicDateString);
      const parts = normalizedDate.split('/'); // Assuming "DD/MM/YYYY" format
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are zero-based
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }

    public parseDateString(dateString: any) {
      // Check if the date string is in the format "DD.MM.YYYY"
      if (dateString.includes('.')) {
        const parts = dateString.split('.');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
      // Fallback to default date parsing
      return new Date(dateString);
    }

    public ngOnInit(): void {
      this.data = timelineTemplateData;
      this.taskSettings = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency:'Predecessor',
        child: 'subtasks'
      };
      this.columns = [
        { field: 'TaskID',visible: false},
        { field: 'TaskName', width: 300 },
        { field: 'StartDate' },
        { field: 'EndDate' },
        { field: 'Duration' },
        { field: 'Progress' }
      ];
      this.splitterSettings = {
        columnIndex: 1
      };
      this.timelineSettings = {
        topTier: {
          unit: 'Day',
      },
      timelineUnitSize: 200,
    };
      this.projectStartDate = new Date('03/31/2024');
      this.projectEndDate = new Date('04/23/2024');
      this.labelSettings = {
        leftLabel: 'TaskName',
        taskLabel: 'Progress'
      };
    }
}
