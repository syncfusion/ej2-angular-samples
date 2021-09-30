import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbBeforeItemRenderEventArgs, BreadcrumbClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'control-content',
  templateUrl: 'events.html',
  styleUrls: ['events.css'],
  encapsulation: ViewEncapsulation.None
})

export class EventsController {
  public createdHandler(): void {
    this.logEvent('created');
  }

  public clickHandler(args: BreadcrumbClickEventArgs): void {
    this.logEvent(args.name);
  }

  public beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
    this.logEvent(args.name);
  }

  public logEvent(eventName: string): void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = 'Breadcrumb <b>' + eventName + '</b> event called<hr>';
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
  }

  public clearLog(): void {
    document.getElementById('EventLog').innerHTML = '';
  }
}