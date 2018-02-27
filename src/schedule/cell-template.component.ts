import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MonthService, View } from '@syncfusion/ej2-ng-schedule';


interface TemplateFunction extends Window {
    getCellContent?: Function;
}
(window as TemplateFunction).getCellContent = (date: Date) => {
    if (date.getMonth() === 10 && date.getDate() === 23) {
        return '<img src="src/schedule/images/thanksgiving-day.svg" /><div class="caption">Thanksgiving day</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 9) {
        return '<img src="src/schedule/images/get-together.svg" /><div class="caption">Party time</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 13) {
        return '<img src="src/schedule/images/get-together.svg" /><div class="caption">Party time</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 22) {
        return '<img src="src/schedule/images/birthday.svg" /><div class="caption">Happy birthday</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 24) {
        return '<img src="src/schedule/images/christmas-eve.svg" /><div class="caption">Christmas Eve</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 25) {
        return '<img src="src/schedule/images/christmas.svg" /><div class="caption">Christmas Day</div>';
    } else if (date.getMonth() === 0 && date.getDate() === 1) {
        return '<img src="src/schedule/images/newyear.svg" /><div class="caption">New Year"s Day</div>';
    } else if (date.getMonth() === 0 && date.getDate() === 14) {
        return '<img src="src/schedule/images/get-together.svg" /><div class="caption">Get together</div>';
    }
    return '';
};
@Component({
    templateUrl: 'cell-template.html',
    styleUrls: ['cells.style.css'],
    providers: [MonthService],
    encapsulation: ViewEncapsulation.None
})
export class CellTemplateComponent implements OnInit {
    public cellTemplate: string;
    public currentView: View;
    public selectedDate: Date;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['cells.style.css'];
    }

    ngOnInit(): void {
        this.selectedDate = new Date(2017, 11, 15);
        this.currentView = 'Month';
        this.cellTemplate = '${if(type === "monthCells")}<div class="templatewrap">${getCellContent(data.date)}</div>${/if}';
    }
}