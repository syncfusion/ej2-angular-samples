import { Component, ViewEncapsulation } from '@angular/core';
import { Breadcrumb, BreadcrumbBeforeItemRenderEventArgs, BreadcrumbClickEventArgs } from '@syncfusion/ej2-navigations';
import { getComponent } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'events.html',
    styleUrls: ['events.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, BreadcrumbModule, SBActionDescriptionComponent, SBDescriptionComponent]
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
    span.innerHTML = 'Breadcrumb <b>' + eventName + '</b> event is triggered <hr>';
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
  }

  public clearLog(): void {
    document.getElementById('EventLog').innerHTML = '';
  }

  // To refresh Breadcrumb control state when reset button clicked
  public btnClick() {
    let breadcrumb: any, breadcrumbInst: any, breadcrumbs: any = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumb = breadcrumbs[i];
        breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
        breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length  -1].text;
    }
  }
}