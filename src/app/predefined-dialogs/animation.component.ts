import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {ConfirmDialogArgs, DialogEffect, DialogUtility} from '@syncfusion/ej2-angular-popups'
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'animation.html',
    styleUrls: ['animation.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ButtonModule, DropDownListModule, SBDescriptionComponent]
})
export class AnimationDialogComponent  {
  @ViewChild('animationSample')
  public animationDropDownObj: DropDownListComponent;

  public effectData: Object[] = [
    { Id: 'FadeZoom', effect: 'Fade zoom' },
    { Id: 'SlideBottom', effect: 'Slide bottom' },
    { Id: 'SlideTop', effect: 'Slide top' },
    { Id: 'Zoom', effect: 'Zoom' },
    { Id: 'Fade', effect: 'Fade' }
];
public fields: Object = { text: 'effect', value: 'Id' };
public height: string = '220px';
public waterMark: string = 'Animation effect';
public value: string = 'FadeZoom';

  dialogArgs: ConfirmDialogArgs = {
    title: ' Delete Multiple Items',
    content: 'Are you sure you want to permanently delete these items?',
    animationSettings: { effect: 'Zoom', delay: 0, duration: 400 },
    position: { X: 'center', Y: 'center' },
    width: '420px',
    closeOnEscape: true
  };
  public confirmBtnClick = (): void => {
    DialogUtility.confirm(this.dialogArgs);
  };
  public onChange(args: any): void {
    this.dialogArgs.animationSettings.effect = this.animationDropDownObj.value as DialogEffect;
  }
}