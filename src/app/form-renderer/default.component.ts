import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormRenderer, FormRendererComponent, FormRendererModule, Schema } from '@syncfusion/ej2-angular-form-renderer';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { customerService, userRegistration, doctorsAppointment } from './datasource';

/**
 * Default Button Controller
 */
@Component({
   selector: 'control-content',
   templateUrl: 'default.html',
   styleUrls: ['form-renderer.css'],
   encapsulation: ViewEncapsulation.None,
   standalone: true,
   imports: [FormRendererModule, RadioButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class DefaultformRendererController {
   @ViewChild(FormRendererComponent) formRenderer?: FormRenderer;

   selectedSchema: 'userRegistration' | 'customerservice' | 'doctorsAppointment' = 'userRegistration';
   formSchema: Schema = userRegistration;
   readonly schemaOptions = {
      userRegistration,
      customerservice: customerService,
      doctorsAppointment
   };

   changeSchema(args: { value: 'userRegistration' | 'customerservice' | 'doctorsAppointment' }): void {
      if (!args?.value) {
         return;
      }

      this.selectedSchema = args.value;
      this.formSchema = this.schemaOptions[args.value];
   };
}