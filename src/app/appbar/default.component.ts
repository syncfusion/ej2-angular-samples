import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, AppBarModule, ButtonModule, SBDescriptionComponent]
})
export class AppBarDefaultComponent {
  @ViewChild('regularBtn') regularBtn: ButtonComponent;
  @ViewChild('prominentBtn') prominentBtn: ButtonComponent;
  @ViewChild('denseBtn') denseBtn: ButtonComponent;
  public ngAfterViewInit(): void {
    this.regularBtn.element.setAttribute("aria-label", "menu");
    this.prominentBtn.element.setAttribute("aria-label", "menu");
    this.denseBtn.element.setAttribute("aria-label", "menu");
  }
}
