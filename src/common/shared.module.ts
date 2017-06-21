import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-ng-buttons';

import {SBDescriptionComponent} from './dp.component';
@NgModule({
    imports: [
        ButtonModule
    ],
     declarations: [
        SBDescriptionComponent
    ],
    exports: [
        ButtonModule,
        SBDescriptionComponent
    ]
})
export class SharedModule { }
