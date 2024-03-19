import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { SBController } from './app/common/sb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { SBRoutingModule } from './app/common/sb.router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


bootstrapApplication(SBController, {
    providers: [
        importProvidersFrom(BrowserModule, SBRoutingModule, FormsModule, ReactiveFormsModule),
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: 'sourceFiles', useValue: { files: [] } },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
