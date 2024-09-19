import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SelectEventArgs,
  TabAllModule,
} from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChatOptions } from '@syncfusion/ej2-angular-buttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import {
  ButtonAllModule,
  SmartPasteButtonAllModule,
} from '@syncfusion/ej2-angular-buttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import {
  createSpinner,
  showSpinner,
  hideSpinner,
} from '@syncfusion/ej2-angular-popups';
import {
  EventRenderedArgs,
  EventSettingsModel,
  ScheduleAllModule,
} from '@syncfusion/ej2-angular-schedule';
import { getAzureChatAIRequest } from '../../azure-openai';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
interface ScheduleEvent {
  Id: number;
  Subject: string;
  Location: string;
  StartTime: Date;
  EndTime: Date;
  Description: string;
}

@Component({
  selector: 'app-smart-scheduler',
  standalone: true,
  imports: [
    ToastModule,
    FormsModule,
    TabAllModule,
    DropDownListAllModule,
    SmartPasteButtonAllModule,
    ScheduleAllModule,
    ButtonAllModule,
    DialogModule,
    DateTimePickerModule,
  ],
  templateUrl: './smart-scheduler.component.html',
  styleUrl: './smart-scheduler.component.css',
})
export class SmartSchedulerComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-smart-scheduler.component.html',
      'smart-scheduler.component.css',
    ];
  }
  @ViewChild('dialog', { static: false }) dialog!: ElementRef;
  @ViewChild('tabobj', { static: false }) tabObj!: ElementRef;
  @ViewChild('scheduleObj', { static: false }) scheduleObj!: ElementRef;
  @ViewChild('daterange1', { static: false }) daterange1!: ElementRef;
  @ViewChild('daterange2', { static: false }) daterange2!: ElementRef;
  @ViewChild('smart', { static: false }) smartPaste!: ElementRef;
  @ViewChild('toast', { static: false }) toast!: ElementRef;
  @ViewChild('parent', { static: false }) parent!: ElementRef;
  events: any = [];
  public targetElement?: HTMLElement;
  public event: ScheduleEvent | undefined;
  public position = { X: 'Right', Y: 'Top' };
  public toastTitle = 'Events Added';
  public toastContent = ``;
  public width: string = '500px';
  public height: string = '400px';

  public headerText: any = [{ text: 'Meeting Contents' }, { text: 'Schedule' }];
  public animation = { previous: { effect: 'None' }, next: { effect: 'None' } };
  public eventSettings: EventSettingsModel = {
    dataSource: this.events,
  };

  public selectedDate: Date = new Date(2018, 1, 15);
  public view: string = 'Week';
  public onEventRendered = (args: EventRenderedArgs) => {
    if (event && (event as any).Id === (args.data as any).Id) {
      args.element.classList.add('e-appointment-border');
    }
  };
  public value1 = (() => {
    let d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  })();
  public format1: string = 'MM/dd/yyyy HH:mm';

  public value2 = (() => {
    let d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  })();
  public format2: string = 'MM/dd/yyyy HH:mm';

  /**
   * Smart TextArea sample
   */
  public AzureAIRequest = async (settings: any) => {
    let output = '';
    try {
      console.log(settings);
      const response = (await getAzureChatAIRequest(settings)) as string;
      console.log('Success:', response);
      output = response;
    } catch (error) {
      console.error('Error:', error);
    }
    return output;
  };

  onCreated(): void {
    (this.smartPaste as any).aiAssistHandler = this.serverAIRequest;
  }

  public selected = (args: SelectEventArgs) => {
    if (args.selectedIndex === 1) {
      setTimeout(() => {
        (this.scheduleObj as any).refresh();
      }, 300);
      if (this.event && (this.event as any).Subject) {
        (this.toast as any).content = `${(this.event as any).Subject
          } has been scheduled at ${(
            this.event as any
          ).StartTime.toLocaleString()}`;
        (this.toast as any).dataBind();
        (this.toast as any).show();
      }
    }
  };
  public cardContent1 =
    'Title: Discussion on Ticket 429519' +
    'Hi John,\n\n' +
    'We have scheduled the meeting for tomorrow (24th Jan) at 12 PM IST at Mathura Towers and this meeting is scheduled to discuss the issue related to the ticket 429519 only. ' +
    'For any other issues, please create a new ticket or update the respective tickets and our technical team will follow up with the details in those tickets.\n\n' +
    'Note: Screen sharing is to see the issue at your end and debug directly, if needed. We request you to contact your IT team and get prior approval/disable firewall settings to share the controls. This will help to minimize the resolution time.\n\n' +
    'Regards,\n\n' +
    'Sabitha';

  public cardContent2 =
    'Title: Meeting to discuss on Ticket 603027' +
    'Hi Liji,\n\n' +
    'We have scheduled the meeting for today at 3 PM IST in Chennai and this meeting is scheduled to discuss the issue related to the ticket 595353 and 603027 only. ' +
    'For any other issues, please create a new ticket or update the respective tickets and our technical team will follow up with the details in those tickets.\n\n' +
    'Regards,\n\n' +
    'Ram';

  public cardContent3 =
    'Title: Exciting Updates and Demo Invitation from Syncfusion' +
    "You: Hi Alex, I hope you're doing well! I’m reaching out from Syncfusion Software Pvt Ltd. " +
    "We've recently made some exciting updates to our UI components and I'd love to share them with you.\n" +
    "Recipient: Hi Andrew, I'm doing well, thanks! What kind of updates have you made?\n" +
    "You: We've enhanced key components such as the Scheduler, Carousel, Tab, Toolbar, Accordion, and Appbar. " +
    "Additionally, we've improved accessibility to meet WCAG 2.2 standards and enhanced security with XSS prevention. " +
    'These updates aim to provide a more robust and secure experience for our users.\n' +
    'Recipient: That sounds fantastic! I’d be interested in seeing these updates in action.\n' +
    'You: Wonderful! I’d love to schedule a demo to showcase these new features. Are you available for a session on Wednesday, ' +
    'August 7th at 11 AM, or Friday, August 9th at 2 PM? The demo will be held at our Morrisville office.\n' +
    'Recipient: Friday, August 9th at 2 PM works for me.\n' +
    'You: Perfect! I’ll send a calendar invite for Friday, August 9th at 2 PM at our Morrisville office.\n' +
    'Recipient: Great, see you then!\n' +
    'You: See you on Friday! Have a great day.';

  ngOnInit() {
    createSpinner({
      target: (document as any).getElementById('editor_dialog'),
    });
  }
  ngAfterViewInit(): void {
    if (this.scheduleObj) {
      Promise.resolve().then(() => {
        this.targetElement = this.parent.nativeElement;
      });
    }
  }
  // Initialize the Dialog component target element.

  public dialogOpen: EmitType<object> = () => { };

  public handleButtonClick(content: string): void {
    navigator.clipboard.writeText(content).then(
      function () {
        console.log('Async: Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
    this.showDialog();
  }

  public showDialog() {
    (this.dialog as any).show();
  }

  public open() {
    showSpinner((document as any).getElementById('editor_dialog'));
    (this.smartPaste as any).click();
    let intervalId = setInterval(() => {
      let subject = (document.getElementById('subject') as HTMLInputElement)
        .value;
      console.log(subject);
      if (subject !== '') {
        clearInterval(intervalId);
        hideSpinner((document as any).getElementById('editor_dialog'));
        (document.getElementById('saveButton') as HTMLButtonElement).disabled =
          false;
        this.value1 = (this.daterange2 as any).inputElement.value;
        this.value2 = (this.daterange1 as any).inputElement.value;
      }
    }, 1000);
  }

  public close() {
    (document.getElementById('subject') as HTMLInputElement).value = '';
    (document.getElementById('location') as HTMLInputElement).value = '';
    (this.daterange1 as any).value = (() => {
      let d = new Date();
      d.setHours(12, 0, 0, 0);
      let date = d.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      let time = d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      return `${date} ${time}`;
    })();
    (this.daterange2 as any).value = (() => {
      let d = new Date();
      d.setHours(14, 0, 0, 0);
      let date = d.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      let time = d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      return `${date} ${time}`;
    })();
    (document.getElementById('description') as HTMLTextAreaElement).value = '';
    (document.getElementById('saveButton') as HTMLButtonElement).disabled =
      true;
  }

  public dialoghide() {
    (this.dialog as any).hide();
  }

  public serverAIRequest = async (options: ChatOptions) => {
    let output: string | null = '';
    try {
      console.log('input:', options);
      output = (await this.AzureAIRequest(options)) as string;
      output = output.replace('END_RESPONSE', '');
      console.log('Success:', output);
    } catch (error) {
      console.error('Error:', error);
    }
    return output;
  };

  public switchTab(): void {
    (this.tabObj as any).select(1);
  }
  public attachEvent(e: Event): void {
    e.preventDefault();
    let subject = (document.getElementById('subject') as HTMLInputElement)
      .value;
    let location = (document.getElementById('location') as HTMLInputElement)
      .value;
    let startTime = (this.daterange1 as any).value;
    let endTime = (this.daterange1 as any).value;
    let description = (
      document.getElementById('description') as HTMLTextAreaElement
    ).value;
    let newEvent = [];
    this.event = {
      Id: this.events.length + 1,
      Subject: subject,
      Location: location,
      StartTime: new Date(startTime),
      EndTime: new Date(endTime),
      Description: description,
    };
    newEvent = [...this.events];
    newEvent.push(this.event);
    this.events = newEvent;
    (this.dialog as any).hide();
    this.close();
    this.switchTab();

    setTimeout(() => {
      (this.scheduleObj as any).selectedDate = new Date(startTime);
      (this.scheduleObj as any).eventSettings.dataSource = this.events;
      (this.scheduleObj as any).dataBind();
    }, 500);
  }
}
