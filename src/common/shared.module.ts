import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-ng-buttons';
import { DropDownListModule } from '@syncfusion/ej2-ng-dropdowns';

import {SBDescriptionComponent} from './dp.component';
@NgModule({
    imports: [
        ButtonModule,
        DropDownListModule
    ],
     declarations: [
        SBDescriptionComponent
    ],
    exports: [
        ButtonModule,
        DropDownListModule,
        SBDescriptionComponent
    ]
})
export class SharedModule { }
