import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ReflectiveInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SBRoutingModule } from './common/sb.router';
import { SharedModule } from './common/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { SBController } from './common/sb.component';
import { LPController } from './common/lp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        BrowserModule,
        SBRoutingModule,
        HttpClientModule,
        HttpModule,
        JsonpModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
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
