import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'control-content',
  templateUrl: 'default.html',
  styleUrls: ['default.component.css'],
  encapsulation: ViewEncapsulation.None
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
