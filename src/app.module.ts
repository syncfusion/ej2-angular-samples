import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ReflectiveInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { SBRoutingModule } from './common/sb.router';

import { SBController } from './common/sb.component';
import { LPController } from './common/lp.component';


@NgModule({
    imports: [
        BrowserModule,
        SBRoutingModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        SBController,
        LPController
    ],
    bootstrap: [SBController],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: 'sourceFiles', useValue: {files: []} }

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
