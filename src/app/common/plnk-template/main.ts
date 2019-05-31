import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple((window as any).ripple);

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
