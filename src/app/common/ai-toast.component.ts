import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ToastComponent, ToastPositionModel, ToastModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-ai-toast',
  standalone: true,
  imports: [ToastModule],
  template: `
    <ejs-toast #aiToast
      class="ai-toast"
      [width]="420"
      [position]="position"
      [timeOut]="0"
      [newestOnTop]="true"
      [content]="content"
      (created)="onCreated()"
      (destroyed)="onDestoryed()"
      >
    </ejs-toast>
    <ng-template #content>
      <div class="ai-toast-content">
        <div class="ai-toast-message">
          <div class="ai-toast-title">Explore AI Demos</div>
          You can now explore our <strong>Smart AI demos</strong> with limited AI token usage. Additionally, you can try out our
          <strong>
            <a href="https://github.com/syncfusion/smart-ai-samples/tree/master/angular" target="_blank" style="color: #007bff; text-decoration: none;">
              Syncfusion Smart AI Samples
            </a>
          </strong>
          locally by using your own API key
        </div>
        <button (click)="hideToast()" class="ai-toast-close" aria-label="Close">✕</button>
      </div>
    </ng-template>
  `
})
export class AIToastComponent {
  @ViewChild('aiToast', { static: true }) aiToast!: ToastComponent;
  position: ToastPositionModel = { X: 'Right', Y: 'Top' };

  onCreated() {
    this.aiToast.show();
  }
     
  onDestoryed() {
    (document.querySelector('.ai-toast')as any).style.display = 'none';
    }

  hideToast() {
    this.aiToast.hide();
  }
}