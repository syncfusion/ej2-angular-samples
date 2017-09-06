import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);