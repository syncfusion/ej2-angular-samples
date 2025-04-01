import { Component, ViewEncapsulation, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { DialogComponent, ButtonPropsModel, DialogModule } from '@syncfusion/ej2-angular-popups';
import { AnimationSettingsModel } from '@syncfusion/ej2-splitbuttons';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SelectEventArgs, TabModule } from '@syncfusion/ej2-angular-navigations';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { scheduleData } from './scheduleDatasource';
import { orderDetails } from './data';
import { Browser } from '@syncfusion/ej2-base';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgIf } from '@angular/common';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Multiple components inside dialog
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multiple-components.html',
    styleUrls: ['multiple-components.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ButtonModule, DialogModule, TabModule, GridModule, ChartModule, ScheduleModule, RichTextEditorModule, FormsModule, ReactiveFormsModule, NgIf, DatePickerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DialogMultipleComponent implements AfterViewInit {
  @ViewChild('Dialog')
  public Dialog: DialogComponent;

  @ViewChild('RTE')
  public Rte: RichTextEditorComponent;

  reactForm: FormGroup;
  public initialPage: Object;
  public selectedDate: Date = new Date(2019, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
  public header: string = 'Syncfusion Components inside Dialog';
  public showCloseIcon: Boolean = true;
  public Dialogwidth: string = '700px';
  public height: string = '300px';
  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public target: string = '.control-section';
  public data: Object[] = [];
  public isRender: Boolean = true;
  public headerText: Object = [{ text: "Grid" },
  { text: "Scheduler" }, { text: "Chart" }, { text: "Rich Text Editor" }, { text: "Forms" }];
  public chartData: Object[] = [
    { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 }
  ];
  constructor() {
    this.reactForm = new FormGroup({
      'check': new FormControl('', [FormValidators.required]),
      'date_check': new FormControl('', [FormValidators.date]),
      'city': new FormControl('', [FormValidators.required]),
      'state': new FormControl('', [FormValidators.required]),
      'Address': new FormControl(''),
    });
  }
  public data1: Object[] = [
    { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
  ];
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'y',
    intervalType: 'Years',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}%',
    rangePadding: 'None',
    minimum: 0,
    maximum: 100,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 }
  };
  public chartArea: Object = {
    border: {
      width: 0
    }
  };

  public chartWidth: string = '100%';
  public marker: Object = {
    visible: true,
    height: 10,
    width: 10
  };
  public tooltip: Object = {
    enable: true
  };
  public title: string = 'Inflation - Consumer Price';
  ngAfterViewInit(): void {
    document.getElementById('dlgbtn').focus();

  }
  ngOnInit(): void {
    this.data = new DataManager(orderDetails as JSON[]).executeLocal(new Query().take(15));
    this.initialPage = { pageSizes: true, pageSize: 5 };
  }
  public rteCreated(): void {
    setTimeout(() => {
      this.Rte.refreshUI();
    }, 0);
  }
  public tabSelected(e: SelectEventArgs): void {
    if (e.selectedIndex === 4 && this.isRender) {
      document.getElementById('formId').addEventListener('submit', (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          alert('Customer details added!');
          this.reactForm.reset();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
      this.isRender = false;
    }
  }
  // On Dialog close, 'Open' Button will be shown
  public dialogClose = (): void => {
    document.getElementById('dlgbtn').style.display = '';
  }
  // On Dialog open, 'Open' Button will be hidden
  public dialogOpen = (): void => {
    document.getElementById('dlgbtn').style.display = 'none';
  }
  public dlgBtnClick = (): void => {
    this.Dialog.hide();
  }
  public BtnClick = (): void => {
    this.Dialog.show();
  }
  public dlgButtons: ButtonPropsModel[] = [{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }, { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }];
  get check() { return this.reactForm.get('check'); }
  get date_check() { return this.reactForm.get('date_check'); }
  get city() { return this.reactForm.get('city'); }
  get state() { return this.reactForm.get('state'); }
  get Address() { return this.reactForm.get('Address'); }
}
