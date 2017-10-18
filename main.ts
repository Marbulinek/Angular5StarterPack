
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './application/app.module';
import { AppConfig } from './configs/app.config';

//toggle between prod / dev build environment
let prodMode:boolean = new AppConfig().isProd();

platformBrowserDynamic().bootstrapModule(AppModule);
